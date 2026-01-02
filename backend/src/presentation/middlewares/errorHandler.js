/**
 * Presentation Layer - Error Handling Middleware
 * Middleware global para tratamento de erros
 */

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: errors.join(', ') });
  }

  // Erro de cast do MongoDB (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Erro padrão
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
}

/**
 * Middleware para rotas não encontradas
 */
export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Rota não encontrada' });
}
