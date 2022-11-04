import React from "react"
import _ from "lodash"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

export const CampaignItem = ({campaign, campaign: {id, name, has_active_dayparting}, selectedCampaign, onSelect}) => (
    <div
        key={id}
        className={`campaign-item ${_.find(selectedCampaign, {id: id}) || selectedCampaign.id === id ? 'active' : ''} ${has_active_dayparting ? 'enabled-dayparting' : ''}`}
        onClick={() => onSelect(campaign)}
    >
        <span className={'short-name'} title={name}>{name}</span>

        {has_active_dayparting && <InformationTooltip
            arrowPointAtCenter={true}
            type={'custom'}
            description={'Campaign on dayparting'}
            position={'topRight'}
        >
            <div className='on-dayparting'/>
        </InformationTooltip>}
    </div>

)