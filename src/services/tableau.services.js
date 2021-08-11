import api from './request'
import {tableauUrls} from '../constans/api.urls'


export const tableauServices = {
    getToken
}

function getToken() {
    return api('get', `${tableauUrls.token}`)
}