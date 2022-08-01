## 项目目的
学习TS搭配React的规范和标准开发模式。实在受够了JS的不规范和随意所以特此开个项目练习TS。
## 技术范围
设计到几乎所有实际开发中所需用到。
目前有：
    **AJAX+AHOOKS+LESS+REACT+REACT+REDUX (TOOLKIT)**
## 数据处理
为方便进行建议的行列锁定会将记录拆成竖直的数据条。<br>
参数说明:
-config
```js
pagination?: boolean;//是否开启翻页
paginationNum?: number;//一页数量 若未开启翻页则为Infinity，开启不给则为默认值30
cellHover?: boolean;//是否启用cellHover
rowHover?: boolean;//是否启用rowHover
eventHandle?: (columnIndex: commonType, rowIndex: commonType, value: commonType)=> void;
//这里拟接受一个绑定在cell上的任意事件,返回一个CoulmnIndex，rowIndex，value,type为类似事件的名称，类似于eventlistener的第一个参数
  //type待添加
rowIntersected?: boolean;//行交叉颜色
columnIntersected?: boolean;//列交叉颜色
```

-column
需和datalist列长度对齐
```js
sortable: boolean;//是否排序
sortFunc?: (pre: any, next: any) => number;
//排序方法，在外界传过来的时候最好指定当前参数data类型，这里接受的是一个行数据格式，你需要在参数类型断言时标识coulmn
/*
*@example
*interface data {
*  姓名: string,
*  年龄: number,
*  性别: string,
*  出生日期: string,
*}
*/
columnIndex: commonType; //index 可以是number|string
title: commonType;//同上
customDesign?: (rowIndex: commonType, columnIndex: commonType, value: commonType) => ReactElement;
//自定义cell内的样式，可以时任何标签但是需要自定义返回一个Element
//自动对齐
//如果自定义样式中加入事件类型和config里EvnentHanldeType一样需要在此事件中阻止冒泡。(stopPropagation)
```

-dataList
type:Array<data>
这里要注意data的列数对齐，否则会报错

