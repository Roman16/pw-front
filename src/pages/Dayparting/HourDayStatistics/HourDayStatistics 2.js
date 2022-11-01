import React, {Fragment, useEffect, useState} from "react"
import './HourDayStatistics.less'
import moment from "moment"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import {colorList} from "../colorList"
import shortid from "shortid"
import {daypartingServices} from "../../../services/dayparting.services"
import axios from "axios"
import {Select, Spin} from "antd"
import {SVG} from "../../../utils/icons"
import CustomSelect from "../../../components/Select/Select"
import {metrics} from '../Placements/MetricsStatistics'
import _ from 'lodash'
import {analyticsAvailableMetricsList} from "../../Analytics/componentsV2/MainMetrics/metricsList"
import {round} from "../../../utils/round"
import {numberMask} from "../../../utils/numberMask"


const CancelToken = axios.CancelToken
let source = null
const Option = Select.Option


const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const placementsEnums = [
    {
        title: 'Top of Search',
        key: 'top_of_search'
    },
    {
        title: 'Product Pages',
        key: 'detail_page'
    },
    {
        title: 'Rest of Search',
        key: 'other'
    },
]

const hours = Array.from({length: 24}, (item, index) => index)


const HourDayStatistics = ({date, selectedCompareDate, campaignId, attributionWindow}) => {
    const [data, setData] = useState([]),
        [compareData, setCompareData] = useState([]),
        [selectedMetric, setSelectedMetric] = useState('clicks'),
        [fetchingData, setFetchingData] = useState(true),
        [fetchingCompareData, setFetchingCompareData] = useState(false)


    const getDataByDate = async (d) => {
        source && source.cancel()
        source = CancelToken.source()

        try {
            const requestParams = {
                campaignId,
                date: d,
                attributionWindow,
                cancelToken: source.token
            }

            const [statisticDayByHour, statisticDayByHourByPlacement] = await Promise.all([daypartingServices.getStatisticDayByHour(requestParams), daypartingServices.getStatisticDayByHourByPlacement(requestParams)])
            return await _.values(statisticDayByHour.result).map((day, dayIndex) => _.values(day).map((hour, hourIndex) => {

                return ({
                    ...hour,
                    placements: _.values(_.values(statisticDayByHourByPlacement.result)[dayIndex])[hourIndex]
                })
            }))
        } catch (e) {
            console.log(e)
            return []
        }

    }

    const getData = async () => {
        setFetchingData(true)

        const res = await getDataByDate(date)

        await setData([...res])

        setFetchingData(false)
    }

    const getCompareData = async () => {
        setFetchingCompareData(true)

        const res = await getDataByDate(selectedCompareDate)
        await setCompareData([...res])

        setFetchingCompareData(false)
    }

    useEffect(() => {
        campaignId && getData()
    }, [campaignId, date, attributionWindow])

    useEffect(() => {
        if (selectedCompareDate) {
            campaignId && getCompareData()
        } else {
            setCompareData([])
        }
    }, [campaignId, attributionWindow, selectedCompareDate])

    console.log(campaignId)

    return (
        <Fragment>
            <section
                className={`spend-statistics ${(fetchingData || !campaignId) ? ' disabled' : ''}`}>
                <div className="section-header">
                    <h2>
                        Stats by Hour & Day
                    </h2>

                    <div className="metric-select">
                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            value={selectedMetric}
                            dropdownClassName={'full-width-menu'}
                            className={'dark-mode'}
                            onChange={value => setSelectedMetric(value)}
                        >
                            {metrics.map((item, index) => (
                                <Option
                                    key={item}
                                    value={item.key}
                                >
                                    {item.title}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>
                </div>

                <div className="statistics-block">
                    <div className="time-axis">
                        {hours.map((status, timeIndex) => (
                            <div className="time-name" key={shortid.generate()}>
                                {moment(timeIndex, 'HH').format('hh')}
                                <br/>
                                {moment(timeIndex, 'HH').format('A')}
                            </div>
                        ))}
                    </div>

                    <div className="statistic">
                        {days.map((day, dayIndex) => (
                            <div className="row">
                                <div className="day">
                                    <InformationTooltip
                                        getPopupContainer={() => document.querySelector('.dayparting-page .spend-statistics')}
                                        type={'custom'}
                                        className={'chart-tooltip'}
                                        overlayClassName={'HourDayStatistics-tooltip'}
                                        description={
                                            <DailyTooltipDescription
                                                date={moment(date.startDate).add(dayIndex)}
                                                day={day}
                                                data={data}
                                                compareDate={compareData}
                                                index={dayIndex}
                                                selectedMetric={selectedMetric}
                                                selectedCompareDate={selectedCompareDate}
                                            />
                                        }
                                    >
                                        <div className='day-name' key={shortid.generate()}>
                                            {day[0]}

                                            {selectedCompareDate && compareData.length > 0 && <MetricDiff
                                                value={_.reduce(data[dayIndex], (sum, item) => sum + item[selectedMetric], 0)}
                                                prevValue={_.reduce(compareData[dayIndex], (sum, item) => sum + item[selectedMetric], 0)}
                                                metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric}).type}
                                            />}
                                        </div>
                                    </InformationTooltip>
                                </div>

                                {hours.map((item, hourIndex) => {
                                    return (<StatisticItem
                                        value={data[dayIndex]?.[item]?.[selectedMetric]}
                                        comparedValue={compareData.length === 0 ? undefined : compareData[dayIndex][item][selectedMetric]}
                                        placements={data[dayIndex]?.[item]?.placements}
                                        comparedPlacements={compareData[dayIndex]?.[item]?.placements}
                                        date={item.date}

                                        data={data}

                                        selectedCompareDate={selectedCompareDate}
                                        selectedMetric={selectedMetric}
                                        outBudget={item.out_of_budget || item.out_of_budget_account || item.out_of_budget_portfolio}
                                        index={hourIndex}
                                    />)
                                })}
                            </div>
                        ))}

                    </div>


                    <div className="legend">
                        <div className="color-gradation">
                            <div className="color">
                                {colorList.map(item => (
                                    <div key={item.color} style={{background: item.color}}/>
                                ))}
                            </div>

                            <div className="percent">
                                {[...Array(11).keys()].map((i, index) => <div>{index === 0 ? '0' : `${index}0`}%</div>)}
                            </div>
                        </div>

                        {/*<div className="out-budget">*/}
                        {/*    <div/>*/}

                        {/*    Out of Budget*/}
                        {/*</div>*/}
                    </div>
                </div>

                {(fetchingData || fetchingCompareData || !campaignId) && <div className="disable-page-loading">
                    <Spin size="large"/>
                </div>}
            </section>
        </Fragment>
    )
}

