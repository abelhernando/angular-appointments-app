import { BookSlot } from './appointment-reschedule/appointment-calendar/book-slot';

export interface Appointment {
  End: Date;
  Start: Date;
  Taken: boolean;
}

export interface BookSlotDto {
  End: Date;
  Start: Date;
  Taken: boolean;
}

export type BookSlotCreate = (slot: BookSlotDto) => BookSlot;

export type postBookDate = {
  Start: Date | string;
  End: Date | string;
  Comments: string;
  Patient: {
    Name: string;
    SecondName: string;
    Email: string;
    Phone: string;
  };
};
