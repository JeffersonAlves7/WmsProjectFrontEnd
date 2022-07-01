import scanList from '../../api/modules/scanList'
import Button from "../../Components/Buttons/WmsButton/index"

async function enviar() {
  const inputValue = document.querySelector('input#input_lista').value

  if (inputValue == "") return;
  if (isNaN(Number(inputValue))) return;

  const ifExistis = await scanList(inputValue) //Inserting the id on the scanlist function

  if (!ifExistis) return;

  window.location.assign(window.location.origin + '/listaAtiva?lista=' + inputValue)
}

function Scanner() {
    return (
        <input onKeyDown={({key})=>{
          if(key !== "Enter") return;
          enviar()
        }} type="text" name="listaDePedidosInput" id="input_lista" placeholder="Escanear ou inserir o ID da Lista de Pedido" className="border pt-4 pb-4 pl-4 pr-4 rounded-md border-wmsLightPink outline-none text-2xl w-[35rem]" />
    )
}

export default () => {
    return (
        <>
            <header>
                <h1 className="text-4xl">Embalar</h1>
            </header>
            <main className="flex gap-10 items-center">
                <Scanner />
                <Button type="button" text="Enviar" fn={() => {
                  enviar()
                }} />
            </main>
        </>

    )
}
