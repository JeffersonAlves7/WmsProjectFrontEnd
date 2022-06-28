import { useState, useEffect } from 'react';
import api from "../../api/index"
import WmsButton from '../../Components/Buttons/WmsButton';
import atualizarListaSituacao from '../../api/modules/atualizarSituacao'
import MagaluLogo from "../../img/magalulogo.png"
import MercadoLogo from "../../img/mercadolivrelogo.png"
import ShopeeLogo from "../../img/shopeelogo.png"
import CorreiosLogo from "../../img/correioslogo.png"

function TableHead(props) {
    const { situacao } = props
    if (situacao == "finalizado") return (
        <tr className="grid grid-cols-4 justify-items-center text-xl border-b-2 border-b-wmsGrey">
            <th>
                <p>ID la Lista</p>
            </th>
            <th>
                <p>Canal</p>
            </th>
            <th>
                <p>Pedidos</p>
            </th>
            <th>
                <p>Status</p>
            </th>
        </tr>
    )
    return (
        <tr className="grid grid-cols-4 justify-items-center text-xl border-b-2 border-b-wmsGrey">
            <th>
                <p>ID la Lista</p>
            </th>
            <th>
                <p>Canal</p>
            </th>
            <th>
                <p>Pedidos</p>
            </th>
        </tr>
    )
}

function TableBody(props) {
    const { listas, state, canal } = props

    function Row(props) {
        const { id, pedidos } = props

        function Image({ canal }) {
            if (canal == "IntegraCommerce") return <img className="max-w-[80px]" src={MagaluLogo} alt="" />
            if (canal == "MercadoLivre") return <img className="max-w-[80px]" src={MercadoLogo} alt="" />
            if (canal == "Shopee") return <img className="max-w-[80px]" src={ShopeeLogo} alt="" />
            if (canal == "Correios") return <img className="max-w-[80px]" src={CorreiosLogo} alt="" />
            else <></>
        }

        function RowButton(props) {
            const { situacao, id } = props
            if (situacao.toLowerCase() == "criar") return (
                <WmsButton type="button" text="Gerar Lista" fn={() => atualizarListaSituacao('emaberto', id)} />
            )
            if (situacao.toLowerCase() === "emaberto") {
                return <div className='flex gap-1 flex-col'>
                    <a href={window.location.origin + "/listadecoleta?id=" + id} target="_blank" className='bg-wmsPink p-1 block rounded'>Imprimir lista com pedidos</a>
                    <a href={window.location.origin + "/listadeseparacao?id=" + id} target="_blank" className='bg-wmsPink p-1 block rounded'>Imprimir lista com produtos</a>
                </div>
            }
            return <></>
        }
        function Id({ id, situacao }) {
            if (situacao == "criar") return <p>{id}</p>
            return (
                <a target="_blank" className='text-blue-500 p-4 hover:text-wmsPink' href={window.location.origin + "/listapedidos?lista=" + id}>
                    {id}
                </a>
            )
        }

        return (
            <tr className='grid grid-cols-4 items-center text-center justify-items-center border-b-2 border-b-wmsGrey'>
                <td className='p-2'>
                    <Id {...props} />
                </td>
                <td> <Image {...props} /></td>
                <td>{pedidos}</td>
                <td>
                    <RowButton {...props} />
                </td>
            </tr>
        )
    }
    if (canal !== "todos") {
        return listas.filter(lista => lista.situacao.toLowerCase() === state && lista.canal === canal).map(lista => <Row {...lista} />)
    }
    return listas.filter(lista => lista.situacao.toLowerCase() === state).map(lista => <Row {...lista} />)
}

export default () => {
    const [listas, setListas] = useState({
        listas: [{
            idprincipal: "",
            canal: "",
            situacao: "",
            pedidos: ""
        }], state: "criar", canal: "todos"
    });

    useEffect(() => {
        api.get("/listas").then((res) => {
            setListas({ listas: res.data.response, state: "criar", canal: "todos" })
        });
    }, [])

    function updateState(situacao) {
        setListas(
            {
                listas: listas.listas, state: situacao, canal: listas.canal
            }
        )
    }
    function updateCanal() {
        const canal = document.getElementById('seletorCanais').value
        setListas(
            {
                listas: listas.listas, state: listas.state, canal: canal
            }
        )
    }
    return (
        <>
            <header className="flex gap-[10rem] sm:gap-[20rem] md:gap-[25rem]">
                <h1 className="text-4xl font-bold">Selecionar</h1>
                <div id="canais" className="flex gap-2 items-center  rounded-lg">
                    <label htmlFor="seletorCanais">Canais:</label>
                    <select name="integracao" onClick={(e) => updateCanal()} className="border shadow-sm p-1" id="seletorCanais">
                        <option value="todos">Todos</option>
                        <option value="MercadoLivre">Mercado Coletas</option>
                        <option value="IntegraCommerce">Magalu Coletas</option>
                        <option value="Correios">Correios</option>
                        <option value="Shopee">Sequoia</option>
                    </select>
                </div>
            </header>
            <main className='flex flex-col gap-[2rem]'>
                <nav>
                    <ul className='flex font-semibold justify-between gap-2 w-[20rem] text-xl'>
                        <li>
                            <button onClick={() => updateState("criar")} className={listas.state == "criar" ? "border-b border-wmsPink" : null}>Criar</button>
                        </li>
                        <li>
                            <button onClick={() => updateState("emaberto")} className={listas.state == "emaberto" ? "border-b border-wmsPink" : null}>Em Aberto</button>
                        </li>
                        <li>
                            <button onClick={() => updateState("finalizado")} className={listas.state == "finalizado" ? "border-b border-wmsPink" : null}>Finalizado</button>
                        </li>
                    </ul>
                </nav>
                <table className='w-full'>
                    <thead className='w-full '>
                        <TableHead {...listas} />
                    </thead>
                    <tbody>
                        <TableBody {...listas} />
                    </tbody>
                </table>
            </main>
        </>
    )
}