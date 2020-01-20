export interface TodoList {
  userId: string;
  name: string;
  public: boolean;
  createdAt: any;
}

export interface TodoItem {
  todoListId: string;
  text: string;
  finished: boolean;
  createdAt: any;
}
