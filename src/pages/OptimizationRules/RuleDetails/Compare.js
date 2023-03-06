import React, {useState} from "react"

const tabs = ['campaigns used it', 'all campaigns']


export const Compare = () => {
const [activeTab, setActiveTab] = useState(tabs[0])

    return (<div className="compare-block">
        <div className="tabs">
            <div className="container">
                {tabs.map(tab =><div onClick={() => setActiveTab(tab)} className={`tab ${tab === activeTab ? 'active' : ''}`}>{tab}</div>)}
            </div>
        </div>
    </div>)
}