import { useState, useEffect } from "react"
import api from "../../api"
import Barcode from "react-barcode"
import { AiFillPrinter } from 'react-icons/ai'

function Row(props) {
    const { sku, quantidade } = props
    return (
        <tr>
            <td className="p-4 border-b border-t border-r border-black ">{sku}</td>
            <td className="p-4 border-b border-t border-black">{quantidade}</td>
        </tr>
    )
}

export default function ListaDeSeparacao(props) {
    const [itens, setItens] = useState([{ sku: "", quantidade: 0 }])

    useEffect(() => {
        api.get('/pedidos?itens=true&idLista=' + props.id)
            .then(res => {
                const { data } = res
                const arr = []

                for (let i = 0; i < data.response.length; i++) {
                    const element = data.response[i].itens;
                    element.forEach(element => {
                        arr.push(element)
                    });
                }
                setItens(arr)
            })
    }, [])

    return (
        <div className="w-full h-full p-8 flex flex-col gap-10 text-sm ">
            <header className="flex justify-evenly items-center">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-lg font-semibold">ID da Lista de Coleta: {props.id}</h1>
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
                            <th className="border-black border-r p-2">Referência</th>
                            <th className="">Qtd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map(item => <Row {...item} />)}
                    </tbody>
                </table>
            </main>
        </div>
    )
}