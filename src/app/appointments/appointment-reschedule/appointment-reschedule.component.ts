import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/loader.service';
import { BookingService } from '../appointments-booking.service';
import { BookSlot } from '../appointment-reschedule/appointment-calendar/book-slot';
import { postBookDate } from '../appointments.models';

@Component({
  selector: 'app-appointment-reschedule',
  templateUrl: './appointment-reschedule.component.html',
  styleUrls: ['./appointment-reschedule.component.scss'],
})
export class AppointmentRescheduleComponent implements OnInit {
  public selectedDate: BookSlot;
  public loading = false;

  public reservationDate = new Date('21 May 2022 10:30');

  constructor(
    private bookingService: BookingService,
    private loaderService: LoaderService
  ) {
    this.loaderService.isLoading.pipe(delay(0)).subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  ngOnInit(): void {}

  public setSelectedDate(slot: BookSlot): void {
    this.selectedDate = slot;
  }

  public confirmBookAction(): void {
    this.loaderService.setIsLoading(true);
    this.reservationDate = this.selectedDate.start;

    const data: postBookDate = {
      Start: this.selectedDate.start,
      End: this.selectedDate.end,
      Comments: 'Reschedule petition',
      Patient: {
        Name: 'John',
        SecondName: 'Doe',
        Email: 'john.doe@mail.net',
        Phone: '737177888',
      },
    };
    this.bookingService.postBookDate(data).subscribe();
    this.selectedDate = null;

    setTimeout(() => this.loaderService.setIsLoading(false), 1000);
  }
}
