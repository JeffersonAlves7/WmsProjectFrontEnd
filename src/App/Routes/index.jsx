import {
    Home,

    Embalar,
    Checkout,
    ListaAtiva,

    ListaPedidos,
    ListaDeColeta,
    ListaSituacao,
    ListaDeSeparacao,

    Historico,
    Pedido
} from '../Views/index';

import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/historico" element={<Historico />} />
                <Route path="/pedido" element={<Pedido />} />

                <Route path="/embalar" element={<Embalar />} />
                <Route path="/listaAtiva" element={<ListaAtiva />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/listas" element={<ListaSituacao />} />
                <Route path="/listapedidos" element={<ListaPedidos />} />
                <Route path="/listadecoleta" element={<ListaDeColeta />} />
                <Route path="/listadeseparacao" element={<ListaDeSeparacao />} />
            </Routes>
        </BrowserRouter>
    )
}