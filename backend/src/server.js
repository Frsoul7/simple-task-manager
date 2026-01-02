/**
 * Server Entry Point
 * Ponto de entrada da aplicação
 * Inicializa o container DI, conecta ao banco e inicia o servidor
 */

import { config, validateConfig } from './config/config.js';
import { Container } from './config/container.js';
import { createApp } from './app.js';

async function startServer() {
  try {
    console.log('🚀 Iniciando servidor...\n');

    // Valida configurações
    validateConfig();

    // Cria o container de DI
    const container = new Container(config);

    // Conecta ao banco de dados
    const database = container.getDatabase();
    await database.connect();

    // Cria a aplicação Express
    const app = createApp(container, config);

    // Inicia o servidor
    const server = app.listen(config.port, () => {
      console.log(`\n✓ Servidor rodando na porta ${config.port}`);
      console.log(`✓ Ambiente: ${config.env}`);
      console.log(`✓ API disponível em http://localhost:${config.port}/api/tasks`);
      console.log(`✓ Health check em http://localhost:${config.port}/health\n`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n${signal} recebido. Encerrando servidor...`);
      
      server.close(async () => {
        console.log('✓ Servidor HTTP fechado');
        
        try {
          await database.disconnect();
          console.log('✓ Aplicação encerrada com sucesso\n');
          process.exit(0);
        } catch (error) {
          console.error('✗ Erro ao desconectar:', error);
          process.exit(1);
        }
      });
    };

    // Listeners para sinais de encerramento
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('✗ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();
