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
    const url = `${this.todosUrl}${this.todosLimit}`;
    console.log('[GET] all todos: ' + url);
    return this.http.get<Todo[]>(url);
  }

  /**
   * Delete Todo
   */
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    console.log('[DELETE] todo: ' + url);
    return this.http.delete<Todo>(url, httpOptions);
  }

  /**
   * Toggle Completed
   */
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    console.log('[PUT] update todo status: ' + url);
    return this.http.put(url, todo, httpOptions);
  }
}
