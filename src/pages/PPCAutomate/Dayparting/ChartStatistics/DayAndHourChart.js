import React, {Fragment, useEffect, useState} from "react";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {colorList} from "../colorList";
import shortid from "shortid";
import {metricsList} from "./metricsList";
import moment from "moment";
import {daypartingServices} from "../../../../services/dayparting.services";

const testData = [
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

const TooltipDescription = ({value, day, metric, maxValue}) => {
    return (
        <Fragment>
            <h3>{day}</h3>
            <div className="row-metric">
                <div className='example-fill'
                     style={{background: maxValue ? colorList.find(item => (value / maxValue * 100) > item.min && (value / maxValue * 100) <= item.max).color : ''}}
                />

                <span className='selected-metric'>{metric.title}</span>

                <div className="value">
                    {metric.type === 'currency' ? `$${value}` : (metric.type === 'percent' ? `${value} %` : value)}
                </div>
            </div>
        </Fragment>
    )
};

const DayAndHourChart = ({firstMetric, data = testData, activeChart}) => {
    const [maxValue, setValue] = useState(null);

    useEffect(() => {
        setValue(Math.max(...data.reduce((accumulator, item) => {
            return [...accumulator, ...item.value]
        }, [])))
    }, [data]);

    return (
        <div className={`chart-block day-and-hour-chart ${activeChart ? 'active' : ''}`}>
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
                                            maxValue={maxValue}
                                            day={day.day}
                                            metric={firstMetric}
                                        />
                                    }
                                >
                                    <div
                                        className='statistic-information'
                                        style={{background: maxValue ? colorList.find(item => (time / maxValue * 100) > item.min && (time / maxValue * 100) <= item.max).color : ''}}
                                    />
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
