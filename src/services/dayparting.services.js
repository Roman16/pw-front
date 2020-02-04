import api from './request';
import {daypartingUrls} from '../constans/api.urls';

export const daypartingServices = {
    getSpendOutStatistic,
    getAllStatistic,
    getPlacementsStatistic,
    getDayPartingParams,
    updateDayPartingParams,
};

function getSpendOutStatistic() {
    return api('get', `${daypartingUrls.spendOutBudget}`)
}

function getAllStatistic(firstMetric, secondMetric) {
    const parameters = [
        secondMetric ? `&secondMetric=${secondMetric}` : '',
    ];

    return api('get', `${daypartingUrls.allStatistic}?firstMetric=${firstMetric}${parameters.join('')}`)
}

function getPlacementsStatistic() {
    return api('get', `${daypartingUrls.dayParting}`)
}

function getDayPartingParams() {
    return api('get', `${daypartingUrls.dayParting}`)
}

function updateDayPartingParams() {
    return api('post', `${daypartingUrls.dayParting}`)
}