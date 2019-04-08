import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { TodoList } from './todo-list';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoListUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /*Helping methods*/
  getTodoNumber(todo: Todo): number {
    return typeof todo === 'number' ? todo : todo.number;
  }
  //REQUESTS

  /* GET todos whose name contains search term */
  // This method only uses the list with the id 1/
  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      // if not search term, return empty todo array.
      return of([]);
    }
    return this.http
      .get<Todo[]>(`${this.todoListUrl}/1/todos/?content=${term}`)
      .pipe(
        tap(_ => this.log(`found todos matching "${term}"`)),
        catchError(this.handleError<Todo[]>('searchTodos', []))
      );
  }

  //GET REQUESTS

  /**
   * Returns all todo lists
   */
  getTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.todoListUrl).pipe(
      tap(_ => this.log(`fetched all todo lists`)),
      catchError(this.handleError<TodoList[]>('getTodoLists', []))
    );
  }

  /**
   * Returns a a todo list based on its ID
   * @param id - the ID of the todo list
   */
  getTodoList(id: number): Observable<TodoList> {
    const url = `${this.todoListUrl}/${id}`;
    return this.http.get<TodoList>(url).pipe(
      tap(_ => this.log(`fetched todo list with id=${id}`)),
      catchError(this.handleError<TodoList>('getTodoList'))
    );
  }
  /**
   * Returns a todo @param todoNumber from list @param todoNumber
   * @param listId - the ID of the list
   * @param todoNumber - to number of the todo
   */
  getTodoFromList(listId: number, todoNumber: number): Observable<Todo> {
    const url = `${this.todoListUrl}/${listId}/todos/${todoNumber}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ =>
        this.log(`fetched todo ${todoNumber} from todo list id=${listId}`)
      ),
      catchError(this.handleError<Todo>('getTodoFromList'))
    );
  }

  // PUT REQUESTS

  /**
   * Sends an update request for @param todoList
   * @param todoList - the todo list to update
   */
  updateTodoList(todoList: TodoList): Observable<TodoList> {
    const listId = typeof todoList === 'number' ? todoList : todoList.id;
    const url = `${this.todoListUrl}/${listId}`;
    return this.http.put(url, todoList, httpOptions).pipe(
      tap(_ => this.log(`updated todo list id=${todoList.id}`)),
      catchError(this.handleError<any>('updateTodoList'))
    );
  }
  /**
   * Updates a @param todo of a todo list
   * @param listId - the ID of the todo list
   * @param todo - the todo to update
   */
  updateTodo(listId: number, todo: Todo): Observable<any> {
    const url = `${this.todoListUrl}/${listId}/todos/${this.getTodoNumber(
      todo
    )}`;
    if (!todo.description) {
      todo.description = null;
    }
    return this.http.put(url, todo, httpOptions).pipe(
      tap(_ => this.log(`updated todo number=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  /**
   * Updates a todo to finishes
   * @param listId - the ID of the todo list
   * @param todo - the todo to finish
   */
  markTodo(listId: number, todo: Todo): Observable<any> {
    const url = `${this.todoListUrl}/${listId}/todos/${this.getTodoNumber(
      todo
    )}`;
    return this.http.patch(url, { done: todo.done }, httpOptions).pipe(
      tap(_ =>
        this.log(`updated todo number=${todo.number} in list id=${listId}`)
      ),
      catchError(this.handleError<any>('markTodo'))
    );
  }

  /**
   * Sets the status of a todo to unfinished
   * @param listId - the ID of the todo list
   * @param todo - the todo of the list
   */
  unmarkTodo(listId: number, todo: Todo): Observable<any> {
    const url = `${this.todoListUrl}/${listId}/todos/${this.getTodoNumber(
      todo
    )}`;
    return this.http.patch(url, { done: todo.done }, httpOptions).pipe(
      tap(_ =>
        this.log(`updated todo number=${todo.number} in list id=${listId}`)
      ),
      catchError(this.handleError<any>('unmarkTodo'))
    );
  }

  //Post requests //
  /**
   * Adds a new todo list
   * @param todoList The new list that should be added
   */
  addTodoList(todoList: TodoList): Observable<TodoList> {
    return this.http
      .post<TodoList>(this.todoListUrl, todoList, httpOptions)
      .pipe(
        tap(_ => this.log(`added todo list`)),
        catchError(this.handleError<any>('addTodoList'))
      );
  }
  /**
   * Adds a @param todo to the list @param id
   * The todo must contain a color and the content
   * @param id - the id of the todo list
   * @param todo - the todo that should be added
   */
  addTodoToList(id: number, todo: Todo): Observable<Todo> {
    const url = `${this.todoListUrl}/${id}/todos`;
    return this.http.post<Todo>(url, todo, httpOptions).pipe(
      tap((todo: Todo) =>
        this.log(`added todo with number=${todo.number} to todo list id=${id}`)
      ),
      catchError(this.handleError<Todo>('addTodoToList'))
    );
  }

  // DELETE REQUESTS: //
  /**
   * Delete a todo list with a specific @param id
   * @param id - the ID of the list
   */
  deleteTodoList(id: number): Observable<TodoList> {
    const url = `${this.todoListUrl}/${id}`;
    return this.http.delete<TodoList>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted todo list with id=${id}`)),
      catchError(this.handleError<TodoList>('deleteTodoList'))
    );
  }

  /**
   * Deletes a todo from the list and returns a promise when request is answered
   * @param id - the ID of the todo list
   */
  deleteTodoListSynchron(id: number) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.todoListUrl}/${id}`;
      this.http
        .delete(apiURL, httpOptions)
        .toPromise()
        .then(() => {
          resolve();
        });
    });
    return promise;
  }

  /**
   * Remove a specific todo from a specific list
   * @param todoListId - the id of the list
   * @param todo - the todo that should be removed
   */
  deleteTodoFromList(todoListId: number, todo: Todo): Observable<Todo> {
    const url = `${this.todoListUrl}/${todoListId}/todos/${this.getTodoNumber(
      todo
    )}`;
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${this.getTodoNumber(todo)}`)),
      catchError(this.handleError<Todo>('deleteTodoFromList'))
    );
  }

  // Error handling
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // for now, log to console instead

      this.errorLog(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(user: string): any {
    throw new Error('Method not implemented.');
  }

  private log(message: string) {
    this.messageService.logMessage(`TodoService: ${message}`);
  }

  private errorLog(message: string) {
    this.messageService.addError(`TodoService:  ${message}`);
  }
}
