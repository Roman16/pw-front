import React from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip'

import closeIcon from '../../../../assets/img/icons/close.svg';
import upWhiteIcon from '../../../../assets/img/icons/metric-arrows/up-white-arrow.svg';
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import downWhiteIcon from '../../../../assets/img/icons/metric-arrows/down-white-arrow.svg';

const RenderMetricChanges = ({value}) => (
    <div className='metric-item__changes'>
        {value >= 25 && <div className='upward-changes'>
            {value}
            <img src={upWhiteIcon} alt=""/>
        </div>}
        {(value > 0 && value < 25) && <div className='up-changes'>
            {value}
            <img src={upGreenIcon} alt=""/>
        </div>}
        {(value <= 0 && value > -25) && <div className='down-changes'>
            {value}
            <img src={downBlackIcon} alt=""/>
        </div>}
        {(value <= -25) && <div className='downward-changes'>
            {value}
            <img src={downWhiteIcon} alt=""/>
        </div>}
    </div>
);


const MetricItem = ({metric: {title, info = '', key, label, type, metric_changes, metric_main_value = 0}, metric, removeSelectedMetric, activeMetrics, onActivateMetric, onDeactivateMetric}) => {
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
            {(activeMetrics[0] && activeMetrics[0].key === key) && <div className='active-metric green'></div>}
            {(activeMetrics[1] && activeMetrics[1].key === key) && <div className='active-metric violet'></div>}

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
                value={metric_changes}
            />


            <div className='metric-item__description'>
                <div className="value">
                    {type === 'currency' ? `$${metric_main_value}` : (type === 'percent' ? `${metric_main_value}%` : metric_main_value)}
                </div>
                <div className='label'>{label}</div>
            </div>
        </div>
    )
};

export default MetricItem;