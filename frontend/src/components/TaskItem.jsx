/**
 * TaskItem Component
 * Representa um item individual de tarefa
 * Presentational Component
 */

import './TaskItem.css';

export function TaskItem({ task, isSelected, onSelect, onToggle, onDelete }) {
  const handleToggle = async (e) => {
    e.stopPropagation(); // Evita trigger do select
    try {
      await onToggle(task.id, !task.completed);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Evita trigger do select
    if (window.confirm('Tem certeza que deseja remover esta tarefa?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Erro ao remover tarefa:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Marcar "${task.title}" como ${task.completed ? 'não concluída' : 'concluída'}`}
        />
        <div className="task-info">
          <span className="task-title">{task.title}</span>
          {task.dueDate && (
            <span className="task-date">📅 {formatDate(task.dueDate)}</span>
          )}
        </div>
      </div>
      <button
        className="btn-delete"
        onClick={handleDelete}
        aria-label={`Remover tarefa "${task.title}"`}
        title="Remover tarefa"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
}
