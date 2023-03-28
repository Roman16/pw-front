import api, {baseUrl, encodeString} from "./request"
import {analyticsUrls} from "../constans/api.urls"
import moment from "moment"
import _ from 'lodash'
import {metricKeys} from "../pages/Analytics/componentsV2/MainMetrics/metricsList"

export const analyticsServices = {
    fetchStateInformation,
    fetchSettingsDetails,
    fetchSearchTermsData,
    fetchPlacementData,
    fetchTargetingsDetails,
    fetchPageData,
    fetchCampaignsForTargeting,
    fetchAdGroupsForTargeting,
    fetchAdGroupDetails,
    fetchMovingBudget,
    updateMovingBudget,
    deleteMovingBudget,
    keywordValidation,

    exactCreate,
    bulkCreate,
    exactUpdateField,
    bulkUpdate,

    downloadTableCSV
}

const stateIdValues = {
    campaignId: 'campaigns',
    productId: 'products',
    adGroupId: 'ad-groups',
    portfolioId: 'portfolios',
}

const dateRangeFormatting = (dateRange) => {

    if (dateRange.startDate === 'lifetime') {
        return ''
    } else {
        dateRange.startDate = moment(dateRange.startDate).format('YYYY-MM-DD')
        dateRange.endDate = moment(dateRange.endDate).format('YYYY-MM-DD')

        return `date_from=${dateRange.startDate}&date_to=${dateRange.endDate}`
    }
}

