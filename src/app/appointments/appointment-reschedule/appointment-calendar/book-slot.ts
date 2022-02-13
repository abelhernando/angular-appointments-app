import { InjectionToken } from '@angular/core';
import { BookSlotCreate, BookSlotDto } from '../../appointments.models';

export const BOOK_SLOT_TOKEN = new InjectionToken<BookSlotCreate>('book_slot');

export class BookSlot {
  public readonly end: Date;
  public readonly start: Date;
  public readonly isTaken: boolean;

  private constructor({ Start, End, Taken = false }: BookSlotDto) {
    this.end = End;
    this.start = Start;
    this.isTaken = Taken;
  }

  public static create(slot: BookSlotDto) {
    return new BookSlot(slot);
  }
}
