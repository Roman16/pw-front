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
import {analyticsAvailableMetricsList, metricKeys} from "../../Analytics/componentsV2/MainMetrics/metricsList"
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
        [selectedMetric, setSelectedMetric] = useState('clicks'),
        [fetchingData, setFetchingData] = useState(true)

    const getData = async () => {
        source && source.cancel()
        source = CancelToken.source()

        setFetchingData(true)

        try {
            const requestParams = {
                campaignId,
                date,
                attributionWindow,
                cancelToken: source.token
            }

            const [statisticDayByHour, statisticDayByHourByPlacement] = await Promise.all([daypartingServices.getStatisticDayByHour(requestParams), daypartingServices.getStatisticDayByHourByPlacement(requestParams)])

            const result = _.values(statisticDayByHour.result).map((day, dayIndex) => _.values(day).map((hour, hourIndex) => {

                return ({
                    ...hour,
                    placements: _.values(_.values(statisticDayByHourByPlacement.result)[dayIndex])[hourIndex]
                })
            }))

            await setData([...result])

            setFetchingData(false)
        } catch (e) {
            setFetchingData(false)
        }
    }

    useEffect(() => {
        campaignId && getData()
    }, [campaignId, date, attributionWindow])


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
                                                index={dayIndex}
                                                selectedMetric={selectedMetric}
                                            />
                                        }
                                    >
                                        <div className='day-name' key={shortid.generate()}>
                                            {day[0]}

                                            {selectedCompareDate && <div className={`diff-value`}>
                                                <SVG id='upward-metric-changes'/>

                                                10.8%
                                            </div>}
                                        </div>
                                    </InformationTooltip>
                                </div>

                                {hours.map((item, hourIndex) => {
                                    return (
                                        <div className='statistic-item'>
                                            <InformationTooltip
                                                getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
                                                type={'custom'}
                                                className={'chart-tooltip'}
                                                overlayClassName={'HourDayStatistics-tooltip'}
                                                description={
                                                    <TooltipDescription
                                                        value={fetchingData ? 0 : Object.values(data)[dayIndex][item][selectedMetric]}
                                                        date={item.date}
                                                        data={data}
                                                        timeIndex={hourIndex}
                                                        outBudget={item.out_of_budget}
                                                        selectedMetric={selectedMetric}
                                                        placements={fetchingData ? 0 : Object.values(data)[dayIndex][item].placements}
                                                    />
                                                }
                                            >
                                                <StatisticItem
                                                    value={fetchingData ? 0 : Object.values(data)[dayIndex][item][selectedMetric]}
                                                    data={data}
                                                    selectedMetric={selectedMetric}
                                                    outBudget={item.out_of_budget || item.out_of_budget_account || item.out_of_budget_portfolio}
                                                    index={hourIndex}
                                                />
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

                        <div className="out-budget">
                            <div/>

                            Out of Budget
                        </div>
                    </div>
                </div>

                {(fetchingData || !campaignId) && <div className="disable-page-loading">
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
    if (value) {
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


const StatisticItem = ({value, data, index, outBudget, selectedCompareDate, selectedMetric}) => (
    <div className={`statistic-information ${outBudget ? 'out-budget-item' : ''}`}
         style={{background: percentColor({value, data, metric: selectedMetric}).color}}>
        <div className="value">{renderMetricValue({value, metric: selectedMetric})}</div>

        {selectedCompareDate && <div className={`diff-value`}>
            <SVG id='upward-metric-changes'/>

            10.8%
        </div>}
    </div>
)

const TooltipDescription = ({value, timeIndex, date, outBudget, data, selectedMetric, selectedCompareDate, placements}) => {
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

                {selectedCompareDate && <div className="diff-value">
                    <SVG id='upward-metric-changes'/>
                    10.8%

                    <div className="from">
                        (from 200)
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

                    {/*{selectedCompareDate && <div className="diff-value">*/}
                    {/*    <SVG id='upward-metric-changes'/>*/}
                    {/*    10.8%*/}

                    {/*    <div className="from">*/}
                    {/*        (from 200)*/}
                    {/*    </div>*/}
                    {/*</div>}*/}
                </div>
            ))}
        </Fragment>
    )
}

const DailyTooltipDescription = ({data, index, day, date, selectedMetric, selectedCompareDate}) => {
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

                {selectedCompareDate && <div className="diff-value">
                    <SVG id='upward-metric-changes'/>
                    10.8%

                    <div className="from">
                        (from 200)
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

                    {/*{selectedCompareDate && <div className="diff-value">*/}
                    {/*    <SVG id='upward-metric-changes'/>*/}
                    {/*    10.8%*/}

                    {/*    <div className="from">*/}
                    {/*        (from 200)*/}
                    {/*    </div>*/}
                    {/*</div>}*/}
                </div>
            ))}
        </Fragment>
    )
}


export default React.memo(HourDayStatistics)