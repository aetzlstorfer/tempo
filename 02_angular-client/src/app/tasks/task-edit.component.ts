import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../bookings/booking.service';
import { BasicTask, TaskType } from '../model/booking.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  task: BasicTask = {
    name: '',
    type: TaskType.Active
  };

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {}

  createTask(event: Event) {
    event.preventDefault();
    this.bookingService.createTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
