import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private url = `${environment.apiUrl}/availability`;

  constructor(private http: HttpClient) {}

  // TODO any
  public postBookDate(data: any) {
    const url = `${this.url}/BookSlot`;

    return this.http
      .post<any>(url, data)
      .pipe(map(() => console.log('Success rescheduling the appointment')));
  }
}
