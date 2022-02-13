import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentRescheduleComponent } from './appointment-reschedule/appointment-reschedule.component';
import { AppointmentCalendarComponent } from './appointment-reschedule/appointment-calendar/appointment-calendar.component';
import { MatButtonModule } from '@angular/material/button';
import {
  BookSlot,
  BOOK_SLOT_TOKEN,
} from './appointment-reschedule/appointment-calendar/book-slot';
import { DayPipe } from '../shared/pipes/day.datepipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentBoxDateComponent } from './appointment-reschedule/appointment-box-date/appointment-box-date.component';

@NgModule({
  declarations: [
    AppointmentRescheduleComponent,
    AppointmentCalendarComponent,
    DayPipe,
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
