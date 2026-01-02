/**
 * Application Layer - Get All Tasks Use Case
 * Caso de uso para buscar todas as tarefas
 * Single Responsibility Principle
 */

export class GetAllTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute() {
    try {
      const tasks = await this.taskRepository.findAll();
      return {
        success: true,
        data: tasks
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao buscar tarefas: ' + error.message
      };
    }
  }
}
