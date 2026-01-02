/**
 * TaskList Component
 * Lista todas as tarefas e gerencia o estado
 * Container Component Pattern
 */

import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import './TaskList.css';

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // 'name', 'dueDate', 'createdAt'

  // Carrega as tarefas ao montar o componente
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se o servidor está rodando.');
      console.error('Erro ao carregar tarefas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks([newTask, ...tasks]); // Adiciona no início
      setSelectedTask(newTask); // Seleciona a nova tarefa
    } catch (err) {
      throw new Error('Erro ao adicionar tarefa');
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      const updatedTask = await taskService.update(id, { completed });
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
      // Atualiza a tarefa selecionada se for a mesma
      if (selectedTask?.id === id) {
        setSelectedTask(updatedTask);
      }
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
      // Limpa a seleção se a tarefa removida estava selecionada
      if (selectedTask?.id === id) {
        setSelectedTask(null);
      }
    } catch (err) {
      console.error('Erro ao remover tarefa:', err);
    }
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  // Filtrar tarefas baseado na pesquisa
  const filteredTasks = tasks.filter(task => {
    const searchLower = searchTerm.toLowerCase();
    return task.title.toLowerCase().includes(searchLower) ||
           (task.description && task.description.toLowerCase().includes(searchLower));
  });

  // Ordenar tarefas
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title, 'pt-PT');
      case 'dueDate':
        // Colocar tarefas sem data no final
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'createdAt':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Estatísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <>
      <div className="task-list-container">
        <header className="header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Minhas Tarefas</h1>
          {totalTasks > 0 && (
            <div className="stats">
              <span className="stat">
                Total: <strong>{totalTasks}</strong>
              </span>
              <span className="stat pending">
                Pendentes: <strong>{pendingTasks}</strong>
              </span>
              <span className="stat completed">
                Concluídas: <strong>{completedTasks}</strong>
              </span>
            </div>
          )}
        </header>

        <TaskForm onTaskAdded={handleAddTask} />

        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={loadTasks} className="btn-retry">
              Tentar novamente
            </button>
          </div>
        )}

        {/* Controles de pesquisa e ordenação */}
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Pesquisar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
                title="Limpar pesquisa"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="sort-box">
            <label htmlFor="sort">Ordenar por:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="createdAt">Data de Criação</option>
              <option value="dueDate">Data de Conclusão</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="task-list-sidebar">
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando tarefas...</p>
            </div>
          ) : sortedTasks.length === 0 ? (
            <div className="empty-state">
              {tasks.length === 0 ? (
                <>
                  <p>🎉 Nenhuma tarefa ainda!</p>
                  <p className="empty-subtitle">Adicione sua primeira tarefa acima</p>
                </>
              ) : (
                <>
                  <p>🔍 Nenhuma tarefa encontrada</p>
                  <p className="empty-subtitle">Tente outro termo de pesquisa</p>
                </>
              )}
            </div>
          ) : (
            <div className="tasks-grid">
              {sortedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isSelected={selectedTask?.id === task.id}
                  onSelect={() => handleSelectTask(task)}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="task-details-panel">
        <TaskDetails
          task={selectedTask}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </>
  );
}
