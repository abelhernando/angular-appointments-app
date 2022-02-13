import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BookSlot, BOOK_SLOT_TOKEN } from './book-slot';
import { BookSlotCacheMemoryService } from '../../../shared/book-slot.cache.service';
import { formatDate } from '../../../common/utils/dateUtils';
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

  public getByWeek(startDate: Date): Observable<any[] | BookSlot[]> {
    const formattedDate = formatDate(startDate);

    const url = `${this.url}/GetWeeklySlots/${formattedDate}`;

    if (this.bookSlotCache.has(url)) {
      return of(this.bookSlotCache.get(url)) as Observable<BookSlot[]>;
    }

    return this.http.get(url).pipe(
      map((response: BookSlotDto[]) =>
        response.map((data) => this.bookSlotCreate(data))
      ),
      tap({
        next: (response) => this.bookSlotCache.add(formattedDate, response),
      }),
      catchError((error: Error) => {
        console.warn('Error on the HTTP request: ', error);
        return of([]);
      })
    );
  }
}
