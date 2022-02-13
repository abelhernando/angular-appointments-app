import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
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
  private WEEK_NUMBER = 7;
  public readonly calendarSlots$: Observable<any>;

  constructor(private bookSlotRepository: BookSlotRepository) {
    this.calendarSlots$ = this.getWeekFromToday();
  }

  public getWeekFromToday(
    date = new Date()
  ): Observable<Map<number, BookSlot[]>> {
    const newDate = new Date(date);
    const initialDayWeek = calendarInitialDate(newDate);

    const nextWeek = new Date(
      new Date(newDate).setDate(newDate.getDate() + this.WEEK_NUMBER)
    );
    const initialNextWeek = new Date(nextWeek);

    const nextInitialWeek = calendarInitialDate(nextWeek);

    const initialSlots = this.getWeek(initialDayWeek);
    const nextSlots = this.getWeek(nextInitialWeek);

    if (this.isFirstDayOfWeek(date)) {
      return initialSlots.pipe(
        map((response) => {
          return groupByDate(response, 'start');
        })
      );
    } else {
      return forkJoin([initialSlots, nextSlots]).pipe(
        map(([initial, next]) => {
          const slotGroup = [...initial, ...next];
          const currentSlots: BookSlot[] = getDaysBetween(
            slotGroup,
            initialDayWeek,
            initialNextWeek
          );
          const groupByDay = groupByDate(currentSlots, 'start');

          return groupByDay;
        })
      );
    }
  }

  private isFirstDayOfWeek(date: Date) {
    return new Date(date).getDay() === 1;
  }

  private getWeek(target: Date): Observable<any[] | BookSlot[]> {
    return this.bookSlotRepository.getByWeek(target);
  }
}
