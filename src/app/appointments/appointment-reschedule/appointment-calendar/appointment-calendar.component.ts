import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getMonday, getWeekDays, groupBy } from 'src/app/common/utils/dateUtils';
import { BookSlotRepository } from '../../bookSlot.repository';

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

  private currentMonday = null;

  public cn = this.getClassNames();

  constructor(private bookSlotRepository: BookSlotRepository) {}

  ngOnInit(): void {
    this.currentMonday = getMonday(new Date());
    const daysofweek = getWeekDays(this.currentMonday);
    this.daysOfWeek$.next(daysofweek);
    this.retrieveBookSlots();
  }

  private retrieveBookSlots() {
    // TODO start always in today
    this.getBookSlots();
  }

  public getBookSlots() {
    this.bookSlotRepository
      .getByWeek(this.currentMonday)
      .pipe()
      .subscribe((response) => {
        const result = groupBy(response, (res) => {
          return new Date(res.start).getDay();
        });
        this.calendarDates$.next(result);
        const daysofweek = getWeekDays(this.currentMonday);
        this.daysOfWeek$.next(daysofweek);
      });
  }

  public selectBookingDay(selected: any): void {
    this.selectedDate.emit(selected);
  }

  public retrieveWeek(direction: 'prev' | 'next'): void {
    let date: string;
    if (direction === 'prev') {
      date = this.currentMonday.setDate(this.currentMonday.getDate() - 7);
    } else {
      date = this.currentMonday.setDate(this.currentMonday.getDate() + 7);
    }

    this.isBeforeToday = new Date(this.currentMonday) < new Date();
    this.currentMonday = new Date(date);
    this.retrieveBookSlots();
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
