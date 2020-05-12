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
                className={currentTab === 'all-reports' && 'current-page-link'}
            >
                <TabName
                    title={'all reports'}
                    key={'all'}
                />
            </li>

            <li
                onClick={() => onChangeTab('targeting-improvements')}
                className={currentTab === 'targeting-improvements' && 'current-page-link'}
            >
                <TabName
                    title={'TARGETING IMPROVEMENTS'}
                    key={'targeting_improvements'}
                />
            </li>

            <li
                onClick={() => onChangeTab('search-terms')}
                className={currentTab === 'search-terms' && 'current-page-link'}
            >
                <TabName
                    title={'SEARCH TERMS'}
                    key={'search_terms'}
                />
            </li>
        </ul>
    )
};

export default Tabs;