import React from "react";
import {Icon, Tooltip} from "antd";
import plusIcon from "../../../../../assets/img/icons/plus-green.svg";
import minusIcon from "../../../../../assets/img/icons/minus.svg";

const ModalMetricItem = ({item: {title, info, metric_value, type}, item, listType, removeMetric, addMetric}) => (
    <div className='metric-item' onClick={() => listType === 'visible' ? removeMetric(item) : addMetric(item)}>
        <div className="title-info">
            {title}
            <Tooltip title={info || title}>
                <Icon type="info-circle" theme="filled"/>
            </Tooltip>

            {listType === 'hidden' && <div className="add-item">
                <img src={plusIcon} alt=""/>
            </div>}

            {listType === 'visible' && <div className="remove-item">
                <img src={minusIcon} alt=""/>
            </div>}
        </div>

        <div className='metric-item__description'>
            <div className="value">
                {metric_value != null ? type === 'currency' ? `$${(+metric_value).toFixed(2)}` : (type === 'percent' ? `${(+metric_value).toFixed(2)}%` : (+metric_value).toFixed(2)) : 'N/A'}
            </div>
            <div className='label'>Total</div>
        </div>
    </div>
);

export default ModalMetricItem;