export const filtersHandler = (f) => {
    let filters = [...f]
    const parameters = []

    filters.forEach(({filterBy, type, value, requestValue}) => {
        if (filterBy === 'datetime') {
            parameters.unshift(`?${dateRangeFormatting(value)}`)
        } else if (type.key === 'except') {
            parameters.push(`&${filterBy}:in=${requestValue.map(i => i === 'autoTargeting' ? 'auto' : i === 'manualTargeting' ? 'manual' : i).join(',')}`)
        } else if (filterBy === 'productView') {

        } else if (filterBy === 'segment') {
            if (value !== null && !_.find(filters, {filterBy: "campaignId"})) {
                parameters.push(`&segment_by:eq=${value}`)
            }
        } else if (type === 'search' && value) {
            if (value) {
                if (typeof value === 'string') {
                    parameters.push(`&${filterBy}:like[]=${encodeString(value)}`)
                } else {
                    value.forEach(i => {
                        parameters.push(`&${filterBy}:like[]=${encodeString(i)}`)
                    })
                }
            }
        } else if (type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value.map(i => i === 'autoTargeting' ? 'auto' : i === 'manualTargeting' ? 'manual' : i).join(',')}`)
        } else if (filterBy === 'budget_allocation' ||
            filterBy === 'sales_share' ||
            filterBy === 'conversion_rate' ||
            filterBy === 'acos' ||
            filterBy === 'macos' ||
            filterBy === 'ctr' ||
            filterBy === metricKeys['icvr'] ||
            filterBy === metricKeys['margin'] ||
            filterBy === 'ctr'
        ) {
            parameters.push(`&${filterBy}:${type.key}=${value / 100}`)
        } else if (typeof type === 'object') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else if (filterBy !== 'name' && type !== 'search') {
            parameters.push(`&${filterBy}:${type}=${encodeString(value)}`)
        }
    })

    return parameters.join('')
}

function fetchStateInformation(state, id) {
    return api('get', `${analyticsUrls.stateInformation(stateIdValues[state], id)}`)
}

function fetchSettingsDetails(page, id) {
    return api('get', `${analyticsUrls.settingsDetails(page, id)}`)
}

function fetchSearchTermsData(params, idList) {
    const {activeMetrics, page, pageSize, filtersWithState, pageParts, sorterColumn, segment} = params

    const attributionWindow = localStorage.getItem('attributionWindow') || '7'

    return api('get', `${analyticsUrls.searchTermsData}${filtersHandler(filtersWithState)}&attribution_window=${+attributionWindow}&size=${pageSize}&page=${page}${sorterColumn && sorterColumn.column ? `&order_by:${sorterColumn.type}=${sorterColumn.column}` : ''}&${pageParts.map(i => `retrieve[]=${i}`).join('&')}&${activeMetrics.filter(item => !!item).map(i => `metric[]=${i}`).join('&')}${segment !== 'none' ? `&segment_by:eq=targetingId` : ''}${idList || ''}`)
}

function fetchPlacementData(params, idList) {
    const {activeMetrics, page, pageSize, filtersWithState, pageParts, sorterColumn, segment, areaChartMetric} = params

    const attributionWindow = localStorage.getItem('attributionWindow') || '7'

    return api('get', `${analyticsUrls.placementData}${filtersHandler(filtersWithState)}&attribution_window=${+attributionWindow}&size=${pageSize}&page=${page}${sorterColumn && sorterColumn.column ? `&order_by:${sorterColumn.type}=${sorterColumn.column}` : ''}&${pageParts.map(i => `retrieve[]=${i}`).join('&')}&${activeMetrics.filter(item => !!item).map(i => `metric[]=${i}`).join('&')}${segment !== 'none' ? `&segment_by:eq=${segment}` : ''}${idList || ''}&stacked_area_chart_metric[]=${areaChartMetric}`)
}

function fetchTargetingsDetails(id, date, sorterColumn, filters) {
    return api('get', `${analyticsUrls.targetingsDetails}?queryCRC64:eq=${id}&datetime:range=${dateRangeFormatting(date)}${sorterColumn && sorterColumn.column ? `&order_by:${sorterColumn.type}=${sorterColumn.column}` : ''}${filtersHandler(filters)}`)
}

function fetchPageData(location, params, idList, cancelToken) {
    let {activeMetrics, page, pageSize, filtersWithState, pageParts, sorterColumn, selectedRangeDate} = params
    if (location === 'products' && _.find(filtersWithState, {filterBy: 'isParent'}) && _.find(filtersWithState, {filterBy: 'isParent'}).value === 'true') {
        filtersWithState = [...filtersWithState.map(i => {
            if (i.filterBy === 'productId') i.filterBy = 'parent_productId'
            return {...i}
        })]
    }

    const attributionWindow = localStorage.getItem('attributionWindow') || '7'

    return api('get', `${analyticsUrls.pageData(`v3/${location}`)}?attribution_window=${+attributionWindow}${filtersHandler(filtersWithState)}&${dateRangeFormatting(selectedRangeDate)}&table[size]=${pageSize}&table[page]=${page}${sorterColumn && sorterColumn.column ? `&order_by:${sorterColumn.type}=${sorterColumn.column}` : ''}&${pageParts.map(i => `retrieve[]=${i}`).join('&')}${activeMetrics.length > 0 ? '&' : ''}${activeMetrics.filter(item => !!item).map(i => `metric[]=${i}`).join('&')}${idList || ''}`, null, null, cancelToken)
}

function fetchCampaignsForTargeting({page, type, name}) {
    return api('get', `${analyticsUrls.campaigns}?size=30&page=${page}&advertisingType:in=${type}&state:in=enabled,paused${name ? `&name=${name}` : ''}`)
}

function fetchAdGroupsForTargeting({page, id, name}) {
    return api('get', `${analyticsUrls.adGroups}?size=30&page=${page}&campaignId:eq=${id}&state:in=enabled,paused${name ? `&name=${name}` : ''}`)
}

function fetchAdGroupDetails(id) {
    return api('get', `${analyticsUrls.adGroupDetails(id)}`)
}

function fetchMovingBudget(id) {
    return api('get', `${analyticsUrls.movingBudget(id)}`)
}

function updateMovingBudget(id, data) {
    return api('post', `${analyticsUrls.movingBudget(id)}`, data)
}

function deleteMovingBudget(id) {
    return api('delete', `${analyticsUrls.movingBudget(id)}`)
}

function exactCreate(entity, data) {
    return api('post', analyticsUrls.createUrl(entity), data)
}

function bulkCreate(entity, data) {
    return api('post', analyticsUrls.bulkCreateUrl(entity), data)
}

function keywordValidation(type, data) {
    return api('post', analyticsUrls.keywordValidation(type), data)
}

function exactUpdateField(entity, data) {
    return api('post', analyticsUrls.exactUpdate(entity), data)
}

function bulkUpdate(entity, data, idList, filters) {

    return api('post', `${analyticsUrls.bulkUpdate(entity)}${filtersHandler(filters)}${idList || ''}`, data)
}

function downloadTableCSV(location, filtersWithState) {
    const token = localStorage.getItem('token')

    if (location === 'overview') {
        if (_.find(filtersWithState, {filterBy: 'isParent'}) && _.find(filtersWithState, {filterBy: 'isParent'}).value === 'true') {
            location = 'products'

            filtersWithState = [...filtersWithState.map(i => {
                if (i.filterBy === 'productId') i.filterBy = 'parent_productId'
                return {...i}
            })]
        } else {
            location = 'products'
        }
    }

    const attributionWindow = localStorage.getItem('attributionWindow') || '7',
        marketplace = localStorage.getItem('activeMarketplace') && localStorage.getItem('activeMarketplace') !== 'undefined' ? JSON.parse(localStorage.getItem('activeMarketplace')) : null

    window.open(`${baseUrl}/api/analytics/${location}/csv${filtersHandler(filtersWithState)}&token=${token}&attribution_window=${+attributionWindow}&amazon_region_account_marketplace_id=${marketplace?.id}`)
}
