/**
 * Infrastructure Layer - MongoDB Task Repository Implementation
 * Implementa a interface ITaskRepository usando MongoDB/Mongoose
 */

import { ITaskRepository } from '../../../domain/repositories/ITaskRepository.js';
import { Task } from '../../../domain/entities/Task.js';
import { TaskModel } from '../models/TaskModel.js';

export class MongoTaskRepository extends ITaskRepository {
  /**
   * Converte o documento do MongoDB para entidade Task
   */
  _toEntity(doc) {
    if (!doc) return null;
    
    return new Task({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      dueDate: doc.dueDate,
      completed: doc.completed,
      createdAt: doc.createdAt
    });
  }

  async findAll() {
    const docs = await TaskModel.find().sort({ createdAt: -1 });
    return docs.map(doc => this._toEntity(doc));
  }

  async findById(id) {
    const doc = await TaskModel.findById(id);
    return this._toEntity(doc);
  }

  async create(task) {
    const taskData = {
      title: task.title,
      description: task.description,
      completed: task.completed
    };
    
    // Só adiciona dueDate se existir
    if (task.dueDate) {
      taskData.dueDate = task.dueDate;
    }
    
    const doc = await TaskModel.create(taskData);
    return this._toEntity(doc);
  }

  async update(id, taskData) {
    const doc = await TaskModel.findByIdAndUpdate(
      id,
      { $set: taskData },
      { new: true, runValidators: true }
    );
    return this._toEntity(doc);
  }

  async delete(id) {
    const result = await TaskModel.findByIdAndDelete(id);
    return result !== null;
  }
}
