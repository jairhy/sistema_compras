const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', () => {
    const id = document.getElementById('id').value
    const nome = document.getElementById('nome').value
    const preco = document.getElementById('preco').value
    const qtdeEstoque = document.getElementById('qtdeEstoque').value

    if (!id) {
        resposta.innerHTML = 'Informe o ID do produto.'
        return
    }

    const dados = {}
    if (nome) dados.nome = nome
    if (preco) dados.preco = parseFloat(preco)
    if (qtdeEstoque) dados.qtdeEstoque = parseInt(qtdeEstoque)

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(p => {
        if (p.message) {
            resposta.innerHTML = `<span style="color:#ffaa00;">${p.message}</span>`
            return
        }
        resposta.innerHTML = `<span style="color:lightgreen;">Produto ID ${p.codProduto} atualizado com sucesso!</span>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao atualizar produto.'
    })
})
