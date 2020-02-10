import React, {Fragment, useEffect, useState} from "react";
import moment from "moment";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import {colorList} from "./colorList";
import shortid from "shortid";
import plusIconWhite from '../../../assets/img/icons/plus-white.svg';
import {daypartingServices} from "../../../services/dayparting.services";

const defaultData = [
    {
        day: 'Sunday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
    {
        day: 'Monday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
    {
        day: 'Tuesday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
    {
        day: 'Wednesday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
    {
        day: 'Thursday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
    {
        day: 'Friday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
    {
        day: 'Saturday',
        value: Array.from({length: 24}, () => Math.floor(Math.random() * 555) + 1)
    },
];

const SpendStatistics = () => {
    const [data, setData] = useState(defaultData),
        [percentParams, setParams] = useState({min: 0, max: 1});

    useEffect(() => {
        daypartingServices.getSpendOutStatistic()
            .then(res => {
                // console.log(res);
            });

        const minValue = Math.min(...defaultData.reduce((accumulator, item) => {
                return [...accumulator, ...item.value]
            }, [])),
            maxValue = Math.max(...defaultData.reduce((accumulator, item) => {
                return [...accumulator, ...item.value]
            }, []));

        setParams({
            min: minValue,
            max: maxValue
        });
    }, []);

    const StatisticItem = ({value}) => {
        let color;

        colorList.forEach(item => {
            const percent = ((value - percentParams.min) * 100) / (percentParams.max - percentParams.min);
            if (percent > item.min && percent <= item.max) {
                color = item.color;
                return;
            }
        });

        return (
            <div className='statistic-information' style={{background: color}}/>
        )
    };

    const TooltipDescription = ({value, day, timeIndex}) => {
        return (
            <Fragment>
                <h3>{day}

                    <span className="time">
                        {`${moment(timeIndex, 'HH').format('hh A')} - ${moment(timeIndex + 1, 'HH').format('hh A')}`}
                    </span>
                </h3>

                <div className="row-metric">
                    <StatisticItem value={value}/>
                    <div className='example-fill'
                        // style={{background: color}}
                    />

                    <span className='selected-metric'>Sales</span>

                    <div className="value">
                        ${value}
                    </div>
                </div>
            </Fragment>
        )
    };

    return (
        <section className='spend-statistics'>
            <div className="section-header">
                <h2>Sales / Out of Budget</h2>

                <div className='out-of-budget'>
                    <div/>
                    Out of Budget
                </div>

                <button className='btn default'>
                    <img src={plusIconWhite} alt=""/>
                    Add budget
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
                                            timeIndex={timeIndex}
                                        />
                                    }
                                >
                                    <StatisticItem value={time}/>
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