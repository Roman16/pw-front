import React from "react";
import greenLineIcon from "../../../../assets/img/icons/green-line.svg";
import violetLineIcon from "../../../../assets/img/icons/violet-line.svg";
import greenDailyIcon from "../../../../assets/img/icons/green-daily.svg";
import violetDailyIcon from "../../../../assets/img/icons/violet-daily.svg";

const ChartTooltip = ({showWeekChart, showDailyChart, label, payload}) => {
    return (
        <div className='custom-line-chart-tooltip'>
            <div className='label'>
                <div className='date title'>{label}</div>
                <div className='name'>
                    {payload[0] ? (payload[0].name ? payload[0].name : '') : ''}
                </div>
                <div className='name'>
                    {payload[1] ? (payload[1].name ? payload[1].name : '') : ''}
                </div>
            </div>

            {showWeekChart && <div className='week-value'>
                <div className='week-title title'>7-day average</div>
                <div className="week-value">
                    <img src={violetLineIcon} alt=""/>
                    {payload[0] ? (payload[0].value ? payload[0].value : 0) : ''}
                </div>
                <div className="week-value">
                    <img src={greenLineIcon} alt=""/>
                    {payload[1] ? (payload[1].value ? payload[1].value : 0) : ''}
                </div>
            </div>}

            {showDailyChart && <div className='daily-value'>
                <div className='daily-title title'>daily</div>
                <div className="daily-value">
                    <img src={violetDailyIcon} alt=""/>
                    {payload[3] ? (payload[3].value ? payload[3].value : 0) : ''}

                </div>
                <div className="daily-value">
                    <img src={greenDailyIcon} alt=""/>
                    {payload[2] ? (payload[2].value ? payload[2].value : 0) : ''}
                </div>
            </div>}
        </div>
    )
};

export default ChartTooltip;