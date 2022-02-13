import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from './shared/loader.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppointmentsModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
