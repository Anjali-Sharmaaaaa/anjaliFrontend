import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // For getting the task ID from the URL
import { TaskService } from '../_services/task.service';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.css'
})
export class EdittaskComponent implements OnInit {
  task: Task = {
    taskname: '',
    description: '',
    status: false
  };
  submitted = false;
  taskId: string | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the task ID from the URL
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.getTask(this.taskId);
    }
  }

  getTask(id: string): void {
    this.taskService.get(id).subscribe({
      next: (data) => {
        this.task = data;
      },
      error: (e) => console.error('Error fetching task', e)
    });
  }

  updateTask(): void {
    if (this.taskId) {
      const updatedData = {
        taskname: this.task.taskname,
        description: this.task.description,
        status: this.task.status
      };

      this.taskService.update(this.taskId, updatedData).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    }
  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      taskname: '',
      description: '',
      status: false
    };
    this.router.navigate(['/addtask']); // Redirect to the "Add Task" page after updating
  }
}
