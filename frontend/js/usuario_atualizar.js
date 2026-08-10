const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', () => {
    const id = document.getElementById('id').value
    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const email = document.getElementById('email').value

    if (!id) {
        resposta.innerHTML = 'Informe o ID do usuário.'
        return
    }

    const dados = {}
    if (nome) dados.nome = nome
    if (sobrenome) dados.sobrenome = sobrenome
    if (email) dados.email = email

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(u => {
        if (u.message) {
            resposta.innerHTML = `<span style="color:#ffaa00;">${u.message}</span>`
            return
        }
        resposta.innerHTML = `<span style="color:lightgreen;">Usuário ID ${u.codUsuario} atualizado com sucesso!</span>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao atualizar usuário.'
    })
})
