import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingEditComponent } from './bookings/booking-edit.component';
import { BookingListComponent } from './bookings/booking-list.component';
import { SettingsComponent } from './settings/settings.component';
import { TaskEditComponent } from './tasks/task-edit.component';
import { TaskListComponent } from './tasks/task-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookings',
    pathMatch: 'full'
  },
  {
    path: 'bookings',
    component: BookingListComponent
  },
  {
    path: 'bookings/new',
    component: BookingEditComponent
  },
  {
    path: 'bookings/:date',
    component: BookingListComponent
  },
  {
    path: 'bookings/:date/new',
    component: BookingEditComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'tasks/new',
    component: TaskEditComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
