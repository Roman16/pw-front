import React from "react";

import Tooltip from '../../../../components/Tooltip/Tooltip'

import closeIcon from '../../../../assets/img/icons/close.svg';
import upWhiteIcon from '../../../../assets/img/icons/metric-arrows/up-white-arrow.svg';
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import downWhiteIcon from '../../../../assets/img/icons/metric-arrows/down-white-arrow.svg';

const MetricItem = ({metric: {title, info, key}}) => (
    <div className='metric-item'>
        <div className="title-info">
            {title}
            {key === 'profit' ?
                <Tooltip type='warning'/>
                :
                <Tooltip description={title}/>
            }


            <div className="close">
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
                7,503,768
            </div>
            <div className='label'>Total</div>
        </div>
    </div>
);

export default MetricItem;