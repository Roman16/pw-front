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

const hours = Array.from({length: 24}, (item, index) => index)


const HourDayStatistics = ({date, selectedCompareDate, campaignId}) => {
    const [data, setData] = useState({}),
        [percentParams, setParams] = useState({min: 0, max: 1}),
        [fetchingData, setFetchingData] = useState(true),
        [selectedMetric, setSelectedMetric] = useState('impressions')


    const getData = async () => {
        source && source.cancel()
        source = CancelToken.source()

        setFetchingData(true)

        try {
            const requestParams = {
                campaignId,
                date,
                cancelToken: source.token
            }

            const [statisticDayByHour, statisticDayByHourByPlacement] = await Promise.all([daypartingServices.getStatisticDayByHour(requestParams), daypartingServices.getStatisticDayByHourByPlacement(requestParams)])

            console.log(statisticDayByHour)
            console.log(statisticDayByHourByPlacement)

            // const minValue = Math.min(...statisticDayByHour.result.map(item => item.sales).filter(item => (item != null && item !== 0))),
            //     maxValue = Math.max(...statisticDayByHour.result.map(item => item.sales))
            //
            // setParams({
            //     min: minValue,
            //     max: maxValue
            // })

            // setData(res.response);

            await setData(_.keys(statisticDayByHour.result).map(key => ({
                key: {
                    ..._.map(statisticDayByHour.result[key], (val, hourKey) => ({
                        [hourKey]: {
                            ...val,
                            placement: {...statisticDayByHourByPlacement.result[key][hourKey]}
                        }
                    }))
                }
            })))

            setFetchingData(false)
        } catch (e) {
            setFetchingData(false)
        }
    }

    useEffect(() => {
        campaignId && getData()
    }, [campaignId, date])


    const TooltipDescription = ({value, timeIndex, date, outBudget}) => {
        return (
            <Fragment>
                <div className="tooltip-header">
                    <h3 className="date">
                        {days[Math.floor(timeIndex / 24)]}, {moment(date).format('DD MMM YYYY, HH A')} - {moment(date).add(1, 'h').format('HH A')}
                    </h3>

                    <div className="percent">
                        96%
                    </div>
                </div>

                <div className="row main-metric">
                    <div className="name">{_.find(metrics, {key: selectedMetric}).title}</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>

                <label htmlFor="">By Placements:</label>

                <div className="row">
                    <div className="name">Top of Search</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>
                <div className="row">
                    <div className="name">Product Pages</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>
                <div className="row">
                    <div className="name">Rest of Search</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>
            </Fragment>
        )
    }

    const DailyTooltipDescription = ({value, day, date}) => {
        return (
            <Fragment>
                <div className="tooltip-header">
                    <h3 className="date">
                        {day}, {moment(date).format('DD MMM YYYY')}
                    </h3>

                    <div className="percent">
                        96%
                    </div>
                </div>

                <div className="row main-metric">
                    <div className="name">{_.find(metrics, {key: selectedMetric}).title}</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>

                <label htmlFor="">By Placements:</label>

                <div className="row">
                    <div className="name">Top of Search</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>
                <div className="row">
                    <div className="name">Product Pages</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>
                <div className="row">
                    <div className="name">Rest of Search</div>
                    <div className="value">244</div>

                    {selectedCompareDate && <div className="diff-value">
                        <SVG id='upward-metric-changes'/>
                        10.8%

                        <div className="from">
                            (from 200)
                        </div>
                    </div>}
                </div>
            </Fragment>
        )
    }

    console.log(data)

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
                                        getPopupContainer={() => document.querySelector('.dayparting-page')}
                                        type={'custom'}
                                        className={'chart-tooltip'}
                                        overlayClassName={'HourDayStatistics-tooltip'}
                                        description={
                                            <DailyTooltipDescription
                                                value={200}
                                                date={moment(date.startDate).add(dayIndex)}
                                                day={day}
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
                                                getPopupContainer={trigger => trigger.parentNode}
                                                type={'custom'}
                                                className={'chart-tooltip'}
                                                overlayClassName={'HourDayStatistics-tooltip'}
                                                description={
                                                    <TooltipDescription
                                                        value={item.sales}
                                                        date={item.date}
                                                        timeIndex={hourIndex}
                                                        outBudget={item.out_of_budget}
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


const StatisticItem = ({value, data, index, outBudget, selectedCompareDate, selectedMetric}) => {
    let color

    const percentParams = {
        min: _.min(_.values(data).map(item => _.minBy(_.values(item), selectedMetric)[selectedMetric])),
        max: _.max(_.values(data).map(item => _.maxBy(_.values(item), selectedMetric)[selectedMetric]))
    }

    colorList.forEach(item => {
        if (value != null) {
            const percent = (value - percentParams.min) / (percentParams.max - percentParams.min) * 100

            if (percent >= item.min && percent <= item.max) {
                color = item.color
                return
            }
        }
    })

    return (
        <div className={`statistic-information ${outBudget ? 'out-budget-item' : ''}`} style={{background: color}}>
            <div className="value">{value}</div>

            {selectedCompareDate && <div className={`diff-value`}>
                <SVG id='upward-metric-changes'/>

                10.8%
            </div>}
        </div>
    )
}


export default React.memo(HourDayStatistics)