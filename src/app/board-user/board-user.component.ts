import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TaskService } from '../_services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  taskname = '';
  router: any;
  constructor(private userService: UserService, private taskService: TaskService) { }
  // constructor(private tutorialService: TutorialService) {}
  ngOnInit(): void {
    this.retrieveTasks();
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
 
    
  
    
  
  
    retrieveTasks(): void {
      this.taskService.getAll().subscribe({
        next: (data) => {
          this.tasks = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  
    refreshList(): void {
      this.retrieveTasks();
      this.currentTask = {};
      this.currentIndex = -1;
    }
  
    setActiveTask(task: Task, index: number): void {
      this.currentTask = task;
      this.currentIndex = index;
    }
  
    removeAllTasks(): void {
      this.taskService.deleteAll().subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
    }
    deleteTask(id:string): void {
      this.taskService.delete(id).subscribe({
        next: (res) => {
          console.log(res);
          // this.router.navigate(['/tasks']);
        },
        error: (e) => console.error(e)
      });
      this.refreshList();
    }
    
    // editTask(taskId: string) {
    //   this.router.navigate(['/tasks', taskId]);
    // }
  }
  
