import api from '../index'

async function atualizarListaSituacao(situacao, id) {
    switch (situacao) {
        case 'emaberto':
            await api.put(`/listas`, {
                id,
                situacao
            })
            window.location.reload()
            return true
    }
    return false
}

export default atualizarListaSituacao