import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu.component';
import { BookingListComponent } from './bookings/booking-list.component';
import { BookingEditComponent } from './bookings/booking-edit.component';
import { TaskListComponent } from './tasks/task-list.component';
import { TaskEditComponent } from './tasks/task-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { TimeToDatePipe } from './pipes/time-to-date.pipe';
import { TimeInputPrependComponent } from './utils/time-input-prepend.component';
import { FormsModule } from '@angular/forms';
import { TimeToStringPipe } from './pipes/time-to-string.pipe';
import { DateSwitcherDropdownComponent } from './utils/date-switcher-dropdown.component';
import { ModalComponent } from './utils/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BookingListComponent,
    BookingEditComponent,
    TaskListComponent,
    TaskEditComponent,
    SettingsComponent,
    TimeToDatePipe,
    TimeInputPrependComponent,
    TimeToStringPipe,
    DateSwitcherDropdownComponent,
    ModalComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
