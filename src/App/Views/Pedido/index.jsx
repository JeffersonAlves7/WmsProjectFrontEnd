import { useState, useEffect } from "react";
import servicesConfig from '../../config/services.json'
import api from '../../api/index'

import MagaluLogo from "../../img/magalulogo.png"
import MercadoLogo from "../../img/mercadolivrelogo.png"
import ShopeeLogo from "../../img/shopeelogo.png"
import CorreiosLogo from "../../img/correioslogo.png"


function TableBody(props) {
    const { itens, integracao } = props
    console.log(props)

    function ImageLogo({ integracao }) {
        if (integracao == "IntegraCommerce") return <img className="max-w-[70px]" src={MagaluLogo} alt="" />
        if (integracao == "MercadoLivre") return <img className="max-w-[70px]" src={MercadoLogo} alt="" />
        if (integracao == "Shopee") return <img className="max-w-[70px]" src={ShopeeLogo} alt="" />
        if (["SkyHub", "Kabum"].indexOf(integracao) > -1) return <img className="max-w-[70px]" src={CorreiosLogo} alt="" />
        else return <p>{integracao}</p>
    }

    return (
        <tr className="grid grid-cols-4 justify-items-center border-b-2 border-black items-center">
            <th className="pt-2 pb-2 ">
                {itens.map(item =>
                    <div className="flex items-center">
                        {item.imagem.url ? <img src={item.imagem.url} className="max-w-[90px]" alt="" /> : <></>}
                        <p className="font-normal">{item.descricao}</p>
                    </div>
                )}
            </th>
            <th>
                <ImageLogo {...props} />
            </th>
            <th>
                {itens.map(item =>
                    <div className="flex flex-col gap-1 items-center justify-between">
                        <p className="font-normal">{item.sku}</p>
                    </div>
                )}
            </th>
            <th>
                {itens.map(item =>
                    <div className="flex flex-col gap-1 items-center justify-between">
                        <p className="font-normal">{item.quantidade}</p>
                    </div>
                )}
            </th>
        </tr>
    )
}

export default function Pedido(props) {
    const { pedido } = props

    const [meupedido, setPedido] = useState({
        nf: "",
        idLista: "",
        itens: []
    })

    useEffect(() => {
        api.get('/pedidos?itens=true&pedido=' + pedido)
            .then(res => {
                const { data } = res
                const { response } = data
                console.log(response)
                setPedido(response[0])
            })
    }, [])

    return (
        <>
            <header className="flex justify-between items-center text-center gap-5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">
                        NF-e: {meupedido.nf}
                    </h2>
                    <p>
                        ID da Lista: {meupedido.idLista}
                    </p>
                </div>
                <h1 className="text-2xl font-semibold">Número do pedido - {pedido}</h1>
                <div>
                    <a className="p-1 pl-2 pr-2 bg-wmsPink rounded hover:bg-wmsLightPink" target="_blank" href={servicesConfig.api.baseURL + "/notas?nf=" + meupedido.nf}>
                        Imprimir Nota Fiscal
                    </a>
                </div>
            </header>
            <main>
                <table>
                    <thead>
                        <tr className="grid grid-cols-4 border-b-2 border-black">
                            <th>
                                <p className="text-xl">Itens do pedido</p>
                            </th>
                            <th>
                                <p className="text-xl">Canal</p>
                            </th>
                            <th>
                                <p className="text-xl">SKU</p>
                            </th>
                            <th>
                                <p className="text-xl">unidade</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        <TableBody {...meupedido} />
                    </tbody>
                </table>
            </main>
        </>
    )
}