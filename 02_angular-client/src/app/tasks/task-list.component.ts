import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../bookings/booking.service';
import { Task, TaskType } from '../model/booking.model';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<Task[]>;
  pauseType = TaskType.Passive;
  selectedTaskId;
  loading = true;
  indicator = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadData();
  }

  deleteTask(event: Event, id: number, warn: boolean) {
    event.preventDefault();
    if (warn) {
      this.selectedTaskId = id;
      $('#forceDeleteConfirmDialog').modal('show');
    } else {
      this.bookingService.removeTask(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  foreDeleteTaskPreparation(id: number) {}

  foreDeleteTaskFinal(event: Event) {
    event.preventDefault();
    this.bookingService.removeTaskForce(this.selectedTaskId).subscribe(() => {
      this.selectedTaskId = -1;
      this.loadData();
      $('#forceDeleteConfirmDialog').modal('hide');
    });
  }

  loadData() {
    this.startLoading();
    this.tasks = this.bookingService.getTasks().pipe(
      tap((t) => {
        this.indicator = false;
        this.loading = false;
      })
    );
  }

  private startLoading() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading === true) {
        this.indicator = true;
      }
    }, 300);
  }
}
