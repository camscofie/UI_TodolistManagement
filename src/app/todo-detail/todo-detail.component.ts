import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent implements OnInit {
  @Input()
  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTodoLists();
  }

  getTodoLists() {
    const id = +this.route.snapshot.paramMap.get('id');
    const number = +this.route.snapshot.paramMap.get('number');
    this.todoService
      .getTodoFromList(id, number)
      .subscribe(todo => (this.todo = todo));
  }

  goBack(): void {
    this.location.back();
  }

  saveTodoDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.updateTodo(id, this.todo).subscribe(() => this.goBack());
  }
}
