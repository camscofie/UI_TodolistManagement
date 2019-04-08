import { Component, OnInit, Input } from '@angular/core';
import { TodoList } from '../todo-list';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todoList: TodoList;
  newTodoContent: string;

  constructor(
    private route: ActivatedRoute,
    protected todoService: TodoService,
    private router: Router
  ) {}

  protected getListId(): number {
    return this.todoList.id;
  }

  ngOnInit() {
    this.getTodoList(+this.route.snapshot.paramMap.get('id'));
  }

  getTodoList(id: number): void {
    this.todoService
      .getTodoList(id)
      .subscribe(todoList => (this.todoList = todoList));
  }

  /**
   * Adds a todo to the @param todoList with nun-existing content
   * @param todoList - The todo list of the added content
   * @param this.newTodoContent - The content of the todo list
   */
  addTodo(): void {
    this.newTodoContent = this.newTodoContent.trim();
    //Do nothing if content is empty or only consist of spaces
    if (!this.newTodoContent) {
      return;
    }
    //If a todo with the same content already exists ignore the new todo entry
    if (this.todoList.todos.find(todo => todo.content == this.newTodoContent)) {
      return;
    }
    this.todoService
      .addTodoToList(this.todoList.id, { content: this.newTodoContent } as Todo)
      .subscribe(todo => {
        this.todoList.todos.push(todo);
        //Reloading the todo list to refresh data
        this.getTodoList(this.getListId());
      });
  }

  delete(todo: Todo): void {
    this.todoList.todos = this.todoList.todos.filter(h => h !== todo);
    this.todoService.deleteTodoFromList(this.todoList.id, todo).subscribe();
  }

  set(todo: Todo): void {
    this.todoList.todos = this.todoList.todos.filter(h => h !== todo);
    this.todoService.markTodo(this.getListId(), todo).subscribe();
  }

  deleteList(): void {
    this.todoService.deleteTodoListSynchron(this.todoList.id).then(() => {
      this.router.navigate(['/todo-lists']);
    });
  }

  update() {
    this.todoService.updateTodoList(this.todoList).subscribe();
  }

  onFilterChange(event: boolean, todo: Todo) {
    if (event == true) {
      todo.done = true;
      this.todoService.markTodo(this.getListId(), todo).subscribe();
    } else {
      todo.done = false;
      this.todoService.unmarkTodo(this.getListId(), todo).subscribe();
    }
  }

  stop(event: Event) {
    event.stopPropagation();
  }
}
