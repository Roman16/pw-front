import {daypartingConstants, productsConstants} from '../constans/actions.type'
import {daypartingServices} from "../services/dayparting.services"

export const daypartingActions = {
    getDataList,
    selectCampaign,
    activateDayparing,
    deactivateDayparing,
    setCampaignList,
    copyParams,
    setActiveTab
}

function getDataList(requestParams, type) {

    return dispatch => {
        dispatch({
            type: daypartingConstants.SET_PROCESSING_STATE,
            payload: true
        })

        if (type === 'campaigns') {
            daypartingServices.getCampaigns(requestParams)
                .then((res) => {
                    dispatch({
                        type: daypartingConstants.SET_CAMPAIGN_LIST,
                        payload: res.result
                    })
                })
        } else if (type === 'account') {
            dispatch({
                type: daypartingConstants.SET_CAMPAIGN_LIST,
                payload: {
                    data: [{
                        id: 1
                    }],
                    total: 0
                }
            })
        } else if (type === 'products') {
            daypartingServices.getProducts(requestParams)
                .then((res) => {
                    dispatch({
                        type: daypartingConstants.SET_CAMPAIGN_LIST,
                        payload: res.result
                    })
                })
        }
    }
}

function setCampaignList(list) {
    return ({
        type: daypartingConstants.SET_CAMPAIGN_LIST,
        payload: list
    })
}

function copyParams(params) {
    return ({
        type: daypartingConstants.COPY_PARAMS,
        payload: params
    })
}

function selectCampaign(campaign) {
    return ({
        type: daypartingConstants.SELECT_CAMPAIGN,
        payload: campaign
    })
}


function activateDayparing(id) {
    return ({
        type: daypartingConstants.ACTIVATED_DAYPARTING,
        payload: id
    })
}


function deactivateDayparing(id) {
    return ({
        type: daypartingConstants.DEACTIVATED_DAYPARTING,
        payload: id
    })
}

function setActiveTab(tab) {
    return ({
        type: daypartingConstants.SET_ACTIVE_TAB,
        payload: tab
    })
}
