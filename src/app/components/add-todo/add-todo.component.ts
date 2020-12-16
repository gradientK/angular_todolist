import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  public title = '';  // input field for new Todo description
  emptyTitle = false;
  id = 6;             // app init with 5 fetched

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Add new Todo
   */
  onSubmit(): void {
    // Validate input field not empty
    if (this.title === '') {
      this.emptyTitle = true;
      console.log('Error when adding Todo: Description field empty');
    } else {
      // Add to all good to go
      const todo = {
        userId: 1,
        title: this.title,
        completed: false,
        id: this.id,
      };
      this.addTodo.emit(todo);    // Emit todo
      this.id++;                  // Increment id by 1
      this.emptyTitle = false;    // Update for empty field to false
      this.title = '';            // Clear input field
    }
  }

  /**
   * Cancel Add Todo
   */
  onCancel(): void {
    this.title = '';
    this.emptyTitle = false;
  }
}
