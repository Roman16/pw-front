import React from "react"
import _ from "lodash"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import {SVG} from "../../../utils/icons"

export const CampaignItem = ({campaign, campaign: {id, name, has_active_dayparting, state}, selectedCampaign, onSelect}) => (
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

        <Status state={state}/>
    </div>

)

const Status = ({state}) => <InformationTooltip
    arrowPointAtCenter={true}
    type={'custom'}
    description={state}
    position={'topRight'}
    className={'status-tooltip'}
    overlayClassName={'tooltip-popover'}
>
    <i className={`status ${state}`}><SVG id={`${state}-status`}/></i>
</InformationTooltip>
