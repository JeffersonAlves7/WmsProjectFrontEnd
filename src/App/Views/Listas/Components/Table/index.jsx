import Body from '../Body/index'

function Th({ title }) { return (<th className='text-xl'>{title}</th>) }

export default (props) => {
    const { titles, value } = props

    titles.filter((value, index) => index < 5)
    const Titles = titles.map(title => <Th title={title} />)


    const cols = value != 'finalizado' ? "20% 20% 20% 1fr" : "1fr 1fr 1fr"

    return (
        <table className='w-full'>
            <thead className='w-full'>
                <tr style={{
                    gridTemplateColumns: cols,
                }} className="grid justify-items-center border-b-2 border-b-wmsGrey">
                    {Titles}
                </tr>
            </thead>
            <Body value={value} />
        </table>
    )
}