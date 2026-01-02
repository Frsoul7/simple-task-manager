/**
 * Domain Layer - Task Repository Interface
 * Define o contrato que a camada de infrastructure deve implementar
 * Princípio de Inversão de Dependência (Dependency Inversion Principle)
 */

export class ITaskRepository {
  /**
   * Busca todas as tarefas
   * @returns {Promise<Task[]>}
   */
  async findAll() {
    throw new Error('Method findAll() must be implemented');
  }

  /**
   * Busca uma tarefa por ID
   * @param {string} id 
   * @returns {Promise<Task|null>}
   */
  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  /**
   * Cria uma nova tarefa
   * @param {Task} task 
   * @returns {Promise<Task>}
   */
  async create(task) {
    throw new Error('Method create() must be implemented');
  }

  /**
   * Atualiza uma tarefa existente
   * @param {string} id 
   * @param {Partial<Task>} taskData 
   * @returns {Promise<Task|null>}
   */
  async update(id, taskData) {
    throw new Error('Method update() must be implemented');
  }

  /**
   * Remove uma tarefa
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Method delete() must be implemented');
  }
}
