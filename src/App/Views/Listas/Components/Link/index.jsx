export default (props) => {
    const { text, href, activated } = props

    const classSum = {
        true: "border-b border-b-wmsPink",
        false: "",
    }
    return (
        <li className={classSum[activated]} key={text + href}>
            <a className="text-2xl text-center cursor-pointer drop-shadow-lg" href={href}>{text}</a>
        </li>
    )
}