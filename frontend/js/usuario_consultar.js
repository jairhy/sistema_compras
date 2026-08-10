const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', () => {
    const id = document.getElementById('id').value
    if (!id) {
        resposta.innerHTML = 'Informe o ID do usuário.'
        return
    }
    fetch(`http://localhost:3000/usuarios/${id}`)
    .then(res => res.json())
    .then(u => {
        if (u.message) {
            resposta.innerHTML = `<span style="color:#ff6b6b;">${u.message}</span>`
            return
        }
        resposta.innerHTML = `
            <p><strong>ID:</strong> ${u.codUsuario}</p>
            <p><strong>Nome:</strong> ${u.nome} ${u.sobrenome}</p>
            <p><strong>Idade:</strong> ${u.idade}</p>
            <p><strong>E-mail:</strong> ${u.email}</p>
            <p><strong>Telefone:</strong> ${u.telefone || '-'}</p>
            <p><strong>Endereço:</strong> ${u.endereco || '-'}</p>
            <p><strong>Cidade:</strong> ${u.cidade || '-'} - ${u.estado || '-'}</p>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao consultar usuário.'
    })
})
