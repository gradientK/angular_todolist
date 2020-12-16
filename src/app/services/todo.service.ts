import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http: HttpClient) { }

  /**
   * Get Todos
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  /**
   * Toggle Todo.Completed
   */
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    console.log('[PUT] Update completed: ' + url);
    return this.http.put(url, todo, httpOptions);
  }

  /**
   * Delete Todo
   */
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    console.log('[DEL] todo: ' + url);
    return this.http.delete<Todo>(url, httpOptions);
  }

  /**
   * Add Todo
   */
  addTodo(todo: Todo): Observable<Todo> {
    console.log('[POST] Add todo: ' + this.todosUrl);
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  /**
   * Update Save
   */
  updateSave(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    console.log('[PUT] todo: ' + url);
    return this.http.put<Todo>(url, todo, httpOptions);
  }

}
