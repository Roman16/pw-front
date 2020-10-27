import api from "./request"
import {analyticsUrls} from "../constans/api.urls"
import moment from "moment"
import {reasonFilterParams} from "./reports.services"
import {endDateFormatting, startDateFormatting} from "./dashboard.services"


export const analyticsServices = {
    fetchTableData,
    fetchMetricsData,
    fetchChartData,
    fetchStateInformation
}


const urlGenerator = (url, pagination, sorting, filters) => {
    const parameters = []

    if (sorting.type && sorting.column) {
        parameters.push(`&order_by:${sorting.type}=${sorting.column}`)
    }

    filters.forEach(({filterBy, type, value}) => {
        if (type === 'search' && value) {
            parameters.push(`&${filterBy}:search=${value}`)
        } else if (filterBy === 'datetime') {
            parameters.push(`&datetime:range=${value.startDate === 'lifetime' ? 'lifetime' : moment.tz(`${moment(value.startDate).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${value.endDate === 'lifetime' ? 'lifetime' : moment.tz(`${moment(value.endDate).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`)
        } else if (type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value}`)
        } else if (typeof type === 'object') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else {
            parameters.push(`&${filterBy}:${type}=${value}`)
        }
    })

    return `${url}?page=${pagination.page}&size=${pagination.pageSize}${parameters.join('')}`
}

function fetchTableData(locationKey, paginationParams, sortingParams = {}, filters = []) {
    return api('get', urlGenerator(analyticsUrls.tableData(locationKey), paginationParams, sortingParams, filters))
}

function fetchMetricsData({startDate, endDate, locationKey}) {
    return api('get', `${analyticsUrls.metricsData(locationKey)}?start_date=${startDateFormatting(startDate)}&end_date=${endDateFormatting(endDate)}`)
}

function fetchChartData(location, metrics, date) {
    return api('get', `${analyticsUrls.chartData(location)}?${metrics.filter(item => !!item.key).map(item => `metric[]=${item.key}`).join('&')}&start_date=${startDateFormatting(date.startDate)}&end_date=${endDateFormatting(date.endDate)}`)
}

function fetchStateInformation(state, id) {
    const stateParams = {
        campaignId: 'campaigns',
        productId: 'product',
        adGroupId: 'ad-groups',
        portfolioId: 'portfolio',
    }
    return api('get', `${analyticsUrls.campaignInformation(stateParams[state], id)}`)
}
