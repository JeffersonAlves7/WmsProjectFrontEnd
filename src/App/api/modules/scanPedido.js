import api from '../index'

export default async (chavedeacesso, idLista) => {
    const { data } = await api.get(`/pedidos?chavedeacesso=${chavedeacesso}`)
    console.log(data.response, idLista)
    if (data.response[0] === undefined) return false;
    return data.response[0].idLista == idLista  // Must be a boolean
}