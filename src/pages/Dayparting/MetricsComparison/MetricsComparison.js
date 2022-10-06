import React, {useEffect, useState} from "react"
import {Chart} from "./Chart"
import './MetricsComparison.less'
import CustomSelect from "../../../components/Select/Select"
import {Select, Spin, Switch} from "antd"
import {useSelector} from "react-redux"
import {daypartingServices} from "../../../services/dayparting.services"
import _ from 'lodash'
import moment from 'moment'
import {metrics} from "../Placements/MetricsStatistics"

const Option = Select.Option



const MetricsComparison = ({ date, campaignId}) => {
    const [data, setData] = useState([]),
        [firstMetric, setFirstMetric] = useState(metrics[0]),
        [secondMetric, setSecondMetric] = useState(metrics[1]),
        [processing, setProcessing] = useState(true),
        [chartType, setChartType] = useState('daily')

    const getData = async () => {
        setProcessing(true)

        try {
            if (chartType === 'daily') {
                const {result} = await daypartingServices.getChartDataByWeekday({date, campaignId})

                setData(_.values(result).map((i, index) => ({
                    ...i,
                    date: moment(date.startDate).add(index, 'days').format('YYYY-MM-DD')
                })))
            } else {
                const {result} = await daypartingServices.getChartDataByHour({date, campaignId})

                setData(_.values(result).map((i, index) => ({
                    ...i,
                    date: index,
                    dateRange: {...date},
                })))

            }
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {
        campaignId && getData()

    }, [date, chartType, campaignId])


    return (
        <section className={`metrics-comparison ${(processing || !campaignId) ? ' disabled' : ''}`}>
            <div className="section-header">
                <h2>
                    Metrics Comparison
                </h2>

                <div className='metrics-select'>
                    <div className={"select first"}>
                        <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"
                                fill="#3F4347"/>
                            <path
                                d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"
                                stroke="#A292E2" stroke-width="1.5"/>
                        </svg>

                        <CustomSelect
                            value={firstMetric.key}
                            getPopupContainer={trigger => trigger.parentNode}
                            dropdownClassName={'full-width-menu'}
                            className={`dark-mode ${firstMetric.key === 'nothing' && 'default-border'}`}
                            onChange={(metric) => {
                                setFirstMetric(metrics.find(item => item.key === metric))

                                if (metric === secondMetric.key) {
                                    setSecondMetric(metrics[0])
                                }
                            }}
                        >
                            {metrics.map(item => (
                                <Option
                                    title={item.title}
                                    key={item.key}
                                    value={item.key}
                                    disabled={secondMetric.key === 'nothing' && item.key === 'nothing'}
                                >
                                    {item.title}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>

                    <span>vs</span>

                    <div className="select second">
                        <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4C3.5 2.61929 4.63964 1.5 6.04545 1.5C7.45127 1.5 8.59091 2.61929 8.59091 4Z"
                                fill="#3F4347"/>
                            <path
                                d="M8.59091 4C8.59091 5.38071 7.45127 6.5 6.04545 6.5C4.63964 6.5 3.5 5.38071 3.5 4M8.59091 4C8.59091 2.61929 7.45127 1.5 6.04545 1.5C4.63964 1.5 3.5 2.61929 3.5 4M8.59091 4H12.0455M3.5 4H0"
                                stroke="#FF5256" stroke-width="1.5"/>
                        </svg>

                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            value={secondMetric.key}
                            dropdownClassName={'full-width-menu'}
                            className={`dark-mode ${secondMetric.key === 'nothing' && 'default-border'}`}
                            onChange={(metric) => setSecondMetric(metrics.find(item => item.key === metric))}
                        >
                            {metrics.map(item => (
                                <Option
                                    title={item.title}
                                    disabled={firstMetric.key === item.key}
                                    key={item.key}
                                    value={item.key}
                                >
                                    {item.title}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>
                </div>

                <div className="chart-switch">
                    <span className={chartType === 'daily' && 'active'}>Daily</span>
                    <Switch
                        className={'dark'}
                        checked={chartType === 'hourly'}
                        onChange={e => setChartType(e ? 'hourly' : 'daily')}
                    />
                    <span className={chartType === 'hourly' && 'active'}>Hourly</span>
                </div>

            </div>

            <Chart
                data={data}
                firstMetric={firstMetric}
                secondMetric={secondMetric}
                chartType={chartType}
            />

            {(processing || !campaignId) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
}

export default MetricsComparison