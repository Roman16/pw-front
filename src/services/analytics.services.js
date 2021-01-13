import api from "./request"
import {analyticsUrls} from "../constans/api.urls"
import moment from "moment"
import _ from 'lodash'

export const analyticsServices = {
    fetchTableData,
    fetchMetricsData,
    fetchChartData,
    fetchStateInformation,
    fetchSettingsDetails,
    fetchPlacementStatistic,
    getSearchTermsData
}

const stateIdValues = {
    campaignId: 'campaigns',
    productId: 'products',
    adGroupId: 'ad-groups',
    portfolioId: 'portfolios',
}

const dateRangeToIso = (dateRange) => {
    return `${dateRange.startDate === 'lifetime' ? '' : moment.tz(`${moment(dateRange.startDate).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${dateRange.endDate === 'lifetime' ? '' : moment.tz(`${moment(dateRange.endDate).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`
}


const filtersHandler = (filters) => {
    const parameters = []

    filters.forEach(({filterBy, type, value, requestValue}) => {
        if (filterBy === 'datetime') {
            parameters.unshift(`?datetime:range=${dateRangeToIso(value)}`)
        } else if (type.key === 'except') {
            parameters.push(`&${filterBy}:in=${requestValue.join(',')}`)
        } else if (filterBy === 'segment') {
            if (value !== null && !_.find(filters, {filterBy: "campaignId"})) {
                parameters.push(`&segment_by:eq=${value}`)
            }
        } else if (type === 'search' && value) {
            parameters.push(`&${filterBy}:contains=${value}`)
        } else if (type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value}`)
        } else if (filterBy === 'budget_allocation' || filterBy === 'sales_share' || filterBy === 'conversion_rate' || filterBy === 'acos' || filterBy === 'ctr' || filterBy === 'ctr') {
            parameters.push(`&${filterBy}:${type.key}=${value / 100}`)
        } else if (typeof type === 'object') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else if (filterBy !== 'name' && type !== 'search') {
            parameters.push(`&${filterBy}:${type}=${value}`)
        }
    })

    return parameters.join('')
}

const urlGenerator = (url, pagination, sorting, filters) => {
    const parameters = []

    if (sorting.type && sorting.column) {
        parameters.push(`&order_by:${sorting.type}=${sorting.column}`)
    }

    return `${url}${filtersHandler(filters)}&page=${pagination.page}&size=${pagination.pageSize}${parameters.join('')}`

}

function fetchTableData(locationKey, paginationParams, sortingParams = {}, filters = [], cancelToken, idList = '') {
    let key = ''
    if (locationKey === 'products-regular') key = 'products'
    else if (locationKey === 'overview') key = 'products'
    else key = locationKey

    return api('get', urlGenerator(analyticsUrls.tableData(key), paginationParams, sortingParams, filters) + idList, null, null, cancelToken)
}

function fetchMetricsData({startDate, endDate, locationKey, filters}, cancelToken) {
    let key = ''
    if (locationKey === 'products-regular') key = 'products'
    else if (locationKey === 'overview') key = 'products'
    else key = locationKey

    return api('get', `${analyticsUrls.metricsData(key)}${filtersHandler(filters)}`, null, null, cancelToken)
}

function fetchChartData(location, metrics, date, filters = [], cancelToken) {
    let key = ''
    if (location === 'products-regular') key = 'products'
    else if (location === 'overview') key = 'products'
    else key = location

    return api('get', `${analyticsUrls.chartData(key)}${filtersHandler(filters)}&${metrics.filter(item => !!item).map(item => `metric[]=${item}`).join('&')}`, null, null, cancelToken)
}

function fetchStateInformation(state, id) {
    return api('get', `${analyticsUrls.stateInformation(stateIdValues[state], id)}`)
}

function fetchSettingsDetails(page, id) {
    return api('get', `${analyticsUrls.settingsDetails(page, id)}`)
}

function fetchPlacementStatistic(metric, date, mainState, cancelToken) {
    const stateValues = []

    Object.keys(mainState).forEach(key => {
        if (mainState[key] && key !== 'name') {
            stateValues.push(`${key}:eq=${mainState[key]}`)
        }
    })

    return api('get', `${analyticsUrls.placementStatistic}?metric[]=${metric}&datetime:range=${dateRangeToIso(date)}${stateValues.length > 0 ? '&' + stateValues.join('&') : ''}`, null, null, cancelToken)
}

//----------------------------------------------------------------------------------------------------------------------

function getSearchTermsData({activeMetrics}, cancelToken) {
    return api('get', `${analyticsUrls.searchTermsData}?size=30&page=1&retrieve[]=metrics&retrieve[]=table&retrieve[]=chart&${activeMetrics.filter(item => !!item).map(item => `metric[]=${item}`).join('&')}`, null, null, cancelToken)
}
