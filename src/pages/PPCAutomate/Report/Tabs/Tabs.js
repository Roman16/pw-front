import React from "react";
import './Tabs.less';

const Tabs = () => {
    return (
        <ul className="tabs">
            <li className={'current-page-link'}>
                all reports
            </li>

            <li>
                TARGETING IMPROVEMENTS

            </li>

            <li>
                SEARCH TERMS

            </li>
        </ul>
    )
};

export default Tabs;