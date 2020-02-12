import api from './request';
import {daypartingUrls} from '../constans/api.urls';
import moment from "moment";

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
    return api('get', `${daypartingUrls.placements}?campaignId=${campaignId}&start_date=${moment(date.startDate).format('YYYY-MM-DD')}&end_date=${moment(date.endDate).format('YYYY-MM-DD')}`)
    // return api('get', `${daypartingUrls.placements}?start_date=${moment(date.startDate).format('YYYY-MM-DD')}&end_date=${moment(date.endDate).format('YYYY-MM-DD')}`)
}

function getDayPartingParams() {
    return api('get', `${daypartingUrls.dayParting}`)
}

function updateDayPartingParams() {
    return api('post', `${daypartingUrls.dayParting}`)
}