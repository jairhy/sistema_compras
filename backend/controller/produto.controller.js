const Produto = require('../models/Produto')

// ---------- CRUD ----------

// Listar todos os produtos
const listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ order: [['codProduto', 'ASC']] })
        res.status(200).json(produtos)
    } catch (err) {
        console.error('Erro ao listar produtos:', err)
        res.status(500).json({ message: 'Erro ao listar produtos' })
    }
}

// Consultar produto por id
const consultar = async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        res.status(200).json(produto)
    } catch (err) {
        console.error('Erro ao consultar produto:', err)
        res.status(500).json({ message: 'Erro ao consultar produto' })
    }
}

// Cadastrar produto individualmente
const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.nome || !valores.categoria || !valores.preco || !valores.qtdeEstoque) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, categoria, preco e qtdeEstoque!' })
    }
    try {
        const produto = await Produto.create({
            nome: valores.nome,
            descricao: valores.descricao,
            categoria: valores.categoria,
            preco: valores.preco,
            desconto: valores.desconto,
            qtdeEstoque: valores.qtdeEstoque,
            marca: valores.marca,
            imagem: valores.imagem
        })
        res.status(201).json(produto)
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err)
        res.status(500).json({ message: 'Erro ao cadastrar produto' })
    }
}

// Atualizar produto por id
const atualizar = async (req, res) => {
    const { id } = req.params
    const valores = req.body
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        await produto.update({
            nome: valores.nome ?? produto.nome,
            descricao: valores.descricao ?? produto.descricao,
            categoria: valores.categoria ?? produto.categoria,
            preco: valores.preco ?? produto.preco,
            desconto: valores.desconto ?? produto.desconto,
            qtdeEstoque: valores.qtdeEstoque ?? produto.qtdeEstoque,
            marca: valores.marca ?? produto.marca,
            imagem: valores.imagem ?? produto.imagem
        })
        res.status(200).json(produto)
    } catch (err) {
        console.error('Erro ao atualizar produto:', err)
        res.status(500).json({ message: 'Erro ao atualizar produto' })
    }
}

// Apagar produto por id
const apagar = async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        await produto.destroy()
        res.status(200).json({ message: 'Produto apagado com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar produto:', err)
        res.status(500).json({ message: 'Erro ao apagar produto' })
    }
}

// ---------- Carga em Lote (consome a API DummyJSON via FETCH no backend) ----------
const cargaLote = async (req, res) => {
    try {
        // 1. Consome os dados da API pública externa de produtos
        const respostaApi = await fetch('https://dummyjson.com/products')
        if (!respostaApi.ok) {
            return res.status(502).json({ message: 'Erro ao acessar a API externa DummyJSON!' })
        }
        const dadosExternos = await respostaApi.json()

        // 2. Trata os dados externos para inserção na tabela local
        const produtosMapeados = dadosExternos.products.map(item => ({
            nome: item.title,
            descricao: item.description,
            categoria: item.category,
            preco: item.price,
            desconto: item.discountPercentage,
            qtdeEstoque: item.stock,
            marca: item.brand,
            imagem: item.thumbnail
        }))

        // 3. Insere em lote usando bulkCreate
        await Produto.bulkCreate(produtosMapeados)
        res.status(201).json({
            message: `Carga em lote de ${produtosMapeados.length} produtos realizada com sucesso no banco!`
        })
    } catch (err) {
        console.error('Erro no bulkCreate de produtos:', err)
        res.status(500).json({ message: 'Erro ao salvar os produtos em lote no banco de dados' })
    }
}

module.exports = { listar, consultar, cadastrar, atualizar, apagar, cargaLote }
