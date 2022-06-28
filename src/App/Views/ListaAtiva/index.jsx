import Button from "../../Components/Buttons/WmsButton/index"
import scanPedido from "../../api/modules/scanPedido"

function Scanner() {
    return (
        <input type="text" name="pedidoInput" id="input_pedido" placeholder="Escanear ou inserir chave de acesso do pedido" className="border pt-4 pb-4 pl-4 pr-4 rounded-md border-wmsLightPink outline-none text-2xl w-[35rem]" />
    )
}

export default (props) => {

    return (
        <>
            <header className='border-b-2 p-2 border-b-wmsPink w-full'>
                <h1 className="text-2xl font-bold">Lista de Coleta Ativa: {props.id}</h1>
            </header>
            <main className="flex gap-10 items-center">
                <Scanner />
                <Button type="button" text="Escanear" fn={async () => {
                    const inputValue = document.querySelector('input#input_pedido').value

                    if (inputValue == "") return;

                    const ifExistis = await scanPedido(inputValue, props.id) //Inserting the id on the scanlist function
                    if (!ifExistis) return;

                    window.location.assign(window.location.origin + '/checkout?chavedeacesso=' + inputValue)
                }} />
            </main>
        </>
    )
}