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
            // Desabilidanto essa função eu posso testar sem precisar de uma nota fiscal no sistema
            // api.get("/notas?nf=" + data.response[0].nf).then(res => {
            //     if (res.data.message === "Nota não encontrada") {
            //         window.location.replace(window.location.origin + '/listaAtiva?message=Pedido+pendente,+aguarde+alguns+minutos+e+tente+novamente+mais+tarde.&lista=' + data.response[0].idLista)
            //     }
            // })
            setPedido(data.response[0])
        })
    }, [])

    return (
        <>
            <header className="flex w-full gap-2 sm:gap-[4rem] text-md sm:text-xl text-center lg:text-2xl pr-[2rem] pl-[2rem] font-bold break-words justify-between">
                <h2 >NF-e: {pedido.nf}</h2>
                <span className='sm:hidden h-full border border-wmsGrey'></span>
                <h2 >N° do Pedido: {pedido.pedido}</h2>
            </header>
            <Main {...pedido} />
        </>
    )
}