import { useState } from "react";
import Arrow from "../../../Buttons/Arrow/index"
import { HiOutlineMinus } from "react-icons/hi"

export default function Links() {
    const [display, setDisplay] = useState(false)

    const listDisplay = {
        false: "hidden",
        true: "block"
    }

    return (
        <ul className="sm:pt-[10rem] pt-64 text-3xl sm:block grid justify-center">
            <li className="flex items-center text-white transition-colors duration-200 hover:text-wmsLightPink">
                <HiOutlineMinus className="rotate-90 text-wmsPink" />
                <a href="/">Painel</a>
            </li>
            <li className="flex items-center text-white transition-colors duration-200 hover:text-wmsLightPink">
                <HiOutlineMinus className="rotate-90 text-wmsPink" />
                <button type="button" title="pedidos" onClick={() => {
                    setDisplay(!display)
                }}>
                    Pedidos
                </button>
            </li>
            <ul className={"transition-all pl-5 flex-col duration-200 " + listDisplay[display]}>
                <li className="flex items-center text-2xl transition-colors duration-200 text-white hover:text-wmsLightPink">
                    <Arrow length="2rem" />
                    <a href="/listas">Listas</a>
                </li>
                <li className="flex items-center text-2xl transition-colors duration-200 text-white hover:text-wmsLightPink">
                    <Arrow length="2rem" />
                    <a href="/embalar">Embalar</a>
                </li>
                <li className="flex items-center text-2xl transition-colors duration-200 text-white hover:text-wmsLightPink">
                    <Arrow length="2rem" />
                    <a href="/historico">Histórico</a>
                </li>
            </ul>
        </ul>
    );
}