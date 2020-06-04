import api from './request';
import {zthUrls} from '../constans/api.urls';

export const zthServices = {
    getAllProducts,
    saveSettings,
    checkIncompleteBatch,
    deleteIncompleteBatch
};

function getAllProducts({pageSize, page, searchStr = '', cancelToken}) {
    return api('get', `${zthUrls.productsList}?search_query=${searchStr}&page=${page}&size=${pageSize}`, false, false, cancelToken)
}


function saveSettings(data, cancelToken) {
    return api('post', `${zthUrls.setupSettings}`, data, false)
}

function checkIncompleteBatch(cancelToken) {
    return api('get', `${zthUrls.incompleteBatch}`, false, false, cancelToken)
}
function deleteIncompleteBatch(id) {
    return api('post', `${zthUrls.deleteIncompleteBatch(id)}`, null, false)
}

