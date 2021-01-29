import React from "react"
import {SVG} from "../../../../utils/icons"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const CreateCampaignButton = () => {
    const dispatch = useDispatch()

    const openCreateWindowHandler = () => dispatch(analyticsActions.setVisibleCreateWindow({campaign: true}))

    return (<button
        className="btn default create-button"
        onClick={openCreateWindowHandler}
    >
        <SVG id={'plus-white'}/>
        Add Campaign
    </button>)
}

export default CreateCampaignButton
