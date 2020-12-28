import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BookingDay, TaskType } from '../model/booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit, OnDestroy {
  private daySubscription: Subscription;
  pauseType: TaskType = TaskType.Passive;
  bookingDay: BookingDay;
  loading: boolean = true;
  indicator: boolean = false;

  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let date = this.getDateFromParam(params);
      this.loadData(date);
    });
  }

  // TODO code duplication in booking-edit.component.ts
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
    this.daySubscription.unsubscribe();
  }

  navigateToday() {
    this.switchDate(moment());
  }

  navigate(type: 'day' | 'week', amount?: number) {
    this.switchDate(moment(this.bookingDay.date).add(amount, type));
  }

  navigateToDate(date: string) {
    this.switchDate(moment(date));
  }

  switchDate(date: moment.Moment) {
    if (date.isValid) {
      let datePath = date.format('YYYYMMD');
      this.router.navigate(['/bookings', datePath]);
    }
  }

  private loadData(date: Date) {
    if (this.daySubscription) {
      this.daySubscription.unsubscribe();
    }
    this.startLoading();
    this.daySubscription = this.bookingService
      .getBookingsForDay(date)
      .subscribe((bookingDay) => {
        this.bookingDay = bookingDay;
        this.loading = false;
        this.indicator = false;
      });
  }

  private startLoading() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading === true) {
        this.indicator = true;
      }
    }, 300);
  }

  removeItem(id: number) {
    this.startLoading();
    this.bookingService.removeBooking(id).subscribe(() => {
      this.loadData(this.bookingDay.date);
      this.loading = false;
      this.loading = false;
    });
  }
}
