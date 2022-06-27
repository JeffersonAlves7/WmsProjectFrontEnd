import Link from './Components/Link/index'
import { Criar, EmAberto, Finalizado } from './Views/index'

function Links() {
    const arr = [
        {
            text: "Criar",
            href: "/listas?value=criar",
            activated: false,
        },
        {
            text: "Em aberto",
            href: "/listas?value=emaberto",
            activated: false,
        },
        {
            text: "Finalizado",
            href: "/listas?value=finalizado",
            activated: false,
        }
    ]

    const value = window.location.search.split('=')[0].indexOf('value') > -1 ? window.location.search.split('=')[1] : null

    if (value !== null) {
        arr.forEach((obj, index) => {
            if (obj.text.toLowerCase().replace(' ', '') !== value) return
            arr[index].activated = true
        })
    } else {
        arr[0].activated = true
    }


    return arr.map(item => <Link {...item} />)
}
function setView() {
    const value = window.location.search.split('=')[0].indexOf('value') > -1 ? window.location.search.split('=')[1] : null
    switch (value) {
        case 'criar':
            return <Criar />
        case 'emaberto':
            return <EmAberto />
        case 'finalizado':
            return <Finalizado />
        default:
            return <Criar />
    }
}
export default () => {
    return (
        <>
            <header className="flex gap-[10rem] sm:gap-[20rem] md:gap-[25rem]">
                <h1 className="text-4xl font-bold">Selecionar</h1>
                <div id="canais" className="flex gap-2 items-center  rounded-lg">
                    <label htmlFor="seletorCanais">Canais:</label>
                    <select name="integracao" className="border shadow-sm p-1" id="seletorCanais">
                        <option value="todas">Todas</option>
                        <option value="mercadoEnvios">Mercado Coletas</option>
                        <option value="magalu">Magalu Coletas</option>
                        <option value="correios">Correios</option>
                        <option value="shopee">Sequoia</option>
                    </select>
                </div>
            </header>
            <main className='flex flex-col gap-[2rem]'>
                <nav>
                    <ul className='flex sm:justify-between gap-5 justify-center w-[30rem]'>
                        <Links />
                    </ul>
                </nav>
                {setView()}
            </main>
        </>
    )
}