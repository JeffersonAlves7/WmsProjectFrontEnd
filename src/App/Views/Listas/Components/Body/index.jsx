import api from '../../../../api/index'
import { useEffect, useState } from 'react'
import Row from '../Row/index'

export default (props) => {
    const { value } = props //Value must be criar | emandamento | finalizado

    const [itens, setItens] = useState([{
        idprincipal: "",
        canal: "",
        situacao: "",
        pedidos: ""
    }]);

    useEffect(() => {
        api.get(`/listas?situacao=${value}`).then((res) => {
            console.log(res)
            setItens(res.data.response)
        });
    }, [])

    return (
        <tbody>
            {itens.map(item => <Row {...item} value={value} />)}
        </tbody>
    )
}