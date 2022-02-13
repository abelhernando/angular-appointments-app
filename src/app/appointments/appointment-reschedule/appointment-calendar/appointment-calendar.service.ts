import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  calendarInitialDate,
  getDaysBetween,
  groupByDate,
} from 'src/app/common/utils/dateUtils';
import { BookSlot } from './book-slot';
import { BookSlotRepository } from './book-slot.repository';

// initialdate -> dia que requiere la api
// pedir nextweek si no es lunes
// partir desde hoy al septimo dia
@Injectable({
  providedIn: 'root',
})
export class AppointmentCalendarService {
  private initialDate = null;
  private WEEK_NUMBER = 7;

  constructor(private bookSlotRepository: BookSlotRepository) {}

  getWeekFromToday(date = new Date()) {
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

  private getWeek(target: Date) {
    return this.bookSlotRepository.getByWeek(target);
  }
}
