const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', () => {
    const id = document.getElementById('id').value
    if (!id) {
        resposta.innerHTML = 'Informe o ID do usuário.'
        return
    }
    if (!confirm('Tem certeza que deseja apagar este usuário?')) return

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<span style="color:lightgreen;">${dados.message}</span>`
    })
    .catch(err => {
        console.error(err)
        resposta.innerHTML = 'Erro ao apagar usuário.'
    })
})
