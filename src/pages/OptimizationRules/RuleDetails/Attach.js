import React, {useState} from "react"
import {AttachCampaigns} from "../CreateRulesWindow/AttachCampaigns"

const tabs = ['campaigns used it', 'all campaigns']


export const Attach = ({id}) => {
    const [activeTab, setActiveTab] = useState(tabs[0])

    return (<div className="attach-block">
        <div className="tabs">
            <div className="container">
                {tabs.map(tab => <div onClick={() => setActiveTab(tab)}
                                      className={`tab ${tab === activeTab ? 'active' : ''}`}>{tab}</div>)}
            </div>
        </div>


        <AttachCampaigns
            ruleId={id}
            data={{
                campaignsId: []
            }}
        />
    </div>)
}