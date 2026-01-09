<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">CRUD NestJS</h1>

Projeto básico criado para fins de estudo do framework **NestJS**.

Estou seguindo a documentação oficial (https://docs.nestjs.com/) e aplicando conceitos como:
- **DTOs (Data Transfer Objects):** Utilizados para validar os dados que chegam na API (via `class-validator`) e garantir a tipagem correta antes de processá-los.
- **Entities (TypeORM):** Mapeamento direto das classes TypeScript para as tabelas do Banco de Dados (Code First).
- **Dependency Injection:** Uso do sistema nativo do NestJS para gerenciar as dependências entre Controllers e Services, facilitando testes e manutenção.
- **Repository Pattern:** Abstração da camada de acesso a dados, permitindo que o Service foque apenas nas regras de negócio.
- **Migrations:** Controle de versão do esquema do banco de dados, permitindo evolução segura da estrutura das tabelas.

O objetivo é criar uma API RESTful para gerenciamento de carros (CRUD), seguindo as melhores práticas, estrutura e a documentação oficial do NestJS.

## 🚀 Como rodar
### 1. Clone o repositório
```bash
git clone https://github.com/1thiagoCRUZ/crud-nestjs.git
cd crud-nestjs
```
### 2. Instale as dependências:
```bash
npm install
```

### 3. Crie um arquivo .env na raiz do projeto e configure a conexão com seu banco de dados
```bash
DATABASE_URL=stringdeconexao
```
### 4. Banco de Dados (Migrations)
O projeto utiliza Migrations para gerenciar o banco. Para criar as tabelas:
```bash
# Roda as migrations pendentes
npm run migration:run
```

### 5. Inicie o servidor:
```bash
npm run start:dev
```
A API estará rodando em: http://localhost:3000 ou na porta que configurar no .env



## 🚗 Rotas disponíveis até agora

- **POST** `/cars` - Cria um novo carro.
- **GET** `/cars` - Lista todos os carros.
- **GET** `/cars/:id` - Busca um carro pelo ID.


