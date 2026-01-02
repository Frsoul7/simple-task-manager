/**
 * Presentation Layer - Task Routes
 * Define as rotas HTTP para tarefas
 */

import { Router } from 'express';

export function createTaskRoutes(taskController) {
  const router = Router();

  // Bind do contexto do controller para garantir que 'this' funcione corretamente
  router.get('/', (req, res) => taskController.getAll(req, res));
  router.post('/', (req, res) => taskController.create(req, res));
  router.put('/:id', (req, res) => taskController.update(req, res));
  router.delete('/:id', (req, res) => taskController.delete(req, res));

  return router;
}
