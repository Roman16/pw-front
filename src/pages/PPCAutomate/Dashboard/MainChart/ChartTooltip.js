import React from "react";
import greenLineIcon from "../../../../assets/img/icons/green-line.svg";
import violetLineIcon from "../../../../assets/img/icons/violet-line.svg";
import greenDailyIcon from "../../../../assets/img/icons/green-daily.svg";
import violetDailyIcon from "../../../../assets/img/icons/violet-daily.svg";
import {metricsListArray} from "../Metrics/metricsList";
import moment from "moment";
import {round} from "../../../../utils/round";
import {numberMask} from "../../../../utils/numberMask";


const ChartTooltip = ({activeMetrics, showWeekChart, showDailyChart, label, payload}) => {
    const getChartValue = (key, metric) => {
        if (payload.find(item => item.dataKey === key)) {
            if (metricsListArray.find(item => item.key === metric).type === 'percent') {
                return round(payload.find(item => item.dataKey === key).value, 2) + '%'
            } else if (metricsListArray.find(item => item.key === metric).type === 'currency') {
                return '$' + numberMask(payload.find(item => item.dataKey === key).value, 2)
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
                    <div className='date title'>{moment(label).format('DD.MM.YY')}</div>

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
                        <img src={greenLineIcon} alt=""/>
                        {getChartValue('seven_days_first_metric_value', activeMetrics[0].key)}
                    </div>}

                    {activeMetrics[1].key && <div className="week-value">
                        <img src={violetLineIcon} alt=""/>
                        {getChartValue('seven_days_second_metric_value', activeMetrics[1].key)}
                    </div>}
                </div>}

                {showDailyChart && <div className='daily-value'>
                    <div className='daily-title title'>daily</div>

                    {activeMetrics[0].key && <div className="daily-value">
                        <img src={greenDailyIcon} alt=""/>
                        {getChartValue('daily_first_metric_value', activeMetrics[0].key)}
                    </div>}

                    {activeMetrics[1].key && <div className="daily-value">
                        <img src={violetDailyIcon} alt=""/>
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