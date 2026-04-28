"use client";

import {
  captureClientEvent,
  captureClientException,
} from "@/lib/posthog/client";
import { POSTHOG_EVENTS } from "@/lib/posthog/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMonths, getDay, getDaysInMonth, startOfMonth } from "date-fns";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { bookMeeting, fetchActiveDays, fetchSlotsByDay } from "../lib/api";
import {
  formatMonthLabel,
  getDateKeyInTimeZone,
  parseDateKey,
} from "../lib/date";
import type {
  AgendaSesionCardProps,
  BookingSuccess,
  CalendarCell,
  Slot,
} from "../types";

type AgendaSesionCardContextValue = {
  timeZone: string;
  hasRequiredClientData: boolean;
  daysLoading: boolean;
  daysError: string | null;
  enabledDatesCount: number;
  monthLabel: string;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
  calendarCells: (CalendarCell | null)[];
  activeDaysMap: Map<string, boolean>;
  selectedDate: string | null;
  selectedSlot: Slot | null;
  slots: Slot[];
  showSlotsSkeleton: boolean;
  slotsError: string | null;
  bookingError: string | null;
  bookingSuccess: BookingSuccess | null;
  bookingPending: boolean;
  canBook: boolean;
  handleBookSlot: () => Promise<void>;
  handleSelectDate: (dateKey: string) => void;
  handleSelectSlot: (slot: Slot | null) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};

const AgendaSesionCardContext =
  createContext<AgendaSesionCardContextValue | null>(null);

type AgendaSesionCardStateProviderProps = AgendaSesionCardProps & {
  children: ReactNode;
};

