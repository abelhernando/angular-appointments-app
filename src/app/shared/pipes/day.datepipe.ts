import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dayPipe',
})
export class DayPipe extends DatePipe implements PipeTransform {
  transform(value: Date): string {
    console.log('~ value', value);
    if (new Date(value).getDate() === new Date().getDate()) {
      return 'Today';
    }

    return super.transform(value, 'EE');
  }
}
