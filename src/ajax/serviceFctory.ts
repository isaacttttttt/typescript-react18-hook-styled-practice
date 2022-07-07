interface Props {
    url: string,
    config: {
        mode: "cors" | "no-cors",
        method: 'GET' | 'POST',
        headers?: { [PropName: string]: string }
    }
}
const baseUrl = 'http://127.0.0.1:8081'
/**
 * @description 用于生产规范FETCH请求的工厂函数
 * @author HeroTang 2022/07/06
 * @return {()=>Promise<T>} --返回asyncFetchFunction
 * @param {string} url      --请求URL
 * @param {config} config   --默认配置为空
 * @member {<T>} DataType   --接受泛型T来标记返回数据类型
 */
export const makeRequest = <T>({ url, config }: Props): () => Promise<T> => {
    //return a Promise to fakse ajaxrequest
    //ignore <T> here.When MockData
    return async (): Promise<T> => {
        let data = await fetch(baseUrl + url, config).then(res => res.json())
        return Promise.resolve(data)
    }

}