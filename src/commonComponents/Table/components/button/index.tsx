import './index.scss'
interface Props {
    clickFunc: (type?: string) => any
    inner: string | number
}
const button = ({clickFunc, inner}: Props) => {

    return (
        <div className="pagebutton-wrap" onClick={() => clickFunc()}>
            <span>{inner}</span>
        </div>
    )
}
export default button