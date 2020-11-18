import api from "./request"
import {analyticsUrls} from "../constans/api.urls"
import moment from "moment"
import _ from 'lodash'

export const analyticsServices = {
    fetchTableData,
    fetchMetricsData,
    fetchChartData,
    fetchStateInformation
}


const filtersHandler = (filters) => {
    const parameters = []

    filters.forEach(({filterBy, type, value}) => {
        if (filterBy === 'datetime') {
            parameters.unshift(`?datetime:range=${value.startDate === 'lifetime' ? '' : moment.tz(`${moment(value.startDate).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${value.endDate === 'lifetime' ? '' : moment.tz(`${moment(value.endDate).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`)
        } else if (type === 'search' && value) {
            parameters.push(`&${filterBy}:contains=${value}`)
        } else if (type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value}`)
        } else if (filterBy === 'budget_allocation' || filterBy === 'sales_share' || filterBy === 'roas' || filterBy === 'conversion_rate' || filterBy === 'acos' || filterBy === 'ctr' || filterBy === 'ctr') {
            parameters.push(`&${filterBy}:${type.key}=${value / 100}`)
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

    if (_.find(filters, {filterBy: 'productView'}) && _.find(filters, {filterBy: 'productView'}).value === 'parent') {
        return `${analyticsUrls.tableData('products-parents')}${filtersHandler(_.reject(filters, {filterBy: 'productView'}))}&page=${pagination.page}&size=${pagination.pageSize}${parameters.join('')}`
    } else {
        return `${url}${filtersHandler(filters)}&page=${pagination.page}&size=${pagination.pageSize}${parameters.join('')}`
    }

}

function fetchTableData(locationKey, paginationParams, sortingParams = {}, filters = [], cancelToken) {
    console.log(filters)
    return api('get', urlGenerator(analyticsUrls.tableData(locationKey), paginationParams, sortingParams, filters), null, null, cancelToken)
}

function fetchMetricsData({startDate, endDate, locationKey, filters}, cancelToken) {
    let key = ''
    if (_.find(filters, {filterBy: 'productView'}) && _.find(filters, {filterBy: 'productView'}).value === 'parent') key = 'products-parents'
    else if (locationKey === 'overview') key = 'products'
    else key = locationKey


    return api('get', `${analyticsUrls.metricsData(key)}${filtersHandler(filters.filter(item => item.filterBy !== 'productView'))}`, null, null, cancelToken)
}

function fetchChartData(location, metrics, date, filters = [], cancelToken) {
    let key = ''
    if (_.find(filters, {filterBy: 'productView'}) && _.find(filters, {filterBy: 'productView'}).value === 'parent') key = 'products-parents'
    else if (location === 'overview') key = 'products'
    else key = location

    return api('get', `${analyticsUrls.chartData(key)}${filtersHandler(filters.filter(item => item.filterBy !== 'productView'))}&${metrics.filter(item => !!item.key).map(item => `metric[]=${item.key}`).join('&')}`, null, null, cancelToken)
}

function fetchStateInformation(state, id) {
    const stateParams = {
        campaignId: 'campaigns',
        productId: 'products',
        adGroupId: 'ad-groups',
        portfolioId: 'portfolios',
    }
    return api('get', `${analyticsUrls.campaignInformation(stateParams[state], id)}`)
}
