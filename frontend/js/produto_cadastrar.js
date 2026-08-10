let resposta = document.getElementById('resposta')
let btn_cadastrar_manual = document.getElementById('btn_cadastrar_manual')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO 1: CADASTRO MANUAL DE PRODUTO (POST /produtos)
// =========================================================================
btn_cadastrar_manual.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const categoria = document.getElementById('categoria').value
    const quantidade = document.getElementById('quantidade').value
    const precoUnit = document.getElementById('precoUnit').value

    if (!nome || !categoria || !quantidade || !precoUnit) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Preencha todos os campos para o cadastro.</p>'
        return
    }

    const dados = {
        nome: nome,
        descricao: '',
        categoria: categoria,
        preco: parseFloat(precoUnit),
        desconto: 0,
        qtdeEstoque: parseInt(quantidade),
        marca: '',
        imagem: ''
    }

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">Produto cadastrado com sucesso! (ID ${dados.codProduto})</p>`
    })
    .catch(err => {
        console.error('Erro no cadastro manual:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao cadastrar produto manualmente.</p>'
    })
})

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (O BACKEND CONSULTA A API DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Solicitando ao backend a importação dos produtos da API DummyJSON...</p>'

    fetch('http://localhost:3000/produtos/carga-lote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga em lote de produtos realizada com sucesso!'}</p>`
    })
    .catch(err => {
        console.error('Erro na carga em lote de produtos:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao processar a carga em lote de produtos.</p>'
    })
})
