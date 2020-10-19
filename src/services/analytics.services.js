import api from "./request"
import {analyticsUrls} from "../constans/api.urls"
import moment from "moment"
import {reasonFilterParams} from "./reports.services"


export const analyticsServices = {
    fetchAdGroupsList,
    fetchProductsList,
    fetchCampaignsList,
    fetchPlacementsList,
    fetchNegativeTargetingsList,
    fetchTargetingsList,
    fetchPortfoliosList,
    fetchProductAdsList,
    fetchMetricsData,
    fetchChartData,
    getCampaignInformation
}


const urlGenerator = (url, pagination, sorting, filters) => {
    const parameters = []

    if (sorting.type && sorting.column) {
        parameters.push(`&order_by:${sorting.type}=${sorting.column}`)
    }

    filters.forEach(({filterBy, type, value}) => {
        if (type === 'search' && value) {
            parameters.push(`&${filterBy}:search=${value}`)
        } else if(filterBy === 'datetime') {
            parameters.push(`&datetime:range=${value.startDate === 'lifetime' ? 'lifetime' : moment.tz(`${moment(value.startDate).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()},${value.endDate === 'lifetime' ? 'lifetime' : moment.tz(`${moment(value.endDate).format('YYYY-MM-DD')} ${moment().endOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString()}`)
        } else if(type.key === 'one_of') {
            parameters.push(`&${filterBy}:in=${value}`)
        } else if(typeof type === 'object') {
            parameters.push(`&${filterBy}:${type.key}=${value}`)
        } else {
            parameters.push(`&${filterBy}:${type}=${value}`)
        }
    })


    return `${analyticsUrls[url]}?page=${pagination.page}&size=${pagination.pageSize}${parameters.join('')}`
}

function fetchAdGroupsList(paginationParams) {
    // return api('get', `${analyticsUrls.adGroupsList}`)

    return ({
        response: [
            {
                id: 134,
                'ad_group': 'Teeest111',
                'campaign': 'Test campaign',
                'campaignId': 12333
            },
            {
                id: 334,
                'ad_group': 'Teeest222',
                'campaign': 'Test campaign 2',
                'campaignId': 1333
            },
        ],
        total_count: 2
    })
}

function fetchProductsList(paginationParams) {
    // return api('get', `${analyticsUrls.productsList}`)

    return ({
        response: [
            {
                id: 123,
                product: 'Test Test',
                'sku_asin': 'NEWFWEK433NRE',
            },

            {
                id: 323,
                product: 'Test Test Test',
                'sku_asin': 'NEWFWEK433NRE',
            },
        ],
        total_count: 2
    })
}

function fetchCampaignsList(paginationParams, sortingParams = {}, filters = []) {
    return api('get', urlGenerator('campaignsList', paginationParams, sortingParams, filters))
}

function fetchPlacementsList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        response: [
            {
                id: 123,
                placement: 'Test Test',
            },

            {
                id: 323,
                placement: 'Test Test Test'
            },
        ],
        total_count: 2
    })
}

function fetchNegativeTargetingsList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        response: [
            {
                id: 123,
                keyword_pt: 'Test Test',
                campaign: 'Test Campaign 1'

            },

            {
                id: 323,
                keyword_pt: 'Test Test Test',
                campaign: 'Test Campaign 3'
            },
        ],
        total_count: 2
    })
}

function fetchTargetingsList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        response: [
            {
                id: 123,
                keyword_pt: 'Test Test',

            },

            {
                id: 323,
                keyword_pt: 'Test Test Test',
            },
        ],
        total_count: 2
    })
}

function fetchPortfoliosList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        response: [
            {
                id: 123,
                portfolio: 'Test Test',

            },

            {
                id: 323,
                portfolio: 'Test Test Test',
            },
        ],
        total_count: 2
    })
}

function fetchProductAdsList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        response: [
            {
                id: 123,
                product: 'Test Test',

            },

            {
                id: 323,
                product: 'Test Test Test',
            },
        ],
        total_count: 2
    })
}

function fetchMetricsData({startDate, endDate}) {
    return api('get', `${analyticsUrls.metricsData}?product_id=all&start_date=lifetime&end_date=lifetime`)
}

function fetchChartData(location, metrics) {
    return api('get', `${analyticsUrls.chartData(location)}?metric[]=itemPrice`)
}

function getCampaignInformation(id) {
    return api('get', `${analyticsUrls.campaignInformation(id)}`)
}
