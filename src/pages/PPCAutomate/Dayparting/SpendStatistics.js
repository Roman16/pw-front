import React, {Fragment, useEffect, useState} from "react";
import moment from "moment";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import {colorList} from "./colorList";
import shortid from "shortid";
import plusIconGray from '../../../assets/img/icons/plus-gray.svg';
import soon from "../../../assets/img/icons/soon.svg";
import {daypartingServices} from "../../../services/dayparting.services";

const defaultData = [
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

const TooltipDescription = ({value, day}) => {

    return (
        <Fragment>
            <h3>{day}</h3>

            <div className="row-metric">
                <div className='example-fill' style={{background: colorList.find(item => value > item.min && value <= item.max).color || '#464898'}}/>

                <span className='selected-metric'>Budget</span>

                <div className="value">
                    ${value}
                </div>
            </div>
        </Fragment>
    )
};

const SpendStatistics = ({filteredMetric}) => {
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        daypartingServices.getSpendOutStatistic(filteredMetric)

            .then(res => {
                // console.log(res);
            })
    }, [filteredMetric]);

    return (
        <section className='spend-statistics'>
            <div className="section-header">
                <h2>Spend/Out of Budget</h2>

                <div className='out-of-budget'>
                    <div/>
                    Out of Budget
                </div>

                <button className='btn default' disabled>
                    <img src={plusIconGray} alt=""/>
                    Add budget

                    <img src={soon} alt="" className="soon"/>
                </button>
            </div>

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
                                         style={{background: (timeIndex > 18 && dayIndex > 4) ? '#EC7F5C' : colorList.find(item => time > item.min && time <= item.max).color || '#464898'}}/>
                                </InformationTooltip>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
};

export default SpendStatistics;