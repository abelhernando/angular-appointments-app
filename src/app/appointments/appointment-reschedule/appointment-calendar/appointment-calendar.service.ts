import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  calendarInitialDate,
  getDaysBetween,
  groupByDate,
} from 'src/app/common/utils/dateUtils';
import { BookSlot } from './book-slot';
import { BookSlotRepository } from './book-slot.repository';

@Injectable({
  providedIn: 'root',
})
export class AppointmentCalendarService {
  private initialDate = null;
  private WEEK_NUMBER = 7;

  constructor(private bookSlotRepository: BookSlotRepository) {}

  getWeekFromToday(date = new Date()): Observable<Map<number, BookSlot[]>> {
    const newDate = new Date(date);
    const initialDayWeek = calendarInitialDate(newDate);

    const nextWeek = new Date(
      new Date(newDate).setDate(newDate.getDate() + this.WEEK_NUMBER)
    );

    const nextInitialWeek = calendarInitialDate(nextWeek);

    const initialSlots = this.getWeek(initialDayWeek);
    const nextSlots = this.getWeek(nextInitialWeek);

    return forkJoin([initialSlots, nextSlots]).pipe(
      map(([initial, next]) => {
        const slotGroup = [...initial, ...next];
        const currentSlots: BookSlot[] = getDaysBetween(
          slotGroup,
          date,
          nextWeek
        );
        const groupByDay = groupByDate(currentSlots, 'start');
        console.log('~ groupByDay', groupByDay);

        return groupByDay;
      })
    );
  }

  public retrieveWeek(direction: 'prev' | 'next'): void {
    const addDays = direction === 'prev' ? -7 : 7;
    const date = this.initialDate.setDate(this.initialDate.getDate() + addDays);

    this.initialDate = new Date(date);
  }

  private getWeek(target: Date): Observable<any[] | BookSlot[]> {
    return this.bookSlotRepository.getByWeek(target);
  }
}
