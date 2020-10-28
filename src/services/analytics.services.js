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


const filtersHandler = (filters) => {
    const parameters = []

    filters.forEach(({filterBy, type, value}) => {
        if (type === 'search' && value) {
            parameters.push(`&${filterBy}:search=${value}`)
        } else if (filterBy === 'datetime') {
            parameters.push(`&datetime:range=${value.startDate === 'lifetime' ? 'lifetime' : moment.tz(`${moment(value.startDate).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${value.endDate === 'lifetime' ? 'lifetime' : moment.tz(`${moment(value.endDate).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`)
        } else if (type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value}`)
        } else if (typeof type === 'object') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else if (filterBy !== 'name') {
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

    return `${url}?page=${pagination.page}&size=${pagination.pageSize}${parameters.join('')}${filtersHandler(filters)}`
}

function fetchTableData(locationKey, paginationParams, sortingParams = {}, filters = [], cancelToken) {
    return api('get', urlGenerator(analyticsUrls.tableData(locationKey), paginationParams, sortingParams, filters), null, null, cancelToken)
}

function fetchMetricsData({startDate, endDate, locationKey, filters}, cancelToken) {
    return api('get', `${analyticsUrls.metricsData(locationKey)}?start_date=${startDateFormatting(startDate)}&end_date=${endDateFormatting(endDate)}${filtersHandler(filters.filter(item => item.filterBy !== 'datetime'))}`, null, null, cancelToken)
}

function fetchChartData(location, metrics, date, filters = [], cancelToken) {
    return api('get', `${analyticsUrls.chartData(location)}?${metrics.filter(item => !!item.key).map(item => `metric[]=${item.key}`).join('&')}&start_date=${startDateFormatting(date.startDate)}&end_date=${endDateFormatting(date.endDate)}${filtersHandler(filters.filter(item => item.filterBy !== 'datetime'))}`, null, null, cancelToken)
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
