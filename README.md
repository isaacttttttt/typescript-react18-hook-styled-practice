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
eventHandle?: (columnIndex: commonType, rowIndex: commonType, value: commonType, type: string)=> void;
//这里拟接受一个绑定在cell上的任意事件,返回一个CoulmnIndex，rowIndex，value,type为类似事件的名称，类似于eventlistener的第一个参数
rowIntersected?: boolean;//行交叉颜色
columnIntersected?: boolean;//列交叉颜色
```


