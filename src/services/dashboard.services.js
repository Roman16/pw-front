import api from './request';
import {dashboardUrls} from '../constans/api.urls';

export const dashboardServices = {
    fetchMetricsStatistics,
    fetchLineChartData,
    fetchProducts,
    fetchBarChartData,
    fetchPieChartData
};

function fetchMetricsStatistics({startDate, endDate, selectedProduct}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
        selectedProduct ? `&product_id=${selectedProduct}` : '&product_id=all'
    ];

    return api('get', `${dashboardUrls.allMetricsStatistic}${parameters.join('')}`)
}

function fetchLineChartData({startDate, endDate, firstMetric, secondMetric, productId}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
        firstMetric ? `&first_metric=${firstMetric}` : '',
        secondMetric ? `&second_metric=${secondMetric}` : '',
        productId ? `&product_id=${productId}` : '&product_id=all',
    ];

    return api('get', `${dashboardUrls.chartData}${parameters.join('')}`)
}

function fetchProducts({page, size = 10, searchText, onlyOptimization, startDate, endDate}) {
    const parameters = [
        startDate ? `&start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
    ];
    return api('get', `${dashboardUrls.products}?size=${size}&page=${page}&only_under_optimization=${onlyOptimization ? 1 : 0}&search_query=${searchText}${parameters.join('')}`)
}

function fetchBarChartData({startDate, endDate, selectedProduct}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
        selectedProduct ? `&product_id=${selectedProduct}` : '&product_id=all'
    ];
    return api('get', `${dashboardUrls.barChartData}${parameters.join('')}`)
}

function fetchPieChartData({startDate, endDate, selectedProduct}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : '',
        selectedProduct ? `&product_id=${selectedProduct}` : '&product_id=all'
    ];
    return api('get', `${dashboardUrls.pieChartData}${parameters.join('')}`)
}

