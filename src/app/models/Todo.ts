export class Todo {
  public id!: number;         // id number assigned
  public title!: string;      // aka Description of ToDo
  public completed!: boolean; // has the Todo been accomplished

  constructor(
    id: number = 0,
    title: string = '',
    completed: boolean = false,
  ) {  }
}
