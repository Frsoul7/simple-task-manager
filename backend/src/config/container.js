/**
 * Dependency Injection Container
 * Configuração e injeção de dependências
 * Facilita testes e mantém o código desacoplado
 */

import { Database } from '../infrastructure/database/Database.js';
import { MongoTaskRepository } from '../infrastructure/database/repositories/MongoTaskRepository.js';
import { GetAllTasksUseCase } from '../application/use-cases/GetAllTasksUseCase.js';
import { CreateTaskUseCase } from '../application/use-cases/CreateTaskUseCase.js';
import { UpdateTaskUseCase } from '../application/use-cases/UpdateTaskUseCase.js';
import { DeleteTaskUseCase } from '../application/use-cases/DeleteTaskUseCase.js';
import { TaskController } from '../presentation/controllers/TaskController.js';

export class Container {
  constructor(config) {
    this.config = config;
    this._instances = {};
  }

  // Database
  getDatabase() {
    if (!this._instances.database) {
      this._instances.database = new Database(this.config.mongoUri);
    }
    return this._instances.database;
  }

  // Repository
  getTaskRepository() {
    if (!this._instances.taskRepository) {
      this._instances.taskRepository = new MongoTaskRepository();
    }
    return this._instances.taskRepository;
  }

  // Use Cases
  getGetAllTasksUseCase() {
    if (!this._instances.getAllTasksUseCase) {
      this._instances.getAllTasksUseCase = new GetAllTasksUseCase(
        this.getTaskRepository()
      );
    }
    return this._instances.getAllTasksUseCase;
  }

  getCreateTaskUseCase() {
    if (!this._instances.createTaskUseCase) {
      this._instances.createTaskUseCase = new CreateTaskUseCase(
        this.getTaskRepository()
      );
    }
    return this._instances.createTaskUseCase;
  }

  getUpdateTaskUseCase() {
    if (!this._instances.updateTaskUseCase) {
      this._instances.updateTaskUseCase = new UpdateTaskUseCase(
        this.getTaskRepository()
      );
    }
    return this._instances.updateTaskUseCase;
  }

  getDeleteTaskUseCase() {
    if (!this._instances.deleteTaskUseCase) {
      this._instances.deleteTaskUseCase = new DeleteTaskUseCase(
        this.getTaskRepository()
      );
    }
    return this._instances.deleteTaskUseCase;
  }

  // Controller
  getTaskController() {
    if (!this._instances.taskController) {
      this._instances.taskController = new TaskController({
        getAllTasksUseCase: this.getGetAllTasksUseCase(),
        createTaskUseCase: this.getCreateTaskUseCase(),
        updateTaskUseCase: this.getUpdateTaskUseCase(),
        deleteTaskUseCase: this.getDeleteTaskUseCase()
      });
    }
    return this._instances.taskController;
  }
}