const percentColor = ({value, metric, data}) => {
    let color,
        percent

    const percentParams = {
        min: _.min(data.map(item => _.minBy(item, metric)?.[metric] || 0)),
        max: _.max(data.map(item => _.maxBy(item, metric)?.[metric] || 0)),
    }

    colorList.forEach(item => {
        if (value != null) {
            percent = value ? (value - percentParams.min) / (percentParams.max - percentParams.min) * 100 : 0

            if (percent >= item.min && percent <= item.max) {
                color = item.color
                return
            }
        }
    })

    return {color, percent}
}

export const renderMetricValue = ({value, metric, numberCut = 1}) => {
    if (value !== null && value !== undefined) {
        if (_.find(analyticsAvailableMetricsList, {key: metric}).type === 'percent') {
            return (`${round(value * 100, 2)}%`)
        } else if (_.find(analyticsAvailableMetricsList, {key: metric}).type === 'currency') {
            if (value < 0) {
                return (`-$${numberMask(Math.abs(value), numberCut, null, 2)}`)
            } else {
                return (`$${numberMask(value, numberCut, null, 2)}`)
            }
        } else {
            return (numberMask(value))
        }
    } else {
        return '-'
    }
}

export const MetricDiff = ({value = 0, prevValue = 0, metricType}) => {
    let diff

    if (metricType === 'currency') {
        diff = value - prevValue

        return (<div className={`diff-value ${diff === 0 ? '' : diff < 0 ? 'downward-changes' : 'upward-changes'}`}>
            {diff !== 0 && <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.90526 0.45C2.02073 0.25 2.3094 0.25 2.42487 0.45L4.07032 3.3C4.18579 3.5 4.04145 3.75 3.81051 3.75H0.519616C0.288675 3.75 0.144338 3.5 0.259808 3.3L1.90526 0.45Z"/>
            </svg>}

            <span>${round(diff, 2)}</span>
        </div>)

    } else {
        if (prevValue === value) {
            diff = 0
        } else if (prevValue === 0) {
            diff = 100
        } else {
            diff = (value / prevValue - 1) * 100 || 0
        }

        return (<div className={`diff-value ${diff === 0 ? '' : diff < 0 ? 'downward-changes' : 'upward-changes'}`}>
            {diff !== 0 && <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.90526 0.45C2.02073 0.25 2.3094 0.25 2.42487 0.45L4.07032 3.3C4.18579 3.5 4.04145 3.75 3.81051 3.75H0.519616C0.288675 3.75 0.144338 3.5 0.259808 3.3L1.90526 0.45Z"/>
            </svg>}

            <span>{round(diff, 2)}</span> %
        </div>)
    }

}

