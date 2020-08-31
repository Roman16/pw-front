import api from './request'
import {dashboardUrls} from '../constans/api.urls'
import moment from "moment"
import tx from 'moment-timezone'

export const dashboardServices = {
    fetchMetricsStatistics,
    fetchLineChartData,
    fetchProducts,
    fetchBarChartData,
    fetchPieChartData,
    fetchProductOptimizationDetails
}

const startDateFormatting = (date) => moment.tz(`${moment(date).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()
const endDateFormatting = (date) => moment.tz(`${moment(date).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()

function fetchMetricsStatistics({startDate, endDate, selectedProduct, onlyOptimization}) {
    const parameters = [
        startDate ? `?start_date=${startDateFormatting(startDate)}` : '',
        endDate ? `&end_date=${endDateFormatting(endDate)}` : '',
        selectedProduct ? `&product_id=${selectedProduct}` : '&product_id=all',
        onlyOptimization ? '&only_under_optimization=1' : '&only_under_optimization=0'
    ]

    return api('get', `${dashboardUrls.allMetricsStatistic}${parameters.join('')}`)
}

function fetchLineChartData({startDate, endDate, firstMetric, secondMetric, productId, onlyOptimization, cancelToken}) {
    const parameters = [
        startDate ? `?start_date=${startDateFormatting(startDate)}` : '',
        endDate ? `&end_date=${endDateFormatting(endDate)}` : '',
        firstMetric ? `&first_metric=${firstMetric}` : '',
        secondMetric ? `&second_metric=${secondMetric}` : '',
        productId ? `&product_id=${productId}` : '&product_id=all',
        onlyOptimization ? '&only_under_optimization=1' : '&only_under_optimization=0'
    ]

    return api('get', `${dashboardUrls.chartData}${parameters.join('')}`, false, false, cancelToken)
}

function fetchProducts({page, pageSize = 10, searchText, onlyOptimization, startDate, endDate, cancelToken, onlyActive}) {
    const parameters = [
        startDate ? `&start_date=${startDateFormatting(startDate)}` : '',
        endDate ? `&end_date=${endDateFormatting(endDate)}` : '',
    ]

    return api('get', `${dashboardUrls.products}?size=${pageSize}&page=${page}&only_under_optimization=${onlyOptimization ? 1 : 0}&is_active=${onlyActive ? 1 : 0}&search_query=${searchText}${parameters.join('')}`, false, false, cancelToken)
}

function fetchBarChartData({startDate, endDate, selectedProduct}) {
    const parameters = [
        endDate ? `?end_date=${endDateFormatting(endDate)}` : '',
        startDate ? `&start_date=${startDateFormatting(startDate)}` : '',
        selectedProduct ? `&product_id=${selectedProduct}` : '&product_id=all'
    ]
    return api('get', `${dashboardUrls.barChartData}${parameters.join('')}`)
}

function fetchPieChartData({startDate, endDate, selectedProduct}) {
    const parameters = [
        startDate ? `?start_date=${startDateFormatting(startDate)}` : '',
        endDate ? `&end_date=${endDateFormatting(endDate)}` : '',
        selectedProduct ? `&product_id=${selectedProduct}` : '&product_id=all'
    ]
    return api('get', `${dashboardUrls.pieChartData}${parameters.join('')}`)
}

function fetchProductOptimizationDetails({productId, startDate, endDate,}) {
    const parameters = [
        startDate ? `&start_date=${startDateFormatting(startDate)}` : '',
        endDate ? `&end_date=${endDateFormatting(endDate)}` : '',
    ]
    return api('get', `${dashboardUrls.productOptimizationDetails}?product_id=${productId}${parameters.join('')}`)
}

