import { useEffect, useState } from 'react'
import api from '../../api/index'
import Main from './Components/Main/index'

export default (props) => {
    const { chavedeacesso } = props

    const [pedido, setPedido] = useState({
        "chavedeacesso": "",
        "nf": "",
        "serie": 0,
        "idLista": 0,
        "pedidoBling": "",
        "pedido": "",
        "integracao": "",
        "qntItens": 0,
        "situacao": "",
        "date": "",
        "itens": [""]
    })

    useEffect(() => {
        api.get(`/pedidos?chavedeacesso=${chavedeacesso}&itens=true`).then((res) => {
            const { data } = res

            if ((data.response[0].situacao).toLowerCase() !== "emaberto") {
                window.location.replace(window.location.origin + '/embalar')
                return
            }

            setPedido(data.response[0])
        })
    }, [])

    return (
        <>
            <header className="flex w-full gap-2 text-md sm:text-lg text-center lg:text-2xl pr-[2rem] pl-[2rem] font-bold break-words justify-between">
                <h2 >NF-e: {pedido.nf}</h2>
                <span className='sm:hidden h-full border border-wmsGrey'></span>
                <h2 >N° do Pedido: {pedido.pedido}</h2>
            </header>
            <Main {...pedido} />
        </>
    )
}