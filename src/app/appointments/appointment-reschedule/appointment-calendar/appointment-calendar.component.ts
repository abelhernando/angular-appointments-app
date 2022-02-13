import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  calendarInitialDate,
  getWeekDays,
  groupByDate,
} from 'src/app/common/utils/dateUtils';
import { AppointmentCalendarService } from './appointment-calendar.service';
import { BookSlotRepository } from './book-slot.repository';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss'],
})
export class AppointmentCalendarComponent implements OnInit {
  @Output() selectedDate = new EventEmitter();

  public calendarDates$ = new BehaviorSubject<any>(null);

  public daysOfWeek$ = new BehaviorSubject<Date[]>([]);

  public isBeforeToday = true;

  public isMinimized = true;

  private initialDate = null;

  public cn = this.getClassNames();

  constructor(
    private bookSlotRepository: BookSlotRepository,
    private appointmentCalendarService: AppointmentCalendarService
  ) {}

  ngOnInit(): void {
    this.initialDate = calendarInitialDate(new Date());
    this.appointmentCalendarService.getWeekFromToday();
    // this.retrieveBookSlots();
  }

  private retrieveBookSlots() {
    this.bookSlotRepository
      .getByWeek(this.initialDate)
      .subscribe((response) => {
        const groupByDay = groupByDate(response, 'start');
        this.calendarDates$.next(groupByDay);
        const daysofweek = getWeekDays(this.initialDate);
        this.daysOfWeek$.next(daysofweek);
      });
  }

  public selectBookingDay(selected: any): void {
    this.selectedDate.emit(selected);
  }

  public retrieveWeek(direction: 'prev' | 'next'): void {
    const addDays = direction === 'prev' ? -7 : 7;
    const date = this.initialDate.setDate(this.initialDate.getDate() + addDays);

    this.setIsBeforeToday();
    this.initialDate = new Date(date);
    this.retrieveBookSlots();
  }

  private setIsBeforeToday() {
    this.isBeforeToday = new Date(this.initialDate) < new Date();
  }

  public toggleTableVisibility() {
    this.isMinimized = !this.isMinimized;
  }

  private getClassNames() {
    const rcn = 'appointment-calendar-container';
    return {
      root: rcn,
      navigation: `${rcn}__navigation`,
      navigationButton: `${rcn}__navigation--button`,
      expandButton: `${rcn}__expand-button__container`,
    };
  }
}