const StatisticItem = ({value, comparedValue, data, comparedPlacements, outBudget, selectedMetric, date, index, selectedCompareDate, placements}) => (
    <div className='statistic-item'>
        <InformationTooltip
            getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
            type={'custom'}
            className={'chart-tooltip'}
            overlayClassName={'HourDayStatistics-tooltip'}
            description={
                <TooltipDescription
                    value={value}
                    comparedValue={comparedValue}
                    date={date}
                    data={data}
                    timeIndex={index}
                    selectedMetric={selectedMetric}
                    selectedCompareDate={selectedCompareDate}
                    placements={placements}
                    comparedPlacements={comparedPlacements}
                />
            }
        >
            <div className={`statistic-information ${outBudget ? 'out-budget-item' : ''}`}
                 style={{background: percentColor({value, data, metric: selectedMetric}).color}}>
                <div className="value">{renderMetricValue({value, metric: selectedMetric})}</div>

                {comparedValue !== undefined && <MetricDiff
                    value={value}
                    prevValue={comparedValue}
                    metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric}).type}
                />}
            </div>
        </InformationTooltip>
    </div>
)

const TooltipDescription = ({value, comparedValue, timeIndex, date, outBudget, data, selectedMetric, selectedCompareDate, placements, comparedPlacements}) => {
    const percentByRange = percentColor({value, data, metric: selectedMetric})

    return (
        <Fragment>
            <div className="tooltip-header">
                <h3 className="date">
                    {days[Math.floor(timeIndex / 24)]}, {moment(date).format('DD MMM YYYY, HH A')} - {moment(date).add(1, 'h').format('HH A')}
                </h3>

                <div className="percent" style={{background: percentByRange.color}}>
                    {percentByRange.percent ? round(percentByRange.percent, 2) : 0}%
                </div>
            </div>

            <div className="row main-metric">
                <div className="name">{_.find(metrics, {key: selectedMetric}).title}</div>
                <div className="value">{renderMetricValue({value, metric: selectedMetric})}</div>

                {selectedCompareDate && <div className="changes-block">
                    <MetricDiff
                        value={value || 0}
                        prevValue={comparedValue || 0}
                        metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric}).type}
                    />

                    <div className="from">
                        (from {renderMetricValue({value: comparedValue, metric: selectedMetric})})
                    </div>
                </div>}
            </div>

            <label htmlFor="">By Placements:</label>

            {placementsEnums.map(item => (
                <div className="row">
                    <div className="name">{item.title}</div>
                    <div className="value">
                        {placements?.[item.key]?.[selectedMetric] ? round(placements?.[item.key]?.[selectedMetric], 2) : '-'}
                    </div>

                    {selectedCompareDate && <div className="changes-block">
                        <MetricDiff
                            value={placements?.[item.key]?.[selectedMetric] || 0}
                            prevValue={comparedPlacements?.[item.key]?.[selectedMetric] || 0}
                        />

                        <div className="from">
                            (from {round(comparedPlacements?.[item.key]?.[selectedMetric] || 0, 2)})
                        </div>
                    </div>}
                </div>
            ))}
        </Fragment>
    )
}

const DailyTooltipDescription = ({data, compareDate, index, day, date, selectedMetric, selectedCompareDate}) => {
    return (
        <Fragment>
            <div className="tooltip-header">
                <h3 className="date">
                    {day}, {moment(date).format('DD MMM YYYY')}
                </h3>
            </div>

            <div className="row main-metric">
                <div className="name">{_.find(metrics, {key: selectedMetric}).title}</div>
                <div className="value">
                    {renderMetricValue({
                        value: _.reduce(data[index], (sum, item) => sum + item[selectedMetric], 0),
                        metric: selectedMetric
                    })}
                </div>

                {selectedCompareDate && <div className="changes-block">
                    <MetricDiff
                        value={_.reduce(data[index], (sum, item) => sum + item[selectedMetric], 0) || 0}
                        prevValue={_.reduce(compareDate[index], (sum, item) => sum + item[selectedMetric], 0) || 0}
                        metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric}).type}
                    />

                    <div className="from">
                        (from {renderMetricValue({
                        value: _.reduce(compareDate[index], (sum, item) => sum + item[selectedMetric], 0),
                        metric: selectedMetric
                    })})
                    </div>
                </div>}
            </div>

            <label htmlFor="">By Placements:</label>

            {placementsEnums.map(item => (
                <div className="row">
                    <div className="name">{item.title}</div>
                    <div className="value">
                        {round(_.reduce(data[index], (sum, i) => sum + i.placements?.[item.key][selectedMetric], 0), 2)}
                    </div>

                    {selectedCompareDate && <div className="changes-block">
                        <MetricDiff
                            value={_.reduce(data[index], (sum, i) => sum + i.placements?.[item.key][selectedMetric], 0) || 0}
                            prevValue={_.reduce(compareDate[index], (sum, i) => sum + i.placements?.[item.key][selectedMetric], 0) || 0}
                        />

                        <div className="from">
                            (from {round(_.reduce(compareDate[index], (sum, i) => sum + i.placements?.[item.key][selectedMetric], 0), 2)})
                        </div>
                    </div>}
                </div>
            ))}
        </Fragment>
    )
}


export default React.memo(HourDayStatistics)