import React from "react";
import './Tabs.less';
import {mainChangesCount, mainHasNewReport} from "../ReportTable/Tables/changesCount";

//
// const TabName = ({name = null, type}) => {
//     return (
//         <div className="TabName" data-intercom-target={`${type}-category`}>
//             <span>{name}</span>
//
//             <div className="tab-name-count">
//                 {mainChangesCount(counts, type) > 1000 ? '999+' : mainChangesCount(counts, type)}
//
//                 {mainHasNewReport(countsWithNew, type) > 0 &&
//                 <div className='new-count'>New {mainHasNewReport(countsWithNew, type)}</div>}
//             </div>
//         </div>
//     )
// };


const Tabs = ({currentTab, onChangeTab}) => {
    return (
        <ul className="tabs">
            <li
                onClick={() => onChangeTab('allReports')}
                className={currentTab === 'allReports' && 'current-page-link'}
            >
                all reports
            </li>

            <li
                onClick={() => onChangeTab('targetingImprovements')}
                className={currentTab === 'targetingImprovements' && 'current-page-link'}
            >
                TARGETING IMPROVEMENTS

            </li>

            <li
                onClick={() => onChangeTab('searchTerms')}
                className={currentTab === 'searchTerms' && 'current-page-link'}
            >
                SEARCH TERMS

            </li>
        </ul>
    )
};

export default Tabs;