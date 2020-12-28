import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, pipe, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { __param } from 'tslib';
import { Task, Time } from '../model/booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit, OnDestroy {
  date = new Date();
  timeFrom: Time;
  timeTo: Time;
  selectedTask: Task;
  tasksObservable: Observable<Task[]>;
  createAnother: boolean;

  private paramSubscription: Subscription;

  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tasksObservable = this.bookingService.getTasks().pipe(
      tap((tasks) => {
        if (!tasks || tasks.length == 0) {
          $('#noTasksDialog').modal('show');
        }
      })
    );

    this.paramSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.date = this.getDateFromParam(params);

        this.bookingService.getLastBookingTime(this.date).subscribe((time) => {
          if (time) {
            this.timeFrom = time;
          }
        });
      }
    );
  }

  getDateFromParam(params: ParamMap) {
    let dateString = params.get('date');
    if (dateString) {
      let parsedDate = moment(dateString);
      if (parsedDate.isValid) {
        return parsedDate.toDate();
      }
    }
    return new Date();
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  adjustTimeFrom(amount: number | null) {
    this.timeFrom = this.adjustTime(this.timeTo, this.timeFrom, amount);
  }

  adjustTimeTo(amount: number | null) {
    this.timeTo = this.adjustTime(this.timeFrom, this.timeTo, amount);
  }

  private adjustTime(targetDate: Time, sourceDate: Time, amount: number): Time {
    if (!amount) {
      return null;
    }

    let time = sourceDate;
    if (!time) {
      time = targetDate;
    }

    if (!time) {
      return null;
    }

    let minutes = time.hour * 60 + time.minute;
    minutes += amount;

    return {
      hour: Math.floor(minutes / 60),
      minute: minutes % 60
    };
  }

  convertTime(value: string): Time {
    let parsedTime = moment(value, 'HH:mm');
    if (parsedTime.isValid) {
      return {
        hour: parsedTime.hour(),
        minute: parsedTime.minute()
      };
    }
    return null;
  }

  submit(event: Event) {
    event.preventDefault();
    this.bookingService
      .createBooking({
        fromTime: this.timeFrom,
        toTime: this.timeTo,
        date: this.date,
        task: this.selectedTask
      })
      .subscribe(() => {
        if (this.createAnother) {
          this.prepareNextBooking();
        } else {
          this.router.navigate([
            '/bookings',
            moment(this.date).format('YYYYMMD')
          ]);
        }
      });
  }

  private prepareNextBooking() {
    this.timeFrom = this.timeTo;
    this.timeTo = null;
  }

  changeDate(value: string) {
    this.date = moment(value).toDate();
  }
}
