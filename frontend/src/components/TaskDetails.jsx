/**
 * TaskDetails Component
 * Mostra os detalhes completos da tarefa selecionada
 */

import './TaskDetails.css';

export function TaskDetails({ task, onToggle, onDelete }) {
  if (!task) {
    return (
      <div className="task-details-empty">
        <div className="empty-icon">📋</div>
        <h2>Nenhuma tarefa selecionada</h2>
        <p>Selecione uma tarefa da lista para ver os detalhes</p>
      </div>
    );
  }

  const handleToggle = async () => {
    try {
      await onToggle(task.id, !task.completed);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja remover esta tarefa?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Erro ao remover tarefa:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não definida';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="task-details">
      <div className="task-details-header">
        <h2>Detalhes da Tarefa</h2>
        <div className="task-actions">
          <button
            className={`btn-toggle ${task.completed ? 'completed' : ''}`}
            onClick={handleToggle}
            title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          >
            {task.completed ? '✓ Concluída' : '○ Pendente'}
          </button>
          <button
            className="btn-delete-detail"
            onClick={handleDelete}
            title="Remover tarefa"
          >
            🗑️ Remover
          </button>
        </div>
      </div>

      <div className="task-details-content">
        <div className="detail-section">
          <label className="detail-label">Título</label>
          <h3 className={task.completed ? 'completed-text' : ''}>{task.title}</h3>
        </div>

        <div className="detail-section">
          <label className="detail-label">Data e Hora</label>
          <p className="detail-value">
            <span className="date-icon">📅</span>
            {formatDate(task.dueDate)}
          </p>
        </div>

        <div className="detail-section">
          <label className="detail-label">Descrição</label>
          <div className="description-box">
            {task.description ? (
              <p className="detail-value">{task.description}</p>
            ) : (
              <p className="detail-value empty">Sem descrição</p>
            )}
          </div>
        </div>

        <div className="detail-section">
          <label className="detail-label">Estado</label>
          <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? '✓ Concluída' : '⏳ Pendente'}
          </span>
        </div>

        <div className="detail-section">
          <label className="detail-label">Criada em</label>
          <p className="detail-value meta">{formatDate(task.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
