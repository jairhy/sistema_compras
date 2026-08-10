const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const produtoController = require('./controller/produto.controller')
const usuarioController = require('./controller/usuario.controller')
const compraController = require('./controller/compra.controller')
const relatVwController = require('./controller/relatVW.controller')

// Carrega as associações entre os modelos (Usuário-Compras, Produto-Compras)
require('./models/rel')

const hostname = 'localhost' // 127.0.0.1
const PORT = 3000

// ------------ Middleware ----------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//--------------- Rotas --------------

// Rotas de Usuário (CRUD completo)
app.get('/usuarios', usuarioController.listar) // Listar todos
app.get('/usuarios/:id', usuarioController.consultar) // Consultar por id
app.post('/usuarios', usuarioController.cadastrar) // Cadastrar individual
app.put('/usuarios/:id', usuarioController.atualizar) // Atualizar por id
app.delete('/usuarios/:id', usuarioController.apagar) // Apagar por id
app.post('/usuarios/carga-lote', usuarioController.cargaLote) // Carga em lote via API DummyJSON

// Rotas de Produto (CRUD completo)
app.get('/produtos', produtoController.listar) // Listar todos
app.get('/produtos/:id', produtoController.consultar) // Consultar por id
app.post('/produtos', produtoController.cadastrar) // Cadastrar individual
app.put('/produtos/:id', produtoController.atualizar) // Atualizar por id
app.delete('/produtos/:id', produtoController.apagar) // Apagar por id
app.post('/produtos/carga-lote', produtoController.cargaLote) // Carga em lote via API DummyJSON

// Rotas de Compra (Movimentação de Estoque)
app.get('/compra', compraController.listar) // Histórico de movimentação completo
app.post('/compra', compraController.cadastrar)

// Rotas de Relatórios Analíticos (Views SQL Nativas)
app.get('/relatorio/produtos-criticos', relatVwController.listarHistoricoSaidas)
app.get('/relatorio/volume-compras', relatVwController.listarPorCategorias)

// Rota de Teste do Servidor
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!!!' })
})

// Rota de reset para testes: recria as tabelas vazias
app.post('/test/reset', async (req, res) => {
    try {
        await conn.sync({ force: true })
        res.status(200).json({ message: 'Banco de testes reiniciado com sucesso!' })
    } catch (err) {
        console.error('Erro ao resetar o banco de testes:', err)
        res.status(500).json({ message: 'Erro ao resetar o banco de testes' })
    }
})

// -------------- Server -------------
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados!', err)
    })

    