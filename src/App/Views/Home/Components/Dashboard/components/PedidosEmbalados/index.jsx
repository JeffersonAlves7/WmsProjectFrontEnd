import Painel from '../Painel/index'
import api from '../../../../../../api/index'
import { useEffect, useState } from 'react'

export default function PedidosEmbalados() {
    const [quantidade, setQuantidade] = useState(null);

    useEffect(() => {
        api.get('/pedidos?situacao=embalados').then((res) => {
            const { data } = res
            setQuantidade(data.response.length)
        });
    }, [])

    return (
        <Painel span={quantidade} title="Pedidos Embalados" />
    )
}