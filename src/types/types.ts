export interface TODO {
  id: number;
  task: string;
  isCompleted: boolean;
}

export interface TodoState {
  todos: TODO[];
}