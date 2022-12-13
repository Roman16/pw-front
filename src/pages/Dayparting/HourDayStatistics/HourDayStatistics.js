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
import {getMetricValue, metrics} from '../Placements/MetricsStatistics'
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


const HourDayStatistics = ({date, selectedCompareDate, campaignId, attributionWindow, fetchingCampaignList, activeTab}) => {
    const [data, setData] = useState(days.map(() => hours)),
        [compareData, setCompareData] = useState(),
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

            return await _.values(statisticDayByHour.result).map((day, dayIndex) => _.values(day).map((hourItem, hourIndex) => {
                return ({
                    ...hourItem,
                    acos: getMetricValue(hourItem, 'acos'),
                    roas: getMetricValue(hourItem, 'roas'),
                    ctr: getMetricValue(hourItem, 'ctr'),
                    cpc: getMetricValue(hourItem, 'cpc'),
                    cvr: getMetricValue(hourItem, 'cvr'),
                    cpa: getMetricValue(hourItem, 'cpa'),
                    placements: _.values(_.values(statisticDayByHourByPlacement.result)[dayIndex])[hourIndex],
                    date: _.keys(statisticDayByHour.result)[dayIndex]
                })
            }))
        } catch (e) {
            console.log(e)
            return false
        }

    }

    const getData = async () => {
        mainDataRequest && mainDataRequest.cancel()
        mainDataRequest = CancelToken.source()

        setFetchingData(true)

        if (activeTab === 'campaigns') {
            const [res, budget] = await Promise.all([getDataByDate(date, mainDataRequest.token), daypartingServices.getBudget({
                campaignId,
                date,
                cancelToken: mainDataRequest.token
            })])

            await setData(res ? [...res.map((day, dayIndex) => {
                return day.map((hour, hourIndex) => {
                    return ({
                        ...hour,
                        budget: Object.values(Object.values(budget.result)[dayIndex])[hourIndex]
                    })
                })
            })] : days.map(() => hours))

            setFetchingData(false)
        } else {
            const res = await getDataByDate(date, mainDataRequest.token)

            await setData(res ? [...res.map((day, dayIndex) => {
                return day.map((hour, hourIndex) => {
                    return ({
                        ...hour,
                    })
                })
            })] : days.map(() => hours))

            setFetchingData(false)
        }
    }

    const getCompareData = async () => {
        compareDataRequest && compareDataRequest.cancel()
        compareDataRequest = CancelToken.source()

        setFetchingCompareData(true)

        const res = await getDataByDate(selectedCompareDate, compareDataRequest.token)
        await setCompareData(res ? [...res] : undefined)

        setFetchingCompareData(false)
    }

    useEffect(() => {
        if (!fetchingCampaignList) {
            if (campaignId !== undefined && campaignId !== null) {
                getData()
            } else {
                setFetchingData(false)
                setData(days.map(() => hours))
                setCompareData()
            }
        }
    }, [campaignId, date, attributionWindow, fetchingCampaignList])

    useEffect(() => {
        if (selectedCompareDate) {
            campaignId && getCompareData()
        } else {
            setCompareData()
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
                                            <TooltipDescription
                                                percent={false}
                                                time={false}
                                                date={data[dayIndex]?.[0].date}
                                                data={{
                                                    ..._.mapValues(data[0][0], (value, key) => _.reduce(data[dayIndex], (sum, item) => sum + item[key], 0)),
                                                    placements: {
                                                        top_of_search: _.mapValues(data[0][0].placements?.top_of_search, (value, key) => _.reduce(data[dayIndex], (sum, item) => sum + item.placements.top_of_search[key], 0)),
                                                        detail_page: _.mapValues(data[0][0].placements?.detail_page, (value, key) => _.reduce(data[dayIndex], (sum, item) => sum + item.placements.detail_page[key], 0)),
                                                        other: _.mapValues(data[0][0].placements?.other, (value, key) => _.reduce(data[dayIndex], (sum, item) => sum + item.placements.other[key], 0)),
                                                    }
                                                }}
                                                compareData={compareData && !fetchingCompareData && {
                                                    ..._.mapValues(compareData[0][0], (value, key) => _.reduce(compareData[dayIndex], (sum, item) => sum + item[key], 0)),
                                                    placements: {
                                                        top_of_search: _.mapValues(compareData[0][0].placements?.top_of_search, (value, key) => _.reduce(compareData[dayIndex], (sum, item) => sum + item.placements.top_of_search[key], 0)),
                                                        detail_page: _.mapValues(compareData[0][0].placements?.detail_page, (value, key) => _.reduce(compareData[dayIndex], (sum, item) => sum + item.placements.detail_page[key], 0)),
                                                        other: _.mapValues(compareData[0][0].placements?.other, (value, key) => _.reduce(compareData[dayIndex], (sum, item) => sum + item.placements.other[key], 0)),
                                                    }
                                                }}
                                                selectedMetric={selectedMetric}
                                            />
                                        }
                                    >
                                        <div className='day-name' key={shortid.generate()}>
                                            {day[0]}

                                            {selectedCompareDate && compareData && <MetricDiff
                                                widthIcon={false}
                                                value={_.reduce(data[dayIndex], (sum, item) => sum + item[selectedMetric], 0)}
                                                prevValue={_.reduce(compareData[dayIndex], (sum, item) => sum + item[selectedMetric], 0)}
                                                metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric})?.type}
                                                metric={selectedMetric}
                                            />}
                                        </div>
                                    </InformationTooltip>
                                </div>

                                {hours.map((i, hourIndex) => {
                                    const item = data[dayIndex][hourIndex]

                                    return (<div className='statistic-item'>
                                            <InformationTooltip
                                                getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
                                                type={'custom'}
                                                className={'chart-tooltip'}
                                                overlayClassName={'HourDayStatistics-tooltip'}
                                                description={
                                                    <TooltipDescription
                                                        selectedMetric={selectedMetric}
                                                        data={item}
                                                        compareData={compareData && !fetchingCompareData && compareData?.[dayIndex]?.[hourIndex]}
                                                        fullData={data}
                                                        date={moment(item.date).add(hourIndex, 'h')}
                                                        budget={activeTab === 'campaigns'}
                                                    />
                                                }
                                            >
                                                <div
                                                    className={`statistic-information ${item?.budget?.budget_usage_percentage >= 90 ? 'out-budget' : ''}`}
                                                    style={{
                                                        background: percentColor({
                                                            value: item[selectedMetric],
                                                            data,
                                                            metric: selectedMetric
                                                        }).color
                                                    }}>
                                                    <div className="value">
                                                        {valueCut(item[selectedMetric], selectedMetric)}
                                                    </div>

                                                    {selectedCompareDate && compareData && <MetricDiff
                                                        value={item[selectedMetric] || 0}
                                                        prevValue={compareData[dayIndex][hourIndex][selectedMetric] || 0}
                                                        widthIcon={false}
                                                        numberFormatting={true}
                                                        metric={selectedMetric}
                                                        metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric})?.type}
                                                    />}
                                                </div>
                                            </InformationTooltip>
                                        </div>
                                    )
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
                    </div>
                </div>

                {(fetchingData || fetchingCompareData || fetchingCampaignList) && <div className="disable-page-loading">
                    <Spin size="large"/>
                </div>}
            </section>
        </Fragment>
    )
}

