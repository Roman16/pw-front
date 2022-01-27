import api from "./request"
import {ppcAuditUrls} from "../constans/api.urls"

export const ppcAuditServices = {
    getProducts,
    getAuditIssues,
    getAuditDetails,
    startScanning,
    stopScanning,
}

function getProducts({pageSize, page, searchStr = '', onlyOptimization, onlyHasNew, ungroupVariations = 0, cancelToken}) {
    return api('get', `${ppcAuditUrls.products}?search_query=${searchStr}&page=${page}&size=${pageSize}&ungroup_variations=${ungroupVariations}&only_under_optimization=${onlyOptimization ? 1 : 0}&only_has_new=${onlyHasNew ? 1 : 0}`, null, null, cancelToken)
}

function getAuditIssues(id) {
    return api('get', `${ppcAuditUrls.issues(id)}?size=10&page=1`)
}
function getAuditDetails(id) {
    return api('get', `${ppcAuditUrls.details(id)}`)
}

function startScanning(data) {
    return api('post', `${ppcAuditUrls.startScanning(data.id)}`, data)
}
function stopScanning(id) {
    return api('post', `${ppcAuditUrls.stopScanning(id)}`)
}

