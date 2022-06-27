import WmsButton from "../../../../Components/Buttons/WmsButton"
import atualizarListaSituacao from "../../../../api/modules/atualizarSituacao"
import magaluImg from "../../../../img/magalulogo.png"
import shopeeImg from "../../../../img/shopeelogo.png"
import correiosImg from "../../../../img/correioslogo.png"
import mercadoLivreImg from "../../../../img/mercadolivrelogo.png"

function Button(props) {
    const { value, id } = props
    if (value == 'criar') return <WmsButton type="button" text="Gerar Lista" fn={() => atualizarListaSituacao('emaberto', id)} />
    if (value == 'emaberto') return (
        <div className="flex flex-col gap-2">
            <a className="bg-wmsLightPink p-2 pt-1 pb-1 rounded font-semibold hover:bg-wmsPink" href="#">
                Imprimir lista com pedidos
            </a>
            <a className="bg-wmsLightPink p-2 pt-1 pb-1 rounded font-semibold hover:bg-wmsPink" href="#">
                Imprimir lista de separação
            </a>
        </div>
    )
    return <></>;
}
function Imagem(props) {
    const canal = props.canal
    switch (canal) {
        case 'Correios':
            return <img className="max-w-[5rem]" src={correiosImg} alt="" />
        case 'IntegraCommerce':
            return <img className="max-w-[5rem]" src={magaluImg} alt="" />
        case 'Shopee':
            return <img className="max-w-[5rem]" src={shopeeImg} alt="" />
        case 'MercadoLivre':
            return <img className="max-w-[5rem]" src={mercadoLivreImg} alt="" />
    }
    return <p className="text-xl">{canal}</p>
}
export default (props) => {
    const { id, canal, situacao, pedidos, value } = props
    const cols = value != 'finalizado' ? "20% 20% 20% 1fr" : "1fr 1fr 1fr"
    return (
        <tr style={{
            gridTemplateColumns: cols,
        }} className="grid border-b-2 border-b-wmsGrey items-center justify-items-center">
            <td className="pt-2 pb-2">
                {value == "criar" ? <span className="text-xl">{id}</span> : <a href={window.location.origin + "/listapedido?id=" + id} target="_blank" className="text-xl text-blue-500">{id}</a>}
            </td>
            <td className="pt-2 pb-2">
                <Imagem {...props} />
            </td>
            <td className="pt-2 pb-2">
                <span className="text-xl">{pedidos}</span>
            </td>
            {value != 'finalizado' ? <td className="pt-2 pb-2">
                <Button value={value} id={id} />
            </td> : ""}
        </tr>
    )
}