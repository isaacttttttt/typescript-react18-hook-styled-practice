/**
 * @author herotang 2022/7/7
 * @description 用于定义Table组件接受参数类型
 */
import {ReactElement} from "react";
export type commonType = string | number;
//表格接受数据格式
export interface dataFormat {
  rowIndex: commonType;
  columnIndex: commonType;
  value: commonType;
}
//表单接受数据
export type columnDataFormat = Array<dataFormat>;
export interface dataList {
  [columnName: commonType]: commonType
}
//行索引数据格式

//列索引数据格式
export interface columnFormat {
  sortable: boolean;
  sortFunc?: (pre: any, next: any) => number;
  columnIndex: commonType;
  title: commonType;
  customDesign?: (rowIndex: commonType, columnIndex: commonType, value: commonType) => ReactElement;
};

//配置项格式
type configFormat = {
  pagination?: boolean;
  paginationNum?: number;
  cellHover?: boolean;
  rowHover?: boolean;
  eventHandle?: (columnIndex: number, rowIndex: number, value: string, selected: dataList) => any;
  rowIntersected?: boolean;
  columnIntersected?: boolean;
}
export default interface Props {
  column: Array<columnFormat>;
  dataList: Array<dataList>
  config?: configFormat;
}
