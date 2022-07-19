import React, {ReactElement, useEffect, useRef, useState, useMemo, ReactEventHandler} from 'react';
import {dataFormat, commonType, columnFormat, dataList} from './types';
import {getCellData} from './util';
import Cell from './components/Cell';
import MyButton from './components/button';
import type Props from './types';
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
    //分页这里要用
    //点击下一页renderIndex应该做出对应变化
    const renderNum: number = config?.pagination ? (config?.paginationNum ?? 30) - 1 : Infinity;
    const [currentPage, setCurrentPage] = useState<number>(1)
    const renderIndex = useMemo(() => (currentPage - 1) * renderNum, [currentPage])
    const dataLength = dataList.length
    const totalPage = Math.ceil(dataLength / renderNum)
    const flipPage = (type: 'pre' | 'next') => {
        switch (type) {
            case 'pre':
                if (currentPage > 1) {
                    setCurrentPage(page => page - 1)
                }
                break
            case 'next':
                if (currentPage < totalPage) {
                    setCurrentPage(page => page + 1)
                }
                break
        }
    }
    //渲染footer按钮
    const renderPage = () => {
        const startBtn = (
            <div className={"button-outter" + (currentPage === 1 ? ' disable' : '')}>
                <MyButton inner={'<'} clickFunc={() => flipPage('pre')} />
            </div>)
        const endBtn = (
            <div className={"button-outter" + (currentPage === totalPage ? ' disable' : '')}>
                <MyButton inner={'>'} clickFunc={() => flipPage('next')} />
            </div>)
        return (
            <div className='table-root-content'>
                {startBtn}
                <div className='page-to-wrap'>
                    <input className='page-to-input' value={currentPage} onChange={(e) => setCurrentPage(parseInt((e.target as HTMLInputElement).value))}></input>
                    <span className='page-num'>/ {totalPage}</span>
                </div>
                {endBtn}
            </div>
        )
    }
    //事件委托
    const clickHandle = (e: React.MouseEvent) => {
        const selectedCell = getCellData(e.target as HTMLElement)
        if (Object.keys(selectedCell).length < 3)
            return
        const {column, row, value} = selectedCell
        if (row === '-1')
            return
        config?.eventHandle ? config?.eventHandle(parseInt(column), parseInt(row), value, proxyData[parseInt(row)]) : null
    }
    //渲染单独列
    const renderColumn = ({sortable, columnIndex, customDesign, title, sortFunc}: columnFormat, columnData: Array<dataFormat>): ReactElement => {
        //当前要渲染的数据
        const currentColumnData = (columnData.slice(renderIndex, renderIndex + renderNum + 1));
        //列的排序函数函数
        const sortColumnData = (e: React.MouseEvent) => {
            e.stopPropagation()
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
                        titleClickHandle={sortable ? (e: React.MouseEvent) => sortColumnData(e) : null}
                    />
                </div>
                {
                    currentColumnData.map(({rowIndex, columnIndex, value}) => {
                        return (
                            <div className={'cell-mask' + isRenderColor()} key={rowIndex + ':' + columnIndex}>
                                <Cell
                                    rowIndex={rowIndex}
                                    value={value}
                                    columnIndex={columnIndex}
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
            <div className="table-columns" onClick={e => clickHandle(e)}>
                {columns}
            </div>
        )
    }
    return (
        <div className="table-wrap" >
            <div className="table-content-wrap">
                {renderColumns()}
            </div>
            <div className="table-footer-wrap">
                {config?.pagination ? renderPage() : null}
            </div>
        </div>
    )
}
export default Table;