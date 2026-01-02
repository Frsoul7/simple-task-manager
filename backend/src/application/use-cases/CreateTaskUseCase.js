/**
 * Application Layer - Create Task Use Case
 * Caso de uso para criar uma nova tarefa
 */

import { Task } from '../../domain/entities/Task.js';

export class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskData) {
    try {
      // Converte dueDate se for string
      let dueDate = null;
      if (taskData.dueDate) {
        dueDate = typeof taskData.dueDate === 'string' 
          ? new Date(taskData.dueDate) 
          : taskData.dueDate;
      }

      // Cria a entidade Task
      const task = new Task({
        title: taskData.title,
        description: taskData.description || '',
        dueDate: dueDate,
        completed: taskData.completed || false
      });

      // Valida a entidade
      const validation = task.validate();
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // Persiste no repositório
      const createdTask = await this.taskRepository.create(task);

      return {
        success: true,
        data: createdTask
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar tarefa: ' + error.message
      };
    }
  }
}
