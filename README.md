# api-gerenciamento-de-tarefas
API de Tarefas

APi REST desenvolvida para a disciplina de Arquitetura e Desenvolvimento de APIs.

O sistema permite o cadastro de usúario, autenticação por JWT e gerenciamento de tarefas pessoais. Cada usúario possui acesso apenas ás próprias tarefas, garantindo controle de acesso e segurança dos dados.

Tecnologias Utilizadas

    Node.js
    Express.js
    Prisma ORM
    SQLite
    JWT(JSON Web Token)
    BcryptJS
    Swagger/OpenAPI

Funcianlidades

Autenticação

    Cadastro de usúrios
    Login com geração de token JWT

Gerenciamento de Tarefas

    Criar tafera
    Listar taferas
    Buscar tarefa por ID
    atuliazar tarefa
    Excluir tafera

Estrutura do Projeto

    api-gerenciamento-de-tarefas/
    │
    ├── prisma/
    │   ├── migrations/
    │   ├── dev.db
    │   └── schema.prisma
    │
    ├── src/
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   └── taskController.js
    │   │
    │   ├── middlewares/
    │   │   └── authMiddleware.js
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   └── taskRoutes.js
    │   │
    │   ├── app.js
    │   ├── server.js
    │   └── swagger.js
    │
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    └── README.md

Pré-requitos

Antes de executar o projeto é necessário possuir:

    Node.js instalado
    npm instalado

Instalação

Clone o repositório:

git clone https://github.com/Gustavo711738/api-gerenciamento-de-tarefas.git

Entre na pasta do projeto:

cd api-tarefas

Instale as dependências:

npm install

Configuração das Variáveis de Ambiente

Crie um arquivo .env baseado no .env.example.

Exemplo:

DATABASE_URL="file:./dev.db"
JWT_SECRET="minha_chave_secreta"
PORT=3000

Configuração do Banco de Dados

Executar as migrations:

npx prisma migrate dev
Gerar o Prisma Client:

npx prisma generate

Executando a Aplicação

Modo desenvolvimento:

npm run dev
Modo produção:

npm start
Servidor disponível em:

http://localhost:3000

Documentação Swagger

A documentação da API pode ser acessada em:

http://localhost:3000/docs

Autenticação

Após realizar login, será retornado um token JWT.

Exemplo:

{
  "token": "seu_token_jwt"
}
Utilize o token no cabeçalho:

Authorization: Bearer seu_token_jwt

Endpoints

Autenticação

Método	Endpoint	Descrição
POST /auth/register	Registrar usuário
POST /auth/login	Realizar login

Tarefas

Método	Endpoint	Descrição
GET	/tasks	Listar tarefas
GET	/tasks/:id	Buscar tarefa por ID
POST /tasks	Criar tarefa
PUT	/tasks/:id	Atualizar tarefa
DELETE /tasks/:id	Excluir tarefa

Exemplo de Requisição

Criar tarefa:

POST /tasks

{
  "titulo": "Estudar APIs",
  "descricao": "Finalizar atividade prática"
}

Resposta:

{
  "id": 1,
  "titulo": "Estudar APIs",
  "descricao": "Finalizar atividade prática",
  "status": "PENDENTE"
}

Banco de Dados

A aplicação utiliza SQLite para persistência dos dados e Prisma como ORM.

Relacionamento

    Um usuário pode possuir várias tarefas.
    Cada tarefa pertence a apenas um usuário.

Segurança

O sistema utiliza:

    Hash de senhas com BcryptJS
    Autenticação JWT
    Middleware de proteção de rotas
    Controle de acesso por usuário

Autor

Trabalho desenvolvido para a disciplina de Arquitetura e Desenvolvimento de APIs.
