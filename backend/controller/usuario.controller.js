const Usuario = require('../models/Usuario')

// ---------- CRUD ----------

// Listar todos os usuários
const listar = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ order: [['codUsuario', 'ASC']] })
        res.status(200).json(usuarios)
    } catch (err) {
        console.error('Erro ao listar usuários:', err)
        res.status(500).json({ message: 'Erro ao listar usuários' })
    }
}

// Consultar usuário por id
const consultar = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao consultar usuário:', err)
        res.status(500).json({ message: 'Erro ao consultar usuário' })
    }
}

// Cadastrar usuário individualmente
const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.nome || !valores.sobrenome || !valores.idade || !valores.email) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, sobrenome, idade e email!' })
    }
    try {
        const usuario = await Usuario.create({
            nome: valores.nome,
            sobrenome: valores.sobrenome,
            idade: valores.idade,
            email: valores.email,
            telefone: valores.telefone,
            endereco: valores.endereco,
            cidade: valores.cidade,
            estado: valores.estado
        })
        res.status(201).json(usuario)
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err)
        res.status(500).json({ message: 'Erro ao cadastrar usuário' })
    }
}

// Atualizar usuário por id
const atualizar = async (req, res) => {
    const { id } = req.params
    const valores = req.body
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        await usuario.update({
            nome: valores.nome ?? usuario.nome,
            sobrenome: valores.sobrenome ?? usuario.sobrenome,
            idade: valores.idade ?? usuario.idade,
            email: valores.email ?? usuario.email,
            telefone: valores.telefone ?? usuario.telefone,
            endereco: valores.endereco ?? usuario.endereco,
            cidade: valores.cidade ?? usuario.cidade,
            estado: valores.estado ?? usuario.estado
        })
        res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err)
        res.status(500).json({ message: 'Erro ao atualizar usuário' })
    }
}

// Apagar usuário por id
const apagar = async (req, res) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        await usuario.destroy()
        res.status(200).json({ message: 'Usuário apagado com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar usuário:', err)
        res.status(500).json({ message: 'Erro ao apagar usuário' })
    }
}

// ---------- Carga em Lote (consome a API DummyJSON via FETCH no backend) ----------
const cargaLote = async (req, res) => {
    try {
        // 1. Consome os dados da API pública externa de usuários
        const respostaApi = await fetch('https://dummyjson.com/users')
        if (!respostaApi.ok) {
            return res.status(502).json({ message: 'Erro ao acessar a API externa DummyJSON!' })
        }
        const dadosExternos = await respostaApi.json()

        // 2. Trata os dados externos para inserção na tabela local
        const usuariosMapeados = dadosExternos.users.map(item => ({
            nome: item.firstName,
            sobrenome: item.lastName,
            idade: item.age,
            email: item.email,
            telefone: item.phone,
            endereco: item.address ? item.address.address : '',
            cidade: item.address ? item.address.city : '',
            estado: item.address ? item.address.state : ''
        }))

        // 3. Insere em lote usando bulkCreate
        await Usuario.bulkCreate(usuariosMapeados)
        res.status(201).json({
            message: `Carga em lote de ${usuariosMapeados.length} usuários realizada com sucesso no banco!`
        })
    } catch (err) {
        console.error('Erro no bulkCreate de usuários:', err)
        res.status(500).json({ message: 'Erro ao salvar os usuários em lote no banco de dados' })
    }
}

module.exports = { listar, consultar, cadastrar, atualizar, apagar, cargaLote }
