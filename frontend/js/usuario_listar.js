const tbody = document.getElementById('corpo_tabela')

fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(dados => {
        if (dados.length === 0) {
            document.getElementById('resposta').innerHTML = 'Nenhum usuário encontrado.'
            return
        }
        let linhas = ''
        for (let i = 0; i < dados.length; i++) {
            const u = dados[i]
            linhas += `
                <tr>
                    <td>${u.codUsuario}</td>
                    <td>${u.nome} ${u.sobrenome}</td>
                    <td>${u.idade}</td>
                    <td>${u.email}</td>
                    <td>${u.telefone || '-'}</td>
                    <td>${u.cidade || '-'} - ${u.estado || '-'}</td>
                </tr>`
        }
        tbody.innerHTML = linhas
        document.getElementById('resposta').innerHTML = `Exibindo ${dados.length} usuários.`
    })
    .catch(err => {
        console.error(err)
        document.getElementById('resposta').innerHTML = 'Erro ao buscar usuários.'
    })
