import api from './request';
import {dashboardUrls} from '../constans/api.urls';

export const dashboardServices = {
    fetchMetricsStatistics,
    fetchChartData,
    fetchProducts
};

function fetchMetricsStatistics({startDate, endDate}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : ''
    ];

    return api('get', `${dashboardUrls.allMetricsStatistic}${parameters.join('')}`)
}

function fetchChartData({startDate, endDate, firstMetric, secondMetric, productId}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
        firstMetric ? `&first_metric=${firstMetric}` : '',
        secondMetric ? `&second_metric=${secondMetric}` : '',
        productId ? `&product_id=${productId}` : '',
    ];

    return api('get', `${dashboardUrls.chartData}${parameters.join('')}`)
}

function fetchProducts({page, size = 10, searchText, onlyOptimization}) {
    return api('get', `${dashboardUrls.products}?size=${size}&page=${page}&only_under_optimization=${onlyOptimization ? 1 : 0}&search_query=${searchText}`)
}

