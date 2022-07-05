import NovosPedidos from './NovosPedidos/index'
import PedidosEmbalados from './PedidosEmbalados/index'
import Resumo from './Resumo'

export default function Dashboard() {
    return (
        <section id="Dashboard" className='flex flex-col gap-10 sm:gap-[6rem] '>
            <div className='flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-32 w-full' >
                <NovosPedidos />
                <PedidosEmbalados />
            </div >
            <Resumo />
        </section >
    )
}