import {daypartingConstants, productsConstants} from '../constans/actions.type';
import {daypartingServices} from "../services/dayparting.services";

export const daypartingActions = {
    getCampaignList,
    selectCampaign,
    activateDayparing,
    deactivateDayparing,
    setCampaignList
};

function getCampaignList(parameters) {

    return dispatch => {
        dispatch({
            type: daypartingConstants.SET_PROCESSING_STATE,
            payload: true
        })

        daypartingServices.getCampaigns(parameters)
            .then((res) => {
                dispatch({
                    type: daypartingConstants.SET_CAMPAIGN_LIST,
                    payload: res
                });
            });
    };
}

function setCampaignList(list) {
    return ({
        type: daypartingConstants.SET_CAMPAIGN_LIST,
        payload: list
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
    });
}


function deactivateDayparing(id) {
    return ({
        type: daypartingConstants.DEACTIVATED_DAYPARTING,
        payload: id
    });
}
