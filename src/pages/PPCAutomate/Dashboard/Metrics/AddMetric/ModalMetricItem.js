import React from "react";
import {Icon, Tooltip} from "antd";
import plusIcon from "../../../../../assets/img/icons/plus-green.svg";
import minusIcon from "../../../../../assets/img/icons/minus.svg";

const ModalMetricItem = ({item: {title, info}, item, type, removeMetric, addMetric}) => (
    <div className='metric-item'>
        <div className="title-info">
            {title}
            <Tooltip title={info || title}>
                <Icon type="info-circle" theme="filled"/>
            </Tooltip>

            {type === 'hidden' && <div className="add-item" onClick={() => addMetric(item)}>
                <img src={plusIcon} alt=""/>
            </div>}

            {type === 'visible' && <div className="remove-item" onClick={() => removeMetric(item)}>
                <img src={minusIcon} alt=""/>
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

export default ModalMetricItem;