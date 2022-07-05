import { useState, useEffect } from "react"
import api from "../../api"
import Barcode from "react-barcode"
import { AiFillPrinter } from 'react-icons/ai'

function Row(props) {
    const { nf, chavedeacesso, pedido, integracao, itens } = props
    return (
        <div className="grid grid-cols-[1fr_max-content_1fr_1fr_1fr_1fr] justify-items-center items-center">
            <p className="text-xs"><p>{nf}</p></p>
            <div className="text-xs overflow-hidden">
                <Barcode value={chavedeacesso} height={60} width={1} fontSize={11} />
            </div>
            <div className="text-xs font-semibold ">
                <div className="flex flex-col gap-1">
                    {itens.map(({ sku }) => <p>{sku}</p>)}
                </div>
            </div>
            <div className="p-2 text-xs"><p>{pedido}</p></div>
            <div className="text-xs"><p>{integracao}</p></div>
            <div className="text-xs">
                <div>
                    {itens.map(({ quantidade }) => <p>{quantidade}</p>)}
                </div>
            </div>
        </div>
    )
}
export default function ListaDeColeta(props) {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        api.get('/pedidos?itens=true&idLista=' + props.id)
            .then(res => {
                const { data } = res
                setPedidos(data.response)
            })
    }, [])

    return (
        <div className="w-full h-full p-8 flex flex-col gap-10 text-sm ">
            <header className="flex justify-evenly items-center">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-lg font-semibold">ID da Lista de Coleta: {props.id}</h1>
                    <Barcode value={props.id} height={60} width={1} fontSize={11} />
                </div>
                <button type="button" title="imprimir" className=" bg-wmsLightPink p-1 rounded-lg print:hidden" onClick={() => {
                    window.print()
                }}>
                    <AiFillPrinter className="text-3xl" />
                </button>
            </header>
            <main className="flex items-center justify-center text-center min-w-[25rem]">
                <section id="coleta-table" className=" flex flex-col">
                    {pedidos.map(pedido => (
                        <Row {...pedido} />
                    ))}
                </section>
            </main>
        </div>
    )
}