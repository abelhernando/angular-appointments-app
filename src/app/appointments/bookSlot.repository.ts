import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  BookSlotCreate,
  BookSlotDto,
  BOOK_SLOT_TOKEN,
} from './BookSlot';
import { BookSlotCacheMemoryService } from '../shared/book-slot.cache.service';
import { formatDate } from '../common/utils/dateUtils';

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

  // TODO format yyyyMMdd
  public getByWeek(startDate: Date): Observable<any> {
    // format date
    const formattedDate = formatDate(startDate);

    const url = `${this.url}/GetWeeklySlots/${formattedDate}`;

    if (this.bookSlotCache.has(url)) {
      return of(this.bookSlotCache.get(url));
    }

    return this.http.get(url).pipe(
      map((response: BookSlotDto[]) =>
        response.map((data) => this.bookSlotCreate(data))
      ),
      tap({
        next: (response) => this.bookSlotCache.add(url, response),
      }),
      catchError((error: Error) => {
        console.warn('Error on the HTTP request: ', error);
        return of([]);
      })
    );
  }
}