export function AgendaSesionCardStateProvider({
  children,
  ...agendaProps
}: AgendaSesionCardStateProviderProps) {
  const {
    clientName,
    clientEmail,
    clientCompany,
    submissionId,
    bookingToken,
    bookingSource,
  } = agendaProps;
  const queryClient = useQueryClient();
  const [timeZone] = useState(() => {
    return (
      Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Santiago"
    );
  });
  const [selectedDateManual, setSelectedDateManual] = useState<string | null>(
    null
  );
  const [visibleMonthManual, setVisibleMonthManual] = useState<Date | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<BookingSuccess | null>(
    null
  );

  const hasRequiredClientData =
    clientName.trim().length > 0 &&
    clientEmail.trim().length > 0 &&
    clientCompany.trim().length > 0;
  const resolvedBookingSource = bookingSource ?? "risk_calculator";
  const trackedClientErrorsRef = useRef<{
    activeDays?: string;
    slots?: string;
    booking?: string;
  }>({});

  const activeDaysQuery = useQuery({
    queryKey: ["scheduleMeeting", "activeDays", timeZone],
    queryFn: () => fetchActiveDays(timeZone),
  });

  const days = useMemo(() => activeDaysQuery.data ?? [], [activeDaysQuery.data]);
  const daysLoading = activeDaysQuery.isPending;
  const daysError =
    activeDaysQuery.error instanceof Error ? activeDaysQuery.error.message : null;

  const activeDaysMap = useMemo(() => {
    return new Map(days.map((day) => [day.date, day.enabled]));
  }, [days]);

  const enabledDatesCount = useMemo(() => {
    return days.filter((day) => day.enabled).length;
  }, [days]);

  const selectedDate = useMemo(() => {
    if (days.length === 0) return null;

    if (
      selectedDateManual &&
      days.some((day) => day.date === selectedDateManual && day.enabled)
    ) {
      return selectedDateManual;
    }

    const todayDateKey = getDateKeyInTimeZone(new Date(), timeZone);
    const todayActiveDate = days.find(
      (day) => day.date === todayDateKey && day.enabled
    )?.date;
    if (todayActiveDate) {
      return todayActiveDate;
    }

    return days.find((day) => day.enabled)?.date ?? null;
  }, [days, selectedDateManual, timeZone]);

  const visibleMonth = useMemo(() => {
    if (visibleMonthManual) return visibleMonthManual;
    if (!selectedDate) return null;
    return startOfMonth(parseDateKey(selectedDate));
  }, [selectedDate, visibleMonthManual]);

  const minDate = days[0]?.date ?? null;
  const maxDate = days[days.length - 1]?.date ?? null;

  const slotsQuery = useQuery({
    queryKey: [
      "scheduleMeeting",
      "slots",
      clientEmail.trim().toLowerCase(),
      timeZone,
      selectedDate,
    ],
    queryFn: () =>
      fetchSlotsByDay({
        dateKey: selectedDate as string,
        clientEmail,
        timeZone,
      }),
    enabled: Boolean(selectedDate && hasRequiredClientData),
    staleTime: 5 * 60 * 1000,
  });

  const slots = slotsQuery.data ?? [];
  const slotsLoading = slotsQuery.isPending;
  const slotsError =
    slotsQuery.error instanceof Error ? slotsQuery.error.message : null;
  const showSlotsSkeleton = daysLoading || slotsLoading;

  useEffect(() => {
    if (!daysError) return;

    const fingerprint = `${resolvedBookingSource}|${timeZone}|${daysError}`;
    if (trackedClientErrorsRef.current.activeDays === fingerprint) return;

    trackedClientErrorsRef.current.activeDays = fingerprint;
    captureClientEvent(POSTHOG_EVENTS.meetingScheduleError, {
      booking_source: resolvedBookingSource,
      step: "load_active_days",
      time_zone: timeZone,
      error_message: daysError,
    });
    captureClientException(activeDaysQuery.error ?? new Error(daysError), {
      booking_source: resolvedBookingSource,
      step: "load_active_days",
      time_zone: timeZone,
    });
  }, [activeDaysQuery.error, daysError, resolvedBookingSource, timeZone]);

  useEffect(() => {
    if (!slotsError || !selectedDate) return;

    const fingerprint = `${resolvedBookingSource}|${timeZone}|${selectedDate}|${slotsError}`;
    if (trackedClientErrorsRef.current.slots === fingerprint) return;

    trackedClientErrorsRef.current.slots = fingerprint;
    captureClientEvent(POSTHOG_EVENTS.meetingScheduleError, {
      booking_source: resolvedBookingSource,
      step: "load_slots",
      time_zone: timeZone,
      selected_date: selectedDate,
      error_message: slotsError,
    });
    captureClientException(slotsQuery.error ?? new Error(slotsError), {
      booking_source: resolvedBookingSource,
      step: "load_slots",
      time_zone: timeZone,
      selected_date: selectedDate,
    });
  }, [resolvedBookingSource, selectedDate, slotsError, slotsQuery.error, timeZone]);

  const bookingMutation = useMutation({
    mutationFn: (slot: Slot) =>
      bookMeeting({
        bookingSource,
        bookingToken,
        submissionId,
        clientName,
        clientEmail,
        clientCompany,
        selectedSlot: slot,
        timeZone,
      }),
  });

  const monthToRender = visibleMonth ?? startOfMonth(new Date());
  const monthFirstDay = startOfMonth(monthToRender);
  const monthLabel = formatMonthLabel(monthToRender, timeZone);
  const firstWeekdayIndex = (getDay(monthFirstDay) + 6) % 7;
  const daysInMonth = getDaysInMonth(monthToRender);

  const calendarCells = useMemo<(CalendarCell | null)[]>(() => {
    const leading = Array.from({ length: firstWeekdayIndex }, () => null);
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, index) => {
      const dayNumber = index + 1;
      const dayDate = new Date(
        Date.UTC(
          monthToRender.getFullYear(),
          monthToRender.getMonth(),
          dayNumber,
          12,
          0,
          0,
          0
        )
      );
      return {
        dayNumber,
        dateKey: getDateKeyInTimeZone(dayDate, timeZone),
      };
    });
    const trailingLength =
      (7 - ((leading.length + currentMonthDays.length) % 7)) % 7;
    const trailing = Array.from({ length: trailingLength }, () => null);

    return [...leading, ...currentMonthDays, ...trailing];
  }, [daysInMonth, firstWeekdayIndex, monthToRender, timeZone]);

  const canNavigatePrev = useMemo(() => {
    if (!minDate || !visibleMonth) return false;
    const prevMonth = addMonths(visibleMonth, -1);
    return startOfMonth(prevMonth) >= startOfMonth(parseDateKey(minDate));
  }, [minDate, visibleMonth]);

  const canNavigateNext = useMemo(() => {
    if (!maxDate || !visibleMonth) return false;
    const nextMonth = addMonths(visibleMonth, 1);
    return startOfMonth(nextMonth) <= startOfMonth(parseDateKey(maxDate));
  }, [maxDate, visibleMonth]);

  async function handleBookSlot() {
    if (!selectedDate || !selectedSlot || !hasRequiredClientData) return;

    setBookingError(null);
    setBookingSuccess(null);

    try {
      const result = await bookingMutation.mutateAsync(selectedSlot);
      setBookingSuccess(result);
      captureClientEvent(POSTHOG_EVENTS.meetingBooked, {
        booking_source: resolvedBookingSource,
        email_sent: result.emailSent,
        time_zone: timeZone,
      });
      await queryClient.invalidateQueries({
        queryKey: [
          "scheduleMeeting",
          "slots",
          clientEmail.trim().toLowerCase(),
          timeZone,
          selectedDate,
        ],
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo agendar la reunión";
      setBookingError(message);
    }
  }

  useEffect(() => {
    if (!bookingError) return;

    const fingerprint = [
      resolvedBookingSource,
      timeZone,
      selectedDate ?? "",
      selectedSlot?.start ?? "",
      selectedSlot?.end ?? "",
      bookingError,
    ].join("|");
    if (trackedClientErrorsRef.current.booking === fingerprint) return;

    trackedClientErrorsRef.current.booking = fingerprint;
    captureClientEvent(POSTHOG_EVENTS.meetingScheduleError, {
      booking_source: resolvedBookingSource,
      step: "book_meeting",
      time_zone: timeZone,
      selected_date: selectedDate,
      selected_slot_start: selectedSlot?.start,
      selected_slot_end: selectedSlot?.end,
      error_message: bookingError,
    });
    captureClientException(bookingMutation.error ?? new Error(bookingError), {
      booking_source: resolvedBookingSource,
      step: "book_meeting",
      time_zone: timeZone,
      selected_date: selectedDate,
      selected_slot_start: selectedSlot?.start,
      selected_slot_end: selectedSlot?.end,
    });
  }, [
    bookingError,
    bookingMutation.error,
    resolvedBookingSource,
    selectedDate,
    selectedSlot?.end,
    selectedSlot?.start,
    timeZone,
  ]);

  function handleSelectDate(dateKey: string) {
    setSelectedDateManual(dateKey);
    setVisibleMonthManual(startOfMonth(parseDateKey(dateKey)));
    setSelectedSlot(null);
    setBookingError(null);
    setBookingSuccess(null);
  }

  function handlePrevMonth() {
    setVisibleMonthManual((current) => addMonths(current ?? monthToRender, -1));
  }

  function handleNextMonth() {
    setVisibleMonthManual((current) => addMonths(current ?? monthToRender, 1));
  }

  const value: AgendaSesionCardContextValue = {
    timeZone,
    hasRequiredClientData,
    daysLoading,
    daysError,
    enabledDatesCount,
    monthLabel,
    canNavigatePrev,
    canNavigateNext,
    calendarCells,
    activeDaysMap,
    selectedDate,
    selectedSlot,
    slots,
    showSlotsSkeleton,
    slotsError,
    bookingError,
    bookingSuccess,
    bookingPending: bookingMutation.isPending,
    canBook: Boolean(selectedSlot && hasRequiredClientData),
    handleBookSlot,
    handleSelectDate,
    handleSelectSlot: setSelectedSlot,
    handlePrevMonth,
    handleNextMonth,
  };

  return (
    <AgendaSesionCardContext.Provider value={value}>
      {children}
    </AgendaSesionCardContext.Provider>
  );
}

export function useAgendaSesionCardContext() {
  const context = useContext(AgendaSesionCardContext);
  if (!context) {
    throw new Error(
      "useAgendaSesionCardContext debe usarse dentro de AgendaSesionCardStateProvider"
    );
  }
  return context;
}
