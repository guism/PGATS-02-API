# API de Transferências e Usuários

Esta API permite realizar operações de login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Estrutura de Diretórios

- `controllers/` — Lógica das rotas
- `services/` — Regras de negócio
- `models/` — Dados em memória
- `app.js` — Configuração da aplicação Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação Swagger

## Como Executar

```powershell
node server.js
```

Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

### Registro de Usuário
- `POST /users/register`
  - Campos obrigatórios: `username`, `password`
  - Não permite usuários duplicados
  - Campo opcional: `favorecido` (boolean)

### Login
- `POST /users/login`
  - Campos obrigatórios: `username`, `password`

### Consulta de Usuários
- `GET /users`

### Transferência
- `POST /transfer`
  - Campos obrigatórios: `from`, `to`, `amount`
  - Só permite transferências acima de R$ 5.000,00 para "favorecidos"

### Consulta de Transferências
- `GET /transfer`

## Regras de Negócio

- Login exige usuário e senha.
- Não é possível registrar usuários duplicados.
- Transferências para não favorecidos só podem ser realizadas se o valor for menor que R$ 5.000,00.

## Testes

Para testar a API, recomenda-se o uso do [Supertest](https://github.com/visionmedia/supertest) e [Jest](https://jestjs.io/).

## Observações

- Todos os dados são armazenados em memória e serão perdidos ao reiniciar o servidor.
- A API foi criada para fins de aprendizado e automação de testes.
