import React from "react";
import Tooltip from '../../../../../components/Tooltip/Tooltip';
import {ProfitTooltipDescription} from "../../ProductBreakdown/ProductsList";
import plusIcon from "../../../../../assets/img/icons/plus-green.svg";
import minusIcon from "../../../../../assets/img/icons/minus.svg";
import {round} from "../../../../../utils/round";
import {metricsListArray} from "../metricsList";

const ModalMetricItem = ({item: {title, info, key, metric_value, type, label}, item, listType, removeMetric, addMetric}) => {
    const metricInformation = metricsListArray.find(item => item.key === key).info;

    return (<div className='metric-item' onClick={() => listType === 'visible' ? removeMetric(item) : addMetric(item)}>
        <div className="title-info">
            {title}

            {key === 'profit' ?
                <Tooltip type='warning' description={<ProfitTooltipDescription />}/>
                :
                metricInformation && <Tooltip description={metricInformation}/>
            }

            {listType === 'hidden' && <div className="add-item">
                <img src={plusIcon} alt=""/>
            </div>}

            {listType === 'visible' && <div className="remove-item">
                <img src={minusIcon} alt=""/>
            </div>}
        </div>

        <div className='metric-item__description'>
            <div className="value">
                {metric_value != null ? type === 'currency' ? `$${round(+metric_value, 2)}` : (type === 'percent' ? `${round(+metric_value, 2)}%` : round(+metric_value, 2)) : 'N/A'}
            </div>
            <div className='label'>{label}</div>
        </div>
    </div>
)};

export default ModalMetricItem;
