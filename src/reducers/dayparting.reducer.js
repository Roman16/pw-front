import {daypartingConstants} from "../constans/actions.type"

const defaultState = {
    campaignList: [],
    processing: false,
    totalSize: 0,
    copiedParams: undefined,
    selectedCampaign: {id: null},
    activeTab: 'campaigns'
}

export function dayparting(state = defaultState, action) {
    switch (action.type) {
        case daypartingConstants.SET_CAMPAIGN_LIST:
            return {
                ...state,
                campaignList: action.payload.data,
                totalSize: action.payload.total,
                selectedCampaign: action.payload?.data[0] || {id: null},
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
                        item.has_active_dayparting = true
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
                        item.has_active_dayparting = false
                    }

                    return item
                })
            }

        case daypartingConstants.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload,
                campaignList: [],
                totalSize: 0
            }


        default:
            return state
    }
}