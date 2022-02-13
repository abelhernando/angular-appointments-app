import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentRescheduleComponent } from './appointments/appointment-reschedule/appointment-reschedule.component';

const routes: Routes = [
  { path: '', redirectTo: 'appointments/reschedule', pathMatch: 'full' },
  {
    path: 'appointments/reschedule',
    component: AppointmentRescheduleComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
