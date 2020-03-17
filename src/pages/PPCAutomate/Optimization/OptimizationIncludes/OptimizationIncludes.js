import React from "react";
import './OptimizationIncludes.less';
import {Icon} from "antd";
import soon from "../../../../assets/img/soon-label.svg";

const OptimizationIncludes = ({onShowDrawer}) => {

    return (
        <section className='optimization-includes'>
            <h3>Automation includes:
                {/*<Icon*/}
                {/*    type="info-circle"*/}
                {/*    theme="filled"*/}
                {/*    onClick={() => onShowDrawer("options")}*/}
                {/*/>*/}
            </h3>

            <ul>
                <li>Harvesting new keywords</li>
                <li>Product targeting optimization</li>
                <li>Pausing bleeding keywords</li>
                <li className='soon'>Budget optimization <img src={soon} alt=""/></li>
                <li>Finding and adding negatives</li>
                <li>Real-time bid management</li>
                <li>Pausing duplicates</li>
            </ul>
        </section>
    )
};

export default OptimizationIncludes;