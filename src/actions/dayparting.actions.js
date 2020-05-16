import {daypartingConstants} from '../constans/actions.type';
import {daypartingServices} from "../services/dayparting.services";

export const daypartingActions = {
    getCampaignList
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
