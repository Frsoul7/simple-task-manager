/**
 * Infrastructure Layer - Database Connection
 * Configuração e conexão com MongoDB
 */

import mongoose from 'mongoose';

export class Database {
  constructor(uri) {
    this.uri = uri;
    this.isConnected = false;
  }

  async connect() {
    try {
      if (this.isConnected) {
        console.log('✓ Já conectado ao MongoDB');
        return;
      }

      await mongoose.connect(this.uri, {
        // Opções recomendadas
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      this.isConnected = true;
      console.log('✓ Conectado ao MongoDB com sucesso');

      // Event listeners
      mongoose.connection.on('error', (err) => {
        console.error('✗ Erro na conexão MongoDB:', err);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠ Desconectado do MongoDB');
        this.isConnected = false;
      });

    } catch (error) {
      console.error('✗ Erro ao conectar ao MongoDB:', error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (!this.isConnected) {
        return;
      }

      await mongoose.disconnect();
      this.isConnected = false;
      console.log('✓ Desconectado do MongoDB');
    } catch (error) {
      console.error('✗ Erro ao desconectar do MongoDB:', error.message);
      throw error;
    }
  }

  getConnection() {
    return mongoose.connection;
  }
}
