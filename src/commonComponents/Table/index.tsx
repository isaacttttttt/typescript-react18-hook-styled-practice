import { ReactHTMLElement, useState } from 'react';
import type Props from './types';
import { dataFormat, commonType, coulmnFormat } from './types';
import Ceil from './components/Ceil';
import "./index.scss"
export default ({ row, coulmn, data, config }: Props) => {
    const [clickedCeil, setCeil] = useState<dataFormat>();
    const renderCoulmn = ({ sortable, coulmnIndex, customDesign }: coulmnFormat) => {
        return (
            <div>
            </div>
        )
    }
    return (
        <div className="table-warp">
            {coulmn.map(option => {
                return renderCoulmn(option)
            })}
        </div>
    )
}