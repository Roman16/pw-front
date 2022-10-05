import api from './request'
import {daypartingUrls} from '../constans/api.urls'
import moment from "moment"

function dateFormatter(date) {
    return moment(date).format('YYYY-MM-DD')
}

export const daypartingServices = {
    getOutBudgetStatistic,
    getRecommendedBudget,
    setCampaignBudget,
    getDailyStatistic,
    getPlacementsStatistic,
    getDayPartingParams,
    updateDayPartingParams,
    activateDayparting,
    deactivateDayparting,
    deactivateMultiDayparting,
    activateMultiDayparting,

    getCampaigns,
    getProducts,
    getStatisticDayByHour,
    getStatisticDayByHourByPlacement,

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
    return api('get', `${daypartingUrls.dailyStatistic(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}&metrics=${firstMetric.key !== 'nothing' ? firstMetric.key : ''}${secondMetric.key !== 'nothing' ? (firstMetric.key === 'nothing' ? secondMetric.key : `,${secondMetric.key}`) : ''}`,
        null, null, cancelToken)
}

function getPlacementsStatistic({campaignId, date, cancelToken}) {
    return api('get', `${daypartingUrls.placements(campaignId)}?start_date=${dateFormatter(date.startDate)}&end_date=${dateFormatter(date.endDate)}`, null, null, cancelToken)
}

function getDayPartingParams({campaignId, cancelToken}) {
    return api('get', `${daypartingUrls.getDayParting(campaignId)}?size=1&page=1`, null, null, cancelToken)
}

function updateDayPartingParams({campaignId, state_encoded_string, status}) {
    return api('post', `${daypartingUrls.dayParting(campaignId)}`, {state_encoded_string, status})
}

function activateDayparting({campaignId}) {
    return api('put', `${daypartingUrls.dayParting(campaignId)}`, {status: 'ACTIVE'})
}

function activateMultiDayparting(data) {
    return api('post', `${daypartingUrls.multiDayParting}?campaignId:in=${data.campaignId}&state_encoded_string=${data.state.join('')}`)
}

function deactivateDayparting({campaignId}) {
    return api('put', `${daypartingUrls.dayParting(campaignId)}`, {status: 'DISABLED'})
}

function deactivateMultiDayparting(data) {
    return api('delete', `${daypartingUrls.multiDayParting}?campaignId:in=${data.campaignId}`)
}

//-----------------

function getCampaigns({pageSize = 25, page = 1, searchStr, cancelToken, onlyOnDayparting}) {
    const parameters = [
        searchStr ? `&name:search=${searchStr}` : '',
    ]

    return api('get', `${daypartingUrls.campaigns}?page=${page}&size=${pageSize}&with_only_active_dayparting=${onlyOnDayparting ? 1 : 0}${parameters.join('')}`, null, null, cancelToken)
}

function getProducts({pageSize = 25, page = 1, searchStr, cancelToken}) {
    const parameters = [
        searchStr ? `&name:search=${searchStr}` : '',
    ]

    return api('get', `${daypartingUrls.products}?page=${page}&size=${pageSize}${parameters.join('')}`, null, null, cancelToken)
}

function getStatisticDayByHour({cancelToken, campaignId, date}) {
    campaignId = '454717564720'

    return api('get', `${daypartingUrls.statisticDayByHour}?attribution_window=30&campaign_id=${campaignId}&date_from=${moment(date.startDate).format('Y-M-DD')}&date_to=${moment(date.endDate).format('Y-M-DD')}`, null, null, cancelToken)
}
function getStatisticDayByHourByPlacement({cancelToken, campaignId, date}) {
    campaignId = '454717564720'

    return api('get', `${daypartingUrls.statisticDayByHourByPlacement}?attribution_window=30&campaign_id=${campaignId}&date_from=${moment(date.startDate).format('Y-M-DD')}&date_to=${moment(date.endDate).format('Y-M-DD')}`, null, null, cancelToken)
}