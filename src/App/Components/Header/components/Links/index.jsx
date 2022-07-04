import Arrow from "../../../Buttons/Arrow/index"
import { HiOutlineMinus } from "react-icons/hi"

export default function Links() {

    return (
        <ul className="sm:pt-[10rem] pt-64 text-3xl sm:block grid justify-center">
            <li className="flex items-center text-white transition-colors duration-200 hover:text-wmsLightPink">
                <HiOutlineMinus className="rotate-90 text-wmsPink" />
                <a href="/">Painel</a>
            </li>
            <li className="flex items-center text-white transition-colors duration-200 hover:text-wmsLightPink">
                <label htmlFor="header_button">
                    <input type="checkbox" id="header_button" />
                    <div className="flex">
                        <HiOutlineMinus className="rotate-90 text-wmsPink" />
                        <span className="hover:cursor-pointer" title="pedidos">Pedidos</span>
                    </div>
                    <ul id="ul_to_hide">
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
                </label>
            </li>
        </ul>
    );
}