import api from './request';
import {daypartingUrls} from '../constans/api.urls';

export const daypartingServices = {
    getCampaigns,
    getSpendOutStatistic,
    getAllStatistic,
    getPlacementsStatistic,
    getDayPartingParams,
    updateDayPartingParams,
};

function getCampaigns({size, page, searchStr = '', cancelToken}) {
    return api('get', `${daypartingUrls.campaigns}?search_query=${searchStr}&page=${page}&size=${size}`, null, null, cancelToken)
}

function getSpendOutStatistic() {
    return api('get', `${daypartingUrls.spendOutBudget}`)
}

function getAllStatistic(firstMetric, secondMetric) {
    const parameters = [
        secondMetric ? `&secondMetric=${secondMetric}` : '',
    ];

    return api('get', `${daypartingUrls.allStatistic}?firstMetric=${firstMetric}${parameters.join('')}`)
}

function getPlacementsStatistic({campaignId, date}) {
    return api('get', `${daypartingUrls.placements}?size=10&campaignId=${campaignId}&page=1&startDate=1-12-2020&endDate=1-12-2020`)
}

function getDayPartingParams() {
    return api('get', `${daypartingUrls.dayParting}`)
}

function updateDayPartingParams() {
    return api('post', `${daypartingUrls.dayParting}`)
}