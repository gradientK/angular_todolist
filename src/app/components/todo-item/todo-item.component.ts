import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo: Todo = new Todo();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  /**
   * Set Dynamic Classes
   */
  setClasses(): any {   // Could probably define type of 'classes' better
    const classes = {
      'todo-obj': true,
      'is-complete': this.todo.completed
    };

    return classes;
  }

  /**
   * onToggle
   */
  onToggle(todo: Todo): void {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(() => console.log(todo));
  }

  /**
   * onDelete
   */
  onDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }

}
