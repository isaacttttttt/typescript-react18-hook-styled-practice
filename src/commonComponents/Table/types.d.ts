import { dataFormat, coulmnDataFormat } from './types.d';
import { ReactElement } from "react";

/**
 * @author herotang 2022/7/7
 * @description 用于定义Table组件接受参数类型
 */

export type commonType = string | number;
//表格接受数据格式
export interface dataFormat {
    rowIndex: commonType;
    coulmnIndex: commonType;
    value: commonType
}
//表单接受数据
export type coulmnDataFormat = Array<dataFormat>;

//行索引数据格式
interface rowFormat {
    rowIndex: commonType;
    title: commonType
}
//列索引数据格式
export interface coulmnFormat {
    sortable: boolean;
    coulmnIndex: commonType;
    title: commonType;
    customDesign?: (rowIndex: commonType, coulmnIndex: commonType, value: commonType) => any;
};

//配置项格式
type configFormat = {
    pagination: boolean;
    paginationNum: number;
    ceilHover: boolean;
    rowHover: boolean;
    eventHandle: (coulmnIndex: commonType, rowIndex: commonType, value: commonType, type: string) => void
}
export default interface Props {
    coulmn: Array<coulmnFormat>;
    row: Array<rowFormat>;
    data: Array<coulmnDataFormat>;
    config?: configFormat;
}