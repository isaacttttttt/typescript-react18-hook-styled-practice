import React, {ReactElement, useEffect, useRef, useState, useMemo, ReactEventHandler} from 'react';
import type Props from './types';
import {dataFormat, commonType, columnFormat, dataList} from './types';
import Cell from './components/Cell';
import "./index.scss"

const Table = ({column, config, dataList}: Props) => {
    //数据初始化，排序标识
    const [proxyData, sortProxyData] = useState<Array<dataList>>(() => dataList.slice())
    const [sortFlag, setsortFlag] = useState<boolean>(false)
    //拖拽设置大小事件
    const setColumnWidth = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        const column = (e?.currentTarget as HTMLDivElement).parentNode
        const startX = e.clientX
        const initWidth = (column as HTMLDivElement).clientWidth
        const moveHandle = (moveEvent: MouseEvent) => {
            (column as HTMLDivElement).style.width = initWidth + moveEvent.clientX - startX + 'px'
        }
        document.onmousemove = moveHandle
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    //数据格式打包成列，排序应该也在这里处理。
    const currentData = useMemo(
        () =>
            proxyData
                .reduce((tempDataList: Array<dataFormat[]>, obj, rowIndex) => {
                    Object.values(obj).forEach((value, columnIndex) => {
                        tempDataList[columnIndex].push({rowIndex, columnIndex, value})
                    })
                    return tempDataList
                }, new Array(column.length).fill(0).map(val => []) as Array<dataFormat[]>)
        , [sortFlag])
    //处理Cell的点击事件或者其他事件，后面调整名字
    const [triggeredCell, setCell] = useState<dataFormat>();
    //分页这里要用
    //点击下一页renderIndex应该做出对应变化
    const [renderIndex, setRenderIndex] = useState<number>(0)
    const renderNum: number = config?.pagination ? (config?.paginationNum ?? 30) : Infinity;
    //渲染单独列
    const renderColumn = ({sortable, columnIndex, customDesign, title, sortFunc}: columnFormat, columnData: Array<dataFormat>): ReactElement => {
        //当前要渲染的数据
        const currentColumnData = (columnData.slice(renderIndex, renderIndex + renderNum + 1));
        //列的排序函数函数
        const sortColumnData = () => {
            if (sortFlag)
                sortProxyData(preData => preData.sort((pre, next) => sortable && sortFunc ? sortFunc(pre, next) : 0))
            else
                sortProxyData(preData => preData.sort((pre, next) => sortable && sortFunc ? 0 - sortFunc(pre, next) : 0))

            setsortFlag(flag => !flag)
        }
        const sortableIcon = (row: commonType, column: commonType, title: commonType) => {
            return sortable ?
                (
                    <div className="cell-sort-wrap" >
                        {title}
                    </div>
                ) : (
                    <div className="cell-inner" >
                        {title}
                    </div>
                )
        }
        //行交叉渲染背景色
        let isIntersected = true
        const isRenderColor = (): string => {
            if (!config?.rowIntersected)
                return ''
            isIntersected = !isIntersected
            return isIntersected ? ' intersected' : ''
        }
        return (
            <div className='table-column' key={title} >
                <div className='title' onMouseDown={(e) => setColumnWidth(e)} >
                    <Cell
                        rowIndex={-1}
                        columnIndex={columnIndex}
                        value={title}
                        customDesign={sortableIcon}
                        titleClickHandle={sortable ? () => sortColumnData() : null}
                    />
                </div>
                {
                    currentColumnData.map(({rowIndex, columnIndex, value}) => {
                        return (
                            <div className={'cell-mask' + isRenderColor()} key={rowIndex + ':' + columnIndex}>
                                <Cell
                                    rowIndex={rowIndex}
                                    value={value}
                                    columnIndex={columnIndex === 0 ? -1 : columnIndex}
                                    customDesign={customDesign}
                                    key={rowIndex + ':' + columnIndex}
                                />
                            </div>)
                    })
                }
            </div>
        )
    }
    //渲染所有列
    const renderColumns = (): ReactElement => {
        const columns = column.map((columnTitle: columnFormat, index: number) => renderColumn(columnTitle, currentData[index]))

        return (
            <div className="table-columns" >
                {columns}
            </div>
        )
    }
    return (
        <div className="table-warp" >
            <div className="table-content-warp">
                {/* 下面这里好像有点不规范，应该改成和上面renderRow一样的格式，就这样吧 */}
                {renderColumns()}
            </div>
            <div className="table-footer-warp">

            </div>
        </div>
    )
}
export default Table;