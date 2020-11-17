import React from "react"
import moment from "moment"
import {round} from "../../../../utils/round"
import {numberMask} from "../../../../utils/numberMask"
import {SVG} from "../../../../utils/icons"

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]


const ChartTooltip = ({activeMetrics, showWeekChart, showDailyChart, label, payload, chartColors}) => {
    const getChartValue = (payload, key, metric) => {
        if (payload[key] !== null) {
            if (metric.type === 'percent') {
                return round(+payload[key] * 100, 2) + '%'
            } else if (metric.type === 'currency') {
                return '$' + numberMask(payload[key], 2)
            } else if (metric.type === 'roas') {
                return payload[key] !== null && `${round(payload[key], 2)}x`
            } else {
                return numberMask(payload[key])
            }
        } else {
            return 'N/A'
        }
    }

    if (payload) {
        return (
            <div className='custom-line-chart-tooltip'>
                <div className='label'>
                    <div className='date title'>
                        {days[moment(label).weekday()] + ', ' + moment(label).format('DD MMM YY')}
                    </div>

                    {activeMetrics.map(metric => (
                        <div className='name'>
                            <span dangerouslySetInnerHTML={{__html: metric.title}}/>
                        </div>
                    ))}
                </div>

                {showWeekChart && <div className='week-value'>
                    <div className='week-title title'>
                        7-day average
                    </div>

                    {activeMetrics.map((metric, index) => (
                        metric.key && <div className="week-value" style={{color: chartColors[index]}}>
                            <i style={{fill: chartColors[index]}}><SVG id='chart-tooltip-line'/></i>
                            {payload[0] && getChartValue(payload[0].payload, `${metric.key}_7d`, metric)}
                        </div>
                    ))}
                </div>}

                {showDailyChart && <div className='daily-value'>
                    <div className='daily-title title'>
                        Daily
                    </div>

                    {activeMetrics.map((metric, index) => (
                        metric.key &&  <div className="daily-value" style={{color: chartColors[index]}}>
                            <i style={{fill: chartColors[index], stroke: chartColors[index]}}>
                                <SVG id='chart-tooltip-daily'/>
                            </i>
                            {payload[0] && getChartValue(payload[0].payload, metric.key, metric)}
                        </div>
                    ))}
                </div>}
            </div>
        )
    } else {
        return null
    }
}

export default ChartTooltip
