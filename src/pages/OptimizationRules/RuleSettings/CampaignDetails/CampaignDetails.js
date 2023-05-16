import React from "react"
import {ParentStatus} from "../../../Analytics/components/TableList/tableColumns"
import './CampaignDetails.less'
import {Attach} from "./Attach"

export const CampaignDetails = ({campaign, onAttach, onDetach}) => {

    return (<div className="campaign-details">
        <div className="short-info">
            <h2>{campaign.name}</h2>

            <ParentStatus status={campaign.state} widthLabel={true}/>
        </div>

        <Attach
            id={campaign.campaignId}

            onAttach={onAttach}
            onDetach={onDetach}
        />
    </div>)
}