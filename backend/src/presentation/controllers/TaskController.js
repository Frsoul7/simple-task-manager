/**
 * Presentation Layer - Task Controller
 * Controlador que recebe as requisições HTTP e chama os use cases
 * Separation of Concerns
 */

export class TaskController {
  constructor({ getAllTasksUseCase, createTaskUseCase, updateTaskUseCase, deleteTaskUseCase }) {
    this.getAllTasksUseCase = getAllTasksUseCase;
    this.createTaskUseCase = createTaskUseCase;
    this.updateTaskUseCase = updateTaskUseCase;
    this.deleteTaskUseCase = deleteTaskUseCase;
  }

  /**
   * GET /api/tasks - Lista todas as tarefas
   */
  async getAll(req, res) {
    try {
      const result = await this.getAllTasksUseCase.execute();

      if (!result.success) {
        return res.status(500).json({ error: result.error });
      }

      return res.status(200).json(result.data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * POST /api/tasks - Cria uma nova tarefa
   */
  async create(req, res) {
    try {
      const { title, description, dueDate, completed } = req.body;

      const result = await this.createTaskUseCase.execute({ 
        title, 
        description, 
        dueDate,
        completed 
      });

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      return res.status(201).json(result.data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * PUT /api/tasks/:id - Atualiza uma tarefa
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await this.updateTaskUseCase.execute(id, updateData);

      if (!result.success) {
        const statusCode = result.error.includes('não encontrada') ? 404 : 400;
        return res.status(statusCode).json({ error: result.error });
      }

      return res.status(200).json(result.data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
   * DELETE /api/tasks/:id - Remove uma tarefa
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await this.deleteTaskUseCase.execute(id);

      if (!result.success) {
        const statusCode = result.error.includes('não encontrada') ? 404 : 400;
        return res.status(statusCode).json({ error: result.error });
      }

      return res.status(200).json({ message: result.message });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
