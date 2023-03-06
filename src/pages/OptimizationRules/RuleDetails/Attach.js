import React, {useState} from "react"

const tabs = ['campaigns used it', 'all campaigns']


export const Attach = () => {
const [activeTab, setActiveTab] = useState(tabs[0])

    return (<div className="attach-block">
        <div className="tabs">
            <div className="container">
                {tabs.map(tab =><div onClick={() => setActiveTab(tab)} className={`tab ${tab === activeTab ? 'active' : ''}`}>{tab}</div>)}
            </div>
        </div>
    </div>)
}