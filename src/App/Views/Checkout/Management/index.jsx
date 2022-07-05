import { useState, useEffect } from 'react'
import { BsFillCheckSquareFill } from "react-icons/bs"
import servicesConfig from "../../../config/services.json"
import atualizarPedido from '../../../api/modules/atualizarPedido'

export default (props) => {
    let itens = props.itens
    const { nf, chavedeacesso, idLista } = props

    itens.forEach(item => item.conferido = false)
    itens.forEach(item => item.totalConferido = 0)

    const [myItens, setItens] = useState(itens)
    // const { sku, imagem, quantidade, descricao, conferido } = props.item
    function updateItens(itemCheckout, todos, first = false) {
        const boxItems = {
            img: document.getElementById('img-items'),
            sku: document.getElementById('sku-items'),
            title: document.getElementById('title-items'),
            quantidade: document.getElementById('quantidade-items'),
        }
        const boxCheckout = {
            total: document.getElementById('total-checkout'),
            ul: document.getElementById('ul-checkout')
        }

        if (itemCheckout.totalConferido != itemCheckout.quantidade && first === false) {
            itemCheckout.totalConferido += 1

            const totalOnScrenn = document.getElementById(itemCheckout.sku + '-total')
            totalOnScrenn.innerText = itemCheckout.totalConferido + '/' + itemCheckout.quantidade

            if (itemCheckout.totalConferido == itemCheckout.quantidade) {
                const liScreen = document.getElementById(itemCheckout.sku)
                liScreen.style = "background-color: lightgreen"
            }

            return itemCheckout
        }

        // __________________________________ //
        boxItems.sku.innerText = "Sku: " + itemCheckout.sku
        boxItems.title.innerText = "Título: " + itemCheckout.descricao.substr(0, 25) + '...'
        boxItems.quantidade.innerText = "Quantidade: " + itemCheckout.quantidade

        let totalLidos = 0

        todos.forEach(item => {
            if (!item.conferido) return
            totalLidos += 1
        })

        boxCheckout.total.innerText = "Total de Sku's lidos: " + totalLidos + "/" + todos.length

        if (itemCheckout.imagem.url === undefined) {
            boxItems.img.src = ""
            return
        }

        boxItems.img.src = itemCheckout.imagem.url
    }
    function finalizado(todos) {
        let totalLidos = 0

        todos.forEach(item => {
            if (item.conferido) totalLidos += 1
        })

        const boxItems = {
            self: document.getElementById('box-items'),
            img: document.getElementById('img-items'),
            sku: document.getElementById('sku-items'),
            title: document.getElementById('title-items'),
            quantidade: document.getElementById('quantidade-items'),
        }

        const boxCheckout = {
            self: document.getElementById('box-checkout'),
            total: document.getElementById('total-checkout'),
            ul: document.getElementById('ul-checkout')
        }

        boxCheckout.total.innerText = "Total de Sku's lidos: " + totalLidos + "/" + todos.length
        if (totalLidos != todos.length) return

        const checkoutTrue = document.getElementById('checkout-true')
        checkoutTrue.classList.remove('hidden')
        checkoutTrue.classList.add('flex')

        boxItems.self.classList.add('hidden')
        // boxCheckout.self.classList.add('hidden')
        document.getElementById('form-area').classList.add('hidden')
    }

    async function enviarPedido() {
        const response = await atualizarPedido('embalado', chavedeacesso) //response será um boolean
        if (!response) return
        window.location.assign(window.location.origin + "/listaAtiva?lista=" + idLista)
    }
    function executarPedido() {
        if (myItens[myItens.length - 1].conferido === true) return //Apenas para ver se tudo ja foi feito antes de comecar a funcao
        // Primeiro precisamos separar o que n sera usado, ou seja o que ja foi bipado
        // Com isso posso usar a funcao filter que retorna o novo valor

        let itens = myItens

        let item = itens.filter(i => i.conferido == false)[0] //Primeiro item do arr
        // Com isso podemos pegar os valores passados pelo input e checarmos se esta batendo com o valor desejado
        const inputText = document.querySelector('#form-area > input')
        console.log(item)
        if (inputText.value !== item.sku) { inputText.value = ''; return } //Aqui retornara a funcao caso os valores nao estejam corretos
        inputText.value = ''

        if (item.totalConferido != item.quantidade) { //Setando item para a quantidade apos termos bipado
            item = updateItens(item, itens)
        }

        if (item.totalConferido == item.quantidade) { //Verificando se todas as bipagens foram feitas
            item.conferido = true
        }

        let index = 0

        for (let i = 0; i < itens.length; i++) {
            if (itens[i].sku == item.sku) index = i
        }
        itens[index] = item
        setItens(itens)

        if (myItens[myItens.length - 1].conferido === true) {
            document.querySelector('#box-checkout > div > footer').style = "background-color: lightgreen"
            finalizado(itens)
            return
        };

        //Nesse ponto tudo ja acabou entao preciso ou resetar as fotos ou finalizar tudo eliminando as imagens etc
        itens = myItens
        item = itens.filter(i => i.conferido == false)[0] //Primeiro item do arr

        updateItens(item, itens, true)
        finalizado(itens)
    }

    useEffect(() => {
        updateItens(myItens.filter(item => item.conferido == false)[0], myItens, true)
    }, [])

    return (
        <main className="flex flex-col gap-2">
            <div className='flex flex-[2] flex-col lg:flex-row p-2 w-full gap-2'>
                <section id='box-items' className='flex gap-1 sm:gap-2 items-center justify-between'>
                    <div className='p-2 border border-wmsGrey  rounded-lg shadow-xl'>
                        <img className='w-[10rem] h-[10rem] sm:w-[12rem] sm:h-[12rem]' id='img-items' alt="Item" />
                    </div>
                    <div className='flex flex-col text-sm sm:text-lg w-[10rem] sm:w-[18rem]'>
                        <div>
                            <p id='sku-items'>Sku:</p>
                            <p id='title-items'>Titulo:</p>
                        </div>
                        <div>
                            <p id='quantidade-items'>Quantidade:</p>
                        </div>
                    </div>
                </section>
                <section id='checkout-true' className='text-sm hidden sm:text-lg flex-col justify-between w-full lg:w-[20rem] min-h-[200px]'>
                    <header className='text-xl text-green-500 sm:text-2xl font-bold flex gap-1 items-center'>
                        <BsFillCheckSquareFill />
                        <h2 >-Conferência completa</h2>
                    </header>

                    <main className="flex flex-col gap-2 items-start">
                        <button className='p-2 rounded bg-green-500 disabled:bg-green-100' onClick={(e) => {
                            document.getElementById("confirmar").classList.remove("imDisabled")
                            document.getElementById("confirmar").classList.remove("bg-green-100")
                            document.getElementById("confirmar").classList.remove("cursor-default")
                            document.getElementById("confirmar").classList.add("bg-green-500")
                            document.getElementById("confirmar").classList.add("cursor-pointer")


                            function appendIframe() {
                                const divToAppend = document.getElementById('append-iframe')

                                if (divToAppend.childNodes.length > 0) return;

                                const iFrame = document.createElement('iframe');
                                iFrame.src = servicesConfig.api.baseURL + "/notas?nf=" + nf
                                iFrame.style = `
                                    width: 30rem;
                                    height: 35rem;
                                    top: 0;
                                    z-index: 1000;
                                `

                                divToAppend.appendChild(iFrame)
                            }
                            e.target.disabled = true
                            appendIframe()
                        }}>Imprimir NF e Etiqueta</button>
                        <button id='confirmar' className='p-2 imDisabled rounded bg-green-100 cursor-default  min-w-max' type='button' onClick={(e) => {
                            let resp = -1
                            for (let i = 0; i < e.target.classList.length; i++) {
                                if (e.target.classList[i] === "imDisabled") resp = i
                            }
                            if (resp > -1) return
                            enviarPedido();

                        }}>Confirmar</button>
                    </main>
                </section>
                <div id="append-iframe"></div>
                <section id='box-checkout' className='flex gap-1 sm:gap-2 items-center justify-center w-full lg:w-[20rem]'>
                    <div className='border-wmsGrey flex flex-col justify-between text-sm sm:text-md  w-full lg:text-xl border rounded-lg shadow-xl  '>
                        <header className='font-semibold h-[15%] border-b p-2  border-wmsGrey'>
                            <h2>Leituras</h2>
                        </header>
                        <main className='overflow-y-scroll h-full '>
                            <ul id="ul-checkout" className='min-h-[12rem]'>
                                {myItens.map((item) => <li id={item.sku} className='flex justify-between pl-2 pr-2'>
                                    <p className='sku'>SKU: {item.sku}</p>
                                    <p id={item.sku + "-total"} className='total'>{item.totalConferido}/{item.quantidade}</p>
                                </li>)}
                            </ul>
                        </main>
                        <footer className='font-semibold h-[15%] border-t p-2  border-wmsGrey'>
                            <h2 id="total-checkout">Total de Sku's lidos:</h2>
                        </footer>
                    </div>
                </section>
            </div>
            <div id='form-area' className='flex w-full p-2  items-center justify-between lg:justify-start gap-2 sm:gap-[2rem] '>
                <input autoFocus={true} onKeyDown={({ key }) => {
                    if (key !== "Enter") return;
                    executarPedido()
                }} type="text" className='border border-wmsPink p-1 sm:p-2 w-[20rem] sm:w-[30rem] rounded text-lg h-[4rem] sm:text-xl' placeholder='Escanear ou inserir sku do produto' />
            </div>

        </main >
    )
}
