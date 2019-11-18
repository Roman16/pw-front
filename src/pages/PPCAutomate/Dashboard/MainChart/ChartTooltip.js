import React from "react";
import greenLineIcon from "../../../../assets/img/icons/green-line.svg";
import violetLineIcon from "../../../../assets/img/icons/violet-line.svg";
import greenDailyIcon from "../../../../assets/img/icons/green-daily.svg";
import violetDailyIcon from "../../../../assets/img/icons/violet-daily.svg";
import moment from "moment";



const ChartTooltip = ({activeMetrics, showWeekChart, showDailyChart, label, payload}) => {
    const getChartValue = (key) => {
        if(payload.find(item => item.dataKey === key)) {
            return (payload.find(item => item.dataKey === key).value).toFixed(2)
        } else {
            return '0'
        }
    };

    if(payload) {
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
                        {getChartValue('seven_days_first_metric_value')}
                    </div>}

                    {activeMetrics[1].key && <div className="week-value">
                        <img src={violetLineIcon} alt=""/>
                        {getChartValue('seven_days_second_metric_value')}
                    </div>}
                </div>}

                {showDailyChart && <div className='daily-value'>
                    <div className='daily-title title'>daily</div>

                    {activeMetrics[0].key && <div className="daily-value">
                        <img src={greenDailyIcon} alt=""/>
                        {getChartValue('daily_first_metric_value')}
                    </div>}

                    {activeMetrics[1].key && <div className="daily-value">
                        <img src={violetDailyIcon} alt=""/>
                        {getChartValue('daily_second_metric_value')}
                    </div>}
                </div>}
            </div>
        )
    } else {
        return null
    }
};

export default ChartTooltip;