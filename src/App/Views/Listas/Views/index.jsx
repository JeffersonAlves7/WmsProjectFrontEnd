import Table from '../Components/Table/index'

function Criar() {
    return (
        <Table titles={["ID da Lista", "Canal", "Pedidos"]} value="criar" />
    )
}
function EmAberto() {
    return (
        <Table titles={["ID da Lista", "Canal", "Pedidos"]} value="emaberto" />
    )
}
function Finalizado() {
    return (
        <Table titles={["ID da Lista", "Canal", "Pedidos"]} value="finalizado" />
    )
}


export {
    Criar,
    EmAberto,
    Finalizado
}