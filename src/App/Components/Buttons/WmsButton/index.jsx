function Link(props) {
    const { text, href, className } = props
    return (
        <a className={className} href={href}>{text}</a>
    )
}
function Button(props) {
    const { text, fn, className } = props

    return (
        <button className={className} onClick={fn}>
            {text}
        </button>
    )
}

export default (props) => {
    const { type } = props

    const className = "p-1 hover:cursor-pointer text-sm sm:pl-4 sm:pr-4 sm:text-md text-center font-semibold block  bg-wmsLightPink hover:bg-cyan-300 rounded shadow-md"

    if (type == "button") return (<Button className={className} {...props} />)
    if (type == "link") return (<Link className={className} {...props} />)

    return (<Link className={className} {...props} />)
}