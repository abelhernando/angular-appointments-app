export interface BookingDate {
  id: string;
  fulldate: Date;
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  time: string;
}

export interface Appointment {
  End: Date;
  Start: Date;
  Taken: boolean;
}

export enum DayOfWeek {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
