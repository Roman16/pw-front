import api from './request';
import {zthUrls} from '../constans/api.urls';

export const zthServices = {
    getAllProducts,
    getZthProducts,
    saveSettings,
    createFreeBatch,
    checkIncompleteBatch,
    deleteIncompleteBatch,
    payBatch,
    checkBatchById,
    getUserPortfolio,
    getKeysCount,
    getVariationsEligibilityStatus,
    fetchBatchInformation
};

function getAllProducts({pageSize, page, searchStr = '', cancelToken, sorting}) {
    return api('get', `${zthUrls.productsList}?search_query=${searchStr}&page=${page}&size=${pageSize}&order_by:${sorting}=name`, false, false, cancelToken)
}

function getZthProducts({pageSize, page, searchStr = '', cancelToken}) {
    return api('get', `${zthUrls.zthProductsList}?search_query=${searchStr}&page=${page}&size=${pageSize}`, false, false, cancelToken)
}


function saveSettings(data) {
    return api('post', `${zthUrls.setupSettings}`, data, false)
}

function getKeysCount(keys) {
    return api('get', `${zthUrls.keysCount}?keywords[]=${keys}`)
}

function createFreeBatch(id, data) {
    return api('post', `${zthUrls.saveBatchSettings(id)}`, data, false)
}

function checkIncompleteBatch(cancelToken) {
    return api('get', `${zthUrls.incompleteBatch}`, false, false, cancelToken)
}

function checkBatchById(id) {
    return api('get', `${zthUrls.batchInfo}/${id}`, false, false)
}

function deleteIncompleteBatch(id) {
    return api('post', `${zthUrls.deleteIncompleteBatch(id)}`, null, false)
}

function payBatch(data) {
    return api('post', `${zthUrls.payBatch}`, data, false)
}

function getUserPortfolio() {
    return api('get', `${zthUrls.portfolioList}`, null, false)
}

function getVariationsEligibilityStatus(id) {
    return api('get', `${zthUrls.variationsEligibilityStatus}?product_id=${id}`)
}

function fetchBatchInformation(id) {
    return api('get', `${zthUrls.batchInformation}?size=10&page=1`)
}

