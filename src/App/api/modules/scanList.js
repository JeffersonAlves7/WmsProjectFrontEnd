import api from '../index'

export default async (id) => {
    const { data } = await api.get(`/listas?id=${id}&situacao=emaberto`)
    return data.response[0] // Must be a boolean
}