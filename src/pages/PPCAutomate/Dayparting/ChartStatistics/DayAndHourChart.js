import React, {Fragment} from "react";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {colorList} from "../colorList";
import shortid from "shortid";
import {metricsList} from "../metricsList";

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

const TooltipDescription = ({value, day, metric}) => {
    const selectedMetric = metricsList.find(item => item.key === metric);

    return (
        <Fragment>
            <h3>{day}</h3>
            <span className='selected-metric'>{selectedMetric.title}</span>

            <div className="value">
                <div
                    style={{background: colorList.find(item => value > item.min && value <= item.max).color || '#464898'}}/>

                {selectedMetric.type === 'currency' ? `${value}$` : (selectedMetric.type === 'percent' ? `${value} %` : value)}
            </div>
        </Fragment>
    )
};

const DayAndHourChart = ({filteredMetric}) => {

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
                                        getPopupContainer={trigger => trigger.parentNode}
                                        type={'custom'}
                                        className={'chart-tooltip'}
                                        description={<TooltipDescription
                                            value={time}
                                            day={day.day}
                                            metric={filteredMetric}
                                        />}
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
