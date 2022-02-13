import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RescheduleAppointmentComponent } from './appointments/reschedule-appointment/reschedule-appointment.component';

const routes: Routes = [
  { path: '', redirectTo: 'appointments/schedule', pathMatch: 'full' },
  {
    path: 'appointments/schedule',
    component: RescheduleAppointmentComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
