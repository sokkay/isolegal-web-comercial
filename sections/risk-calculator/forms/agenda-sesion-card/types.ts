export type BookingSource = "risk_calculator" | "external_admin";

export type AgendaSesionCardProps = {
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  submissionId?: string;
  bookingToken?: string;
  bookingSource?: BookingSource;
};

export type ActiveDay = {
  date: string;
  enabled: boolean;
};

export type Slot = {
  start: string;
  end: string;
};

export type BookingSuccess = {
  message: string;
  emailSent: boolean;
  booking: {
    eventLink?: string;
    meetLink?: string;
    startDateTime: string;
    endDateTime: string;
    timeZone: string;
  };
};

export type CalendarCell = {
  dayNumber: number;
  dateKey: string;
};
