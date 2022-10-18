import api from './request'
import {daypartingUrls} from '../constans/api.urls'
import moment from "moment"
import {store} from '../store/store'

export const daypartingServices = {
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
    getChartDataByWeekday,
    getChartDataByHour,
    getPlacementChartDataByWeekday,
    getPlacementChartDataByHour,
    getPlacementMetricsData

}


const getIdKey = (id) => {
    const state = store.getState()

    if (state.dayparting.activeTab === 'campaigns') {
        return `&campaign_id=${id}`
    } else if (state.dayparting.activeTab === 'products') {
        return `&product_id=${id}`
    } else {
        return ''
    }
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
        searchStr ? `&search=${searchStr}` : '',
    ]

    return api('get', `${daypartingUrls.campaigns}?page=${page}&size=${pageSize}&with_only_active_dayparting=${onlyOnDayparting ? 1 : 0}${parameters.join('')}`, null, null, cancelToken)
}

function getProducts({pageSize = 25, page = 1, searchStr, cancelToken}) {
    const parameters = [
        searchStr ? `&search=${searchStr}` : '',
    ]

    return api('get', `${daypartingUrls.products}?page=${page}&size=${pageSize}${parameters.join('')}`, null, null, cancelToken)
}

function getStatisticDayByHour({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.statisticDayByHour}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}

function getStatisticDayByHourByPlacement({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.statisticDayByHourByPlacement}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}

function getChartDataByWeekday({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.chartDataByWeekday}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}

function getChartDataByHour({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.chartDataByHour}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}

function getPlacementChartDataByWeekday({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.placementChartDataByWeekday}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}

function getPlacementChartDataByHour({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.placementChartDataByHour}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}

function getPlacementMetricsData({cancelToken, campaignId, date, attributionWindow}) {
    return api('get', `${daypartingUrls.placementMetricsData}?attribution_window=${attributionWindow}${getIdKey(campaignId)}&date_from=${moment(date.startDate).format('Y-MM-DD')}&date_to=${moment(date.endDate).format('Y-MM-DD')}`, null, null, cancelToken)
}