import { makeRequest } from "../serviceFctory";
import { userInfo } from "types/user";
export const getUserInfo = makeRequest<userInfo>({
    url: '/userInfo',
    config: {
        mode: 'cors',
        method: 'GET',
        headers: {
        }
    }
})