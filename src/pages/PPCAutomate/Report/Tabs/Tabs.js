import React from "react";
import './Tabs.less';


const Tabs = ({currentTab, onChangeTab}) => {
    const TabName = ({title, key}) => {
        return (
            <div className="TabName" data-intercom-target={`${key}-category`}>
                <span>{title}</span>

                {/*{changesCounts[key] && <div className='new-count'>*/}
                {/*    {changesCounts[key].new_count}*/}
                {/*</div>}*/}
            </div>
        )
    };

    return (
        <ul className="tabs">
            <li
                onClick={() => onChangeTab('all-reports')}
            >
                <TabName
                    title={'all reports'}
                    key={'all'}
                />
            </li>

            <li
                onClick={() => onChangeTab('targeting-improvements')}
            >
                <TabName
                    title={'TARGETING IMPROVEMENTS'}
                    key={'targeting_improvements'}
                />
            </li>

            <li
                onClick={() => onChangeTab('search-terms')}
            >
                <TabName
                    title={'SEARCH TERMS'}
                    key={'search_terms'}
                />
            </li>

            <input
                type="radio"
                name="slideItem"
                id={`slide-item-1`}
                className="slide-toggle"
                checked={currentTab === 'all-reports'}
            />

            <input
                type="radio"
                name="slideItem"
                id={`slide-item-2`}
                className="slide-toggle"
                checked={currentTab === 'targeting-improvements'}
            />


            <input
                type="radio"
                name="slideItem"
                id={`slide-item-3`}
                className="slide-toggle"
                checked={currentTab === 'search-terms'}
            />

            <div className="slider">
                <div className="bar"/>
            </div>
        </ul>
    )
};

export default Tabs;