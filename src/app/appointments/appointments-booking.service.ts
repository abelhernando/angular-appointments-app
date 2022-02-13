import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { postBookDate } from './appointments.models';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private url = `${environment.apiUrl}/availability`;

  constructor(private http: HttpClient) {}

  public postBookDate(data: postBookDate) {
    const url = `${this.url}/BookSlot`;

    return this.http
      .post<postBookDate>(url, data)
      .pipe(map(() => console.log('Success rescheduling the appointment')));
  }
}
