import api from "./request"
import {optimizationRulesUrls} from "../constans/api.urls"
import {searchStrWrap} from "./products.services"

export const optimizationRulesServices = {
    getCampaigns,
    getRules,
    createRule,
    attachRules
}

function getCampaigns({pageSize, page, searchStr}) {
    return api('get', `${optimizationRulesUrls.campaigns}?attribution_window=7&table[page]=${page}&table[size]=${pageSize}&page=${page}&size=${pageSize}&date_from=2023-01-30&date_to=2023-02-28`)
}

function getRules({pageSize, page, searchStr}) {
    return api('get', `${optimizationRulesUrls.rules}?table[page]=${page}&table[size]=${pageSize}&page=${page}&size=${pageSize}&date_from=2023-01-30&date_to=2023-02-28`)
}

function createRule(rule) {
    return api('post', `${optimizationRulesUrls.rules}`, rule)
}

function attachRules(data) {
    return api('post', `${optimizationRulesUrls.attach}?attribution_window=7`, data)
}