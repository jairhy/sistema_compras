const tbody = document.getElementById('corpo_tabela')
const resposta = document.getElementById('resposta')

fetch('http://localhost:3000/compra')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = 'Nenhuma movimentação registrada.'
            return
        }
        let linhas = ''
        for (let i = 0; i < dados.length; i++) {
            const c = dados[i]
            const usuarioNome = c.usuarioCompra ? `${c.usuarioCompra.nome} ${c.usuarioCompra.sobrenome}` : '-'
            const produtoNome = c.produtoCompra ? c.produtoCompra.nome : '-'
            linhas += `
                <tr>
                    <td>${c.codCompra}</td>
                    <td>${usuarioNome}</td>
                    <td>${produtoNome}</td>
                    <td>${c.tipoMovimento}</td>
                    <td>${c.quantidadeMovimentada}</td>
                    <td>R$ ${parseFloat(c.precoUnitario).toFixed(2)}</td>
                    <td>R$ ${parseFloat(c.precoFinal).toFixed(2)}</td>
                    <td>${c.formaPagamento}</td>
                    <td>${c.statusCompra}</td>
                    <td>${c.dataCompra}</td>
                </tr>`
        }
        tbody.innerHTML = linhas
        resposta.innerHTML = `Exibindo ${dados.length} movimentações.`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao carregar o histórico de compras.'
    })
