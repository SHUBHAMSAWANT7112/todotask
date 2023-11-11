import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: any[] = [];

  addTaskData: string = '';

  constructor(private api: TaskService) {}
  ngOnInit(): void {
    this.taskObj = new Task();
    this.getAllTask();
    this.taskArr=[];
  }
  addTask(task: Task) {
    this.api.addTask(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert(err);
      }
    );
  }
  getAllTask() {
    this.api.getAllTask().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('Unable to find task');
      }
    );
  }

  editTask() {
    this.api.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Unable to edit task');
      }
    );
  }

  delete(task: Task) {
    this.api.delete(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Unable to delete data');
      }
    );
  }
}
