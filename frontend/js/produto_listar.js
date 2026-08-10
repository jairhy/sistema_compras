const tbody = document.getElementById('corpo_tabela')

fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            document.getElementById('resposta').innerHTML = 'Nenhum produto encontrado.'
            return
        }
        let linhas = ''
        for (let i = 0; i < dados.length; i++) {
            const p = dados[i]
            linhas += `
                <tr>
                    <td>${p.codProduto}</td>
                    <td>${p.nome}</td>
                    <td>${p.categoria}</td>
                    <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                    <td>${p.qtdeEstoque}</td>
                    <td>${p.marca || '-'}</td>
                </tr>`
        }
        tbody.innerHTML = linhas
        document.getElementById('resposta').innerHTML = `Exibindo ${dados.length} produtos.`
    })
    .catch(err => {
        console.error(err)
        document.getElementById('resposta').innerHTML = 'Erro ao buscar produtos.'
    })
