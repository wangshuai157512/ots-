import request from '../request'
import {
    UserFPSettings
} from '../api'

export const getUserFPSettings = () => {
    return request({
        url: UserFPSettings,
        method: 'POST'
    })
}