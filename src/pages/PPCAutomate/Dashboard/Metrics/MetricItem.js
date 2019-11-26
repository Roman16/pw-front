import React, {Fragment} from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip'
import {ProfitTooltipDescription} from "../ProductBreakdown/ProductsList";
import {metricsListArray} from "./metricsList";
import closeIcon from '../../../../assets/img/icons/close.svg';
import upWhiteIcon from '../../../../assets/img/icons/metric-arrows/up-white-arrow.svg';
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import downWhiteIcon from '../../../../assets/img/icons/metric-arrows/down-white-arrow.svg';
import {round} from "../../../../utils/round";

const RenderMetricChanges = ({value, name}) => {
    if (value != null) {
        if (value === 0) {
            return (
                <div className='metric-item__changes'>
                    <div className='down-changes'>
                        0%
                        <div className='horizontal-line-icon'></div>
                    </div>
                </div>
            )
        } else if (name === 'cpc' || name === 'acos' || name === 'cpa' || name === 'macos') {
            return (
                <div className='metric-item__changes'>
                    {value >= 25 && <div className='downward-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={downWhiteIcon} alt=""/>

                    </div>}
                    {(value > 0 && value < 25) && <div className='down-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={downBlackIcon} alt=""/>
                    </div>}
                    {(value <= 0 && value > -25) && <div className='up-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={upGreenIcon} alt=""/>
                    </div>}
                    {(value <= -25) && <div className='upward-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={upWhiteIcon} alt=""/>
                    </div>}
                </div>
            )
        } else {
            return (
                <div className='metric-item__changes'>
                    {value >= 25 && <div className='upward-changes'>
                        {round(+value, 2)}%
                        <img src={upWhiteIcon} alt=""/>
                    </div>}
                    {(value > 0 && value < 25) && <div className='up-changes'>
                        {round(+value, 2)}%
                        <img src={upGreenIcon} alt=""/>
                    </div>}
                    {(value <= 0 && value > -25) && <div className='down-changes'>
                        {round(+value, 2)}%
                        <img src={downBlackIcon} alt=""/>
                    </div>}
                    {(value <= -25) && <div className='downward-changes'>
                        {round(+value, 2)}%
                        <img src={downWhiteIcon} alt=""/>
                    </div>}
                </div>
            )
        }
    } else {
        return (
            <div className='metric-item__changes'>
                <div className='down-changes'>
                    N/A
                </div>
            </div>
        )
    }
};


const MetricItem = ({metric: {title, info = '', key, label, type, metric_diff, metric_value}, metric, removeSelectedMetric, activeMetrics, onActivateMetric, onDeactivateMetric}) => {
    const handleClick = () => {
        if (activeMetrics.find(item => item.key === key)) {
            onDeactivateMetric(metric)
        } else {
            onActivateMetric(metric)
        }
    };

    const handleRemoveItem = (e) => {
        e.stopPropagation();
        removeSelectedMetric(metric)
    };

    const metricInformation = metricsListArray.find(item => item.key === key).info;

    return (
        <div className='metric-item' onClick={handleClick}>
            {activeMetrics && <Fragment>
                {(activeMetrics[0] && activeMetrics[0].key === key) && <div className='active-metric green'></div>}
                {(activeMetrics[1] && activeMetrics[1].key === key) && <div className='active-metric violet'></div>}
            </Fragment>}


            <div className="title-info">
                {title}
                {key === 'profit' ?
                    <Tooltip type='warning' description={<ProfitTooltipDescription/>}/>
                    :
                    metricInformation && <Tooltip description={metricInformation}/>
                }

                <div className="close" onClick={handleRemoveItem}>
                    <img src={closeIcon} alt=""/>
                </div>
            </div>

            <RenderMetricChanges
                value={metric_diff}
                name={key}
            />


            <div className='metric-item__description'>
                <div className="value">
                    {metric_value != null ? type === 'currency' ? `$${round(+metric_value, 2)}` : (type === 'percent' ? `${round(+metric_value, 2)}%` : round(+metric_value, 2)) : 'N/A'}
                </div>
                <div className='label'>{label}</div>
            </div>
        </div>
    )
};

export default MetricItem;
