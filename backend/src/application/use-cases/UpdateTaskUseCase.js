/**
 * Application Layer - Update Task Use Case
 * Caso de uso para atualizar uma tarefa (toggle completed)
 */

export class UpdateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id, updateData) {
    try {
      // Verifica se a tarefa existe
      const existingTask = await this.taskRepository.findById(id);
      
      if (!existingTask) {
        return {
          success: false,
          error: 'Tarefa não encontrada'
        };
      }

      // Atualiza a tarefa
      const updatedTask = await this.taskRepository.update(id, updateData);

      return {
        success: true,
        data: updatedTask
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar tarefa: ' + error.message
      };
    }
  }
}
