import { BiSearch } from "react-icons/bi"
import { useState, useEffect } from 'react'
import api from "../../api"

import MagaluLogo from "../../img/magalulogo.png"
import MercadoLogo from "../../img/mercadolivrelogo.png"
import ShopeeLogo from "../../img/shopeelogo.png"
import CorreiosLogo from "../../img/correioslogo.png"

function TableBody(props) {
    const { pedidos, status, canal, busca } = props

    function Row(props) {
        const { pedido, nf, situacao, itens } = props
        let textSituacao = ""

        if (situacao === "emaberto") textSituacao = "Em aberto";
        if (situacao === "embalado") textSituacao = "Embalado";
        if (situacao === "finalizado") textSituacao = "Finalizado";

        function ImageLogo({ integracao }) {
            if (integracao == "IntegraCommerce") return <img className="max-w-[70px]" src={MagaluLogo} alt="" />
            if (integracao == "MercadoLivre") return <img className="max-w-[70px]" src={MercadoLogo} alt="" />
            if (integracao == "Shopee") return <img className="max-w-[70px]" src={ShopeeLogo} alt="" />
            if (["SkyHub", "Kabum", "Olist"].indexOf(integracao) > -1) return <img className="max-w-[70px]" src={CorreiosLogo} alt="" />
            else return <p>{integracao}</p>
        }
        function Itens({ imagem, quantidade, sku }) {
            return (
                <div className="grid grid-cols-[2fr_1fr] items-center">
                    {imagem.url ? <img className="max-w-[70px]" src={imagem.url} alt=""></img> : <p style={{ wordBreak: "break-word" }} className="font-semibold">{sku}</p>}
                    <p>X{quantidade}</p>
                </div>
            )
        }
        return (
            <tr className='grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center justify-items-center border-b-2 border-b-wmsGrey'>
                <td className='p-2'>
                    <div className="flex flex-col items-center">
                        <a className="text-blue-600 w-max" href={window.location.origin + "/pedido?pedido=" + pedido}>
                            {pedido}
                        </a>
                        <a className="text-blue-600 w-max" href={window.location.origin + "/pedido?pedido=" + pedido}>
                            {nf}
                        </a>
                    </div>
                </td>
                <td>
                    <p>{textSituacao}</p>
                </td>
                <td>
                    <ImageLogo {...props} />
                </td>
                <td>
                    {itens.map(item => <Itens {...item} />)}
                </td>
            </tr>
        )
    }

    if (busca != "") {
        return pedidos.filter(pedido => pedido.nf === busca || pedido.pedido === busca).map(pedido => <Row {...pedido} />)
    }
    if (canal != "todos" && status != "todos") {
        return pedidos.filter(pedido => pedido.integracao === canal && pedido.situacao.toLowerCase() === status).map(pedido => <Row {...pedido} />)
    }
    if (canal != "todos") {
        if (canal === "Correios") return pedidos.filter(pedido => ["SkyHub", "Kabum", "Olist"].indexOf(pedido.integracao) > -1).map(pedido => <Row {...pedido} />)
        return pedidos.filter(pedido => pedido.integracao === canal).map(pedido => <Row {...pedido} />)
    }
    if (status != "todos") {
        return pedidos.filter(pedido => pedido.situacao.toLowerCase() === status).map(pedido => <Row {...pedido} />)
    }

    return pedidos.map(pedido => <Row {...pedido} />)
}

export default function Historico() {
    const [pedidos, setPedidos] = useState({
        pedidos: [],
        status: "todos",
        canal: "todos",
        busca: ""
    });

    useEffect(() => {
        api.get('/pedidos?itens=true')
            .then(res => {
                const { data } = res
                const { response } = data

                setPedidos({
                    pedidos: response,
                    status: "todos",
                    canal: "todos",
                    busca: ""
                })
            })
    }, [])

    function updateState() {
        const situacao = document.getElementById('seletorStatus').value
        setPedidos(
            {
                pedidos: pedidos.pedidos, status: situacao, canal: pedidos.canal, busca: ""
            }
        )
    }
    function updateCanal() {
        const canal = document.getElementById('seletorCanais').value
        setPedidos(
            {
                pedidos: pedidos.pedidos, status: pedidos.status, canal, busca: ""
            }
        )
    }
    function updateBusca() {
        const busca = document.getElementById('buscar-input').value
        setPedidos(
            {
                pedidos: pedidos.pedidos, status: pedidos.status, canal: pedidos.canal, busca: busca
            }
        )
    }
    return (
        <>
            <header>
                <h1 className="text-2xl font-semibold">Historico de Pedidos</h1>
                <div className="flex justify-between gap-2">
                    <div id="buscar-area" className="border border-wmsGrey rounded-lg p-1 flex items-center w-[20rem]">
                        <input type="text" onKeyDown={({ key }) => {
                            if (key !== "Enter") return
                            updateBusca()
                        }} className="outline-none w-full" placeholder="Pesquisar ID de Pedido ou Nota Fiscal" id="buscar-input" />
                        <button type='button' className="w-[30px] h-full flex items-center justify-center" title='buscar' onClick={() => {
                            updateBusca()
                        }}>
                            <BiSearch fontSize={20} />
                        </button>
                    </div>
                    <div id="status" className="filterSelect">
                        <label htmlFor="seletorStatus" className=" pl-2 pr-2">Status</label>
                        <select name="integracao" className="p-1 outline-none" onClick={(e) => updateState()} id="seletorStatus">
                            <option value="todos">Todos</option>
                            <option value="emaberto">Em Aberto</option>
                            <option value="embalado">Embalado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div id="canais" className="filterSelect">
                        <label htmlFor="seletorCanais" className=" pl-2 pr-2">Canais</label>
                        <select name="integracao" className=" p-1 outline-none" onClick={(e) => updateCanal()} id="seletorCanais">
                            <option value="todos">Todos</option>
                            <option value="MercadoLivre">Mercado Coletas</option>
                            <option value="IntegraCommerce">Magalu Coletas</option>
                            <option value="Correios">Correios</option>
                            <option value="Shopee">Shopee</option>
                        </select>
                    </div>
                </div>
            </header>
            <main>
                <table>
                    <thead>
                        <tr className="grid grid-cols-[2fr_1fr_1fr_1fr] justify-items-center text-xl border-b-2 border-b-wmsGrey">
                            <th>
                                <p className="text-center">N?? do Pedido/NF</p>
                            </th>
                            <th>
                                <p className="text-center">Status dos Pedidos</p>
                            </th>
                            <th>
                                <p className="text-center">Canal</p>
                            </th>
                            <th>
                                <p className="text-center">Conte??do</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableBody {...pedidos} />
                    </tbody>
                </table>
            </main>
        </>
    )
}
