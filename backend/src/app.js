/**
 * Express Application Setup
 * Configuração do servidor Express com todos os middlewares
 */

import express from 'express';
import cors from 'cors';
import { createTaskRoutes } from './presentation/routes/taskRoutes.js';
import { errorHandler, notFoundHandler } from './presentation/middlewares/errorHandler.js';

export function createApp(container, config) {
  const app = express();

  // Middlewares básicos
  app.use(cors({
    origin: config.corsOrigins,
    credentials: true
  }));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging em desenvolvimento
  if (config.env === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: config.env
    });
  });

  // Rotas da API
  const taskController = container.getTaskController();
  app.use('/api/tasks', createTaskRoutes(taskController));

  // Middlewares de erro (devem vir por último)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