const valueCut = (value, metric) => {
    if (_.find(analyticsAvailableMetricsList, {key: metric}).type === 'percent') {
        value = value * 100
    }

    if (value !== null && value !== undefined) {
        if (value >= 1000 && value < 1000000) {
            return `${Math.round(value / 1000)}K`
        } else if (value >= 1000000 && value < 1000000000) {
            return `${Math.round(value / 1000000)}M`
        } else if (value >= 1000000000 && value < 1000000000000) {
            return `${Math.round(value / 1000000000)}G`
        } else if (value >= 1000000000000) {
            return `${Math.round(value / 1000000000000)}T`
        } else {
            return round(value, 2)
        }
    } else {
        return '-'
    }
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
        if (metric === 'roas') {
            return (`${round(value, 2)}${widthIcon ? 'x' : ''}`)
        } else if (_.find(analyticsAvailableMetricsList, {key: metric}).type === 'percent') {
            return (`${round(value * 100, 2)}${widthIcon ? '%' : ''}`)
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
            return (numberMask(value, 2, null, 2))
        }
    } else {
        return '-'
    }
}

export const MetricDiff = ({value, prevValue, metricType, metric, widthIcon = true, numberFormatting = false}) => {
    let diff
    if (metric === 'roas') {
        diff = value - prevValue

        return (<div className={`diff-value ${diff === 0 ? '' : diff < 0 ? 'downward-changes' : 'upward-changes'}`}>
            {diff !== 0 && <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.90526 0.45C2.02073 0.25 2.3094 0.25 2.42487 0.45L4.07032 3.3C4.18579 3.5 4.04145 3.75 3.81051 3.75H0.519616C0.288675 3.75 0.144338 3.5 0.259808 3.3L1.90526 0.45Z"/>
            </svg>}

            <span>{numberFormatting ? valueCut(diff, metric) : numberMask(diff, 2, null, 2)}x</span>
        </div>)
    } else if (metric === 'acos' || metric === 'ctr' || metric === 'cvr') {
        diff = (value - prevValue) * 100

        return (<div className={`diff-value ${diff === 0 ? '' : diff < 0 ? 'downward-changes' : 'upward-changes'}`}>
            {diff !== 0 && <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.90526 0.45C2.02073 0.25 2.3094 0.25 2.42487 0.45L4.07032 3.3C4.18579 3.5 4.04145 3.75 3.81051 3.75H0.519616C0.288675 3.75 0.144338 3.5 0.259808 3.3L1.90526 0.45Z"/>
            </svg>}

            <span>{numberFormatting ? valueCut(diff, metric) : numberMask(diff, 2, null, 2)}%</span>
        </div>)
    } else if (metricType === 'currency') {
        diff = value - prevValue

        return (<div className={`diff-value ${diff === 0 ? '' : diff < 0 ? 'downward-changes' : 'upward-changes'}`}>
            {diff !== 0 && <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.90526 0.45C2.02073 0.25 2.3094 0.25 2.42487 0.45L4.07032 3.3C4.18579 3.5 4.04145 3.75 3.81051 3.75H0.519616C0.288675 3.75 0.144338 3.5 0.259808 3.3L1.90526 0.45Z"/>
            </svg>}

            <span>{widthIcon ? currencyWithCode(numberMask(diff, 2)) : numberFormatting ? valueCut(diff, metric) : numberMask(diff, 2)}</span>
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

            <span>{numberFormatting ? valueCut(diff, metric) : numberMask(diff, 2, null, 2)}</span> %
        </div>)
    }

}

