import React from "react";
import moment from "moment";
import InformationTooltip from "../../../components/Tooltip/Tooltip";

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
    return(<span>45$</span>)
};

const SpendStatistics = () => {
    return (
        <section className='spend-statistics'>
            <div className="section-header">
                <h2>Spend/Out of Budget</h2>

                <div className='out-of-budget'>
                    <div/>
                    Out of Budget
                </div>

                {/*<button className='btn default'>Soon</button>*/}
            </div>

            <div className="statistics">
                {data.map((day, dayIndex) => (
                    <div className="row" key={day.day}>
                        <div className='day-name'>{day.day[0]}</div>
                        {day.value.map((time, timeIndex) => (
                            <div className='statistic-item' key={time}>
                                {dayIndex === 0 && <div className="time-name">
                                    {moment(timeIndex + 1, 'HH').format('hh')}
                                    <br/>
                                    {moment(timeIndex + 1, 'HH').format('A')}
                                </div>}

                                <InformationTooltip
                                    type={'custom'}
                                    title={day.day}
                                    description={<TooltipDescription />}
                                >
                                    <div className='statistic-information'/>
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