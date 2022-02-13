import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dayPipe',
})
export class DayPipe extends DatePipe implements PipeTransform {
  transform(value: Date): string {
    const targetDate = new Date(value).getDate();
    const today = new Date().getDate();
    const isTomorrow = targetDate  === today + 1

    if (targetDate === today) {
      return 'Today';
    } else if (isTomorrow) {
      return 'Tomorrow';
    }

    return super.transform(value, 'EE');
  }
}
