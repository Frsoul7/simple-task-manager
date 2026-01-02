/**
 * Infrastructure Layer - MongoDB Task Model
 * Schema do Mongoose para a coleção de tarefas
 */

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
    maxlength: [200, 'O título não pode ter mais de 200 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'A descrição não pode ter mais de 1000 caracteres'],
    default: ''
  },
  dueDate: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

// Transforma o _id do MongoDB para id
taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

export const TaskModel = mongoose.model('Task', taskSchema);
