import api from '../index'

async function atualizarPedido(situacao, chavedeacesso) {
    switch (situacao) {
        case 'embalado':
            await api.put(`/pedidos`, {
                chavedeacesso,
                situacao
            })
            return true
    }
    return false
}

export default atualizarPedido