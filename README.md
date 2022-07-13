## 项目目的
学习TS搭配React的规范和标准开发模式。实在受够了JS的不规范和随意所以特此开个项目练习TS。
## 技术范围
设计到几乎所有实际开发中所需用到。
目前有：
    **AJAX+AHOOKS+LESS+REACT+REACT+REDUX (TOOLKIT)**
## 数据处理
为方便进行建议的行列锁定会将记录拆成竖直的数据条。
这里提供一个建议的方法来进行数据处理

```ts
const jsondata = [{ 年龄: 18, 性别: '男', 星座: '双鱼', 出生日期: '2001' }]
const data2 = jsondata.reduce((datalist, obj, rowIndex) => {
    Object.values(obj).forEach((value, coulmnIndex) => {
        datalist[coulmnIndex].push({ rowIndex, coulmnIndex, value })
    })
    return datalist
}, [[], [], [], []] as Array<dataFormat[]>)
```
