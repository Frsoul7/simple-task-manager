/**
 * Application Configuration
 * Centraliza todas as configurações da aplicação
 */

import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',

  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks-db',

  // CORS
  corsOrigins: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',') 
    : ['http://localhost:5173', 'http://localhost:3000']
};

/**
 * Valida se todas as configurações necessárias estão presentes
 */
export function validateConfig() {
  const requiredVars = ['MONGODB_URI'];
  const missingVars = [];

  requiredVars.forEach(varName => {
    if (!process.env[varName] && varName === 'MONGODB_URI') {
      console.warn(`⚠ ${varName} não definido, usando valor padrão`);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(`Variáveis de ambiente faltando: ${missingVars.join(', ')}`);
  }

  console.log('✓ Configurações validadas');
}
