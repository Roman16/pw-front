import React from "react"
import './MetricItem.less'
import Tooltip from "../../../../components/Tooltip/Tooltip"
import {SVG} from "../../../../utils/icons"
import {profitMetrics, RenderMetricChanges} from "../../../AnalyticsV3/components/MainMetrics/MetricItem"

export const MetricItem = ({
                               metric: {
                                   key,
                                   title,
                               },
                               activeMetrics,
                               onSelect
                           }) =>
    <div className='metric-item' onClick={() => onSelect(key)}>
        {activeMetrics.length > 0 &&
        <div className={`active-metric position-${activeMetrics.findIndex(item => item === key)}`}/>}

        <div className="title-info">
            <span title={title} dangerouslySetInnerHTML={{__html: title}}/>
        </div>

        {/*<div className="value">*/}
        {/*    <RenderMetricValue*/}
        {/*        id={key}*/}
        {/*        value={value}*/}
        {/*        type={type}*/}
        {/*    />*/}
        {/*</div>*/}


        {/*<div className='metric-item__description'>*/}
        {/*    <div className='label'>{label}</div>*/}

        {/*    <RenderMetricChanges*/}
        {/*        value={value}*/}
        {/*        diff={value_diff}*/}
        {/*        prevValue={value_prev}*/}
        {/*        type={type}*/}
        {/*        name={key}*/}
        {/*    />*/}
        {/*</div>*/}
    </div>

