import React from "react";
import './Filters.less';
import {SVG} from "../../../../utils/icons";

const Filters = () => {
    return (
        <div className="report-filter">
            <p>Filters: </p>

            <div className="current-filters">

            </div>

            <button className={'btn default add-filter'}>
                <SVG id={'plus-icon'}/>
            </button>
        </div>
    )
};

export default Filters;