import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  /**
   * Delete Todo
   */
  deleteTodoCall(event: Todo): void {
    // Update UI
    this.todos = this.todos.filter(t => t.id !== event.id);
    // Mock (because it's JSONPlaceholder) delete from server
    this.todoService.deleteTodo(event).subscribe();
  }

  /**
   * Add Todo
   */
  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe(t => {
      this.todos.push(todo);
    });
  }

}
