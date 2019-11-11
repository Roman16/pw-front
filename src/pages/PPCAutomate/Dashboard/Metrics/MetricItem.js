import React from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip'

import closeIcon from '../../../../assets/img/icons/close.svg';
import upWhiteIcon from '../../../../assets/img/icons/metric-arrows/up-white-arrow.svg';
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import downWhiteIcon from '../../../../assets/img/icons/metric-arrows/down-white-arrow.svg';

const MetricItem = ({metric: {title, info, key, label, type}, metric, removeSelectedMetric, activeMetrics, activateMetric}) => {
    return (
        <div className='metric-item' onClick={() => activateMetric(key)}>
            {activeMetrics[0] === key && <div className='active-metric green'></div>}
            {activeMetrics[1] === key && <div className='active-metric violet'></div>}

            <div className="title-info">
                {title}
                {key === 'profit' ?
                    <Tooltip type='warning'/>
                    :
                    <Tooltip description={title}/>
                }

                <div className="close" onClick={() => removeSelectedMetric(metric)}>
                    <img src={closeIcon} alt=""/>
                </div>
            </div>

            <div className='metric-item__changes'>
                {key === 'ctr' && <div className='upward-changes'>
                    +30.8%
                    <img src={upWhiteIcon} alt=""/>
                </div>}
                {key === 'impressions' && <div className='up-changes'>
                    +10.8%
                    <img src={upGreenIcon} alt=""/>
                </div>}
                {key === 'clicks' && <div className='down-changes'>
                    -12.8%
                    <img src={downBlackIcon} alt=""/>
                </div>}
                {key === 'spend' && <div className='downward-changes'>
                    -25.8%
                    <img src={downWhiteIcon} alt=""/>
                </div>}
            </div>

            <div className='metric-item__description'>
                <div className="value">
                    {type === 'currency' ? `$7,507` : (type === 'percent' ? `18%` : '7,564')}
                </div>
                <div className='label'>{label}</div>
            </div>
        </div>
    )
};

export default MetricItem;