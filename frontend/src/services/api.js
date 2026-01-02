/**
 * API Service
 * Centraliza todas as chamadas HTTP para a API
 * Single Responsibility Principle
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging em desenvolvimento
if (import.meta.env.DEV) {
  api.interceptors.request.use(
    (config) => {
      console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ Request error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log(`🟢 ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('❌ Response error:', error.response?.status, error.message);
      return Promise.reject(error);
    }
  );
}

/**
 * Task Service
 * Operações CRUD para tarefas
 */
export const taskService = {
  /**
   * Busca todas as tarefas
   */
  async getAll() {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Cria uma nova tarefa
   */
  async create(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Atualiza uma tarefa (toggle completed)
   */
  async update(id, updates) {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  },

  /**
   * Remove uma tarefa
   */
  async delete(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;
