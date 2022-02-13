import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { isSameDate } from 'src/app/common/utils/dateUtils';

@Pipe({
  name: 'dayPipe',
})
export class DayPipe extends DatePipe implements PipeTransform {
  transform(value: Date): string {
    const targetDate = new Date(value);
    const isToday = isSameDate(targetDate, new Date());
    const isTomorrow = isSameDate(
      targetDate,
      new Date(new Date().setDate(new Date().getDate() + 1))
    );

    if (isToday) {
      return 'Today';
    } else if (isTomorrow) {
      return 'Tomorrow';
    }

    return super.transform(value, 'EE');
  }
}
