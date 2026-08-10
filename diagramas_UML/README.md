# 🛒 Sistema de Controle de Compras e Estoque

Sistema web completo para **gestão de compras, estoque e relatórios analíticos**, desenvolvido com **Node.js + Express + Sequelize (backend)** e **HTML + CSS + JavaScript puro (frontend)**, utilizando **MySQL** como banco de dados relacional.

---

## 📋 Sumário

1. [Visão Geral](#-visão-geral)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Estrutura de Pastas](#-estrutura-de-pastas)
4. [Modelagem de Dados](#-modelagem-de-dados)
5. [Requisitos Funcionais](#-requisitos-funcionais)
6. [Requisitos Não Funcionais](#-requisitos-não-funcionais)
7. [Regras de Negócio](#-regras-de-negócio)
8. [API - Endpoints](#-api---endpoints)
9. [Como Executar o Projeto](#-como-executar-o-projeto)
10. [Explicação Detalhada do Código](#-explicação-detalhada-do-código)

---

## 🚀 Visão Geral

O sistema permite o gerenciamento completo de:

- **Usuários** — CRUD completo (cadastrar, listar, consultar, atualizar, apagar) + carga em lote via API externa DummyJSON.
- **Produtos** — CRUD completo + carga em lote via API externa DummyJSON.
- **Compras/Movimentações de Estoque** — Registro de entradas e saídas de produtos, com atualização automática do estoque.
- **Relatórios Analíticos** — Produtos críticos (estoque baixo) e volume financeiro de compras por produto, exibidos em tabelas e gráficos (Chart.js).
- **Dashboard** — Visualização de produtos em cards.

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Backend** | Node.js | — |
| **Backend** | Express | ^5.2.1 |
| **Backend** | Sequelize (ORM) | ^6.37.8 |
| **Backend** | mysql2 | ^3.23.2 |
| **Backend** | cors | ^2.8.6 |
| **Banco de Dados** | MySQL | 8.0+ |
| **Frontend** | HTML5 | — |
| **Frontend** | CSS3 | — |
| **Frontend** | JavaScript (Vanilla + Fetch API) | — |
| **Frontend** | Chart.js + Chartjs-plugin-datalabels | CDN |
| **Testes de API** | REST Client (VS Code) | — |

---

## 📁 Estrutura de Pastas

```
sistema_compra_web_inicial/
│
├── backend/                          # API Node.js (Express + Sequelize)
│   ├── .gitignore                    # Arquivos ignorados pelo Git
│   ├── index.js                      # Arquivo principal do servidor (rotas + middlewares)
│   ├── package.json                  # Dependências e scripts do projeto
│   ├── package-lock.json             # Lockfile das dependências
│   ├── sync.js                       # Script para recriar as tabelas do banco
│   ├── criarViews.js                 # Script para criar as Views SQL no MySQL
│   ├── teste.http                    # Arquivo de testes da API (REST Client)
│   │
│   ├── db/
│   │   └── conn.js                   # Configuração da conexão com o MySQL
│   │
│   ├── models/                       # Modelos Sequelize (mapeamento das tabelas)
│   │   ├── Usuario.js                # Modelo da tabela `usuarios`
│   │   ├── Produto.js                # Modelo da tabela `produtos`
│   │   ├── Compra.js                 # Modelo da tabela `compras`
│   │   ├── rel.js                    # Associações entre os modelos (FKs)
│   │   ├── VwProdutosCriticos.js     # Modelo da View `vw_produtos_criticos`
│   │   └── VwTotalCategoria.js       # Modelo da View `vw_volume_compras`
│   │
│   └── controller/                   # Controladores (lógica de negócio das rotas)
│       ├── usuario.controller.js     # CRUD de usuários + carga em lote
│       ├── produto.controller.js     # CRUD de produtos + carga em lote
│       ├── compra.controller.js      # Registro de compras/movimentações
│       └── relatVW.controller.js     # Relatórios analíticos (Views SQL)
│
├── frontend/                         # Frontend (HTML + CSS + JS puro)
│   ├── index.html                    # Página principal (menu de navegação)
│   │
│   ├── css/
│   │   ├── style.css                 # Estilos globais (menu, cards, gráficos)
│   │   └── style_cad.css             # Estilos de formulários e tabelas
│   │
│   ├── html/                         # Páginas HTML
│   │   ├── dashboard.html            # Dashboard de produtos (cards)
│   │   ├── usuario_cadastrar.html    # Cadastro de usuário (manual/lote)
│   │   ├── usuario_listar.html       # Listagem de usuários
│   │   ├── usuario_consultar.html    # Consulta de usuário por ID
│   │   ├── usuario_atualizar.html    # Atualização de usuário
│   │   ├── usuario_apagar.html       # Exclusão de usuário
│   │   ├── produto_cadastrar.html    # Cadastro de produto (manual/lote)
│   │   ├── produto_listar.html       # Listagem de produtos
│   │   ├── produto_consultar.html    # Consulta de produto por ID
│   │   ├── produto_atualizar.html    # Atualização de produto
│   │   ├── produto_apagar.html       # Exclusão de produto
│   │   ├── movimento_cadastrar.html  # Registro de compra/movimentação
│   │   ├── movimento_listar.html     # Histórico de movimentações
│   │   ├── relatorio_tabela.html     # Relatórios analíticos em tabelas
│   │   ├── mov_categoria_listar.html # Relatório gráfico (volume por categoria)
│   │   └── mov_historico_saida.html  # Relatório gráfico (produtos críticos)
│   │
│   └── js/                           # Scripts JavaScript de cada página
│       ├── dashboard.js              # Renderização dos cards de produtos
│       ├── usuario_cadastrar.js      # Lógica de cadastro de usuário
│       ├── usuario_listar.js         # Lógica de listagem de usuários
│       ├── usuario_consultar.js      # Lógica de consulta de usuário
│       ├── usuario_atualizar.js      # Lógica de atualização de usuário
│       ├── usuario_apagar.js         # Lógica de exclusão de usuário
│       ├── produto_cadastrar.js      # Lógica de cadastro de produto
│       ├── produto_listar.js         # Lógica de listagem de produtos
│       ├── produto_consultar.js      # Lógica de consulta de produto
│       ├── produto_atualizar.js      # Lógica de atualização de produto
│       ├── produto_apagar.js         # Lógica de exclusão de produto
│       ├── movimento_cadastrar.js    # Lógica de registro de movimentação
│       ├── movimento_listar.js       # Lógica de histórico de movimentações
│       ├── relatorio_tabela.js       # Lógica dos relatórios em tabela
│       ├── mov_categoria_listar.js   # Lógica do gráfico de volume por categoria
│       └── mov_historico_saida.js    # Lógica do gráfico de produtos críticos
│
└── diagramas_UML/                    # Dumps SQL do banco de dados
    ├── db_compras_usuarios.sql       # Estrutura + dados da tabela `usuarios`
    ├── db_compras_produtos.sql       # Estrutura + dados da tabela `produtos`
    ├── db_compras_compras.sql        # Estrutura da tabela `compras`
    ├── db_compras_vw_produtos_criticos.sql  # Estrutura da View `vw_produtos_criticos`
    ├── db_compras_vw_volume_compras.sql     # Estrutura da View `vw_volume_compras`
    └── db_compras_routines.sql       # Rotinas do banco (vazia)
```

---

## 🗄 Modelagem de Dados

### Tabela `usuarios`

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `codUsuario` | INT | PK, AUTO_INCREMENT | Código do usuário |
| `nome` | VARCHAR(50) | NOT NULL | Primeiro nome |
| `sobrenome` | VARCHAR(50) | NOT NULL | Sobrenome |
| `idade` | INT | NOT NULL | Idade |
| `email` | VARCHAR(100) | NOT NULL | E-mail |
| `telefone` | VARCHAR(20) | NULL | Telefone |
| `endereco` | VARCHAR(150) | NULL | Endereço |
| `cidade` | VARCHAR(50) | NULL | Cidade |
| `estado` | VARCHAR(50) | NULL | Estado |

### Tabela `produtos`

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `codProduto` | INT | PK, AUTO_INCREMENT | Código do produto |
| `nome` | VARCHAR(100) | NOT NULL | Nome do produto |
| `descricao` | TEXT | NULL | Descrição detalhada |
| `categoria` | VARCHAR(50) | NOT NULL | Categoria |
| `preco` | DECIMAL(10,2) | NOT NULL | Preço unitário |
| `desconto` | DECIMAL(5,2) | NULL | Percentual de desconto |
| `qtdeEstoque` | INT | NOT NULL | Quantidade em estoque |
| `marca` | VARCHAR(50) | NULL | Marca |
| `imagem` | VARCHAR(255) | NULL | URL da imagem |

### Tabela `compras`

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `codCompra` | INT | PK, AUTO_INCREMENT | Código da compra |
| `idUsuario` | INT | FK → `usuarios.codUsuario` | Usuário que comprou |
| `idProduto` | INT | FK → `produtos.codProduto` | Produto comprado |
| `tipoMovimento` | ENUM('ENTRADA','SAIDA') | NOT NULL | Tipo de movimentação |
| `quantidadeMovimentada` | INT | NOT NULL | Quantidade movimentada |
| `precoUnitario` | DECIMAL(10,2) | NOT NULL | Preço unitário no momento da compra |
| `descontoAplicado` | DECIMAL(5,2) | DEFAULT 0.00 | Desconto percentual aplicado |
| `precoFinal` | DECIMAL(10,2) | NOT NULL | Valor final calculado |
| `formaPagamento` | ENUM('DEBITO','CREDITO','DINHEIRO','PIX') | NOT NULL | Forma de pagamento |
| `statusCompra` | ENUM('PAGA','PENDENTE') | NOT NULL | Status da compra |
| `dataCompra` | DATE | NOT NULL | Data da compra |

### Views SQL

| View | Descrição |
|------|-----------|
| `vw_produtos_criticos` | Produtos com estoque menor que 10 unidades |
| `vw_volume_compras` | Volume financeiro e quantidade movimentada por produto (somente saídas) |

### Relacionamentos

```
Usuário 1 ──── N Compras
Produto 1 ──── N Compras
```

- `Usuario.hasMany(Compra)` — Um usuário pode ter várias compras.
- `Compra.belongsTo(Usuario)` — Cada compra pertence a um usuário.
- `Produto.hasMany(Compra)` — Um produto pode estar em várias compras.
- `Compra.belongsTo(Produto)` — Cada compra pertence a um produto.

---

## ✅ Requisitos Funcionais

### RF01 — Gerenciar Usuários
- **RF01.1** — O sistema deve permitir cadastrar um usuário individualmente informando nome, sobrenome, idade, e-mail, telefone, endereço, cidade e estado.
- **RF01.2** — O sistema deve permitir listar todos os usuários cadastrados.
- **RF01.3** — O sistema deve permitir consultar um usuário específico pelo seu ID.
- **RF01.4** — O sistema deve permitir atualizar os dados de um usuário existente.
- **RF01.5** — O sistema deve permitir excluir um usuário do banco de dados.
- **RF01.6** — O sistema deve permitir realizar **carga em lote** de usuários a partir da API externa **DummyJSON** (`https://dummyjson.com/users`).

### RF02 — Gerenciar Produtos
- **RF02.1** — O sistema deve permitir cadastrar um produto individualmente informando nome, descrição, categoria, preço, desconto, quantidade em estoque, marca e imagem.
- **RF02.2** — O sistema deve permitir listar todos os produtos cadastrados.
- **RF02.3** — O sistema deve permitir consultar um produto específico pelo seu ID.
- **RF02.4** — O sistema deve permitir atualizar os dados de um produto existente.
- **RF02.5** — O sistema deve permitir excluir um produto do banco de dados.
- **RF02.6** — O sistema deve permitir realizar **carga em lote** de produtos a partir da API externa **DummyJSON** (`https://dummyjson.com/products`).

### RF03 — Registrar Compras/Movimentações de Estoque
- **RF03.1** — O sistema deve permitir registrar uma movimentação de **ENTRADA** (reposição de estoque) ou **SAIDA** (venda/consumo).
- **RF03.2** — O sistema deve atualizar automaticamente a quantidade em estoque do produto após cada movimentação.
- **RF03.3** — O sistema deve calcular automaticamente o **preço final** da compra aplicando o desconto percentual informado.
- **RF03.4** — O sistema deve permitir listar o histórico completo de movimentações com dados do usuário e do produto.

### RF04 — Gerar Relatórios Analíticos
- **RF04.1** — O sistema deve exibir um relatório de **produtos críticos** (estoque menor que 10 unidades).
- **RF04.2** — O sistema deve exibir um relatório de **volume financeiro de compras** por produto (somente saídas), ordenado do maior para o menor valor.
- **RF04.3** — O sistema deve permitir visualizar os relatórios em formato de **tabela**.
- **RF04.4** — O sistema deve permitir visualizar os relatórios em formato de **gráfico de barras** (Chart.js).

### RF05 — Dashboard
- **RF05.1** — O sistema deve exibir um dashboard com os produtos em formato de **cards**, contendo imagem, nome, categoria, preço, estoque e marca.

### RF06 — Reset do Banco de Testes
- **RF06.1** — O sistema deve permitir recriar as tabelas do banco de dados (reset) para fins de teste.

---

## 🔒 Requisitos Não Funcionais

### RNF01 — Desempenho
- O sistema deve responder às requisições HTTP em tempo hábil (idealmente < 500ms para operações CRUD simples).
- A carga em lote deve utilizar `bulkCreate` do Sequelize para inserção eficiente de múltiplos registros.

### RNF02 — Segurança
- O backend deve utilizar o middleware **CORS** para permitir requisições do frontend.
- As rotas devem validar campos obrigatórios antes de realizar operações no banco.
- As credenciais do banco de dados devem estar centralizadas no arquivo de conexão (`db/conn.js`).

### RNF03 — Compatibilidade
- O frontend deve ser compatível com navegadores modernos (Chrome, Firefox, Edge).
- O backend deve ser compatível com Node.js 18+ (utiliza `fetch` nativo).

### RNF04 — Manutenibilidade
- O código deve ser organizado seguindo o padrão **MVC** (Models, Views/HTML, Controllers).
- Os modelos Sequelize devem mapear fielmente as tabelas do banco de dados.
- Os scripts de banco (`sync.js`, `criarViews.js`) devem ser executáveis separadamente.

### RNF05 — Portabilidade
- O sistema deve funcionar em ambiente Windows, Linux ou macOS.
- O banco de dados MySQL deve ser configurável no arquivo `db/conn.js`.

### RNF06 — Usabilidade
- O frontend deve possuir navegação intuitiva com menu centralizado.
- As mensagens de erro/sucesso devem ser exibidas de forma clara ao usuário.
- Os formulários devem possuir validação básica no cliente e no servidor.

### RNF07 — Documentação
- O projeto deve possuir este README com documentação completa.
- O arquivo `teste.http` deve conter exemplos de todas as requisições da API.

---

## 📌 Regras de Negócio

### RN01 — Campos Obrigatórios
- **Usuário**: nome, sobrenome, idade e e-mail são obrigatórios para cadastro.
- **Produto**: nome, categoria, preço e quantidade em estoque são obrigatórios para cadastro.
- **Compra**: idUsuario, idProduto, tipoMovimento, quantidadeMovimentada, formaPagamento, statusCompra e dataCompra são obrigatórios.

### RN02 — Validação de Existência
- Não é possível registrar uma compra para um **usuário inexistente** (retorna 404).
- Não é possível registrar uma compra para um **produto inexistente** (retorna 404).

### RN03 — Controle de Estoque
- Em uma movimentação de **ENTRADA**, a quantidade em estoque do produto é **incrementada**.
- Em uma movimentação de **SAIDA**, a quantidade em estoque do produto é **decrementada**.
- **Não é permitido** realizar uma saída com quantidade maior que o estoque disponível (retorna erro 400: *"Quantidade insuficiente no estoque para esta saída!"*).

### RN04 — Tipos de Movimentação Válidos
- O campo `tipoMovimento` aceita apenas os valores **ENTRADA** ou **SAIDA**.
- Qualquer outro valor retorna erro 400: *"Tipo de Movimentação Inválida! Use ENTRADA ou SAIDA."*

### RN05 — Cálculo do Preço Final
- O preço final é calculado pela fórmula:
  ```
  valorBruto = quantidadeMovimentada × precoUnitario
  valorDesconto = valorBruto × (descontoAplicado / 100)
  precoFinal = valorBruto - valorDesconto
  ```
- O preço unitário é sempre recuperado do cadastro atual do produto.

### RN06 — Atualização Parcial (PATCH-like via PUT)
- As rotas de atualização (`PUT`) permitem enviar apenas os campos que se deseja alterar.
- Campos não enviados mantêm o valor atual do registro (usando operador `??`).

### RN07 — Carga em Lote
- A carga em lote consome a API pública **DummyJSON** diretamente do backend.
- Os dados externos são mapeados para a estrutura local antes da inserção.
- A inserção em lote utiliza `bulkCreate` do Sequelize.
- Se a API externa estiver indisponível, retorna erro 502.

### RN08 — Produtos Críticos
- Um produto é considerado **crítico** quando sua quantidade em estoque é **menor que 10 unidades**.
- O relatório de produtos críticos é gerado por uma **View SQL** (`vw_produtos_criticos`).

### RN09 — Relatório de Volume
- O relatório de volume financeiro considera **apenas movimentações de SAIDA**.
- O relatório é ordenado pelo **maior valor financeiro movimentado** (decrescente).
- O relatório limita a exibição aos **5 primeiros produtos** (TOP 5).

### RN10 — Integridade Referencial
- A exclusão de um usuário ou produto com compras associadas é feita em **CASCADE** (as compras relacionadas também são excluídas).

### RN11 — Formas de Pagamento
- As formas de pagamento aceitas são: **DÉBITO, CRÉDITO, DINHEIRO e PIX**.

### RN12 — Status da Compra
- Os status de compra aceitos são: **PAGA** e **PENDENTE**.

---

## 🔌 API - Endpoints

### Servidor
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Verifica se o servidor está rodando |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/:id` | Consulta usuário por ID |
| POST | `/usuarios` | Cadastra um usuário |
| PUT | `/usuarios/:id` | Atualiza um usuário |
| DELETE | `/usuarios/:id` | Apaga um usuário |
| POST | `/usuarios/carga-lote` | Carga em lote via DummyJSON |

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Consulta produto por ID |
| POST | `/produtos` | Cadastra um produto |
| PUT | `/produtos/:id` | Atualiza um produto |
| DELETE | `/produtos/:id` | Apaga um produto |
| POST | `/produtos/carga-lote` | Carga em lote via DummyJSON |

### Compras/Movimentações
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/compra` | Lista histórico de movimentações |
| POST | `/compra` | Registra uma movimentação |

### Relatórios
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/relatorio/produtos-criticos` | Produtos com estoque < 10 |
| GET | `/relatorio/volume-compras` | Volume financeiro por produto (TOP 5) |

### Testes
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/test/reset` | Recria as tabelas do banco (reset) |

---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- MySQL 8.0+ instalado e rodando
- VS Code (opcional, para usar o REST Client)

### Passo 1 — Configurar o Banco de Dados
1. Crie o banco de dados `db_compras` no MySQL:
   ```sql
   CREATE DATABASE db_compras;
   ```
2. Ajuste as credenciais no arquivo `backend/db/conn.js`:
   ```js
   const db = new Sequelize('db_compras', 'root', 'SUA_SENHA', {
       host: 'localhost',
       dialect: 'mysql',
       port: 3306
   })
   ```

### Passo 2 — Instalar as Dependências
```bash
cd backend
npm install
```

### Passo 3 — Sincronizar as Tabelas
```bash
npm run sync
```
> Este comando executa `node sync.js` e recria as tabelas `usuarios`, `produtos` e `compras`.

### Passo 4 — Criar as Views SQL
```bash
node criarViews.js
```
> Este comando cria as views `vw_produtos_criticos` e `vw_volume_compras`.

### Passo 5 — Iniciar o Servidor
```bash
npm start
```
> O servidor será iniciado em `http://localhost:3000`.

### Passo 6 — Abrir o Frontend
Abra o arquivo `frontend/index.html` no navegador ou utilize um servidor estático:
```bash
cd frontend
npx serve .
```

### Passo 7 — Testar a API (opcional)
Abra o arquivo `backend/teste.http` no VS Code com a extensão **REST Client** e clique em "Send Request" em cada bloco.

---

## 📖 Explicação Detalhada do Código

### Backend

#### `backend/index.js` — Servidor Principal
- Importa o Express, CORS, a conexão com o banco e os controladores.
- Carrega as associações entre modelos (`require('./models/rel')`).
- Configura middlewares: `express.urlencoded`, `express.json` e `cors`.
- Define todas as rotas da API.
- Sincroniza o banco (`conn.sync()`) e inicia o servidor na porta 3000.

#### `backend/db/conn.js` — Conexão com o Banco
- Cria uma instância do Sequelize apontando para o banco `db_compras`.
- Utiliza o dialeto `mysql` na porta 3306.

#### `backend/models/Usuario.js` — Modelo de Usuário
- Define a tabela `usuarios` com os campos: `codUsuario`, `nome`, `sobrenome`, `idade`, `email`, `telefone`, `endereco`, `cidade`, `estado`.
- `timestamps: false` — não cria colunas `createdAt`/`updatedAt`.

#### `backend/models/Produto.js` — Modelo de Produto
- Define a tabela `produtos` com os campos: `codProduto`, `nome`, `descricao`, `categoria`, `preco`, `desconto`, `qtdeEstoque`, `marca`, `imagem`.

#### `backend/models/Compra.js` — Modelo de Compra
- Define a tabela `compras` com os campos: `codCompra`, `idUsuario` (FK), `idProduto` (FK), `tipoMovimento` (ENUM), `quantidadeMovimentada`, `precoUnitario`, `descontoAplicado`, `precoFinal`, `formaPagamento` (ENUM), `statusCompra` (ENUM), `dataCompra`.

#### `backend/models/rel.js` — Associações
- Define os relacionamentos:
  - `Usuario.hasMany(Compra)` / `Compra.belongsTo(Usuario)`
  - `Produto.hasMany(Compra)` / `Compra.belongsTo(Produto)`
- Utiliza `onDelete: 'CASCADE'` para exclusão em cascata.

#### `backend/models/VwProdutosCriticos.js` — Modelo da View de Produtos Críticos
- Mapeia a view `vw_produtos_criticos` com os campos: `codigo_produto`, `nome`, `categoria`, `quantidade_atual`.

#### `backend/models/VwTotalCategoria.js` — Modelo da View de Volume
- Mapeia a view `vw_volume_compras` com os campos: `nome`, `quantidade_total_movimentada`, `valor_financeiro_movimentado`.

#### `backend/controller/usuario.controller.js` — Controlador de Usuários
- **`listar`**: Busca todos os usuários ordenados por `codUsuario` ASC.
- **`consultar`**: Busca um usuário por ID (`findByPk`). Retorna 404 se não existir.
- **`cadastrar`**: Valida campos obrigatórios e cria um usuário.
- **`atualizar`**: Busca o usuário, atualiza apenas os campos enviados (operador `??`).
- **`apagar`**: Busca e exclui o usuário.
- **`cargaLote`**: Consome `https://dummyjson.com/users`, mapeia os dados e insere em lote com `bulkCreate`.

#### `backend/controller/produto.controller.js` — Controlador de Produtos
- Mesma estrutura do controlador de usuários, aplicada à tabela `produtos`.
- **`cargaLote`**: Consome `https://dummyjson.com/products`, mapeia os dados e insere em lote com `bulkCreate`.

#### `backend/controller/compra.controller.js` — Controlador de Compras
- **`listar`**: Busca todas as compras com `include` dos modelos `Usuario` e `Produto` (dados completos do usuário e produto).
- **`cadastrar`**:
  1. Valida todos os campos obrigatórios.
  2. Verifica se o produto existe.
  3. Verifica se o usuário existe.
  4. Calcula a nova quantidade de estoque (ENTRADA soma, SAIDA subtrai).
  5. Valida se há estoque suficiente para SAIDA.
  6. Calcula o preço final com desconto.
  7. Atualiza o estoque do produto.
  8. Registra a compra na tabela `compras`.

#### `backend/controller/relatVW.controller.js` — Controlador de Relatórios
- **`listarPorCategorias`**: Executa query SQL nativa que agrupa as saídas por produto, soma quantidade e valor financeiro, ordena por valor decrescente e limita a 5 registros.
- **`listarHistoricoSaidas`**: Executa query SQL nativa que seleciona produtos com `qtdeEstoque < 10`.

#### `backend/sync.js` — Script de Sincronização
- Executa `conn.sync({ force: true })` para recriar as tabelas do banco.

#### `backend/criarViews.js` — Script de Criação de Views
- Cria (ou substitui) as views `vw_produtos_criticos` e `vw_volume_compras` no MySQL.

#### `backend/teste.http` — Testes da API
- Contém exemplos de todas as requisições: GET, POST, PUT, DELETE, carga em lote e relatórios.

---

### Frontend

#### `frontend/index.html` — Página Principal
- Menu de navegação centralizado com links para todos os módulos:
  - Dashboard
  - Usuários (Cadastrar, Listar, Consultar, Atualizar, Apagar)
  - Produtos (Cadastrar, Listar, Consultar, Atualizar, Apagar)
  - Operações (Registrar Compra, Histórico de Compras)
  - Relatórios (Analítico, Volume Gráfico, Críticos Gráfico)

#### `frontend/js/usuario_cadastrar.js`
- **Cadastro manual**: Envia `POST /usuarios` com nome e e-mail.
- **Carga em lote**: Envia `POST /usuarios/carga-lote` para o backend importar da DummyJSON.

#### `frontend/js/produto_cadastrar.js`
- **Cadastro manual**: Envia `POST /produtos` com nome, categoria, quantidade e preço.
- **Carga em lote**: Envia `POST /produtos/carga-lote` para o backend importar da DummyJSON.

#### `frontend/js/usuario_listar.js` / `produto_listar.js`
- Buscam os dados via `GET /usuarios` e `GET /produtos`.
- Renderizam os dados em tabelas HTML dinamicamente.

#### `frontend/js/usuario_consultar.js` / `produto_consultar.js`
- Buscam um registro específico via `GET /usuarios/:id` e `GET /produtos/:id`.
- Exibem os dados formatados na página.

#### `frontend/js/usuario_atualizar.js` / `produto_atualizar.js`
- Enviam `PUT /usuarios/:id` e `PUT /produtos/:id` com apenas os campos preenchidos.

#### `frontend/js/usuario_apagar.js` / `produto_apagar.js`
- Enviam `DELETE /usuarios/:id` e `DELETE /produtos/:id` após confirmação do usuário.

#### `frontend/js/movimento_cadastrar.js`
- Carrega os selects de usuários e produtos via `GET /usuarios` e `GET /produtos`.
- Envia `POST /compra` com os dados da movimentação.

#### `frontend/js/movimento_listar.js`
- Busca o histórico via `GET /compra`.
- Renderiza a tabela com dados do usuário, produto, tipo de movimento, quantidades, preços, pagamento, status e data.

#### `frontend/js/relatorio_tabela.js`
- Busca os dois relatórios em paralelo (`Promise.all`).
- Renderiza as tabelas de produtos críticos e volume financeiro.

#### `frontend/js/mov_categoria_listar.js`
- Busca `GET /relatorio/volume-compras`.
- Gera gráfico de barras horizontais (Chart.js) com o TOP 5 de volume financeiro.

#### `frontend/js/mov_historico_saida.js`
- Busca `GET /relatorio/produtos-criticos`.
- Gera gráfico de barras (Chart.js) com os produtos de estoque crítico.

#### `frontend/css/style.css`
- Estilos globais: fundo SkyBlue, menu centralizado, cards de produtos, container de gráficos, botões padronizados.

#### `frontend/css/style_cad.css`
- Estilos de formulários: inputs, botões, selects, tabelas e mensagens de resposta.

---

## 🧪 Fluxo de Uso Típico

1. **Inicializar o banco**: Execute `npm run sync` e `node criarViews.js` no backend.
2. **Iniciar o servidor**: Execute `npm start` no backend.
3. **Carga inicial**: Acesse a página de cadastro de usuários/produtos e clique em "Executar Carga em Lote" para popular o banco com dados da DummyJSON.
4. **Registrar movimentações**: Acesse "Registrar Compra", selecione usuário, produto, tipo de movimento, quantidade, pagamento e status.
5. **Visualizar relatórios**: Acesse os relatórios analíticos (tabelas) ou gráficos para acompanhar produtos críticos e volume financeiro.
6. **Gerenciar dados**: Utilize os módulos de CRUD para manter usuários e produtos atualizados.

---

## 📝 Licença

Este projeto está licenciado sob a licença **MIT**.

---

## 👨‍💻 Autor

**Jair** — Desenvolvimento do backend e integração com o banco de dados.