import React from "react";
import Tooltip from '../../../../../components/Tooltip/Tooltip';
import {ProfitTooltipDescription} from "../../ProductBreakdown/ProductsList";
import {round} from "../../../../../utils/round";
import {metricsListArray} from "../../../../../constans/metricsList";
import {useSelector} from "react-redux";
import {numberMask} from "../../../../../utils/numberMask";
import {SVG} from "../../../../../utils/icons";

const RenderMetricValue = ({value, type}) => {
    if (value != null) {
        if (type === 'currency') {
            return (`$${Math.round(value).toString().length > 4 ? numberMask(value) : numberMask(value, 2)}`)
        } else if (type === 'percent') {
            return (`${numberMask(value, 2)}%`)
        } else if (type === 'number') {
            return (numberMask(value))
        } else if (type === 'roas') {
            return (`${round(value, 2)}x`)
        }
    } else {
        return 'N/A'
    }
};

const ModalMetricItem = ({item: {title, info, key, metric_value, type, label}, item, listType, removeMetric, addMetric, disabled}) => {
    const metricInformation = metricsListArray.find(item => item.key === key);
    const {hasMargin} = useSelector(state => ({
        hasMargin: state.dashboard.hasMargin || false
    }));

    return (<div className={`metric-item ${disabled ? 'disabled' : ''}`}
                 onClick={() => listType === 'visible' ? removeMetric(item) : disabled ? null : addMetric(item)}>
            <div className="title-info">
                <span title={metricInformation.title} dangerouslySetInnerHTML={{__html: metricInformation.title}}/>

                {key === 'profit' || key === 'ad_profit' ?
                    !hasMargin && <Tooltip getPopupContainer={trigger => trigger.parentNode}
                                           type='warning' description={<ProfitTooltipDescription/>}/>
                    :
                    metricInformation.info && <Tooltip {...key === 'total_sales' && {'className': 'big-window'}}
                                                       getPopupContainer={trigger => trigger.parentNode}
                                                       description={metricInformation.info}/>
                }

                {listType === 'hidden' && <div className="add-item">
                    <SVG id='plus-green'/>
                </div>}

                {listType === 'visible' && <div className="remove-item">
                    <SVG id='minus'/>
                </div>}
            </div>

            <div className="value">
                <RenderMetricValue
                    value={metric_value}
                    type={type}
                />
            </div>

            <div className='metric-item__description'>
                <div className='label'>{label}</div>
            </div>
        </div>
    )
};

export default ModalMetricItem;
