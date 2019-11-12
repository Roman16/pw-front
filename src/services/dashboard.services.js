import api from './request';
import {dashboardUrls} from '../constans/api.urls';

export const dashboardServices = {
    fetchMetricsStatistics,
};

function fetchMetricsStatistics({startDate, endDate}) {
    const parameters = [
        startDate ? `?start_date=${startDate}` : '',
        endDate ? `&end_date=${endDate}` : ''
    ];

    return api('get', `${dashboardUrls.allMetricsStatistic}${parameters.join('')}`)
}

