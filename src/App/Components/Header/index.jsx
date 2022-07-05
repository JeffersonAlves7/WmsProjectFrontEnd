import Hamburguer from '../Buttons/Hamburguer/index'
import { useState } from 'react'
import Links from './Links'
import barrareylogopainel from "../../img/barrareylogopainel.png"

export default function Header() {
    const [menuState, setMenuState] = useState(false);

    const navClass = {
        true: "left-[0]",
        false: "sm:left-[-35%] left-[-100%]"
    }

    return (
        <header>
            <main className='bg-wmsPink absolute w-[100%] shadow-2xl z-20 h-[100px] flex gap-10 items-center pl-10 pr-10'>
                <Hamburguer length="3rem" fn={() => {
                    setMenuState(!menuState)
                }} />
                <a href="/">
                    <img src={barrareylogopainel} alt="" className='max-w-[200px]' />
                </a>
            </main>
            <nav className={navClass[menuState] + " w-[100%] z-10 top-0 sm:w-[200px] fixed transition-all h-screen ease-in-out duration-500 bg-wmsGrey"}>
                <Links />
            </nav>
        </header>
    )
}