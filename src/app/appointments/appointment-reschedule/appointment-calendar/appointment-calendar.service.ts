import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  calendarInitialDate,
  groupByDate,
} from 'src/app/common/utils/dateUtils';
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
  public results$ = new BehaviorSubject<any>(null);

  constructor(private bookSlotRepository: BookSlotRepository) {}

  getWeekFromToday() {
    const initial = calendarInitialDate(new Date(2022, 2, 15, 11));
    console.log('~ initial', initial);
    const next = new Date(
      initial.setDate(initial.getDate() + this.WEEK_NUMBER)
    );

    const initialWeek = this.getWeek(initial);
    const nextWeek = this.getWeek(next);

    const results = forkJoin([initialWeek, nextWeek]).subscribe(
      ([initial, next]) => {
        const res = [...initial, ...next];
        console.log('~ res', res);
        return res;
      }
    );

    this.results$.next(results);
  }

  private isFirstDayOfWeek(date: Date) {
    return new Date(date).getDay() === 1;
  }

  private isBeforeToday(date: Date) {
    return new Date(date).getDate() < new Date().getDate();
  }
  // getNextWeek() {
  //   const date = this.initialDate.setDate(
  //     this.initialDate.getDate() + this.WEEK_NUMBER
  //   );
  // }

  getWeek(target: Date) {
    return this.bookSlotRepository.getByWeek(target);
  }
}
