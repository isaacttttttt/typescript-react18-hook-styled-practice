import { ReactElement } from "react";
import type { dataFormat, commonType } from "../../types"
import "./index.scss";
interface spcificHandle {
    customDesign?: (rowIndex: commonType, coulmnIndex: commonType, value: commonType) => ReactElement;
}
export default ({ rowIndex, coulmnIndex, value, customDesign }: dataFormat & spcificHandle) => {
    return (
        <div className="ceil-wrap" data-row={ rowIndex } data-coulmn={ coulmnIndex }>

            {
                customDesign ?
                    customDesign(rowIndex, coulmnIndex, value)
                    :
                    <span className="ceil-inner">{ value }</span>
            }
        </div>
    )
}