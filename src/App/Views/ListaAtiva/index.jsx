import Button from "../../Components/Buttons/WmsButton/index"
import scanPedido from "../../api/modules/scanPedido"
import { useState, useEffect } from "react"
import api from "../../api"

async function enviar(props){
  const inputValue = document.querySelector('input#input_pedido').value

  if (inputValue == "") return;

  const ifExistis = await scanPedido(inputValue, props.id) //Inserting the id on the scanlist function
  if (!ifExistis) return;

  window.location.assign(window.location.origin + '/checkout?chavedeacesso=' + inputValue)
}

function Scanner(props) {
    return (
        <input type="text" onKeyDown={(e)=>{
          const { key } = e
          if(key!=="Enter") return;
          enviar(props)
        }} name="pedidoInput" id="input_pedido" placeholder="Escanear ou inserir chave de acesso do pedido" className="border pt-4 pb-4 pl-4 pr-4 rounded-md border-wmsLightPink outline-none text-2xl w-[35rem]" />
    )
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
                setInfo({
                    embalado: embalado,
                    total: total
                })
            })
    })

    return (
        <>
            <header className='border-b-2 p-2 border-b-wmsPink w-full flex justify-between items-center'>
                <h1 className="text-2xl font-bold">Lista de Coleta Ativa: {props.id}</h1>
                <p>{info.embalado}/{info.total}</p>
            </header>
            <main className="flex gap-10 items-center">
                <Scanner {...props}/>
                <Button type="button" text="Escanear" fn={async () => {
                  enviar(props)
                }} />
            </main>
        </>
    )
}
