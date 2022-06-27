import { useState, useEffect } from "react"
import Management from '../Management/index'

export default (props) => {
    const [itens, setItens] = useState([''])

    useEffect(() => {
        setItens(props.itens)
    }, [props.itens])

    if (!itens[0]) return

    return (
        <main className="flex flex-col gap-2">
            <Management itens={itens} nf={props.nf} chavedeacesso={props.chavedeacesso} />
        </main>
    )
}