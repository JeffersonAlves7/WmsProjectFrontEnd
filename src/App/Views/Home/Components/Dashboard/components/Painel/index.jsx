import Arrow from '../../../../../../Components/Buttons/Arrow'

export default function Painel(props) {
    const { span, title } = props
    return (
        <div className={props.className ? props.className : null}>
            <h2 className='text-2xl'>{title}</h2>
            <div className='border bg-gray-100 border-gray-300 shadow-xl flex w-[280px] justify-between pl-5 pr-5 rounded-2xl'>
                <Arrow length="40px" />
                <span className='text-[5rem]'>{span}</span>
            </div>
        </div>
    )
}