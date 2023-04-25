import React, {useEffect, useState} from "react"
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {Select, Spin} from "antd"
import moment from "moment"
import _ from 'lodash'
import {round} from "../../../../utils/round"
import {RenderMetricValue} from "../../../AnalyticsV3/components/TableList/tableColumns"
import {analyticsAvailableMetricsList} from "../../../AnalyticsV3/components/MainMetrics/metricsList"
import {days} from "../../../AnalyticsV3/components/MainChart/ChartTooltip"
import CustomSelect from "../../../../components/Select/Select"
import {getRandomColor} from "../PieChart/PieChart"

const Option = Select.Option


const toPercent = (decimal, fixed = 0) => `${round((decimal * 100), fixed)}%`

const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0

    return toPercent(ratio, 2)
}

const chartColors = []


export const StackedAreaPercentChart = ({data = []}) => {
    const [selectedMetric, setSelectedMetric] = useState('asin_count'),
        [chartData, setChartData] = useState([]),
        [brands, setBrands] = useState([])


    const ChartTooltip = ({payload, label}) => {
        if (payload && payload.length > 0) {
            let total = 0

            payload.forEach(i => {
                total = total + +payload[0].payload[i.name]
            })

            return (
                <div className='area-chart-tooltip'>
                    <div className='area-chart-tooltip-header'>
                        <div className='date title'>
                            {moment(label, 'YYYY-MM').format('MMMM YYYY')}
                        </div>
                    </div>

                    <div className="content">
                        <div className="col name">
                            {payload.map(i => <div>{i.name.split(`_${selectedMetric}`)[0]}</div>)}
                        </div>

                        <div className="col value">
                            {payload.map(({stroke, value}) => <div
                                style={{color: stroke}}>
                                <RenderMetricValue
                                    number={value}
                                    type={'number'}
                                />
                            </div>)}
                        </div>

                        <div className="col percent">
                            {payload.map(({ stroke, value}) => <div
                                style={{color: stroke}}>
                                {getPercent(value, total)}
                            </div>)}
                        </div>
                    </div>
                </div>
            )
        } else {
            return ''
        }
    }

    useEffect(() => {
        let b = []

        setChartData(_.chain(data)
            .groupBy("year_month")
            .map((value, key) => {
                const res = {
                    year_month: key,
                }

                b = value

                value.forEach(i => {
                    res[`${i.brand_name}_${selectedMetric}`] = i[selectedMetric]
                })

                return res
            })
            .sortBy('year_month')
            .value()
        )

        setBrands(b)

        b.forEach(() => {
            chartColors.push(getRandomColor())
        })

    }, [data, selectedMetric])




    return (<div className="stacked-area-percent-chart-container">
        <div className="metrics">
            <CustomSelect
                value={selectedMetric}
                onChange={setSelectedMetric}
            >
                <Option value={'asin_count'}>ASIN count</Option>
                <Option value={'revenue'}>Revenue</Option>
                <Option value={'unit_sales'}>Unit sales</Option>
            </CustomSelect>

            <div className="legend">
                {brands.map((brand, index) => <div className="brand">
                    <div style={{background: chartColors[index]}}/>

                    {brand.brand_name}
                </div>)}
            </div>
        </div>

        <div className="chart-responsive">
            <ResponsiveContainer height='100%' width='100%'>
                <AreaChart
                    width={400}
                    height={400}
                    data={chartData}
                    stackOffset="expand"
                    isAnimationActive={false}
                    margin={{
                        top: 5, right: 0, left: -10, bottom: 5,
                    }}
                >
                    <defs>
                        {brands.map((i, index) => (
                            <linearGradient spreadMethod="pad" id={`brandGradient_${index}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chartColors[index]} stopOpacity='0.23'/>
                                <stop offset="100%" stopColor={chartColors[index]} stopOpacity='0'/>
                            </linearGradient>
                        ))}
                    </defs>

                    <CartesianGrid vertical={false} stroke={'rgba(101, 106, 132, 0.2)'}/>

                    <YAxis
                        tickFormatter={toPercent}
                        interval={1}
                    />

                    <XAxis
                        dataKey="year_month"
                        dy={15}
                        tickFormatter={(date) => moment(date, 'YYYY-MM').format('MMM')}
                    />

                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip selectedMetric={selectedMetric}/>
                        }
                    />

                    {brands.map((brand, index) => (
                        <Area
                            type="linear"
                            dataKey={`${brand.brand_name}_${selectedMetric}`}
                            stackId="1"
                            stroke={chartColors[index]}
                            fill={`url(#brandGradient_${index})`}
                            fillOpacity={1}
                            isAnimationActive={false}
                            activeDot={{stroke: chartColors[index], strokeWidth: 2}}
                        />

                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>)
}