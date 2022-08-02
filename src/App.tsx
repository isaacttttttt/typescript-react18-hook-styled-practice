import UseRequestView from "src/ahooksComponents/UseRequestView"
import Table from "src/commonComponents/Table"
import Button from "./commonComponents/Button"
import {dataList} from 'src/commonComponents/Table/types'
import styled from 'styled-components';
interface data {
  姓名: string,
  年龄: number,
  性别: string,
  出生日期: string,
  出生日期1: string,
  出生日期2: string,
  出生日期3: string
}

const jsondata = [
  {姓名: '1', 年龄: 11, 性别: '男', 星座: '双鱼', 出生日期: '2001/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '2', 年龄: 19, 性别: '男', 星座: '双鱼', 出生日期: '2001/2/22', 出生日期1: '2021', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '3', 年龄: 21, 性别: '男', 星座: '双鱼', 出生日期: '2001/2/25', 出生日期1: '2000', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '4', 年龄: 55, 性别: '男', 星座: '双鱼', 出生日期: '2011/1/21', 出生日期1: '201', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '5', 年龄: 1, 性别: '男', 星座: '双鱼', 出生日期: '2051/2/21', 出生日期1: '2023', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '6', 年龄: 5, 性别: '男', 星座: '双鱼', 出生日期: '2031/2/21', 出生日期1: '2025', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '7', 年龄: 37, 性别: '男', 星座: '双鱼', 出生日期: '2101/2/21', 出生日期1: '2002', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '8', 年龄: 48, 性别: '男', 星座: '双鱼', 出生日期: '2021/2/21', 出生日期1: '2011', 出生日期2: '132132', 出生日期3: '231321111111111111111132'},
  {姓名: '9', 年龄: 22, 性别: '男', 星座: '双鱼', 出生日期: '1901/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '10', 年龄: 15, 性别: '男', 星座: '双鱼', 出生日期: '1971/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '11', 年龄: 12, 性别: '男', 星座: '双鱼', 出生日期: '1981/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '12', 年龄: 222, 性别: '男', 星座: '双鱼', 出生日期: '2201/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '13', 年龄: 52, 性别: '男', 星座: '双鱼', 出生日期: '2021/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '14', 年龄: 7, 性别: '男', 星座: '双鱼', 出生日期: '2011/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '15', 年龄: 19, 性别: '男', 星座: '双鱼', 出生日期: '2003/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '16', 年龄: 28, 性别: '男', 星座: '双鱼', 出生日期: '2004/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '17', 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2005/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '18', 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2006/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '19', 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2007/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '20', 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2008/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '21', 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2009/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
  {姓名: '22', 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2001/2/21', 出生日期1: '2022', 出生日期2: '132132', 出生日期3: '23132132'},
];
const column = [
  {sortable: false, columnIndex: 0, title: '姓名'},
  {
    sortable: true,
    columnIndex: 1,
    title: '年龄',
    sortFunc:
      function (pre: data, next: data): number {
        return pre['年龄'] - next['年龄']
      }
  },
  {sortable: false, columnIndex: 2, title: '性别'},
  {sortable: false, columnIndex: 3, title: '星座'},
  {sortable: false, columnIndex: 4, title: '出生日期'},
  {
    sortable: true,
    columnIndex: 5,
    title: '出生日期1',
    sortFunc: (pre: data, next: data) => {
      return parseInt(pre['出生日期1']) - parseInt(next['出生日期1'])
    }
  },
  {sortable: false, columnIndex: 6, title: '出生日期2'},
  {sortable: false, columnIndex: 7, title: '出生日期3'},
]
const config = {
  pagination: true,
  paginationNum: 10,
  rowIntersected: true,
  columnIntersected: false,
  eventHandle: (columnIndex: number, rowIndex: number, value: string, selectedRow: dataList) => {
    console.log(columnIndex, rowIndex, value)
    console.log(selectedRow)
  }
}
const MyCanvas = styled.div`
position: relative;
 width: 100vw;
 height: 100vh;
 background: #f0f0f0
`
const app = () => {
  return (
    <div>
      <UseRequestView />
      <br></br>
      <MyCanvas>
        <Table column={column} dataList={jsondata} config={config} />
        <Button
          value='点我'
          width={108}
          height={78}
          backgroundColor={'#186ab1'}
          color='white' borderRadius={15}
        />
      </MyCanvas>
    </div >

  )
}
export default app
