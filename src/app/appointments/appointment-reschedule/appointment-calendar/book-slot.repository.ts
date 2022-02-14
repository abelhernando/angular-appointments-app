import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { filter, map, switchMap, tap, toArray } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { BookSlot, BOOK_SLOT_TOKEN } from './book-slot';
import { BookSlotCacheMemoryService } from '../../../shared/book-slot.cache.service';
import {
  formatDate,
  getWeekMondayByDate,
  isSameDate,
} from '../../../common/utils/dateUtils';
import { BookSlotCreate, BookSlotDto } from '../../appointments.models';

@Injectable({
  providedIn: 'root',
})
export class BookSlotRepository {
  private url = `${environment.apiUrl}/availability`;

  constructor(
    private http: HttpClient,
    private bookSlotCache: BookSlotCacheMemoryService,
    @Inject(BOOK_SLOT_TOKEN) private bookSlotCreate: BookSlotCreate
  ) {}

  public getRange(startDate: Date, range = 0): Observable<any> {
    const date = new Date(startDate);
    const days = [this.getByDate(date)];

    if (range) {
      for (let index = 1; index <= range; index++) {
        const dayToAdd = new Date(startDate);

        dayToAdd.setDate(date.getDate() + index);

        days.push(this.getByDate(dayToAdd));
      }
    }

    return forkJoin(days);
  }

  private getByDate(date: Date): Observable<BookSlot[]> {
    const current = new Date(date);
    const initialDay = getWeekMondayByDate(date);
    const apiUrlSegment = formatDate(initialDay);
    const url = `${this.url}/GetWeeklySlots/${apiUrlSegment}`;

    return this.http.get(url).pipe(
      switchMap((slots: BookSlotDto[]) => slots),
      filter((slot) => {
        const date = new Date(slot.Start);
        const isSame = isSameDate(current, date);
        return isSame;
      }),
      map((slot) => this.bookSlotCreate(slot)),
      toArray()
    );
  }

  // public getByWeek(startDate: Date): Observable<any[] | BookSlot[]> {
  //   const formattedDate = formatDate(startDate);

  //   const url = `${this.url}/GetWeeklySlots/${formattedDate}`;

  //   if (this.bookSlotCache.has(formattedDate)) {
  //     return of(this.bookSlotCache.get(formattedDate)) as Observable<BookSlot[]>;
  //   }

  //   return this.http.get(url).pipe(
  //     map((response: BookSlotDto[]) =>
  //       response.map((data) => this.bookSlotCreate(data))
  //     ),
  //     tap({
  //       next: (response) => this.bookSlotCache.add(formattedDate, response),
  //     }),
  //     catchError((error: Error) => {
  //       console.warn('Error on the HTTP request: ', error);
  //       return of([]);
  //     })
  //   );
  // }
}
