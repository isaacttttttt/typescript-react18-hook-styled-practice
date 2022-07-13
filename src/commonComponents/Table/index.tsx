import { ReactElement, useState } from 'react';
import type Props from './types';
import { dataFormat, commonType, coulmnFormat } from './types';
import Ceil from './components/Ceil';
import "./index.scss"
export default ({ row, coulmn, data, config }: Props) => {
    //处理Ceil的点击事件或者其他事件，后面调整名字
    const [triggeredCeil, setCeil] = useState<dataFormat>();
    //分页这里要用
    const [renderIndex, setRenderIndex] = useState<number>(0)
    const renderNum: number = config?.paginationNum ?? 20;
    //渲染单独列
    const renderCoulmn = ({ sortable, coulmnIndex, customDesign, title }: coulmnFormat, coulmnData: Array<dataFormat>): ReactElement => {
        const [currentCoulmnData, setCoulmnData] = useState<Array<dataFormat>>(coulmnData.slice(renderIndex, renderIndex + renderNum + 1));
        const sortCoulmnData = () => {
            setCoulmnData(pre => pre.sort())
        }
        const sortableIcon = (row: commonType, coulmn: commonType, title: commonType) => {
            return sortable ?
                (
                    <div className="table-coulmn-sort-warp" onClick={sortCoulmnData}>
                        {title}
                    </div>
                ) : (
                    <div className="table-coulmn-inner" >
                        {title}
                    </div>
                )
        }
        return (
            <div className='table-coulmn' key={title}>
                <div className='title' >
                    <Ceil rowIndex={-1} coulmnIndex={coulmnIndex} value={title} customDesign={sortableIcon}></Ceil>
                </div>
                {
                    coulmnData.map(({ rowIndex, coulmnIndex, value }) => {
                        return <Ceil rowIndex={rowIndex} value={value} coulmnIndex={coulmnIndex} customDesign={customDesign} key={rowIndex + '' + coulmnIndex}></Ceil>
                    })
                }
            </div>
        )
    }
    //渲染单独行名列
    const renderRows = (): ReactElement => {
        return (
            <div className='table-rowcoulmn'>
                <div className='title' >
                    <Ceil rowIndex={-1} coulmnIndex={-1} value={'序号'} ></Ceil>
                </div>
                {
                    row.map(({ rowIndex, title }) => {
                        return <Ceil rowIndex={rowIndex} value={title} coulmnIndex={-1} key={rowIndex}></Ceil>
                    })
                }
            </div>
        )
    }
    //渲染所有列
    const renderCoulmns = (): ReactElement => {
        const coulmns = coulmn.map((coulmnTitle: coulmnFormat, index: number) => renderCoulmn(coulmnTitle, data[index]))
        return (
            <div className="table-coulmns">
                {coulmns}
            </div>
        )
    }
    return (
        <div className="table-warp">
            <div className="table-content-warp">
                {renderRows()}
                {/* 下面这里好像有点不规范，应该改成和上面renderRow一样的格式，就这样吧 */}
                {renderCoulmns()}
            </div>
            <div className="table-footer-warp">

            </div>
        </div>
    )
}