let resposta = document.getElementById('resposta')
let btn_cadastrar_manual = document.getElementById('btn_cadastrar_manual')
let btn_carga_lote = document.getElementById('btn_carga_lote')

// =========================================================================
// COMPORTAMENTO 1: CADASTRO MANUAL DE USUÁRIO (POST /usuarios)
// =========================================================================
btn_cadastrar_manual.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value

    if (!nome || !email) {
        resposta.innerHTML = '<p style="color: #ffaa00;">Preencha nome e e-mail para o cadastro.</p>'
        return
    }

    const dados = {
        nome: nome,
        sobrenome: '',
        idade: 0,
        email: email,
        telefone: '',
        endereco: '',
        cidade: '',
        estado: ''
    }

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">Usuário cadastrado com sucesso! (ID ${dados.codUsuario})</p>`
    })
    .catch(err => {
        console.error('Erro no cadastro manual:', err)
        resposta.innerHTML = '<p style="color: red;">Erro ao cadastrar usuário manualmente.</p>'
    })
})

// =========================================================================
// COMPORTAMENTO 2: CADASTRO EM LOTE (O BACKEND CONSULTA A API DUMMYJSON)
// =========================================================================
btn_carga_lote.addEventListener('click', (e) => {
    e.preventDefault()
    resposta.innerHTML = '<p style="color: yellow;">Solicitando ao backend a importação dos usuários da API DummyJSON...</p>'

    fetch('http://localhost:3000/usuarios/carga-lote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p style="color: lightgreen;">${dados.message || 'Carga em lote finalizada com sucesso!'}</p>`
    })
    .catch(err => {
        console.error('Erro na carga em lote:', err)
        resposta.innerHTML = '<p style="color: red;">Falha ao processar a carga em lote de usuários.</p>'
    })
})
