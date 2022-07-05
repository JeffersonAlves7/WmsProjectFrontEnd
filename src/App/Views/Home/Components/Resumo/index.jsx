import { HiOutlineMinus } from "react-icons/hi"
import { useState, useEffect } from "react"

import api from "../../../../api"

import MagaluLogo from "../../../../img/magalulogo.png"
import MercadoLogo from "../../../../img/mercadolivrelogo.png"
import ShopeeLogo from "../../../../img/shopeelogo.png"
import CorreiosLogo from "../../../../img/correioslogo.png"

export default () => {
    const [pedidos, setPedidos] = useState([""])

    useEffect(() => {
        api.get("/pedidos?date=true")
            .then(({ data }) => {
                const { response } = data
                setPedidos(response)
            })
    }, [])

    return (
        <article id="resumo-pedidos">
            <header>
                <h2 className='text-2xl'>Resumo dos pedidos diário</h2>
            </header>
            <main className="w-[280px]  pl-2 pr-5 h-[18rem] border bg-gray-100 border-gray-300 shadow-xl rounded-2xl">
                <ul className="grid grid-rows-4 items-center h-full">
                    <li className="h-full flex items-center">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <HiOutlineMinus className="rotate-90 text-wmsPink text-[2.2rem]" />
                                <img className="max-w-[80px]" src={MercadoLogo} alt="" />
                            </div>
                            <div>
                                <p className="text-xl">
                                    {pedidos.filter(a => a.situacao != "emaberto" && a.integracao == "MercadoLivre").length}
                                    /
                                    {pedidos.filter(a => a.integracao == "MercadoLivre").length}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="h-full flex items-center">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <HiOutlineMinus className="rotate-90 text-wmsPink text-[2.2rem]" />
                                <img className="max-w-[80px]" src={MagaluLogo} alt="" />
                            </div>
                            <div>
                                <p className="text-xl">
                                    {pedidos.filter(a => a.situacao != "emaberto" && a.integracao == "IntegraCommerce").length}
                                    /
                                    {pedidos.filter(a => a.integracao == "IntegraCommerce").length}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="h-full flex items-center">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <HiOutlineMinus className="rotate-90 text-wmsPink text-[2.2rem]" />
                                <img className="max-w-[80px]" src={ShopeeLogo} alt="" />
                            </div>
                            <div>
                                <p className="text-xl">
                                    {pedidos.filter(a => a.situacao != "emaberto" && a.integracao == "Shopee").length}
                                    /
                                    {pedidos.filter(a => a.integracao == "Shopee").length}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="h-full flex items-center">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <HiOutlineMinus className="rotate-90 text-wmsPink text-[2.2rem]" />
                                <img className="max-w-[50px]" src={CorreiosLogo} alt="" />
                            </div>
                            <div>
                                <p className="text-xl">
                                    {pedidos.filter(a => a.situacao == "embalado" && ["MercadoLivre", "Shopee", "IntegraCommerce"].indexOf(a.integracao) === -1).length}
                                    /
                                    {pedidos.filter(a => ["MercadoLivre", "Shopee", "IntegraCommerce"].indexOf(a.integracao) === -1).length}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </main >
        </article >
    )
}