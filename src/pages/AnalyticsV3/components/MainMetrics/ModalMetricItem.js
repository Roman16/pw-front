import React from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip';
import {round} from "../../../../utils/round";
import {useSelector} from "react-redux";
import {numberMask} from "../../../../utils/numberMask";
import {SVG} from "../../../../utils/icons";
import {ProfitTooltipDescription} from "../../../PPCAutomate/Dashboard/ProductBreakdown/ProductsList"
import {currencyWithCode} from "../../../../components/CurrencyCode/CurrencyCode"

const RenderMetricValue = ({value, type}) => {

    if (value != null && !isNaN(value)) {
        value = +value
        if (type === 'currency') {
            return currencyWithCode(Math.round(value).toString().length > 4 ? numberMask(value) : numberMask(value, 2))
        } else if (type === 'percent') {
            return (`${numberMask(value * 100, 2)}%`)
        } else if (type === 'number') {
            return (numberMask(value))
        } else if (type === 'roas') {
            return (`${round(value, 2)}x`)
        } else {
            console.log(type)

            return ''
        }
    } else {
        return 'N/A'
    }
};

const ModalMetricItem = ({item: {title, info, key, value, type, label}, listType, removeMetric, addMetric, disabled, item}) => {
    const {hasMargin} = useSelector(state => ({
        hasMargin: state.dashboard.hasMargin || false
    }));

    return (<div className={`metric-item ${disabled ? 'disabled' : ''}`}
                 onClick={() => listType === 'visible' ? removeMetric(key) : disabled ? null : addMetric(key)}>
            <div className="title-info">
                <span title={title} dangerouslySetInnerHTML={{__html: title}}/>

                {/*{key === 'profit' || key === 'ad_profit' ?*/}
                {/*    !hasMargin && <Tooltip getPopupContainer={trigger => trigger.parentNode}*/}
                {/*                           type='warning' description={<ProfitTooltipDescription/>}/>*/}
                {/*    :*/}
                {/*    info && <Tooltip {...key === 'total_sales' && {'className': 'big-window'}}*/}
                {/*                                       getPopupContainer={trigger => trigger.parentNode}*/}
                {/*                                       description={info}/>*/}
                {/*}  */}

                { info && <Tooltip {...key === 'total_sales' && {'className': 'big-window'}}
                                                       getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode.parentNode}
                                                       description={info}/>
                }

                {listType === 'hidden' && <div className="action-btn add-item">
                    <SVG id='plus-green'/>
                </div>}

                {listType === 'visible' && <div className="action-btn remove-item">
                    <SVG id='minus'/>
                </div>}
            </div>

            <div className="value">
                <RenderMetricValue
                    value={value}
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
