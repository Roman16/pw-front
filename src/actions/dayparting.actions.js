import {daypartingConstants} from '../constans/actions.type';
import {daypartingServices} from "../services/dayparting.services";

export const daypartingActions = {
    getCampaignList,
    selectCampaign
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

function selectCampaign(campaign) {
    return ({
        type: daypartingConstants.SELECT_CAMPAIGN,
        payload: campaign
    })
}
