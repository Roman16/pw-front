import React from "react";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {colorList} from "../colorList";
import shortid from "shortid";

const data = [
    {
        day: 'Sunday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
    {
        day: 'Monday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
    {
        day: 'Tuesday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
    {
        day: 'Wednesday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
    {
        day: 'Thursday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
    {
        day: 'Friday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
    {
        day: 'Saturday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 1)
    },
];

const TooltipDescription = () => {
    return (<span>45$</span>)
};

const DayAndHourChart = () => {

    return (
        <div className='chart-block day-and-hour-chart'>
            <div className='row-chart'>
                <div className='yaxis'>
                    {data.map((day, dayIndex) => (
                        <div className='day-name' key={day.day}>{day.day[0]}</div>
                    ))}
                </div>

                <div className='chart-squares'>
                    {data.map((day, dayIndex) => (
                        <div className="row" key={shortid.generate()}>
                            {day.value.map((time, timeIndex) => (
                                <div className='statistic-item' key={shortid.generate()}>
                                    <InformationTooltip
                                        type={'custom'}
                                        title={day.day}
                                        description={<TooltipDescription/>}
                                    >
                                        <div className='statistic-information'
                                             style={{background: colorList.find(item => time > item.min && time <= item.max).color || '#464898'}}/>
                                    </InformationTooltip>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>


            <div className="xaxis">
                <div>
                    12 AM
                </div>
                <div>
                    6 AM
                </div>
                <div>
                    12 PM
                </div>
                <div>
                    6 PM
                </div>
                <div>
                    12AM
                </div>
            </div>
        </div>
    )
};

export default DayAndHourChart;
