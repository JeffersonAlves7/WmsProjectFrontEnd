import { BsArrowRight } from 'react-icons/bs'

export default function Arrow(props) {
    const { length } = props
    return (
        <div title={props.title ? props.title : "arrow"}>
            <BsArrowRight className='text-wmsPink' style={{
                fontSize: length
            }} />
        </div>
    )
}