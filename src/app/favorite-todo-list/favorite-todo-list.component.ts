import { Component, OnInit } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-favorite-todo-list', // selector the component's CSS element selector
  templateUrl: '../todo-list/todo-list.component.html' // templateUrl the location of the component's template file.
})
export class FavoriteTodoListComponent extends TodoListComponent
  implements OnInit {
  ngOnInit() {
    this.getTodoLists();
  }

  //Change this method to the favorite users list! Needs user implentation first.
  getTodoLists() {
    this.todoService
      .getTodoLists()
      .subscribe(todoLists => (this.todoList = todoLists[0]));
  }
}
