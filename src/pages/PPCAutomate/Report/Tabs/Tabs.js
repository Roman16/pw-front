import React from "react"
import './Tabs.less'


const tabs = [
    {
        title: 'all reports',
        key: 'all-reports'
    },
    {
        title: 'TARGETING IMPROVEMENTS',
        key: 'targeting-improvements'
    },
    {
        title: 'SEARCH TERMS',
        key: 'search-terms'
    },

]

const Tabs = ({currentTab, onChangeTab}) => {
    const TabName = ({title, key}) => {
        return (
            <div className={`TabName`}>
                <span>{title}</span>
            </div>
        )
    }

    return (
        <ul className="tabs">
            {tabs.map((i, index) => <>
                <input
                    type="radio"
                    name="slideItem"
                    id={`slide-item-${index + 1}`}
                    className="slide-toggle"
                    checked={currentTab === i.key}
                />

                <li onClick={() => onChangeTab(i.key)} className={i.key === currentTab ? 'active' : ''}>
                    <TabName title={i.title} key={i.key}/>
                </li>
            </>)}

            <div className="slider">
                <div className="bar"/>
            </div>
        </ul>
    )
}

export default Tabs