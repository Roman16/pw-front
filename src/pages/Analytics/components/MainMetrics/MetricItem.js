import React, {Fragment} from "react"
import Tooltip from '../../../../components/Tooltip/Tooltip'
import {useSelector} from "react-redux"
import {round} from "../../../../utils/round"
import {numberMask} from "../../../../utils/numberMask"
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {ProfitTooltipDescription} from "../../../PPCAutomate/Dashboard/ProductBreakdown/ProductsList"

const DiffTooltip = ({currentValue, diff, type, prevValue}) => {
    const diffValue = Math.abs(round(currentValue - prevValue, 2))

    return (
        <Fragment>
            <p>
                {`from  `}
                {+prevValue === 0 ? '0' : <RenderMetricValue
                    value={prevValue}
                    type={type}
                />}
                {`  to  `}
                <b><RenderMetricValue
                    value={currentValue}
                    type={type}
                /></b>
            </p>

            {(type !== 'percent' && +currentValue > 0 && +prevValue > 0) && <p>
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
}

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
        } else if (name === 'cpc' || name === 'acos' || name === 'cpa' || name === 'macos' || name === 'returns' || name === 'returns_units') {
            return (
                <InformationTooltip
                    type='custom'
                    overlayClassName={'diff-tooltip'}
                    description={<DiffTooltip
                        currentValue={value}
                        prevValue={prevValue}
                        diff={diff}
                        type={type}
                    />}>
                    <div className='metric-item__changes'>
                        {(diff > 0) && <div className='downward-changes'>
                            <i style={{transform: 'rotate(180deg)'}}>
                                <SVG style={{transform: 'rotate(180deg)'}} id='downward-metric-changes'/>
                            </i>
                            {round(Math.abs(+diff * 100), 2)}%
                        </div>}
                        {(diff <= 0) && <div className='upward-changes'>
                            <i style={{transform: 'rotate(180deg)'}}>
                                <SVG id='upward-metric-changes'/>
                            </i>

                            {round(Math.abs(+diff * 100), 2)}%
                        </div>}
                    </div>
                </InformationTooltip>

            )
        } else if (name === 'profit' || name === 'ad_profit' || name === 'organic_sales' || name === 'total_sales' || name === 'ad_sales') {
            const diffValue = Math.abs(value - prevValue)

            return (<InformationTooltip
                type='custom'
                overlayClassName={'diff-tooltip'}
                description={<DiffTooltip
                    currentValue={value}
                    prevValue={prevValue}
                    diff={diff}
                    type={type}
                />}>
                <div className='metric-item__changes'>
                    {(value > prevValue) && <div className='upward-changes'>
                        <i>
                            <SVG id='upward-metric-changes'/>
                        </i>
                        ${numberMask(diffValue, 2)}
                    </div>}

                    {(value <= prevValue) && <div className='downward-changes'>
                        <i>
                            <SVG id='downward-metric-changes'/>
                        </i>
                        ${numberMask(diffValue, 2)}
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
                        prevValue={prevValue}
                        diff={diff}
                        type={type}
                    />}>

                    <div className='metric-item__changes'>
                        {(diff > 0) && <div className='upward-changes'>
                            <i>
                                <SVG id='upward-metric-changes'/>
                            </i>
                            {round(Math.abs(+diff * 100), 2)}%
                        </div>}
                        {(diff <= 0) && <div className='downward-changes'>
                            <i>
                                <SVG id='downward-metric-changes'/>
                            </i>
                            {round(Math.abs(+diff * 100), 2)}%
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
}

const RenderMetricValue = ({value, type}) => {
    if (value != null && !isNaN(value)) {
        if (type === 'currency') {
            return (`$${Math.round(value).toString().length > 4 ? numberMask(value) : numberMask(value, 2)}`)
        } else if (type === 'percent') {
            return (`${round(+value * 100, 2)}%`)
        } else if (type === 'number') {
            return (numberMask(value))
        } else if (type === 'roas') {
            return (`${round(value, 2)}x`)
        }
    } else {
        return 'N/A'
    }
}


const MetricItem = ({
                        metric: {
                            title,
                            info = '',
                            key,
                            label,
                            type,
                            value_diff,
                            value,
                            value_prev
                        },
                        removeSelectedMetric,
                        activeMetrics,
                        onActivateMetric,
                        onDeactivateMetric
                    }) => {
    const {hasMargin} = useSelector(state => ({
        hasMargin: state.dashboard.hasMargin || false
    }))

    const handleClick = () => {
        if (activeMetrics.includes(key)) {
            onDeactivateMetric(key, activeMetrics.findIndex(item => item === key))
        } else {
            onActivateMetric(key, activeMetrics.findIndex(item => item === key))
        }
    }

    const handleRemoveItem = (e) => {
        e.stopPropagation()
        removeSelectedMetric(key)
    }

    return (
        <div className='metric-item' onClick={handleClick}>
            {activeMetrics.length > 0 &&
            <div className={`active-metric position-${activeMetrics.findIndex(item => item === key)}`}/>}

            <div className="title-info">
                <span title={title} dangerouslySetInnerHTML={{__html: title}}/>
                {key === 'profit' || key === 'ad_profit' ?
                    !hasMargin &&
                    <Tooltip type='warning' description={<ProfitTooltipDescription/>}/>
                    :
                    info && <Tooltip description={info}/>
                }

                <div className="close" onClick={handleRemoveItem}>
                    <SVG id='remove-filter-icon'/>
                </div>
            </div>

            <div className="value">
                <RenderMetricValue
                    value={+value}
                    type={type}
                />
            </div>


            <div className='metric-item__description'>
                <div className='label'>{label}</div>

                <RenderMetricChanges
                    value={+value}
                    diff={+value_diff}
                    prevValue={+value_prev}
                    type={type}
                    name={key}
                />
            </div>
        </div>
    )
}

export default MetricItem
