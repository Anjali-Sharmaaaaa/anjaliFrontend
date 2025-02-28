import { Component } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddtaskComponent {
  task: Task = {
    taskname: '',
    description: '',
    status: false
  };
  submitted = false;

  constructor(private taskService: TaskService) {}

  saveTask(): void {
    const data = {
      taskname: this.task.taskname,
      description: this.task.description
    };

    this.taskService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      taskname: '',
      description: '',
      status: false
    };
  }
}