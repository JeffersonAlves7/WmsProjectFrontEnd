import Painel from '../Painel/index'
import api from '../../../api/index'
import { useEffect, useState } from 'react'

export default function PedidosEmbalados() {
    const [quantidade, setQuantidade] = useState(null);

    useEffect(() => {
        api.get('/pedidos?date=true').then((res) => {
            const { data } = res
            setQuantidade(data.response.filter(a => a.situacao != "emaberto").length)
        });
    }, [])

    return (
        <Painel span={quantidade > 0 ? quantidade : 0} title="Pedidos Embalados" />
    )
}