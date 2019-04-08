import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoList } from '../todo-list';
import { Color } from '../color';
import { ColorService } from '../color.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newListTitle: string = '';
  todoLists: TodoList[] = [];
  color: string = null;
  colors: Color[];

  constructor(
    private todoService: TodoService,
    private colorService: ColorService
  ) {}

  ngOnInit() {
    this.getTodoLists();
    this.getColors();
  }

  getTodoLists(): void {
    this.todoService
      .getTodoLists()
      .subscribe(todoLists => (this.todoLists = todoLists));
  }

  addList(): void {
    this.newListTitle = this.newListTitle.trim();
    if (!this.newListTitle) {
      return;
    }
    this.todoService
      .addTodoList({ title: this.newListTitle, color: this.color } as TodoList)
      .subscribe(todoList => {
        this.todoLists.push(todoList);
        this.newListTitle = '';
      });
  }

  getColors() {
    this.colorService.getColors().subscribe(colors => (this.colors = colors));
  }

  setColor(color: Color) {
    this.color = color.code;
  }
}
