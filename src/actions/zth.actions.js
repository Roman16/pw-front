import {zthConstants} from '../constans/actions.type';

export const zthActions = {
    setCampaign,
    setProductAmount
};

function setCampaign(campaign) {
    return dispatch => {
        dispatch({
            type: zthConstants.SET_CAMPAIGN,
            payload: campaign
        });
    };
}

function setProductAmount(count) {
    return dispatch => {
        dispatch({
            type: zthConstants.SET_PRODUCT_AMOUNT,
            payload: count
        });
    };
}
