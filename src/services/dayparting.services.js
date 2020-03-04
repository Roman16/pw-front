import api from './request';
import {daypartingUrls} from '../constans/api.urls';
import moment from "moment";

function dateFormatter(date) {
    return moment(date).format('YYYY-MM-DD')
}

export const daypartingServices = {
    getCampaigns,
    getOutBudgetStatistic,
    getRecommendedBudget,
    setCampaignBudget,
    getDailyStatistic,
    getPlacementsStatistic,
    getDayPartingParams,
    updateDayPartingParams,
    activateDayparting,
    deactivateDayparting
};

function getCampaigns({size, page, searchStr, cancelToken, campaign_type, campaign_status, onlyOndayparting}) {
    const parameters = [
        searchStr ? `&name:search=${searchStr}` : '',
    ];

    return api('get', `${daypartingUrls.campaigns}?page=${page}&size=${size}&targetingType:in=${campaign_type === 'all' ? 'manual,auto' : campaign_type}&state:in=${campaign_status === 'all' ? 'enabled,paused' : campaign_status}&has_enabled_dayparting=${onlyOndayparting ? 1 : 0}${parameters.join('')}`, null, null, cancelToken)
}

function getOutBudgetStatistic({campaignId, date, cancelToken}) {
    return api('get', `${daypartingUrls.outBudget(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}`, null, null, cancelToken)
}

function getRecommendedBudget(campaignId) {
    return api('get', `${daypartingUrls.recommendedBudget(campaignId)}`)
}

function setCampaignBudget({campaignId, data}) {
    return api('put', `${daypartingUrls.dailyBudget(campaignId)}`, data)
}

function getDailyStatistic({campaignId, date, firstMetric, secondMetric, cancelToken}) {
    return api('get', `${daypartingUrls.dailyStatistic(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}&metrics=${firstMetric.key}${secondMetric.key !== 'nothing' ? `,${secondMetric.key}` : ''}`, null, null, cancelToken)
}

function getPlacementsStatistic({campaignId, date, cancelToken}) {
    return api('get', `${daypartingUrls.placements(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}`, null, null, cancelToken)
}

function getDayPartingParams({campaignId, cancelToken}) {
    return api('get', `${daypartingUrls.dayParting(campaignId)}?size=1&page=1`, null, null, cancelToken)
}

function updateDayPartingParams({campaignId, state_encoded_string, status}) {
    return api('post', `${daypartingUrls.dayParting(campaignId)}`, {state_encoded_string, status})
}

function activateDayparting({campaignId}) {
    return api('put', `${daypartingUrls.dayParting(campaignId)}`, {status: 'ACTIVE'})
}

function deactivateDayparting({campaignId}) {
    return api('put', `${daypartingUrls.dayParting(campaignId)}`, {status: 'DISABLED'})
}