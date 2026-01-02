# Aplicação de Gestão de Tarefas (To-Do List)

## 📋 Descrição do Desafio

Este é um desafio de desenvolvimento full stack que consiste em criar uma aplicação web completa para gestão de tarefas. A aplicação permite aos utilizadores adicionar, listar, marcar como concluída e remover tarefas de forma intuitiva e eficiente.

## 🎯 Objetivos

Desenvolver uma aplicação funcional que demonstre competências em:
- Desenvolvimento de APIs REST
- Integração com base de dados NoSQL
- Desenvolvimento de interfaces reativas com React
- Comunicação cliente-servidor
- Operações CRUD completas

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript server-side
- **Express.js** - Framework web minimalista e flexível para Node.js
- **MongoDB** - Base de dados NoSQL orientada a documentos
- **Mongoose** - ODM (Object Data Modeling) para MongoDB e Node.js

### Frontend
- **React** - Biblioteca JavaScript para construção de interfaces de utilizador
- **Vite** - Build tool moderna e rápida para desenvolvimento frontend
- **Axios** - Cliente HTTP baseado em promises para fazer requisições
- **React DatePicker** - Componente de seleção de data e hora customizado

### Ferramentas de Desenvolvimento
- **Nodemon** - Utilitário que monitora mudanças e reinicia o servidor automaticamente
- **CORS** - Middleware para permitir requisições cross-origin
- **dotenv** - Módulo para carregar variáveis de ambiente

<div align="center">
  <img src="docs/SS.png" alt="Screenshot da Aplicação" width="800">
</div>

## 📂 Estrutura do Projeto

```
projeto-tarefas/
│
├── backend/
│   ├── config/
│   │   └── db.js              # Configuração da conexão MongoDB
│   ├── models/
│   │   └── Task.js            # Modelo de dados Task
│   ├── controllers/
│   │   └── taskController.js  # Lógica de negócio
│   ├── routes/
│   │   └── taskRoutes.js      # Definição de rotas
│   ├── .env                   # Variáveis de ambiente
│   ├── .gitignore
│   ├── server.js              # Ponto de entrada do servidor
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList.jsx     # Container com pesquisa e ordenação
    │   │   ├── TaskList.css     # Estilos da lista
    │   │   ├── TaskItem.jsx     # Item individual com seleção
    │   │   ├── TaskItem.css     # Estilos do item
    │   │   ├── TaskForm.jsx     # Formulário com DatePicker
    │   │   ├── TaskForm.css     # Estilos do formulário
    │   │   ├── TaskDetails.jsx  # Painel de detalhes
    │   │   └── TaskDetails.css  # Estilos dos detalhes
    │   ├── services/
    │   │   └── api.js           # Serviços de API
    │   ├── App.jsx              # Layout grid principal
    │   ├── App.css              # Estilos globais
    │   └── main.jsx
    ├── .gitignore
    ├── package.json
    └── vite.config.js
```

## 🔧 Funcionalidades

### Backend (API REST)

#### Endpoints Disponíveis:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tasks` | Listar todas as tarefas |
| POST | `/api/tasks` | Criar nova tarefa |
| PUT | `/api/tasks/:id` | Atualizar tarefa (toggle completed) |
| DELETE | `/api/tasks/:id` | Remover tarefa |

#### Modelo de Dados (Task):
```javascript
{
  title: String,           // Título da tarefa (obrigatório, max 200 caracteres)
  description: String,     // Descrição detalhada da tarefa (opcional, max 1000 caracteres)
  dueDate: Date,          // Data e hora para realizar a tarefa (opcional)
  completed: Boolean,      // Estado de conclusão (default: false)
  createdAt: Date         // Data de criação (automático)
}
```

### Frontend (React)

#### Componentes Principais:
- **TaskForm**: Formulário com campos para título, descrição e seletor de data/hora customizado
- **TaskList**: Container com controles de pesquisa e ordenação, e lista scrollável de tarefas
- **TaskItem**: Componente individual de cada tarefa com highlight de seleção
- **TaskDetails**: Painel lateral com visualização detalhada da tarefa selecionada
- **App**: Componente principal com layout grid de duas colunas

#### Funcionalidades da Interface:
- ✅ Adicionar nova tarefa com título, descrição e data de realização
- 📅 Seleção de data e hora com calendário visual customizado
- 📋 Visualizar lista de todas as tarefas em layout de duas colunas
- 🔍 Pesquisar tarefas por título ou descrição em tempo real
- 📊 Ordenar tarefas por: Data de Criação, Data de Conclusão ou Nome (A-Z)
- 👁️ Visualização detalhada da tarefa selecionada no painel direito
- ☑️ Marcar/desmarcar tarefa como concluída (checkbox)
- 🗑️ Remover tarefa da lista
- 🔄 Atualização em tempo real
- 💅 Interface responsiva e intuitiva com scrollbar customizada

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (v14 ou superior)
- MongoDB instalado localmente ou conta no MongoDB Atlas
- npm ou yarn

### Backend

1. Navegar para a pasta do backend:
```bash
cd backend
```

2. Instalar dependências:
```bash
npm install
```

3. Criar ficheiro `.env` na raiz do backend:
```env
MONGODB_URI=mongodb://localhost:27017/tasks-db
# Ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasks-db
PORT=5000
```

4. Iniciar o servidor:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:5000`

### Frontend

1. Navegar para a pasta do frontend:
```bash
cd frontend
```

2. Instalar dependências:
```bash
npm install
```

3. Iniciar aplicação:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🧪 Testes

### Testar Backend (com curl ou Postman)

```bash
# Listar tarefas
GET http://localhost:5000/api/tasks

# Criar tarefa
POST http://localhost:5000/api/tasks
Body: { 
  "title": "Minha primeira tarefa",
  "description": "Descrição detalhada da tarefa",
  "dueDate": "2026-01-15T14:30:00.000Z"
}

# Atualizar tarefa
PUT http://localhost:5000/api/tasks/:id
Body: { "completed": true }

# Remover tarefa
DELETE http://localhost:5000/api/tasks/:id
```

### Backend
- Arquitetura MVC (Model-View-Controller)
- API RESTful design
- Operações CRUD completas
- Conexão e manipulação de base de dados NoSQL
- Middleware e tratamento de erros
- Variáveis de ambiente e configuração

### Frontend
- Componentização em React
- Hooks (useState, useEffect)
- Comunicação com API (axios)
- Gestão de estado
- Event handling
- Renderização condicional
- Formulários controlados

---

**Desenvolvido como desafio de Full Stack Developer**

*Tecnologias: Node.js | Express | MongoDB | React | Vite*
