import api, {encodeString} from "./request"
import {ppcAuditUrls} from "../constans/api.urls"
import {filtersHandler} from "./analytics.services"

export const ppcAuditServices = {
    getProducts,
    getAuditIssues,
    getAuditDetails,
    startScanning,
    stopScanning,
}

const columnsKey = {
    issueObjectType: 'object_type',
    issueType: 'type',
}

function getProducts({pageSize, page, searchStr = '', onlyOptimization, cancelToken}) {
    return api('get', `${ppcAuditUrls.products}?page=${page}&size=${pageSize}${searchStr ? `&search[]=${encodeString(searchStr)}` : ''}&only_under_optimization=${onlyOptimization ? 1 : 0}`, null, null, cancelToken)
}

function getAuditIssues({id, page, pageSize, sorterColumn, filters}, cancelToken) {
    return api('get', `${ppcAuditUrls.issues(id)}?size=${pageSize}&page=${page}${sorterColumn && sorterColumn.column ? `&order_by:${sorterColumn.type}=${columnsKey[sorterColumn.column] || sorterColumn.column}` : ''}${filtersHandler([...filters.map(filter => {
        if (columnsKey[filter.filterBy]) filter = {...filter, filterBy: columnsKey[filter.filterBy]}
        return filter
    })])}`, undefined, undefined, cancelToken)
}

function getAuditDetails(id, cancelToken) {
    return api('get', `${ppcAuditUrls.details(id)}`, undefined, undefined, cancelToken)
}

function startScanning(data) {
    return api('post', `${ppcAuditUrls.startScanning(data.id)}`, data)
}

function stopScanning(id) {
    return api('post', `${ppcAuditUrls.stopScanning(id)}`)
}

