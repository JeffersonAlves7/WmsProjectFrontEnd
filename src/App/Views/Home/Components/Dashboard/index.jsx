import NovosPedidos from './components/NovosPedidos/index'
import PedidosEmbalados from './components/PedidosEmbalados/index'

export default function Dashboard() {
    return (
        <section id="Dashboard" className='flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-32'>
            <NovosPedidos />
            <PedidosEmbalados />
        </section>
    )
}