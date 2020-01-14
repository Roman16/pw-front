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

function getAllStatistic(metric) {
    return api('get', `${daypartingUrls.allStatistic}?metric=${metric}`)
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