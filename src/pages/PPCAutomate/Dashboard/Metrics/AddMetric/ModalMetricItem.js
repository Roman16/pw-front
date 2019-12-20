import React from "react";
import Tooltip from '../../../../../components/Tooltip/Tooltip';
import {ProfitTooltipDescription} from "../../ProductBreakdown/ProductsList";
import plusIcon from "../../../../../assets/img/icons/plus-green.svg";
import minusIcon from "../../../../../assets/img/icons/minus.svg";
import {round} from "../../../../../utils/round";
import {metricsListArray} from "../metricsList";
import {useSelector} from "react-redux";
import {numberMask} from "../../../../../utils/numberMask";

const ModalMetricItem = ({item: {title, info, key, metric_value, type, label}, item, listType, removeMetric, addMetric}) => {
    const metricInformation = metricsListArray.find(item => item.key === key);
    const {hasMargin} = useSelector(state => ({
        hasMargin: state.dashboard.hasMargin || false
    }));

    return (<div className='metric-item' onClick={() => listType === 'visible' ? removeMetric(item) : addMetric(item)}>
        <div className="title-info">
            {metricInformation.title}

            {key === 'profit' ?
                !hasMargin && <Tooltip type='warning' description={<ProfitTooltipDescription />}/>
                :
                metricInformation.info && <Tooltip description={metricInformation.info}/>
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
                {metric_value != null ? type === 'currency' ? `$${Math.round(metric_value).toString().length > 4 ? numberMask(metric_value) : numberMask(metric_value, 2)}` : (type === 'percent' ? `${numberMask(metric_value, 2)}%` : numberMask(metric_value)) : 'N/A'}
            </div>
            <div className='label'>{label}</div>
        </div>
    </div>
)};

export default ModalMetricItem;
