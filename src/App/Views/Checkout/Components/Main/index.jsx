import { useState, useEffect } from "react"
import Management from '../Management/index'

export default (props) => {
    const [itens, setItens] = useState([''])

    useEffect(() => {
        setItens(props.itens)
    }, [props.itens])

    if (!itens[0]) return

    return (
        <Management {...props} />
    )
}