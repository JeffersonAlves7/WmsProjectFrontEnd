import Header from '../Components/Header/index'
import V_Home from './Home/index'
import V_Lista from './Listas/index'
import V_Embalar from './Embalar/index'
import V_ListaAtiva from './ListaAtiva/index'
import V_Checkout from './Checkout/index'
import V_ListaPedidos from './ListaPedidos/index'
import V_ListaDeColeta from './ListaDeColeta/index'
import V_ListaDeSeparacao from './ListaDeSeparacao/index'

function Home() {
    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[5rem]'>
                    <V_Home />
                </div>
            </main>
        </>
    )
}
function Listas() {
    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] pl-2 pr-2 lg:pl-0 lg:pr-0 flex-col gap-[5rem]'>
                    <V_Lista />
                </div>
            </main>
        </>
    )
}
function Embalar() {
    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_Embalar />
                </div>
            </main>
        </>
    )
}
function ListaAtiva() {
    const data = window.location.search.replace('?', '').split('=') //Must be an arr with ["lista", id:number]

    if (data.length < 2 || data[0] != "lista") {
        window.location.assign(window.location.origin + '/embalar')
        return <></>
    }

    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_ListaAtiva id={data[1]} />
                </div>
            </main>
        </>
    )
}
function Checkout() {
    const data = window.location.search.replace('?', '').split('=') //Must be an arr with ["lista", id:number]

    if (data.length < 2 || data[0] != "chavedeacesso") {
        window.location.assign(window.location.origin + '/embalar')
        return <></>
    }

    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_Checkout chavedeacesso={data[1]} />
                </div>
            </main>
        </>
    )
}
function ListaPedidos() {
    const data = window.location.search.replace('?', '').split('=') //Must be an arr with ["lista", id:number]

    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_ListaPedidos id={data[1]} />
                </div>
            </main>
        </>
    )
}
function ListaDeColeta() {
    const data = window.location.search.replace('?', '').split('=') //Must be an arr with ["lista", id:number]
    if (data[0] != "id") window.location.assign(window.location.origin)
    return (
        <V_ListaDeColeta id={data[1]} />
    )
}
function ListaDeSeparacao() {
    const data = window.location.search.replace('?', '').split('=') //Must be an arr with ["lista", id:number]
    if (data[0] != "id") window.location.assign(window.location.origin)

    return (
        <V_ListaDeSeparacao id={data[1]} />
    )
}

export { Home, Listas, Embalar, ListaAtiva, Checkout, ListaPedidos, ListaDeColeta, ListaDeSeparacao }