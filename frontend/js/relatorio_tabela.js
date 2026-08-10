const tbodyCriticos = document.getElementById('tbody_criticos')
const tbodyVolume = document.getElementById('tbody_volume')
const resposta = document.getElementById('resposta')

// Carrega os dois relatórios em paralelo
Promise.all([
    fetch('http://localhost:3000/relatorio/produtos-criticos').then(r => r.json()),
    fetch('http://localhost:3000/relatorio/volume-compras').then(r => r.json())
])
.then(([criticos, volume]) => {
    // Relatório 1: Produtos Críticos
    if (criticos.length === 0) {
        tbodyCriticos.innerHTML = '<tr><td colspan="4">Nenhum produto crítico (estoque < 10).</td></tr>'
    } else {
        let linhas = ''
        for (let i = 0; i < criticos.length; i++) {
            const c = criticos[i]
            linhas += `
                <tr>
                    <td>${c.codigo_produto}</td>
                    <td>${c.nome}</td>
                    <td>${c.categoria}</td>
                    <td>${c.quantidade_atual}</td>
                </tr>`
        }
        tbodyCriticos.innerHTML = linhas
    }

    // Relatório 2: Volume Financeiro por Produto
    if (volume.length === 0) {
        tbodyVolume.innerHTML = '<tr><td colspan="3">Nenhuma movimentação de saída registrada.</td></tr>'
    } else {
        let linhas = ''
        for (let i = 0; i < volume.length; i++) {
            const v = volume[i]
            linhas += `
                <tr>
                    <td>${v.nome}</td>
                    <td>${v.quantidade_total_movimentada}</td>
                    <td>R$ ${parseFloat(v.valor_financeiro_movimentado).toFixed(2)}</td>
                </tr>`
        }
        tbodyVolume.innerHTML = linhas
    }

    resposta.innerHTML = 'Relatórios analíticos carregados com sucesso!'
})
.catch(err => {
    console.error(err)
    resposta.innerHTML = 'Erro ao carregar os relatórios analíticos.'
})
