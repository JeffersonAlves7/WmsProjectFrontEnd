import Painel from '../Painel/index'
import api from '../../../../api'
import { useEffect, useState } from 'react'

export default function PedidosEmbalados() {
    const [quantidade, setQuantidade] = useState(null);

    useEffect(() => {
        api.get('/pedidos?situacao=emaberto').then((res) => {
            const { data } = res
            setQuantidade(data.response.length)
        });
    }, [])

    return (
        <Painel span={quantidade > 0 ? quantidade : 0} title="Novos Pedidos" />
    )
}