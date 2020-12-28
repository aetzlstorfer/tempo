import { BookingEditComponent } from '../bookings/booking-edit.component';

export interface IdEntity {
  id: number;
}

export enum TaskType {
  Active,
  Passive
}

export interface BasicTask {
  name: string;
  type: TaskType;
}

export interface Task extends BasicTask, IdEntity {
  bookingCount: number;
}

export interface Time {
  hour: number;
  minute: number;
}

export interface BasicBooking {
  task: Task;
  date: Date;
  fromTime: Time;
  toTime: Time;
}

export interface Booking extends BasicBooking, IdEntity {}

export interface BookingDay {
  date: Date;
  workTime: number;
  bookings: Booking[];
}
