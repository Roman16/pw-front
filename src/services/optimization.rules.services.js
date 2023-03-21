import api from "./request"
import {optimizationRulesUrls} from "../constans/api.urls"
import {searchStrWrap} from "./products.services"
import {filtersHandler} from "./analytics.services"
import moment from 'moment'

export const optimizationRulesServices = {
    getCampaigns,
    getCampaignsPreview,
    getRules,
    createRule,
    updateRule,
    deleteRule,
    attachRules,
    attachRulesWidthFilters,
    detachRules,
    getAttachedCampaigns,
    getAttachedRules,

}

const dateFormat = (date) => moment(date).format('YYYY-MM-DD')

function getCampaigns({pageSize, page, searchStr, attributionWindow = 7, filters = [], campaignsId = [], selectedRangeDate}) {
    return api('get', `${optimizationRulesUrls.campaigns}?attribution_window=${attributionWindow}&table[page]=${page}&table[size]=${pageSize}${searchStrWrap(searchStr).join('')}&date_from=${dateFormat(selectedRangeDate.startDate)}&date_to=${dateFormat(selectedRangeDate.endDate)}${filters.length > 0 ? filtersHandler(filters) : ''}${campaignsId.length > 0 ? `&campaign_id[]=${campaignsId.join('&campaign_id[]=')}` : ''}`)
}

function getCampaignsPreview({pageSize, page, searchStr}, cancelToken) {
    return api('get', `${optimizationRulesUrls.campaignsPreview}?page=${page}&size=${pageSize}${searchStrWrap(searchStr).join('')}`, undefined, undefined, cancelToken)
}

function getRules({pageSize, page, filters, searchStr, id = []}, cancelToken) {
    if (filters?.[0]?.type === "search") searchStr = filters[0].value

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

function attachRulesWidthFilters({attributionWindow, selectedRangeDate, rules=[], campaigns=[],campaignFilters = [], rulesFilters = []}) {
    const rulesList = rules.length > 0 ? `&rules[id][]=${rules.join('&rules[id][]=')}` : ''
    const campaignsList = campaigns.length > 0 ? `&campaign_id[]=${campaigns.join('&campaign_id[]=')}` : ''

    return api('post', `${optimizationRulesUrls.attachWidthFilters}?attribution_window=${attributionWindow}&date_from=${dateFormat(selectedRangeDate.startDate)}&date_to=${dateFormat(selectedRangeDate.endDate)}${campaignFilters.length > 0 ? filtersHandler(campaignFilters) : ''}${rulesFilters.length > 0 ? searchStrWrap(rulesFilters[0].value, 'rules'): ''}${campaignsList}${rulesList}`)
}

function detachRules(data) {
    return api('post', `${optimizationRulesUrls.detach}`, data)
}

function getAttachedCampaigns(rulesId) {
    return api('get', `${optimizationRulesUrls.attachedCampaigns}?rule_id[]=${rulesId.join('&rule_id[]=')}`)
}

function getAttachedRules(campaignId) {
    return api('get', `${optimizationRulesUrls.attachedRules}?campaign_id[]=${campaignId.join('&campaign_id[]=')}`)
}