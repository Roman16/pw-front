import {daypartingConstants} from "../constans/actions.type";

const defaultState = {
    campaignList: [],
    processing: false,
    totalSize: 0,
    selectedCampaign: null
}

export function dayparting(state = defaultState, action) {
    switch (action.type) {
        case daypartingConstants.SET_CAMPAIGN_LIST:
            return {
                ...state,
                campaignList: action.payload.response,
                totalSize: action.payload.total_count,
                selectedCampaign: action.payload.response[0] || {},
                processing: false
            };

        case daypartingConstants.SET_PROCESSING_STATE:
            return {
                ...state,
                processing: action.payload,
            };

        case daypartingConstants.SELECT_CAMPAIGN:
            return {
                ...state,
                processing: action.payload,
            };

        default:
            return state;
    }
}