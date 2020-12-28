import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-switcher-dropdown',
  templateUrl: './date-switcher-dropdown.component.html',
  styleUrls: ['./date-switcher-dropdown.component.scss']
})
export class DateSwitcherDropdownComponent implements OnInit {
  @Input()
  private containerClasses: string;

  @Input()
  private buttonClasses: string;

  @Output()
  private changeDate: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeDateClick(event: Event, value: string) {
    event.preventDefault();
    this.changeDate.emit(value);
  }
}
