import { Injectable } from '@angular/core';
import { BookSlot } from '../appointments/appointment-reschedule/appointment-calendar/book-slot';

@Injectable({
  providedIn: 'root',
})
export class BookSlotCacheMemoryService {
  private readonly data = new Map();

  public add(key: string, value: BookSlot[]): void {
    this.data.set(key, value);
  }

  public get(key: string): BookSlot[] | void {
    if (this.data.has(key)) {
      return this.data.get(key);
    }
  }

  public has(key: string): boolean {
    return this.data.has(key);
  }
}
