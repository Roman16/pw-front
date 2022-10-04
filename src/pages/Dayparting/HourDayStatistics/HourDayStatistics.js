import React, {Fragment, useEffect, useState} from "react"
import './HourDayStatistics.less'
import moment from "moment"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import {colorList} from "../colorList"
import shortid from "shortid"
import {daypartingServices} from "../../../services/dayparting.services"
import BudgetDrawer from "./BudgetDrawer"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import {productsActions} from "../../../actions/products.actions"
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


const HourDayStatistics = ({date, selectedCompareDate}) => {
    let localFetching = false

    const defaultData = Array.from({length: 168}, (item, index) => moment(`${moment(date.startDate).add(Math.floor(index / 24), 'days').format('DD.MM.YYYY')} ${index - 24 * Math.floor(index / 24)}`, 'DD.MM.YYYY HH').format('YYYY-MM-DD HH:mm:ss'))

    const [data, setData] = useState(defaultData),
        [percentParams, setParams] = useState({min: 0, max: 1}),
        [visibleModal, setModal] = useState(false),
        [saved, setStatus] = useState(false),
        [processing, setProcessing] = useState(false),
        [fetchingData, setFetchingData] = useState(false),
        [selectedMetric, setSelectedMetric] = useState('impressions')

    const dispatch = useDispatch()
    const {campaignId, fetchingCampaignList} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        fetchingCampaignList: state.dayparting.processing,
    }))

    async function saveBudget(data) {
        setProcessing(true)
        try {
            await daypartingServices.setCampaignBudget({campaignId, data: {'value_in_usd': data.value}})
            setStatus(true)

            dispatch(productsActions.updateCampaignBudget({
                id: campaignId,
                dailyBudget: data.value
            }))
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {

        async function fetchData() {
            source && source.cancel()
            source = CancelToken.source()

            if (campaignId == null) {
                setData(defaultData)
            } else if (!fetchingCampaignList) {
                setFetchingData(true)
                localFetching = true

                try {
                    const res = await daypartingServices.getMainStatistic({
                        campaignId,
                        date,
                        cancelToken: source.token
                    })

                    const minValue = Math.min(...res.response.map(item => item.sales).filter(item => (item != null && item !== 0))),
                        maxValue = Math.max(...res.response.map(item => item.sales))

                    setParams({
                        min: minValue,
                        max: maxValue
                    })


                    // setData(res.response);
                    setData(defaultData.map(item => {
                        return res.response.find(dataDot => dataDot.date === item) ? res.response.find(dataDot => dataDot.date === item) : {}
                    }))
                    setFetchingData(false)
                    localFetching = false
                } catch (e) {
                    !localFetching && setFetchingData(false)
                    localFetching = false
                }
            }
        }

        fetchData()

    }, [campaignId, date])

    useEffect(() => {
        if (campaignId == null && !fetchingCampaignList) {
            localFetching = false
            setFetchingData(false)
        }
    }, [fetchingCampaignList])

    const StatisticItem = ({value, index, outBudget}) => {
        let color

        colorList.forEach(item => {
            if (value != null) {
                const percent = ((value - percentParams.min) * 100) / (percentParams.max - percentParams.min)
                if (percent >= item.min && percent <= item.max) {
                    color = item.color
                    return
                }
            }
        })

        return (
            <div className={`statistic-information ${outBudget ? 'out-budget-item' : ''}`}>
                <div className="value">500k</div>

                {selectedCompareDate && <div className={`diff-value`}>
                    <SVG id='upward-metric-changes'/>

                    10.8%
                </div>}
            </div>
        )
    }

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

    return (
        <Fragment>
            <section
                className={` ${(fetchingData || fetchingCampaignList) ? 'spend-statistics disabled' : 'spend-statistics'}`}>
                <div className="section-header">
                    <h2>
                        Stats by Hour & Day
                    </h2>

                    {/*<button*/}
                    {/*    className='btn default'*/}
                    {/*    onClick={() => setModal(true)}*/}
                    {/*    disabled={!campaignId}*/}
                    {/*    data-intercom-target='add-budget-button'*/}
                    {/*>*/}
                    {/*    <SVG id='plus-white'/>*/}
                    {/*    Add budget*/}
                    {/*</button>*/}

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

                    <div className="row">
                        <div className="col day-axis">
                            {days.map((day, dayIndex) => (
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
                            ))}
                        </div>

                        <div className="statistic">
                            {data.map((item, index) => (
                                <div className='statistic-item' key={shortid.generate()}>
                                    <InformationTooltip
                                        getPopupContainer={trigger => trigger.parentNode}
                                        type={'custom'}
                                        className={'chart-tooltip'}
                                        overlayClassName={'HourDayStatistics-tooltip'}
                                        description={
                                            <TooltipDescription
                                                value={item.sales}
                                                date={item.date}
                                                timeIndex={index}
                                                outBudget={item.out_of_budget}
                                            />
                                        }
                                    >
                                        <StatisticItem
                                            value={item.sales}
                                            outBudget={item.out_of_budget || item.out_of_budget_account || item.out_of_budget_portfolio}
                                            index={index}
                                        />
                                    </InformationTooltip>
                                </div>
                            ))}
                        </div>
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

                {(fetchingData || fetchingCampaignList) && <div className="disable-page-loading">
                    <Spin size="large"/>
                </div>}
            </section>


            <ModalWindow
                visible={visibleModal}
                className={'budget-window'}
                handleCancel={() => {
                    setModal(false)
                    setStatus(false)
                }}
                footer={false}
                destroyOnClose={true}
            >
                {saved ?
                    <div className='success'>
                        <h3>Budget saved</h3>

                        <button
                            onClick={() => {
                                setModal(false)
                                setStatus(false)
                            }}
                            className='btn green-btn'
                        >
                            Done
                        </button>
                    </div>
                    :
                    <BudgetDrawer
                        onClose={() => setModal(false)}
                        onSave={saveBudget}
                        processing={processing}
                    />
                }
            </ModalWindow>
        </Fragment>
    )
}

export default React.memo(HourDayStatistics)