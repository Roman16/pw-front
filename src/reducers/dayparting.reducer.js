import {daypartingConstants} from "../constans/actions.type"

const defaultState = {
    campaignList: [],
    processing: false,
    totalSize: 0,
    copiedParams: undefined,
    selectedCampaign: {id: null}
}

export function dayparting(state = defaultState, action) {
    switch (action.type) {
        case daypartingConstants.SET_CAMPAIGN_LIST:
            return {
                ...state,
                campaignList: action.payload.response,
                totalSize: action.payload.total_count,
                selectedCampaign: action.payload.response[0] || {id: null},
                processing: false
            }

        case daypartingConstants.SET_PROCESSING_STATE:
            return {
                ...state,
                processing: action.payload,
            }

        case daypartingConstants.SELECT_CAMPAIGN:
            return {
                ...state,
                selectedCampaign: action.payload,
            }


        case daypartingConstants.ACTIVATED_DAYPARTING:
            return {
                ...state,
                campaignList: state.campaignList.map(item => {
                    if (item.id === action.payload) {
                        item.hasEnabledDayparting = true
                    }

                    return item
                })
            }

        case daypartingConstants.COPY_PARAMS:
            return {
                ...state,
                copiedParams: action.payload
            }


        case daypartingConstants.DEACTIVATED_DAYPARTING:
            return {
                ...state,
                campaignList: state.campaignList.map(item => {
                    if (item.id === action.payload) {
                        item.hasEnabledDayparting = false
                    }

                    return item
                })
            }


        default:
            return state
    }
}