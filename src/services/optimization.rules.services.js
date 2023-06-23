import api, {encodeString} from "./request"
import {optimizationRulesUrls} from "../constans/api.urls"
import {searchStrWrap} from "./products.services"
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

    getLogs,
    getStatuses,
    activateRule,

}

const dateFormat = (date) => moment(date).format('YYYY-MM-DD')

const dateRangeFormatting = (dateRange) => {
    if (dateRange.startDate === 'lifetime') {
        return ''
    } else {
        dateRange.startDate = moment(dateRange.startDate).format('YYYY-MM-DD')
        dateRange.endDate = moment(dateRange.endDate).format('YYYY-MM-DD')

        return `&generatedAtDateTime:from=${dateRange.startDate}&generatedAtDateTime:to=${dateRange.endDate}`
    }
}

const filtersHandler = (f) => {
    let filters = [...f]
    const parameters = []

    filters.forEach(({filterBy, type, value, requestValue}) => {
        if (filterBy === 'generatedAtDateTime') {
            parameters.unshift(`${dateRangeFormatting(value)}`)
        } else if (type.key === 'except') {
            parameters.push(`&${filterBy}:not_in=${value.map(i => i === 'autoTargeting' ? 'auto' : i === 'manualTargeting' ? 'manual' : i).join(',')}`)
        } else if (type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value.map(i => i === 'autoTargeting' ? 'auto' : i === 'manualTargeting' ? 'manual' : i).join(',')}`)
        } else if (typeof type === 'object') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else if (filterBy !== 'name' && type !== 'search') {
            parameters.push(`&${filterBy}:${type}=${encodeString(value)}`)
        }
    })

    return parameters.join('')
}

function getCampaigns({pageSize, page, searchStr, attributionWindow = 7, filters = [], campaignsId = [], selectedRangeDate, ruleId}) {
    if (filters?.[0]?.type === "search") searchStr = filters[0].value
    filters = filters.filter(i => i.type !== 'search')

    return api('get', `${optimizationRulesUrls.campaigns}?attribution_window=${attributionWindow}&table[page]=${page}&table[size]=${pageSize}${searchStrWrap(searchStr).join('')}&date_from=${dateFormat(selectedRangeDate.startDate)}&date_to=${dateFormat(selectedRangeDate.endDate)}${filters.length > 0 ? filtersHandler(filters) : ''}${campaignsId.length > 0 ? `&campaign_id[]=${campaignsId.join('&campaign_id[]=')}` : ''}${ruleId ? `&rule_id[]=${ruleId}` : ''}`)
}

function getCampaignsPreview({pageSize, page, searchStr, sorting}, cancelToken) {
    return api('get', `${optimizationRulesUrls.campaignsPreview}?page=${page}&size=${pageSize}${searchStrWrap(searchStr).join('')}${sorting ? `&order_by[]=${sorting}` : ''}`, undefined, undefined, cancelToken)
}

function getRules({pageSize, page, filters, searchStr, id = [], sorting}, cancelToken) {
    if (filters?.[0]?.type === "search") searchStr = filters[0].value

    return api('get', `${optimizationRulesUrls.rules}?page=${page}&size=${pageSize}${searchStrWrap(searchStr).join('')}${id.length > 0 ? `&id[]=${id.join('&id[]=')}` : ''}${sorting ? `&order_by[]=${sorting}` : ''}`, undefined, undefined, cancelToken)
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

function attachRulesWidthFilters({attributionWindow, selectedRangeDate, searchStr, rules = [], campaigns = [], campaignFilters = [], rulesFilters = []}) {
    const rulesList = rules.length > 0 ? `&rules[id][]=${rules.join('&rules[id][]=')}` : ''
    const campaignsList = campaigns.length > 0 ? `&campaign_id[]=${campaigns.join('&campaign_id[]=')}` : ''
    if (campaignFilters?.[0]?.type === "search") searchStr = campaignFilters[0].value
    campaignFilters = campaignFilters.filter(i => i.type !== 'search')

    return api('post', `${optimizationRulesUrls.attachWidthFilters}?attribution_window=${attributionWindow}${searchStrWrap(searchStr).join('')}&date_from=${dateFormat(selectedRangeDate.startDate)}&date_to=${dateFormat(selectedRangeDate.endDate)}${campaignFilters.length > 0 ? filtersHandler(campaignFilters) : ''}${rulesFilters.length > 0 ? searchStrWrap(rulesFilters[0].value, 'rules') : ''}${campaignsList}${rulesList}`)
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

function getLogs({ruleId, campaignId, page, pageSize, filters, sorterColumn}) {
    return api('get', `${optimizationRulesUrls.ruleLogs}?page=${page}&size=${pageSize}${ruleId ? `&rule_id[]=${ruleId}` : ''}${campaignId ? `&campaign_id[]=${campaignId}` : ''}${filtersHandler(filters)}${sorterColumn && sorterColumn.column ? `&order_by[]=${sorterColumn.column}:${sorterColumn.type}` : ''}`)
}

function getStatuses({ruleId, campaignId, page, pageSize, sorterColumn}) {
    return api('get', `${optimizationRulesUrls.ruleStatuses}?page=${page}&size=${pageSize}${ruleId ? `&rule_id[]=${ruleId}` : ''}${campaignId ? `&campaign_id[]=${campaignId}` : ''}${sorterColumn && sorterColumn.column ? `&order_by[]=${sorterColumn.column}:${sorterColumn.type}` : ''}`)
}

function activateRule(ruleId) {
    return api('post', `${optimizationRulesUrls.activateRule(ruleId)}`)
}