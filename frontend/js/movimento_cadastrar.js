const btn_registrar = document.getElementById('btn_registrar')
const resposta = document.getElementById('resposta')

// Preenche o select de produtos ao carregar a página
fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(produtos => {
        const selectProduto = document.getElementById('idProduto')
        let opts = '<option value="">Selecione o produto</option>'
        for (let i = 0; i < produtos.length; i++) {
            opts += `<option value="${produtos[i].codProduto}">${produtos[i].codProduto} - ${produtos[i].nome} (Estoque: ${produtos[i].qtdeEstoque})</option>`
        }
        selectProduto.innerHTML = opts
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao carregar produtos.'
    })

// Preenche o select de usuários ao carregar a página
fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(usuarios => {
        const selectUsuario = document.getElementById('idUsuario')
        let opts = '<option value="">Selecione o usuário</option>'
        for (let i = 0; i < usuarios.length; i++) {
            opts += `<option value="${usuarios[i].codUsuario}">${usuarios[i].codUsuario} - ${usuarios[i].nome} ${usuarios[i].sobrenome}</option>`
        }
        selectUsuario.innerHTML = opts
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao carregar usuários.'
    })

btn_registrar.addEventListener('click', (e) => {
    e.preventDefault()
    const idUsuario = document.getElementById('idUsuario').value
    const idProduto = document.getElementById('idProduto').value
    const tipoMovimento = document.getElementById('tipoMovimento').value
    const quantidadeMovimentada = document.getElementById('quantidadeMovimentada').value
    const formaPagamento = document.getElementById('formaPagamento').value
    const statusCompra = document.getElementById('statusCompra').value
    const dataCompra = document.getElementById('dataCompra').value

    if (!idUsuario || !idProduto || !quantidadeMovimentada || !dataCompra) {
        resposta.innerHTML = 'Preencha todos os campos obrigatórios.'
        return
    }

    const dados = {
        idUsuario: parseInt(idUsuario),
        idProduto: parseInt(idProduto),
        tipoMovimento: tipoMovimento,
        quantidadeMovimentada: parseInt(quantidadeMovimentada),
        formaPagamento: formaPagamento,
        statusCompra: statusCompra,
        dataCompra: dataCompra
    }

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(resultado => {
        if (resultado.message) {
            resposta.innerHTML = `<span style="color:#ff6b6b;">${resultado.message}</span>`
            return
        }
        resposta.innerHTML = `<span style="color:lightgreen;">Movimentação registrada com sucesso! (Código ${resultado.codCompra})</span>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao registrar a movimentação.'
    })
})
