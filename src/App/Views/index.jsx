//  -------- Componente global  --------  //
import Header from '../Components/Header/index'
// -----------------------------------------//
import V_Home from './Home/index'

import V_Historico from './Historico/index'
import V_Pedido from './Pedido/index'

import V_Embalar from './Embalar/index'
import V_ListaAtiva from './ListaAtiva/index'
import V_Checkout from './Checkout/index'

import V_ListasSituacao from './ListasSituacao/index'
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
function ListaSituacao() {
    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] pl-2 pr-2 lg:pl-0 lg:pr-0 flex-col gap-[5rem]'>
                    <V_ListasSituacao />
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
    const { search } = window.location
    const data = search.replace("?", "").split("&").map(item => item.split("="))

    let indexLista = -1;
    let indexMessage = -1;

    for (let i = 0; i < data.length; i++) {
        if (data[i].indexOf("lista") > -1) { indexLista = i; break }
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].indexOf("message") > -1) { indexMessage = i; break }
    }
    let message = null
    if (indexMessage > -1) {
        message = data[indexMessage][1]
    }

    if (indexLista === -1) {
        window.location.assign(window.location.origin + '/embalar')
        return <></>
    }

    if (indexMessage !== -1) return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_ListaAtiva id={data[indexLista][1]} message={message} />
                </div>
            </main>
        </>
    )

    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_ListaAtiva id={data[indexLista][1]} />
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
function Historico() {
    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_Historico />
                </div>
            </main>
        </>
    )
}
function Pedido() {
    const data = window.location.search.replace('?', '').split('=') //Must be an arr with ["lista", id:number]

    return (
        <>
            <Header />
            <main className='m-auto flex justify-center'>
                <div className='flex pt-[10rem] flex-col gap-[2rem]'>
                    <V_Pedido pedido={data[1]} />
                </div>
            </main>
        </>
    )
}


export { Home, ListaSituacao, Embalar, ListaAtiva, Checkout, ListaPedidos, ListaDeColeta, ListaDeSeparacao, Historico, Pedido }