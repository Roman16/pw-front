import React, {Fragment} from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip'

import closeIcon from '../../../../assets/img/icons/close.svg';
import upWhiteIcon from '../../../../assets/img/icons/metric-arrows/up-white-arrow.svg';
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import downWhiteIcon from '../../../../assets/img/icons/metric-arrows/down-white-arrow.svg';
import {round} from "../../../../utils/round";

const RenderMetricChanges = ({value}) => {
    if (value != null) {
        return (
            <div className='metric-item__changes'>
                {value >= 25 && <div className='upward-changes'>
                    {round(+value, 4)}
                    <img src={upWhiteIcon} alt=""/>
                </div>}
                {(value > 0 && value < 25) && <div className='up-changes'>
                    {round(+value, 4)}
                    <img src={upGreenIcon} alt=""/>
                </div>}
                {(value <= 0 && value > -25) && <div className='down-changes'>
                    {round(+value, 4)}
                    <img src={downBlackIcon} alt=""/>
                </div>}
                {(value <= -25) && <div className='downward-changes'>
                    {round(+value, 4)}
                    <img src={downWhiteIcon} alt=""/>
                </div>}
            </div>
        )
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

    return (
        <div className='metric-item' onClick={handleClick}>
            {activeMetrics && <Fragment>
                {(activeMetrics[0] && activeMetrics[0].key === key) && <div className='active-metric green'></div>}
                {(activeMetrics[1] && activeMetrics[1].key === key) && <div className='active-metric violet'></div>}
            </Fragment>}


            <div className="title-info">
                {title}
                {key === 'profit' ?
                    <Tooltip type='warning'/>
                    :
                    <Tooltip description={title}/>
                }

                <div className="close" onClick={handleRemoveItem}>
                    <img src={closeIcon} alt=""/>
                </div>
            </div>

            <RenderMetricChanges
                value={metric_diff}
            />


            <div className='metric-item__description'>
                <div className="value">
                    {metric_value != null ? type === 'currency' ? `$${round(+metric_value, 4)}` : (type === 'percent' ? `${round(+metric_value, 4)}%` : round(+metric_value, 4)) : 'N/A'}
                </div>
                <div className='label'>{label}</div>
            </div>
        </div>
    )
};

export default MetricItem;
