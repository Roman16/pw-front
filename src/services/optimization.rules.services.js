import api from "./request"
import {optimizationRulesUrls} from "../constans/api.urls"
import {searchStrWrap} from "./products.services"
import {filtersHandler} from "./analytics.services"

export const optimizationRulesServices = {
    getCampaigns,
    getCampaignsPreview,
    getRules,
    createRule,
    updateRule,
    deleteRule,
    attachRules,
    detachRules,
    getAttachedCampaigns,
    getAttachedRules,

}

function getCampaigns({pageSize, page,searchStr, filters = [], campaignsId = []}) {
    return api('get', `${optimizationRulesUrls.campaigns}?attribution_window=7&table[page]=${page}&table[size]=${pageSize}${searchStrWrap(searchStr).join('')}&date_from=2023-01-30&date_to=2023-02-28${filters.length > 0 ? filtersHandler(filters) : ''}${campaignsId.length > 0 ? `&campaigns[]=${campaignsId.join('&campaigns[]=')}` : ''}`)
}

function getCampaignsPreview({pageSize, page,searchStr}, cancelToken) {
    return api('get', `${optimizationRulesUrls.campaignsPreview}?page=${page}&size=${pageSize}${searchStrWrap(searchStr).join('')}`, undefined, undefined, cancelToken)
}

function getRules({pageSize, page, searchStr, id=[]}, cancelToken) {
    return api('get', `${optimizationRulesUrls.rules}?page=${page}&size=${pageSize}${searchStrWrap(searchStr).join('')}${id.length > 0 ? `&id[]=${id.join('&id[]=')}` : ''}`, undefined, undefined, cancelToken)
}

function createRule(rule) {
    return api('post', `${optimizationRulesUrls.rules}`, rule)
}

function updateRule(rule) {
    return api('put', `${optimizationRulesUrls.rules}/${rule.id}`, rule)
}

function deleteRule(id) {
    return api('delete', `${optimizationRulesUrls.rules}/${id}`,)
}

function attachRules(data) {
    return api('post', `${optimizationRulesUrls.attach}`, data)
}

function detachRules(data) {
    return api('post', `${optimizationRulesUrls.detach}`, data)
}

function getAttachedCampaigns(rulesId) {
    return api('get', `${optimizationRulesUrls.attachedCampaigns}?rules[]=${rulesId.join('&rules[]=')}`)
}
function getAttachedRules(campaignId) {
    return api('get', `${optimizationRulesUrls.attachedRules}?campaigns[]=${campaignId.join('&campaigns[]=')}`)
}