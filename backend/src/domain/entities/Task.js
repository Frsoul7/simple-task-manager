/**
 * Domain Layer - Task Entity
 * Representa a entidade de negócio Task
 * Não possui dependências externas
 */

export class Task {
  constructor({ id, title, description = '', dueDate = null, completed = false, createdAt = new Date() }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  /**
   * Valida se a tarefa é válida
   * @returns {Object} { isValid: boolean, errors: string[] }
   */
  validate() {
    const errors = [];

    if (!this.title || this.title.trim() === '') {
      errors.push('O título da tarefa é obrigatório');
    }

    if (this.title && this.title.length > 200) {
      errors.push('O título não pode ter mais de 200 caracteres');
    }

    if (this.description && this.description.length > 1000) {
      errors.push('A descrição não pode ter mais de 1000 caracteres');
    }

    if (this.dueDate && !(this.dueDate instanceof Date) && isNaN(new Date(this.dueDate))) {
      errors.push('Data inválida');
    }

    if (typeof this.completed !== 'boolean') {
      errors.push('O campo completed deve ser um booleano');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Marca a tarefa como concluída
   */
  markAsCompleted() {
    this.completed = true;
  }

  /**
   * Marca a tarefa como não concluída
   */
  markAsIncomplete() {
    this.completed = false;
  }

  /**
   * Alterna o estado de conclusão
   */
  toggleCompleted() {
    this.completed = !this.completed;
  }

  /**
   * Converte a entidade para um objeto simples
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}
