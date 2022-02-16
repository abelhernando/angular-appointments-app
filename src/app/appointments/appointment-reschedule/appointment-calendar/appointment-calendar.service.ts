import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { BookSlot } from './book-slot';
import { BookSlotRepository } from './book-slot.repository';

@Injectable({
  providedIn: 'root',
})
export class AppointmentCalendarService {
  public readonly calendarSlots$: Observable<BookSlot[][]>;
  private readonly getNewSlotsS = new Subject<Date>();

  constructor(private bookSlotRepository: BookSlotRepository) {
    this.calendarSlots$ = this.getNewSlotsS.pipe(
      switchMap((date: Date) => this.getWeekFromDate(date)),
      startWith([]),
      shareReplay(1)
    );
  }

  public getNewSlots(date: Date): void {
    this.getNewSlotsS.next(date);
  }

  private getWeekFromDate(date = new Date()): Observable<BookSlot[][]> {
    return this.bookSlotRepository.getRange(date, 6);
  }
}
