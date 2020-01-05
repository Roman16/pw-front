import React from "react";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";

const data = [
    {
        day: 'Sunday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
    {
        day: 'Monday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
    {
        day: 'Tuesday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
    {
        day: 'Wednesday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
    {
        day: 'Thursday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
    {
        day: 'Friday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
    {
        day: 'Saturday',
        value: Array.from({length: 24}, (v, k) => k + 1)
    },
];

const TooltipDescription = () => {
    return (<span>45$</span>)
};

const DayAndHourChart = () => {

    return (
        <div className='chart-block day-and-hour-chart'>
            {data.map((day, dayIndex) => (
                <div className="row" key={day.day}>
                    <div className='day-name'>{day.day[0]}</div>

                    {day.value.map((time, timeIndex) => (
                        <div className='statistic-item' key={time}>
                            <InformationTooltip
                                type={'custom'}
                                title={day.day}
                                description={<TooltipDescription/>}
                            >
                                <div className='statistic-information'/>
                            </InformationTooltip>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};

export default DayAndHourChart;
