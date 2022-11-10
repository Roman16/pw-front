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
import {currencyWithCode} from "../../../components/CurrencyCode/CurrencyCode"


const CancelToken = axios.CancelToken
const Option = Select.Option

let mainDataRequest = null,
    compareDataRequest = null


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


const HourDayStatistics = ({date, selectedCompareDate, campaignId, attributionWindow, fetchingCampaignList}) => {
    const [data, setData] = useState([]),
        [compareData, setCompareData] = useState([]),
        [selectedMetric, setSelectedMetric] = useState(metrics[0].key),
        [fetchingData, setFetchingData] = useState(true),
        [fetchingCompareData, setFetchingCompareData] = useState(false)


    const getDataByDate = async (d, cancelToken) => {
        try {
            const requestParams = {
                campaignId,
                date: d,
                attributionWindow,
                cancelToken
            }

            const [statisticDayByHour, statisticDayByHourByPlacement] = await Promise.all([daypartingServices.getStatisticDayByHour(requestParams), daypartingServices.getStatisticDayByHourByPlacement(requestParams)])
            return await _.values(statisticDayByHour.result).map((day, dayIndex) => _.values(day).map((hour, hourIndex) => {

                return ({
                    ...hour,
                    placements: _.values(_.values(statisticDayByHourByPlacement.result)[dayIndex])[hourIndex],
                    date: _.keys(statisticDayByHour.result)[dayIndex]
                })
            }))
        } catch (e) {
            console.log(e)
            return []
        }

    }

    const getData = async () => {
        mainDataRequest && mainDataRequest.cancel()
        mainDataRequest = CancelToken.source()

        setFetchingData(true)

        const res = await getDataByDate(date, mainDataRequest.token)

        await setData([...res])

        setFetchingData(false)
    }

    const getCompareData = async () => {
        compareDataRequest && compareDataRequest.cancel()
        compareDataRequest = CancelToken.source()

        setFetchingCompareData(true)

        const res = await getDataByDate(selectedCompareDate, compareDataRequest.token)
        await setCompareData([...res])

        setFetchingCompareData(false)
    }

    useEffect(() => {
        if (!fetchingCampaignList) {
            if (campaignId !== undefined && campaignId !== null) {
                getData()
            } else {
                setFetchingData(false)
                setData([])
                setCompareData([])
            }
        }
    }, [campaignId, date, attributionWindow, fetchingCampaignList])

    useEffect(() => {
        if (selectedCompareDate) {
            campaignId && getCompareData()
        } else {
            setCompareData([])
        }
    }, [campaignId, attributionWindow, selectedCompareDate])

    return (
        <Fragment>
            <section
                className={`spend-statistics ${(fetchingData || fetchingCampaignList) ? ' disabled' : ''}`}>
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
                                                date={data[dayIndex]?.[0]?.date}
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
                                                widthIcon={false}
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

                                        date={data[dayIndex]?.[item]?.date}
                                        data={data}
                                        selectedCompareDate={selectedCompareDate}
                                        selectedMetric={selectedMetric}
                                        outBudget={item.out_of_budget || item.out_of_budget_account || item.out_of_budget_portfolio}

                                        hourIndex={hourIndex}
                                        dayIndex={dayIndex}
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

                {(fetchingData || fetchingCompareData || fetchingCampaignList) && <div className="disable-page-loading">
                    <Spin size="large"/>
                </div>}
            </section>
        </Fragment>
    )
}

const percentColor = ({value, metric, data}) => {
    let color,
        percent

    const max = _.max(data.map(item => _.maxBy(item, metric)?.[metric] || 0))

    colorList.forEach(item => {
        if (value != null) {
            percent = value ? ((value / max) * 100) : 0

            if (value < 0) {
                color = '#4A4C59'
                return
            } else if (percent >= item.min && percent <= item.max) {
                color = item.color
                return
            }
        }
    })

    return {color, percent}
}

export const renderMetricValue = ({value, metric, numberCut = 2, widthIcon = true}) => {
    if (value !== null && value !== undefined) {
        if (_.find(analyticsAvailableMetricsList, {key: metric}).type === 'percent') {
            return (`${round(value * 100, 2)}${widthIcon && '%'}`)
        } else if (_.find(analyticsAvailableMetricsList, {key: metric}).type === 'currency') {
            const valueWidthMask = numberMask(Math.abs(value), numberCut, null, 2)

            if (value < 0) {
                return (`-${widthIcon ? currencyWithCode(valueWidthMask)
                    : valueWidthMask}`)
            } else {
                return (`${widthIcon ? currencyWithCode(valueWidthMask)
                    : valueWidthMask}`)
            }
        } else {
            return (numberMask(value))
        }
    } else {
        return '-'
    }
}

export const MetricDiff = ({value, prevValue, metricType, widthIcon = true}) => {
    let diff

    if (metricType === 'currency') {
        diff = value - prevValue

        return (<div className={`diff-value ${diff === 0 ? '' : diff < 0 ? 'downward-changes' : 'upward-changes'}`}>
            {diff !== 0 && <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.90526 0.45C2.02073 0.25 2.3094 0.25 2.42487 0.45L4.07032 3.3C4.18579 3.5 4.04145 3.75 3.81051 3.75H0.519616C0.288675 3.75 0.144338 3.5 0.259808 3.3L1.90526 0.45Z"/>
            </svg>}

            <span>{widthIcon ? currencyWithCode(numberMask(diff, 2, null, 2)) : numberMask(diff, 2, null, 2)}</span>
        </div>)

    } else if (prevValue === null) {
        return <div className={`diff-value `}>N/A</div>
    } else {
        if (prevValue === value) {
            diff = 0
        } else if (prevValue === 0) {
            if (value === null) {
                diff = 0
            } else {
                diff = 100
            }
        } else {
            diff = ((value - prevValue) / prevValue) * 100 || 0
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

const StatisticItem = ({value, comparedValue, data, comparedPlacements, outBudget, selectedMetric, date, hourIndex, dayIndex, selectedCompareDate, placements}) => (
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
                    selectedMetric={selectedMetric}
                    selectedCompareDate={selectedCompareDate}
                    placements={placements}
                    comparedPlacements={comparedPlacements}

                    timeIndex={hourIndex}
                    dayIndex={dayIndex}
                />
            }
        >
            <div className={`statistic-information ${outBudget ? 'out-budget-item' : ''}`}
                 style={{background: percentColor({value, data, metric: selectedMetric}).color}}>
                <div className="value">
                    {renderMetricValue({value, metric: selectedMetric, widthIcon: false})}
                </div>

                {comparedValue !== undefined && <MetricDiff
                    value={value || 0}
                    widthIcon={false}
                    prevValue={comparedValue || 0}
                    metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric}).type}
                />}
            </div>
        </InformationTooltip>
    </div>
)

const TooltipDescription = ({value, comparedValue, timeIndex, dayIndex, date, data, selectedMetric, selectedCompareDate, placements, comparedPlacements}) => {
    const percentByRange = percentColor({value, data, metric: selectedMetric})

    return (
        <Fragment>
            <div className="tooltip-header">
                <h3 className="date">
                    {days[dayIndex]}, {moment(date, 'YYYY-MM-DD').format('DD MMM YYYY')} {moment(timeIndex, 'HH').format('hh A')} - {moment(timeIndex + 1, 'HH').format('hh A')}
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