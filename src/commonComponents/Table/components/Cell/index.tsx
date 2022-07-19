import {ReactElement} from "react";
import type {dataFormat, commonType} from "../../types"
import "./index.scss";
interface spcificHandle {
    customDesign?: (rowIndex: commonType, columnIndex: commonType, value: commonType) => ReactElement;
    titleClickHandle?: ((e: React.MouseEvent) => void) | null;
}
const Cell = ({rowIndex, columnIndex, value, customDesign, titleClickHandle}: dataFormat & spcificHandle) => {
    return (
        <div
            className="cell-wrap"
            data-row={rowIndex}
            data-column={columnIndex}
            onClick={(e) => {
                if (titleClickHandle) titleClickHandle(e)
            }}>

            {
                customDesign ?
                    customDesign(rowIndex, columnIndex, value)
                    :
                    <span className="cell-inner">{value}</span>
            }
        </div >
    )
}
export default Cell;