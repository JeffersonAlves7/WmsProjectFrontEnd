import { useEffect, useState } from "react"
import api from "../../api"

function Row(props) {
    const { pedido, situacao, itens } = props
    // { descricao, codigo, quantidade } 
    return (
        <tr className="border-b-2 border-black  ">
            <td className="text-xs pb-5 pt-5 ">
                <div className="flex items-center pl-2 pr-2 flex-col justify-center">
                    {
                        itens.map(item => (
                            <div className="grid sm:grid-cols-[100px_100px] items-center justify-items-center">
                                <img className="h-[4rem]" src={item.imagem.url} alt="" />
                                <p className="text-center">{item.descricao.substr(0, 25)}...</p>
                            </div>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className="flex items-center pl-2 pr-2 flex-col text-xs sm:text-sm font-semibold lg:text-lg justify-center">
                    {
                        itens.map(item => (
                            <div className="flex items-center h-[4rem]">
                                <p className="text-center">{item.sku}</p>
                            </div>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className="flex items-center pl-2 pr-2 text-xs sm:text-sm font-semibold lg:text-lg flex-col justify-center">
                    <p className="text-center">
                        <a className="text-blue-400" target="_blank" href={window.location.origin + "/pedido?pedido=" + pedido}>{pedido}</a>
                    </p>
                </div>
            </td>
            <td>
                <div className="flex items-center pl-2 pr-2  flex-col justify-center">
                    {
                        itens.map(item => (
                            <div className="flex items-center h-[4rem]">
                                <p className="text-center">{item.quantidade}</p>
                            </div>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className="flex items-center pl-2 pr-2 flex-col justify-center">
                    <p className="text-center">{situacao}</p>
                </div>
            </td>
        </tr >
    )
}

export default (props) => {
    const { id } = props
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        api.get("/pedidos?itens=true&idLista=" + id)
            .then(res => {
                const { data } = res
                setPedidos(data.response)
            })
    }, [])

    return (
        <>
            <header className="flex justify-between font-bold gap-5">
                <h1 className="text-lg sm:text-xl lg:text-3xl">ID da lista de coleta - {id}</h1>
                <div className="flex gap-5">
                    <a target="_blank" href={window.location.origin + '/listadecoleta?id=' + id} className="bg-green-500 p-1 rounded">
                        Imprimir lista de coleta
                    </a>
                    <a target="_blank" href={window.location.origin + '/listadeseparacao?id=' + id} className="bg-green-500 p-1 rounded">
                        Imprimir lista de separação
                    </a>
                </div>
            </header>
            <main className="flex flex-col gap-5  lg:w-[65vw] max-w-[900px]">
                <p className="text-lg">Lista de Coleta</p>
                <table className="w-full">
                    <thead className="border-b-2 border-black">
                        <tr>
                            <th>Título</th>
                            <th>SKU</th>
                            <th>Número do pedido</th>
                            <th>Unidade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedido => <Row {...pedido} />)}
                    </tbody>
                </table>
            </main>
        </>
    )
}