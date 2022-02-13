import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-appointment-box-date',
  templateUrl: './appointment-box-date.component.html',
  styleUrls: ['./appointment-box-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentBoxDateComponent {
  @Input() reservationDate: Date;
  @Input() loading = false;
}
