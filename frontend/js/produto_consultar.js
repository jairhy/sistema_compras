const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', () => {
    const id = document.getElementById('id').value
    if (!id) {
        resposta.innerHTML = 'Informe o ID do produto.'
        return
    }
    fetch(`http://localhost:3000/produtos/${id}`)
    .then(res => res.json())
    .then(p => {
        if (p.message) {
            resposta.innerHTML = `<span style="color:#ff6b6b;">${p.message}</span>`
            return
        }
        resposta.innerHTML = `
            <p><strong>ID:</strong> ${p.codProduto}</p>
            <p><strong>Nome:</strong> ${p.nome}</p>
            <p><strong>Categoria:</strong> ${p.categoria}</p>
            <p><strong>Preço:</strong> R$ ${parseFloat(p.preco).toFixed(2)}</p>
            <p><strong>Estoque:</strong> ${p.qtdeEstoque}</p>
            <p><strong>Marca:</strong> ${p.marca || '-'}</p>
            <p><strong>Descrição:</strong> ${p.descricao || '-'}</p>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao consultar produto.'
    })
})
