import api, {encodeString} from './request'
import {zthUrls} from '../constans/api.urls'

export const zthServices = {
    getAllProducts,
    getZthProducts,
    saveSettings,
    deleteIncompleteBatch,
    payBatch,
    getUserPortfolio,
    getKeysCount,
    getVariationsEligibilityStatus,
    fetchBatchInformation,
    checkIncompleteJobs,
    deleteCreatedJob,

    createFreeBatch,
    checkBatchById,
    getIncompleteJob
}

function getAllProducts({pageSize, page, searchStr, cancelToken, sorting}) {
    return api('get', `${zthUrls.productsList}?page=${page}&size=${pageSize}${searchStr && `&search[]=${encodeString(searchStr)}`}${sorting ? `&order_by:${sorting}=product_name` : ''}`, false, false, cancelToken)
}

function getZthProducts({pageSize, page, searchStr = '', cancelToken}) {
    return api('get', `${zthUrls.zthProductsList}?page=${page}&size=${pageSize}${searchStr && `&search[]=${encodeString(searchStr)}`}`, false, false, cancelToken)
}


function saveSettings(data) {
    return api('post', `${zthUrls.setupSettings}`, data, false)
}

function getKeysCount(keys, cancelToken) {
    return api('get', `${zthUrls.keysCount}?${keys.map(i => `keywords[]=${i}`).join('&')}`, undefined, undefined, cancelToken, undefined, false)
}

function createFreeBatch(id, data) {
    return api('post', `${zthUrls.saveBatchSettings(id)}`, data, false)
}

function checkIncompleteJobs(cancelToken) {
    return api('get', `${zthUrls.incompleteJobs}`, false, false, cancelToken)
}

function checkBatchById(id) {
    return api('get', `${zthUrls.batchInfo}/${id}`, false, false)
}

function deleteIncompleteBatch(id) {
    return api('post', `${zthUrls.deleteIncompleteBatch(id)}`, null, false)
}

function deleteCreatedJob(id) {
    return api('delete', `${zthUrls.deleteCreatedJob(id)}`, null, false)
}

function payBatch(data) {
    return api('post', `${zthUrls.payBatch}`, data, false, undefined, undefined, false)
}

function getUserPortfolio() {
    return api('get', `${zthUrls.portfolioList}`, null, false)
}

function getVariationsEligibilityStatus(id, cancelToken) {
    return api('get', `${zthUrls.variationsEligibilityStatus}?product_id=${id}`, undefined, undefined, cancelToken)
}

function fetchBatchInformation(id) {
    return api('get', `${zthUrls.batchInformation}?size=10&page=1&ids[]=${id}`)
}

function getIncompleteJob(id) {
    return api('get', `${zthUrls.incompleteJob}?job_id=${id}`)
}

