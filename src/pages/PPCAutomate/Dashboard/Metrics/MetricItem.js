import React, {Fragment} from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip'
import {ProfitTooltipDescription} from "../ProductBreakdown/ProductsList";
import {metricsListArray} from "./metricsList";
import {useSelector} from "react-redux";
import {round} from "../../../../utils/round";
import {numberMask} from "../../../../utils/numberMask";
import {SVG} from "../../../../utils/icons";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {Popover} from "antd";

const DiffTooltip = ({currentValue, diff, type}) => {
    const prevValue = currentValue / ((100 + +diff) / 100),
        diffValue = Math.abs(round(currentValue, 2) - round(prevValue, 2));

    return (
        <Fragment>
            <p>
                {`from  `}
                {+currentValue === 0 ? '0' : <RenderMetricValue
                    value={prevValue}
                    type={type}
                />}
                {`  to  `}
                <b><RenderMetricValue
                    value={currentValue}
                    type={type}
                /></b>
            </p>


            {(type !== 'percent' && +currentValue !== 0) && <p>
                ({diff < 0 ? 'down  ' : 'up  '}

                <RenderMetricValue
                    value={diffValue}
                    type={type}
                />

                {`  or  `}

                <RenderMetricValue
                    value={Math.abs(diff)}
                    type={'percent'}
                />)
            </p>}
        </Fragment>
    )
};

const RenderMetricChanges = ({value, prevValue, diff, type, name}) => {
    if (diff != null) {
        if (diff === 0) {
            return (
                <div className='metric-item__changes'>
                    <div className='down-changes'>
                        0%
                        <div className='horizontal-line-icon'></div>
                    </div>
                </div>
            )
        } else if (name === 'cpc' || name === 'acos' || name === 'cpa' || name === 'macos') {
            return (
                <InformationTooltip
                    type='custom'
                    overlayClassName={'diff-tooltip'}
                    description={<DiffTooltip
                        currentValue={value}
                        diff={diff}
                        type={type}
                    />}>
                    <div className='metric-item__changes'>
                        {(diff > 0) && <div className='downward-changes'>
                            {round(Math.abs(+diff), 2)}%
                            <SVG style={{transform: 'rotate(180deg)'}} id='up-white-arrow'/>
                        </div>}
                        {(diff <= 0) && <div className='upward-changes'>
                            {round(Math.abs(+diff), 2)}%
                            <SVG style={{transform: 'rotate(180deg)'}} id='down-white-arrow'/>
                        </div>}
                    </div>
                </InformationTooltip>

            )
        } else if (name === 'profit' || name === 'ad_profit' || name === 'organic_sales') {
            const diffValue = Math.abs(value - prevValue);

            return (<InformationTooltip
                type='custom'
                overlayClassName={'diff-tooltip'}
                description={<p>
                    {`from  `}
                    {+prevValue === 0 ? '0' : <RenderMetricValue
                        value={prevValue}
                        type={'currency'}
                    />}
                    {`  to  `}
                    <b><RenderMetricValue
                        value={value}
                        type={'currency'}
                    /></b>
                </p>}>
                <div className='metric-item__changes'>
                    {(value > prevValue) && <div className='upward-changes'>
                        ${numberMask(diffValue, 2)}
                        <SVG id='up-white-arrow'/>
                    </div>}

                    {(value <= prevValue) && <div className='downward-changes'>
                        ${numberMask(diffValue, 2)}
                        <SVG id='down-white-arrow'/>
                    </div>}
                </div>
            </InformationTooltip>)
        } else {
            return (
                <InformationTooltip
                    type='custom'
                    overlayClassName={'diff-tooltip'}
                    description={<DiffTooltip
                        currentValue={value}
                        diff={diff}
                        type={type}
                    />}>

                    <div className='metric-item__changes'>
                        {(diff > 0) && <div className='upward-changes'>
                            {round(Math.abs(+diff), 2)}%
                            <SVG id='up-white-arrow'/>
                        </div>}
                        {(diff <= 0) && <div className='downward-changes'>
                            {round(Math.abs(+diff), 2)}%
                            <SVG id='down-white-arrow'/>
                        </div>}
                    </div>
                </InformationTooltip>
            )
        }
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


const MetricItem = ({metric: {title, info = '', key, label, type, metric_diff, metric_value, metric_prev_value}, metric, removeSelectedMetric, activeMetrics, onActivateMetric, onDeactivateMetric}) => {
    const {hasMargin} = useSelector(state => ({
        hasMargin: state.dashboard.hasMargin || false
    }));


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

    const metricInformation = metricsListArray.find(item => item.key === key);

    return (
        <div className='metric-item' onClick={handleClick}>
            {activeMetrics && <Fragment>
                {(activeMetrics[0] && activeMetrics[0].key === key) && <div className='active-metric green'></div>}
                {(activeMetrics[1] && activeMetrics[1].key === key) && <div className='active-metric violet'></div>}
            </Fragment>}


            <div className="title-info">
                {metricInformation.title}
                {key === 'profit' ?
                    !hasMargin &&
                    <Tooltip getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
                             type='warning' description={<ProfitTooltipDescription/>}/>
                    :
                    metricInformation.info &&
                    <Tooltip getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
                             description={metricInformation.info}/>
                }

                <div className="close" onClick={handleRemoveItem}>
                    <SVG id='close'/>
                </div>
            </div>

            <RenderMetricChanges
                value={metric_value}
                diff={metric_diff}
                type={type}
                name={key}
                prevValue={metric_prev_value}
            />

            <div className='metric-item__description'>
                <div className="value">
                    <RenderMetricValue
                        value={metric_value}
                        type={type}
                    />
                </div>
                <div className='label'>{label}</div>
            </div>
        </div>
    )
};

export default MetricItem;
