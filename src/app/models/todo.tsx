export interface Todo {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  /*
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  tags ?: string[];
  createdAt: Date;
  updatedAt: Date;
  */
}