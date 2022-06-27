import api from '../index'

async function atualizarPedido(situacao, chavedeacesso) {
    console.log(situacao, chavedeacesso)
    switch (situacao) {
        case 'Embalado':
            await api.put(`/pedidos`, {
                chavedeacesso,
                situacao
            })
            window.location.replace(window.location.origin + '/embalar')
            return true
        case 'Finalizado':
            await api.put(`/pedidos`, {
                chavedeacesso,
                situacao
            })
            window.location.replace(window.location.origin + '/embalar')
            return true
    }
    return false
}

export default atualizarPedido