/**
 * Application Layer - Delete Task Use Case
 * Caso de uso para remover uma tarefa
 */

export class DeleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id) {
    try {
      // Verifica se a tarefa existe
      const existingTask = await this.taskRepository.findById(id);
      
      if (!existingTask) {
        return {
          success: false,
          error: 'Tarefa não encontrada'
        };
      }

      // Remove a tarefa
      await this.taskRepository.delete(id);

      return {
        success: true,
        message: 'Tarefa removida com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao remover tarefa: ' + error.message
      };
    }
  }
}
