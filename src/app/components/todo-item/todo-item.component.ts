import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo();
  @Output() deleteTodoEmit: EventEmitter<Todo> = new EventEmitter();
  @Output() saveTodoEmit: EventEmitter<Todo> = new EventEmitter();

  editMode = false; // Used to signify when editing a Todo
  public tempTitle = '';   // Used to edit/save todo Title

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  /**
   * Set Dynamic Classes
   */
  setClasses(): any {  // What is the type class of 'classes'
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
   * onDelete Todo
   */
  onDelete(todo: Todo): void {
    this.deleteTodoEmit.emit(todo);
  }

  /**
   * OnEdit Todo
   */
  onEdit(todo: Todo): void {
    this.tempTitle = todo.title;
    this.editMode = true;
  }

  /**
   * onCancelEdit
   */
  onCancelEdit(todo: Todo): void {
    this.editMode = false; // Update UI
  }

  /**
   * onSave Todo
   */
  onSave(todo: Todo): void {
    this.editMode = false;  // Update UI
    this.todo.title = this.tempTitle; // Update Todo
    // Update Server
    this.todoService.updateSave(todo).subscribe(() => console.log(todo));
  }
}
