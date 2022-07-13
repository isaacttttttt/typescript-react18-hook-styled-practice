import UseRequestView from "src/ahooksComponents/UseRequestView"
import Table from "src/commonComponents/Table"
import { dataFormat } from "src/commonComponents/Table/types"
const row = [
  { rowIndex: 0, title: '唐浩天' },
]
const coulmn = [
  { sortable: false, coulmnIndex: 0, title: '年龄' },
  { sortable: false, coulmnIndex: 1, title: '性别' },
  { sortable: false, coulmnIndex: 2, title: '星座' },
  { sortable: false, coulmnIndex: 3, title: '出生日期' },
]
const data: Array<dataFormat[]> = [
  [{ rowIndex: 0, coulmnIndex: 0, value: 18 }],
  [{ rowIndex: 0, coulmnIndex: 1, value: '男' }],
  [{ rowIndex: 0, coulmnIndex: 2, value: '双鱼' }],
  [{ rowIndex: 0, coulmnIndex: 3, value: '2002' }],
]
const jsondata = [{ 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2001' }]
const data2 = jsondata.reduce((datalist, obj, rowIndex) => {
  const ary = Object.values(obj)
  ary.forEach((value, coulmnIndex) => {
    datalist[coulmnIndex].push({ rowIndex, coulmnIndex, value })
  })
  return datalist
}, [[], [], [], []] as Array<dataFormat[]>)
console.log(data2)
export default () => {
  return (
    <div>
      <UseRequestView />
      <Table row={row} coulmn={coulmn} data={data} />
    </div>
  )
}