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
 * @description receive <T> to mark ResponseData
 * @param {string} url request
 * @param {Props.config} config
 * @member {<T>} ResponseData
 */
export const makeRequest = <T>({ url, config }: Props) => {
    //return a Promise to fakse ajaxrequest
    //ignore <T> here.When MockData
    return async (): Promise<T> => {
        let data = await fetch(baseUrl + url, config).then(res => res.json())
        return Promise.resolve(data)
    }

}