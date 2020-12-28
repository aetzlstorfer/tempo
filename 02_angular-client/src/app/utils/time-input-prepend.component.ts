import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-input-prepend',
  templateUrl: './time-input-prepend.component.html',
  styleUrls: ['./time-input-prepend.component.scss']
})
export class TimeInputPrependComponent implements OnInit {
  items: number[] = [10, 15, 30, 45, 60, -10, -15, -30, -45, -60];

  @Output()
  public magicApplied = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  positiveItems(): number[] {
    return this.items
      .filter((i) => {
        return i > 0;
      })
      .sort();
  }

  negativeItems(): number[] {
    return this.items
      .filter((i) => {
        return i < 0;
      })
      .sort();
  }

  trigger(event: Event, amount?: number) {
    event.preventDefault();
    this.magicApplied.emit(amount);
  }
}
