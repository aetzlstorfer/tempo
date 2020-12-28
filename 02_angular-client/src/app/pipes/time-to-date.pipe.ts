import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../model/booking.model';
import * as moment from 'moment';

@Pipe({
  name: 'timeToDate'
})
export class TimeToDatePipe implements PipeTransform {
  transform(time: Time): Date {
    return moment().hour(time.hour).minute(time.minute).second(0).toDate();
  }
}
