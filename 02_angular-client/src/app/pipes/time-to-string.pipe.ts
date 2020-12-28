import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../model/booking.model';

import * as moment from 'moment';

@Pipe({
  name: 'timeToString'
})
export class TimeToStringPipe implements PipeTransform {
  transform(time: Time): string {
    if (time) {
      const timeValue = moment()
        .hour(time.hour)
        .minute(time.minute)
        .second(0)
        .format('HH:mm');
      return timeValue;
    }
    return '';
  }
}
