import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { CalendarComponent } from './reschedule-appointment/calendar/calendar.component';
import { MatButtonModule } from '@angular/material/button';
import { BookSlot, BOOK_SLOT_TOKEN } from './BookSlot';
import { DayPipe } from '../shared/pipes/day.datepipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentBoxDateComponent } from './reschedule-appointment/appointment-box-date/appointment-box-date.component';
import { ShortDatePipe } from '../shared/pipes/shortDate.datepipe';
import { TimePipe } from '../shared/pipes/time.datepipe';

@NgModule({
  declarations: [
    RescheduleAppointmentComponent,
    CalendarComponent,
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
