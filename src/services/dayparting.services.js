import api from './request';
import {daypartingUrls} from '../constans/api.urls';
import moment from "moment";

function dateFormatter(date) {
    return moment(date).format('YYYY-MM-DD')
}

export const daypartingServices = {
    getCampaigns,
    getOutBudgetStatistic,
    setCampaignBudget,
    getDailyStatistic,
    getPlacementsStatistic,
    getDayPartingParams,
    updateDayPartingParams,
    activateDayparting,
    deactivateDayparting
};

function getCampaigns({size, page, searchStr = '', cancelToken}) {
    return api('get', `${daypartingUrls.campaigns}?search_query=${searchStr}&page=${page}&size=${size}`, null, null, cancelToken)
}

function getOutBudgetStatistic({campaignId, date, cancelToken}) {
    return api('get', `${daypartingUrls.outBudget(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}`, null, null, cancelToken)
}

function setCampaignBudget({campaignId, data}) {
    return api('post', `${daypartingUrls.outBudget(campaignId)}`)
}

function getDailyStatistic({campaignId, date, firstMetric, secondMetric, cancelToken}) {
    const parameters = [
        secondMetric && secondMetric.key !== 'nothing' ? `&secondMetric=${secondMetric.key}` : '',
    ];

    return api('get', `${daypartingUrls.dailyStatistic(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}&firstMetric=${firstMetric.key}${parameters.join('')}`, null, null, cancelToken)
}

function getPlacementsStatistic({campaignId, date, cancelToken}) {
    return api('get', `${daypartingUrls.placements(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}`, null, null, cancelToken)
}

function getDayPartingParams({campaignId, cancelToken}) {
    return api('get', `${daypartingUrls.dayParting(campaignId)}?size=1&page=6`, null, null, cancelToken)
}

function updateDayPartingParams({campaignId, state_encoded_string}) {
    return api('post', `${daypartingUrls.dayParting(campaignId)}`, {state_encoded_string})
}

function activateDayparting({campaignId}) {
    return api('post', `${daypartingUrls.dayParting(campaignId)}`)
}

function deactivateDayparting({campaignId}) {
    return api('post', `${daypartingUrls.dayParting(campaignId)}`)
}