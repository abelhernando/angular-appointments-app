import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timePipe',
})
export class TimePipe extends DatePipe implements PipeTransform {
  transform(value: Date): string {
    return super.transform(value, 'HH:mm');
  }
}
