import api from './request'
import {tableauUrls} from '../constans/api.urls'


export const tableauServices = {
    getToken,
    getUrl
}

function getToken() {
    return api('get', `${tableauUrls.token}`)
}

function getUrl(token) {
    return api('get', token, undefined, undefined, undefined, false)
}