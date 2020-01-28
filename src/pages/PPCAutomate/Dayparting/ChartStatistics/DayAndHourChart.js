import React, {Fragment} from "react";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {colorList} from "../colorList";
import shortid from "shortid";
import {metricsList} from "../metricsList";
import moment from "moment";

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
            <div className="statistics">
                {data.map((day, dayIndex) => (
                    <div className="row" key={shortid.generate()}>
                        <div className='day-name'>{day.day[0]}</div>
                        {day.value.map((time, timeIndex) => (
                            <div className='statistic-item' key={shortid.generate()}>
                                {dayIndex === 0 && <div className="time-name">
                                    {moment(timeIndex + 1, 'HH').format('hh')}
                                    <br/>
                                    {moment(timeIndex + 1, 'HH').format('A')}
                                </div>}

                                <InformationTooltip
                                    getPopupContainer={trigger => trigger.parentNode}
                                    type={'custom'}
                                    className={'chart-tooltip'}
                                    description={
                                        <TooltipDescription
                                            value={time}
                                            day={day.day}
                                            metric={filteredMetric}
                                        />
                                    }
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
    )
};

export default DayAndHourChart;
