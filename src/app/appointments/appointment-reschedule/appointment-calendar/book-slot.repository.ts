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
        const dayToAdd = new Date(date);

        dayToAdd.setDate(date.getDate() + index);

        days.push(this.getByDate(dayToAdd));
      }
    }

    return forkJoin(days);
  }

  private retrieveFromCache(key: string) {
    return of(this.bookSlotCache.get(key)) as Observable<BookSlot[]>;
  }

  private getByDate(date: Date): Observable<BookSlot[]> {
    const current = new Date(date);
    const currentProxy = new Date(date)
    const initialDay = getWeekMondayByDate(currentProxy);
    const apiUrlSegment = formatDate(initialDay);
    const url = `${this.url}/GetWeeklySlots/${apiUrlSegment}`;
    
    if (this.bookSlotCache.has(formatDate(current))) {
      return this.retrieveFromCache(formatDate(current));
    }

    this.bookSlotCache.add(formatDate(current), []);

    return this.http.get(url).pipe(
      switchMap((slots: BookSlotDto[]) => slots),
      filter((slot) => {
        const date = new Date(slot.Start);
        const isSame = isSameDate(current, date);
        return isSame;
      }),
      map((slot) => this.bookSlotCreate(slot)),
      toArray(),
      tap({
        next: (response) => {
          if (response.length) {
            this.bookSlotCache.add(formatDate(response[0].start), response);
          }
        },
      })
    );
  }
}
