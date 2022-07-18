import {ReactElement, useEffect, useRef, useState, useMemo} from 'react';
import type Props from './types';
import {dataFormat, commonType, coulmnFormat, dataList} from './types';
import Ceil from './components/Ceil';
import "./index.scss"

export default ({row, coulmn, config, dataList}: Props) => {
    const [rowCoulmnFixed, setFixed] = useState<boolean>(false)
    const [proxyData, sortProxyData] = useState<Array<dataList>>(dataList)
    const [sortFlag, setsortFlag] = useState<boolean>(false)
    const rowCoulmnRef = useRef<HTMLDivElement>(null)
    //数据格式打包成列，排序应该也在这里处理。
    const currentData = useMemo(
        () =>
            proxyData
                .reduce((tempDataList: Array<dataFormat[]>, obj, rowIndex) => {
                    Object.values(obj).forEach((value, coulmnIndex) => {
                        tempDataList[coulmnIndex].push({rowIndex, coulmnIndex, value})
                    })
                    return tempDataList
                }, new Array(coulmn.length).fill(0).map(val => []) as Array<dataFormat[]>)
        , [proxyData, sortFlag])
    //处理Ceil的点击事件或者其他事件，后面调整名字
    const [triggeredCeil, setCeil] = useState<dataFormat>();
    //分页这里要用
    const [renderIndex, setRenderIndex] = useState<number>(0)
    const renderNum: number = config?.paginationNum ?? 20;
    //渲染单独列
    const renderCoulmn = ({sortable, coulmnIndex, customDesign, title, sortFunc}: coulmnFormat, coulmnData: Array<dataFormat>): ReactElement => {
        //当前要渲染的数据
        const currentCoulmnData = (coulmnData.slice(renderIndex, renderIndex + renderNum + 1));
        //列的排序函数函数
        const sortCoulmnData = () => {
            if (sortFlag)
                sortProxyData(preData => preData.sort((pre, next) => sortable && sortFunc ? sortFunc(pre, next) : 0))
            else
                sortProxyData(preData => preData.sort((pre, next) => sortable && sortFunc ? 0 - sortFunc(pre, next) : 0))

            setsortFlag(flag => !flag)
        }
        const sortableIcon = (row: commonType, coulmn: commonType, title: commonType) => {
            return sortable ?
                (
                    <div className="ceil-sort-wrap" onClick={sortCoulmnData}>
                        {title}
                    </div>
                ) : (
                    <div className="ceil-inner" >
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
                    currentCoulmnData.map(({rowIndex, coulmnIndex, value}) => {
                        return <Ceil rowIndex={rowIndex} value={value} coulmnIndex={coulmnIndex} customDesign={customDesign} key={rowIndex + ':' + coulmnIndex}></Ceil>
                    })
                }
            </div>
        )
    }
    //渲染单独行名列
    const renderRows = (): ReactElement => {
        const currentRow = row.slice(renderIndex, renderIndex + renderNum + 1)
        return (
            <div className='table-rowcoulmn' ref={rowCoulmnRef}>
                <div className='title' >
                    <Ceil rowIndex={-1} coulmnIndex={-1} value={'序号'} ></Ceil>
                </div>
                {
                    currentRow.map(({rowIndex, title}) => {
                        return <Ceil rowIndex={rowIndex} value={title} coulmnIndex={-1} key={rowIndex + '' + '-1'}></Ceil>
                    })
                }
            </div>
        )
    }
    //渲染所有列
    const renderCoulmns = (): ReactElement => {
        const coulmns = coulmn.map((coulmnTitle: coulmnFormat, index: number) => renderCoulmn(coulmnTitle, currentData[index]))
        return (
            <div className="table-coulmns">
                {coulmns}
            </div>
        )
    }
    return (
        <div className="table-warp" >
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