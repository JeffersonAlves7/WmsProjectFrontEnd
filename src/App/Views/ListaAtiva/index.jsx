import Button from "../../Components/Buttons/WmsButton/index"
import scanPedido from "../../api/modules/scanPedido"
import { useState, useEffect } from "react"
import api from "../../api"

async function enviar(props) {
    const inputValue = document.querySelector('input#input_pedido').value

    if (inputValue == "") return;

    const ifExistis = await scanPedido(inputValue, props.id) //Inserting the id on the scanlist function
    if (!ifExistis) return;

    window.location.assign(window.location.origin + '/checkout?chavedeacesso=' + inputValue)
}

function Scanner(props) {
    return (
        <input type="text" onKeyDown={(e) => {
            const { key } = e
            if (key !== "Enter") return;
            enviar(props)
        }} name="pedidoInput" id="input_pedido" autoFocus={true} placeholder="Escanear ou inserir chave de acesso do pedido" className="border pt-4 pb-4 pl-4 pr-4 rounded-md border-wmsLightPink outline-none text-2xl w-[35rem]" />
    )
}

function checkMessageAndThrow(message) {
    if (!message) return
    const messageArea = document.getElementById("messageArea")
    messageArea.innerText = "ERROR: " + message.replaceAll("+", " ")
}

export default (props) => {
    const [info, setInfo] = useState({ embalado: 0, total: 0 })

    useEffect(() => {
        api.get('/pedidos?idLista=' + props.id)
            .then(res => {
                const { data } = res
                const { response } = data
                const embalado = response.filter(pedido => pedido.situacao == "embalado").length
                const total = response.length
                if (response.filter(pedido => pedido.situacao == "finalizado").length === response.length) window.location.assign(window.location.origin + '/embalar')
                setInfo({
                    embalado: embalado,
                    total: total
                })
                checkMessageAndThrow(props.message)
            })
    }, [])

    return (
        <>
            <header className='border-b-2 p-2 border-b-wmsPink w-full flex-col flex justify-between '>
                <h1 className="text-3xl font-bold">Lista de Coleta Ativa</h1>
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-2xl">ID da lista de coleta: <span>{props.id}</span></h2>
                    <p className="text-2xl">{info.embalado}/{info.total}</p>
                </div>
            </header>
            <main className="flex gap-10 flex-col items-start">
                <div className="flex gap-10 items-center">
                    <Scanner {...props} />

                </div>
                {props.message ? <p className="p-2  text-red-400 border-wmsLightPink border-2 rounded-lg shadow-lg" id="messageArea"></p> : <></>}
            </main>
        </>
    )
}
