  import { Injectable } from '@angular/core';
  import {
    BasicBooking,
    BasicTask,
    Booking,
    BookingDay,
    IdEntity,
    Task,
    TaskType,
    Time
  } from '../model/booking.model';

  import * as moment from 'moment';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class BookingService {
    private tasks: Task[] = [
      {
        id: 0,
        name: 'Task 1',
        type: TaskType.Active,
        bookingCount: 1
      },
      {
        id: 1,
        name: 'Task 2',
        type: TaskType.Passive,
        bookingCount: 1
      },
      {
        id: 2,
        name: 'Task 3',
        type: TaskType.Active,
        bookingCount: 0
      }
    ];

    private bookings: Booking[] = [
      {
        id: 0,
        date: new Date(),
        fromTime: {
          hour: 9,
          minute: 0
        },
        toTime: {
          hour: 10,
          minute: 0
        },
        task: this.tasks[0]
      },
      {
        id: 1,
        date: new Date(),
        fromTime: {
          hour: 10,
          minute: 0
        },
        toTime: {
          hour: 11,
          minute: 0
        },
        task: this.tasks[1]
      }
    ];

    private simulateDelay = true;

    constructor() {}

    getBookingsForDay(date: Date): Observable<BookingDay> {
      let filteredBookings = this.getBookingsForDayInternal(date);
      let worktime = this.calculateWorkTime(filteredBookings);

      return this.wrapAsObservable({
        date: date,
        bookings: filteredBookings,
        workTime: worktime
      });
    }

    private getBookingsForDayInternal(date: Date) {
      return this.bookings.filter((b) => this.compareDateOnly(date, b.date));
    }

    private compareDateOnly(dateA: Date, dateB: Date) {
      return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
      );
    }

    private calculateWorkTime(bookings: Booking[]): number {
      let totalMinutes = bookings
        .filter((x) => x.task.type == TaskType.Active)
        .map((x) => this.calculateTime(x))
        .reduce((a, b) => a + b, 0);
      return totalMinutes / 60;
    }

    private calculateTime(booking: Booking): number {
      let a = moment();
      let b = a.clone();

      a.hour(booking.fromTime.hour);
      a.minute(booking.fromTime.minute);
      a.second(0);

      b.hour(booking.toTime.hour);
      b.minute(booking.toTime.minute);
      b.second(0);

      return moment.duration(b.diff(a)).asMinutes();
    }

    removeBooking(id: number): Observable<void> {
      this.bookings.find((b) => b.id === id).task.bookingCount--;
      this.bookings = this.bookings.filter((b) => b.id !== id);
      return this.wrapAsObservable(null);
    }

    getLastBookingTime(date: Date): Observable<Time> {
      let filteredBookings = this.getBookingsForDayInternal(date);
      let timesSorted = filteredBookings
        .map((b) => b.toTime)
        .sort((a, b) => {
          return this.getTotalMinutes(a) - this.getTotalMinutes(b);
        });
      let lastTime = timesSorted.pop();
      return this.wrapAsObservable(lastTime);
    }

    private getTotalMinutes(t: Time): number {
      return t.hour * 60 + t.minute;
    }

    getTasks(): Observable<Task[]> {
      return this.wrapAsObservable(this.tasks);
    }

    private wrapAsObservable<T>(value: T): Observable<T> {
      return new Observable((observer) => {
        if (this.simulateDelay) {
          const coin = Math.round(Math.random() * 1);
          let timeout: number;
          if (coin == 0) {
            timeout = Math.random() * 500;
          } else {
            timeout = Math.random() * 1000;
          }

          setTimeout(() => {
            observer.next(value);
          }, timeout);
        } else {
          observer.next(value);
        }
      });
    }

    createBooking(booking: BasicBooking): Observable<void> {
      const nextId = this.getNextBookingId();
      const newBooking: Booking = {
        id: nextId,
        ...booking
      };
      this.bookings.push(newBooking);
      newBooking.task.bookingCount++;
      return this.wrapAsObservable(null);
    }

    private getNextBookingId() {
      return this.getNextIdFromArray(this.bookings);
    }

    private getNextTaskId() {
      return this.getNextIdFromArray(this.tasks);
    }

    private getNextIdFromArray(array: IdEntity[]) {
      return array.map((b) => b.id).reduce((a, b) => (a < b ? b : a), 0) + 1;
    }

    removeTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      return this.wrapAsObservable(null);
    }

    removeTaskForce(id: number) {
      // remove bookings referenced to this task id
      this.bookings = this.bookings.filter((b) => b.task.id !== id);
      // remove task
      this.removeTask(id);
      return this.wrapAsObservable(null);
    }

    createTask(task: BasicTask): Observable<void> {
      const nextId = this.getNextTaskId();
      const newTask: Task = {
        id: nextId,
        bookingCount: 0,
        ...task
      };
      this.tasks.push(newTask);
      return this.wrapAsObservable(null);
    }
  }
