const container = document.getElementById('container_cards')
const resposta = document.getElementById('resposta')

fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            resposta.innerHTML = 'Nenhum produto cadastrado. Execute a carga em lote primeiro.'
            return
        }
        let cards = ''
        for (let i = 0; i < dados.length; i++) {
            const p = dados[i]
            const imagem = p.imagem || ''
            const img = imagem
                ? `<img src="${p.imagem}" alt="${p.nome}" class="card_imagem">`
                : '<div class="card_sem_imagem">Sem imagem</div>'
            cards += `
                <div class="card">
                    ${img}
                    <div class="card_info">
                        <h3>${p.nome}</h3>
                        <p class="card_categoria">${p.categoria}</p>
                        <p class="card_preco">R$ ${parseFloat(p.preco).toFixed(2)}</p>
                        <p class="card_estoque">Estoque: ${p.qtdeEstoque}</p>
                        ${p.marca ? `<p class="card_marca">Marca: ${p.marca}</p>` : ''}
                    </div>
                </div>`
        }
        container.innerHTML = cards
        resposta.innerHTML = `Exibindo ${dados.length} produtos no dashboard.`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao carregar os produtos do dashboard.'
    })
