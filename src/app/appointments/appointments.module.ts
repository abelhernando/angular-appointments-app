import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentRescheduleComponent } from './appointment-reschedule/appointment-reschedule.component';
import { AppointmentCalendarComponent } from './appointment-reschedule/appointment-calendar/appointment-calendar.component';
import { MatButtonModule } from '@angular/material/button';
import { BookSlot, BOOK_SLOT_TOKEN } from './appointment-reschedule/appointment-calendar/book-slot';
import { DayPipe } from '../shared/pipes/day.datepipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentBoxDateComponent } from './appointment-reschedule/appointment-box-date/appointment-box-date.component';
import { ShortDatePipe } from '../shared/pipes/shortDate.datepipe';
import { TimePipe } from '../shared/pipes/time.datepipe';

@NgModule({
  declarations: [
    AppointmentRescheduleComponent,
    AppointmentCalendarComponent,
    DayPipe,
    TimePipe,
    ShortDatePipe,
    AppointmentBoxDateComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: BOOK_SLOT_TOKEN,
      useValue: BookSlot.create,
    },
  ],
})
export class AppointmentsModule {}
