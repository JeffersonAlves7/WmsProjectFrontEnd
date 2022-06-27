import { BsArrowRight } from 'react-icons/bs'

export default function Arrow(props) {
    const { length } = props
    const fn = props.fn ? props.fn : null
    return (
        <button title={props.title ? props.title : "arrow"} type="button" onClick={fn}>
            <BsArrowRight className='text-wmsPink hover:text-wmsPurple' style={{
                fontSize: length
            }} />
        </button>

    )
}