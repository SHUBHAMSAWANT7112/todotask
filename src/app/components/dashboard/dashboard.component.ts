import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  
  editTaskData: string = '';
  addTaskData: string = '';
  searchTask: string = ''
   task : string = ''; 
   searchTable: string = '';
   searchResult : any = [];
   filteredTaskArr: Task[] = [];


  constructor(private api: TaskService) {}

  ngOnInit(): void {
    this.editTaskData = '';
    this.searchTask = ''
    this.addTaskData = '';
    this.taskObj = new Task();
    this.getAllTask();
  }

  addTask() {
    this.taskObj.task = this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskData = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  getAllTask() {
    this.taskObj.task = this.searchTask;
    this.api.getAllTask().subscribe({
      next: (v) => {
        this.taskArr = v;
        this.applyFilter();
        console.log(this.taskArr);
      },
    });
  }

  editTask() {
    this.taskObj.task = this.editTaskData;
    this.api.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.editTaskData = '';
      },
      (err) => {
        alert('Unable to edit task');
      }
    );
  }

  deleteTask(task: Task) {
    this.api.delete(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Unable to delete data');
      }
    );
  }

  callEdit(task: Task) {
    this.taskObj = task;
    this.editTaskData = task.task;
  }



  // applyFilter() {
  //   if (this.searchTable.trim() !== '') {
  //     this.filteredTaskArr = this.taskArr.filter(
  //       (data) =>
  //       data.task.toLowerCase().includes(this.searchTable.toLowerCase())
  //     );
  //   } else {
  //     this.filteredTaskArr = this.taskArr;
  //   }
  // }

  applyFilter(){
    if (this.searchTable.trim() !== '') {
      this.filteredTaskArr = this.taskArr.filter(
        (data) =>(
          data.task.toLowerCase().includes(this.searchTable.toLowerCase())
        )
      )
    }else{
      this.filteredTaskArr = this.taskArr
    }
  }
}
