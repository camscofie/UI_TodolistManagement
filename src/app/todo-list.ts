import { Todo } from './todo';

export class TodoList {
  id: number;
  title: string;
  color: 'BLUE' | 'RED' | 'GREEN' | 'ORANGE' | 'YELLOW' | 'STANDARD';
  todos: Todo[];
  priority: number;
}
