import api from "./request"
import {analyticsUrls} from "../constans/api.urls"


export const analyticsServices = {
    fetchAdGroupsList,
    fetchProductsList,
    fetchCampaignsList,
    fetchPlacementsList,
    fetchNegativeTargetingsList
}

function fetchAdGroupsList(paginationParams) {
    // return api('get', `${analyticsUrls.adGroupsList}`)

    return ({
        result: [
            {
                id: 134,
                'ad_group': 'Teeest111'
            },
            {
                id: 334,
                'ad_group': 'Teeest222'
            },
        ],
        totalSize: 2
    })
}

function fetchProductsList(paginationParams) {
    // return api('get', `${analyticsUrls.productsList}`)

    return ({
        result: [
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
        totalSize: 2
    })
}

function fetchCampaignsList(paginationParams) {
    // return api('get', `${analyticsUrls.campaignsList}`)

    return ({
        result: [
            {
                id: 123,
                campaign: 'Test Test',
                status: 'active'
            },

            {
                id: 323,
                campaign: 'Test Test Test'
            },
        ],
        totalSize: 2
    })
}

function fetchPlacementsList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        result: [
            {
                id: 123,
                placement: 'Test Test',
            },

            {
                id: 323,
                placement: 'Test Test Test'
            },
        ],
        totalSize: 2
    })
}

function fetchNegativeTargetingsList(paginationParams) {
    // return api('get', `${analyticsUrls.placementsList}`)

    return ({
        result: [
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
        totalSize: 2
    })
}