const TooltipDescription = ({
                                date,
                                data,
                                compareData,
                                fullData = [],
                                selectedMetric,
                                percent = true,
                                time = true,
                                budget = false,
                            }) => {
    const value = getMetricValue(data, selectedMetric)
    let comparedValue
    if (compareData) comparedValue = getMetricValue(compareData, selectedMetric)

    const percentByRange = percentColor({value, data: fullData, metric: selectedMetric})

    return (
        <Fragment>
            <div className="tooltip-header">
                <h3 className="date">
                    {moment(date).format('dddd')}, {moment(date, 'YYYY-MM-DD').format('DD MMM YYYY')}
                    {time && <> {moment(date).format('hh A')} - {moment(date).add(1, 'h').format('hh A')} </>}
                </h3>

                {percent && <div className="percent" style={{background: percentByRange.color}}>
                    {percentByRange.percent ? round(percentByRange.percent, 2) : 0}%
                </div>}
            </div>

            <div className="row main-metric">
                <div className="name">{_.find(metrics, {key: selectedMetric}).title}</div>
                <div className="value">{renderMetricValue({value, metric: selectedMetric})}</div>

                {compareData && <div className="changes-block">
                    <MetricDiff
                        value={value || 0}
                        prevValue={comparedValue || 0}
                        metric={selectedMetric}
                        metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric})?.type}
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
                        {data.placements?.[item.key] ? renderMetricValue({
                            value: getMetricValue(data.placements?.[item.key], selectedMetric),
                            metric: selectedMetric
                        }) : '-'}
                    </div>

                    {compareData && <div className="changes-block">
                        <MetricDiff
                            metric={selectedMetric}
                            value={getMetricValue(data.placements?.[item.key], selectedMetric) || 0}
                            prevValue={getMetricValue(compareData.placements?.[item.key], selectedMetric) || 0}
                            metricType={_.find(analyticsAvailableMetricsList, {key: selectedMetric})?.type}
                        />

                        <div className="from">
                            (from {renderMetricValue({
                            value: getMetricValue(compareData.placements?.[item.key], selectedMetric),
                            metric: selectedMetric
                        })})
                        </div>
                    </div>}
                </div>
            ))}

            {budget && <div className={'budget'}>
                <div className="row">
                    <div className="name">
                        Daily Campaign Budget
                    </div>

                    <div className="value">
                        {(data?.budget?.budget === null || data?.budget?.budget === 0) ? 'No Data' : currencyWithCode(numberMask(data?.budget?.budget, 2))}
                    </div>
                </div>


                <div className={`row ${data?.budget?.budget_usage_percentage >= 90 ? 'out-budget' : ''}`}>
                    <div className="name">
                        Used Campaign Budget
                    </div>

                    <div className="value">
                        {(data?.budget?.budget === null || data?.budget?.budget === 0) ? 'No Data' : <>{currencyWithCode(numberMask(data?.budget?.budget_usage, 2))} ({data?.budget?.budget_usage_percentage}%)</>}
                    </div>
                </div>
            </div>}
        </Fragment>
    )
}


export default React.memo(HourDayStatistics)