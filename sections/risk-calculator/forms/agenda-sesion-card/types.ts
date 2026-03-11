export type AgendaSesionCardProps = {
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  submissionId?: string;
  bookingToken?: string;
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
