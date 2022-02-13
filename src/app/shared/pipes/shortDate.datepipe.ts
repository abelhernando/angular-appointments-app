import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'shortDatePipe',
})
export class ShortDatePipe extends DatePipe implements PipeTransform {
  transform(value: Date): string {
    return super.transform(value, 'MMM d');
  }
}
