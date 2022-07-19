import {useRequest} from 'ahooks';
import {useState} from 'react';
import {getUserInfo} from 'src/ajax';
import type {userInfo} from 'types/user'
import TextLoading from 'src/commonComponents/TextLoading';
import './index.less'
interface Props {

}

const RequestView = (props: Props) => {
    const [state, setState] = useState<userInfo | null>()
    const resolveHandle = (data: userInfo) => {
        setState(data)
    }
    const {data, error, loading} = useRequest(getUserInfo, {
        onSuccess: resolveHandle
    })
    return (
        <div>
            {
                loading ?
                    <TextLoading /> :
                    <div>{state ? state.user : 'No Name'}</div>
            }
        </div>
    )
}
export default RequestView;