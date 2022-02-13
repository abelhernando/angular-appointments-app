import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  calendarInitialDate,
  getWeekDays,
} from 'src/app/common/utils/dateUtils';
import { AppointmentCalendarService } from './appointment-calendar.service';
import { BookSlot } from './book-slot';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss'],
})
export class AppointmentCalendarComponent implements OnInit {
  @Output() selectedDate = new EventEmitter();

  public calendarSlots$ = this.appointmentCalendarService.calendarSlots$;

  public daysOfWeek$ = new BehaviorSubject<Date[]>([]);

  public isBeforeToday = true;

  public isMinimized = true;

  public initialDate = null;

  public cn = this.getClassNames();

  constructor(private appointmentCalendarService: AppointmentCalendarService) {}

  ngOnInit(): void {
    this.initialDate = new Date();
    const daysofweek = getWeekDays(new Date());
    this.daysOfWeek$.next(daysofweek);

    this.calendarSlots$.subscribe();
  }

  public selectBookingDay(selected: BookSlot): void {
    this.selectedDate.emit(selected);
  }

  public retrieveWeek(direction: 'prev' | 'next'): void {
    const addDays = direction === 'prev' ? -7 : 7;
    const date = new Date(this.initialDate);
    const displayedDate = date.setDate(date.getDate() + addDays);

    this.setIsBeforeToday();
    this.initialDate = new Date(displayedDate);

    const daysofweek = getWeekDays(this.initialDate);
    this.daysOfWeek$.next(daysofweek);

    this.calendarSlots$ = this.appointmentCalendarService.getWeekFromToday(
      this.initialDate
    );
  }

  private setIsBeforeToday(): void {
    this.isBeforeToday =
      calendarInitialDate(new Date(this.initialDate)) <=
      calendarInitialDate(new Date());
  }

  public toggleTableVisibility(): void {
    this.isMinimized = !this.isMinimized;
  }

  private getClassNames(): {} {
    const rcn = 'appointment-calendar-container';
    return {
      root: rcn,
      navigation: `${rcn}__navigation`,
      navigationButton: `${rcn}__navigation--button`,
      expandButton: `${rcn}__expand-button__container`,
    };
  }
}
