import { useState, useEffect } from "react"
import api from "../../api"
import Barcode from "react-barcode"
import { AiFillPrinter } from 'react-icons/ai'

function Row(props) {
    const { nf, chavedeacesso, pedido, integracao, itens } = props
    return (
        <tr>
            <td className="p-1">{nf}</td>
            <td className="p-1">
                <Barcode value={chavedeacesso} height={60} width={1} fontSize={11} />
            </td>
            <td className="p-1 font-semibold">{itens.map(({ sku }) => sku)}</td>
            <td className="p-1 text-xs">{pedido}</td>
            <td className="p-1">{integracao}</td>
            <td className="p-1">{itens.map(({ quantidade }) => quantidade)}</td>
        </tr>
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
            <main className="flex items-center justify-center text-center">
                <table>
                    <thead>
                        <tr>
                            <th>NF-e</th>
                            <th>Chave de Acesso</th>
                            <th>SKU</th>
                            <th>Número do Pedido</th>
                            <th>Canal</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedido => <Row {...pedido} />)}
                    </tbody>
                </table>
            </main>
        </div>
    )
}