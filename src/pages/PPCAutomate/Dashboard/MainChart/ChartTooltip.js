import React from "react";
import {metricsListArray} from "../Metrics/metricsList";
import moment from "moment";
import {round} from "../../../../utils/round";
import {numberMask} from "../../../../utils/numberMask";
import {SVG} from "../../../../utils/icons";

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];


const ChartTooltip = ({activeMetrics, showWeekChart, showDailyChart, label, payload}) => {
    const getChartValue = (key, metric) => {
        if (payload.find(item => item.dataKey === key)) {
            if (metricsListArray.find(item => item.key === metric).type === 'percent') {
                return round(payload.find(item => item.dataKey === key).value, 2) + '%'
            } else if (metricsListArray.find(item => item.key === metric).type === 'currency') {
                return '$' + numberMask(payload.find(item => item.dataKey === key).value, 2)
            } else if (metricsListArray.find(item => item.key === metric).type === 'roas') {
                return `${round(payload.find(item => item.dataKey === key).value, 2)}x`
            } else {
                return numberMask(payload.find(item => item.dataKey === key).value)
            }
        } else {
            return 'N/A'
        }
    };

    if (payload) {
        return (
            <div className='custom-line-chart-tooltip'>
                <div className='label'>
                    <div
                        className='date title'>{days[moment(label).weekday()] + ', ' + moment(label).format('DD MMM YY')}</div>

                    {activeMetrics[0].key && <div className='name'>
                        {activeMetrics[0].title}
                    </div>}

                    {activeMetrics[1].key && <div className='name'>
                        {activeMetrics[1].title}
                    </div>}
                </div>

                {showWeekChart && <div className='week-value'>
                    <div className='week-title title'>7-day average</div>

                    {activeMetrics[0].key && <div className="week-value">
                        <SVG id='green-line'/>
                        {getChartValue('seven_days_first_metric_value', activeMetrics[0].key)}
                    </div>}

                    {activeMetrics[1].key && <div className="week-value">
                        <SVG id='violet-line'/>
                        {getChartValue('seven_days_second_metric_value', activeMetrics[1].key)}
                    </div>}
                </div>}

                {showDailyChart && <div className='daily-value'>
                    <div className='daily-title title'>Daily</div>

                    {activeMetrics[0].key && <div className="daily-value">
                        <SVG id='green-daily'/>
                        {getChartValue('daily_first_metric_value', activeMetrics[0].key)}
                    </div>}

                    {activeMetrics[1].key && <div className="daily-value">
                        <SVG id='violet-daily'/>
                        {getChartValue('daily_second_metric_value', activeMetrics[1].key)}
                    </div>}
                </div>}
            </div>
        )
    } else {
        return null
    }
};

export default ChartTooltip;