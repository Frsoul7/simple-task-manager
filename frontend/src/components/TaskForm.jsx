/**
 * TaskForm Component
 * Formulário para adicionar novas tarefas
 * Controlled Component Pattern
 */

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskForm.css';

export function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação
    if (!title.trim()) {
      setError('Por favor, insira um título para a tarefa');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null
      };
      
      await onTaskAdded(taskData);
      
      // Limpa o formulário
      setTitle('');
      setDescription('');
      setDueDate(null);
    } catch (err) {
      setError(err.message || 'Erro ao adicionar tarefa');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group full-width">
          <input
            type="text"
            className={`task-input ${error ? 'error' : ''}`}
            placeholder="Título da tarefa..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            disabled={isLoading}
            maxLength={200}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group flex-grow">
          <textarea
            className="task-textarea"
            placeholder="Descrição (opcional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            maxLength={1000}
            rows={3}
          />
        </div>

        <div className="form-group date-group">
          <label htmlFor="dueDate" className="date-label">Data a realizar a tarefa</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="dd-MM-yyyy hh:mm aa"
            placeholderText="DD-MM-YYYY HH:MM AM/PM"
            className="task-date-input"
            disabled={isLoading}
            locale="pt"
            timeCaption="Hora"
          />
          <button 
            type="submit" 
            className="btn-add"
            disabled={isLoading || !title.trim()}
          >
            {isLoading ? 'Adicionando...' : '+ Adicionar'}
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
