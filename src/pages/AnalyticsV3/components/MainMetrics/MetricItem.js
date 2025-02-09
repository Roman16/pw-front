import React, {Fragment} from "react"
import Tooltip from '../../../../components/Tooltip/Tooltip'
import {useSelector} from "react-redux"
import {round} from "../../../../utils/round"
import {numberMask} from "../../../../utils/numberMask"
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {metricKeys} from "./metricsList"
import {currencyWithCode} from "../../../../components/CurrencyCode/CurrencyCode"

const DiffTooltip = ({currentValue,currencyCode, diff, type, prevValue, name, percentRow = true}) => {
    const diffValue = Math.abs(round(currentValue - prevValue, 2))

    return (
        <Fragment>
            <p>
                {`from  `}
                {+prevValue === 0 ? '0' : <RenderMetricValue
                    value={prevValue}
                    type={type}
                    id={name}
                    currencyCode={currencyCode}
                />}
                {`  to  `}
                <b><RenderMetricValue
                    value={currentValue}
                    type={type}
                    id={name}
                    currencyCode={currencyCode}
                /></b>
            </p>
            {type === 'percent' && <p>
                ({diff < 0 ? 'down  ' : 'up  '} {round(Math.abs((currentValue - prevValue)*100), 2)} p.p. or  <RenderMetricValue
                value={Math.abs(diff)}
                type={'percent'}
                id={name}
            />)
            </p> }

            {(type !== 'percent' && +currentValue > 0 && +prevValue > 0 && percentRow) && <p>
                ({diff < 0 ? 'down  ' : 'up  '}

                <RenderMetricValue
                    value={diffValue}
                    type={type}
                    id={name}
                />

                {`  or  `}

                <RenderMetricValue
                    value={Math.abs(diff)}
                    type={'percent'}
                    id={name}
                />)
            </p>}
        </Fragment>
    )
}

const metricsDifferentDiff = [
    metricKeys['acos'],
    metricKeys['macos'],
    metricKeys['returns'],
    metricKeys['returns_units'],
    metricKeys['cpm'],
    metricKeys['cpa'],
    metricKeys['cpc'],
]

export const profitMetrics = [
    metricKeys['net_ad_profit'],
    metricKeys['gross_profit'],
    metricKeys['net_profit'],
]

export const RenderMetricChanges = ({value, prevValue, diff, type, name, getPopupContainer = false, currencyCode}) => {
    if (diff != null) {
        value = +value
        prevValue = +prevValue
        diff = +diff

        if (diff === 0 || round(Math.abs(+diff * 100), 2) === 0) {
            return (
                <div className='metric-item__changes'>
                    <div className='down-changes'>
                        0%
                    </div>
                </div>
            )
        } else if (type === 'currency') {
            const diffValue = Math.abs(value - prevValue)

            return (<InformationTooltip
                type='custom'
                overlayClassName={'diff-tooltip'}
                {...getPopupContainer && {getPopupContainer: (node) => node.parentNode}}
                description={<DiffTooltip
                    currentValue={value}
                    prevValue={prevValue}
                    diff={diff}
                    type={type}
                    name={name}
                    percentRow={false}
                    currencyCode={currencyCode}
                />}>
                <div className='metric-item__changes'>
                    {(value > prevValue) &&
                    <div className={metricsDifferentDiff.includes(name) ? 'downward-changes' : 'upward-changes'}>
                        <i>
                            <SVG id='upward-metric-changes'/>
                        </i>
                        {currencyWithCode(numberMask(diffValue, name === metricKeys['rpi'] ? 4 : 2), currencyCode)}
                    </div>}

                    {(value < prevValue) &&
                    <div className={metricsDifferentDiff.includes(name) ? 'upward-changes' : 'downward-changes'}>
                        <i>
                            <SVG id='downward-metric-changes'/>
                        </i>
                        {currencyWithCode(numberMask(diffValue, name === metricKeys['rpi'] ? 4 : 2), currencyCode)}
                    </div>}

                    {diffValue === 0 && <div className='down-changes'>
                        <div className='horizontal-line-icon'/>
                        $0
                    </div>}
                </div>
            </InformationTooltip>)
        } else {
            return (
                <InformationTooltip
                    type='custom'
                    overlayClassName={'diff-tooltip'}
                    {...getPopupContainer && {getPopupContainer: (node) => node.parentNode}}
                    description={<DiffTooltip
                        currentValue={value}
                        prevValue={prevValue}
                        diff={diff}
                        name={name}
                        type={type}
                    />}>

                    <div className='metric-item__changes'>
                        {(diff > 0) &&
                        <div className={metricsDifferentDiff.includes(name) ? 'downward-changes' : 'upward-changes'}>
                            <i>
                                <SVG id='upward-metric-changes'/>
                            </i>
                            {round(Math.abs(+diff * 100), 2)}%
                        </div>}
                        {(diff <= 0) &&
                        <div className={metricsDifferentDiff.includes(name) ? 'upward-changes' : 'downward-changes'}>
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

const RenderMetricValue = ({value, type, id, currencyCode}) => {
    if (value != null && !isNaN(value)) {
        const number = +value
        if (type === 'currency') {
            if (id === metricKeys['rpi']) {
                return currencyWithCode(numberMask(number, 4, null, 2), currencyCode)
            } else {
                return currencyWithCode(Math.round(number).toString().length > 4 ? numberMask(number) : numberMask(number, 2), currencyCode)
            }
        } else if (type === 'percent') {
            return (`${round(number * 100, id === metricKeys['icvr'] ? 4 : 2)}%`)
        } else if (type === 'number') {
            return (numberMask(number))
        } else if (type === 'roas') {
            return (`${round(number, 2)}x`)
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

                {info && <Tooltip description={info}/>}

                {profitMetrics.includes(key) && <div className="beta-label">Beta</div>}

                <div className="close" onClick={handleRemoveItem}>
                    <SVG id='remove-filter-icon'/>
                </div>
            </div>

            <div className="value">
                <RenderMetricValue
                    id={key}
                    value={value}
                    type={type}
                />
            </div>


            <div className='metric-item__description'>
                <div className='label'>{label}</div>

                <RenderMetricChanges
                    value={value}
                    diff={value_diff}
                    prevValue={value_prev}
                    type={type}
                    name={key}
                />
            </div>
        </div>
    )
}

export default MetricItem
