const conn = require('../db/conn')
const { QueryTypes } = require('sequelize')

const listarPorCategorias = async (req, res) => {
    try {
        const dados = await conn.query(
            `SELECT 
                p.nome AS nome,
                SUM(c.quantidadeMovimentada) AS quantidade_total_movimentada,
                SUM(c.precoFinal) AS valor_financeiro_movimentado
            FROM compras c
            INNER JOIN produtos p ON c.idProduto = p.codProduto
            WHERE c.tipoMovimento = 'SAIDA'
            GROUP BY p.codProduto, p.nome
            ORDER BY SUM(c.precoFinal) DESC
            LIMIT 5`,
            { type: QueryTypes.SELECT }
        )
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível listar por Categorias', err)
        res.status(500).json({ message: 'Não foi possível listar por Categorias' })
    }
}

const listarHistoricoSaidas = async (req, res) => {
    try {
        const dados = await conn.query(
            `SELECT 
                codProduto AS codigo_produto,
                nome,
                categoria,
                qtdeEstoque AS quantidade_atual
            FROM produtos
            WHERE qtdeEstoque < 10`,
            { type: QueryTypes.SELECT }
        )
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível listar o histórico das Saídas', err)
        res.status(500).json({ message: 'Não foi possível listar o histórico das Saídas' })
    }
}

module.exports = { listarPorCategorias, listarHistoricoSaidas }

