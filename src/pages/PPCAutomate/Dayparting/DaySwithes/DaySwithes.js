import React, {useState} from 'react';
import reloadIcon from '../../../../assets/img/icons/reload-icon.svg';
import moment from "moment";
import {Switch} from "antd";


const defaultList = [
    {
        day: 'Sunday',
        shortName: 'Sun',
        value: Array.from({length: 24}, () => false)
    },
    {
        day: 'Monday',
        shortName: 'Mon',
        value: Array.from({length: 24}, () => false)
    },
    {
        day: 'Tuesday',
        shortName: 'Thur',
        value: Array.from({length: 24}, () => false)
    },
    {
        day: 'Wednesday',
        shortName: 'Wed',
        value: Array.from({length: 24}, () => false)
    },
    {
        day: 'Thursday',
        shortName: 'Thue',
        value: Array.from({length: 24}, () => false)
    },
    {
        day: 'Friday',
        shortName: 'Fri',
        value: Array.from({length: 24}, () => false)
    },
    {
        day: 'Saturday',
        shortName: 'Sat',
        value: Array.from({length: 24}, () => false)
    },
];


const DaySwitches = () => {
    const [hoursStatus, setStatus] = useState(defaultList);

    function handleReset() {
        console.log(defaultList)
        setStatus(hoursStatus.map(item => ({
            ...item,
            value: Array.from({length: 24}, () => false)
        })))
    }

    function handleSwitchHour(dayIndex, timeIndex, value) {
        let newList = [...hoursStatus];
        newList[dayIndex].value[timeIndex] = !value;

        setStatus(newList)
    }

    function handleSwitchDay(dayIndex, value) {
        let newList = [...hoursStatus];
        newList[dayIndex].value = Array.from({length: 24}, () => !value);

        setStatus(newList)
    }

    function handleMultiSelect(e) {
        console.log(e);
    }

    return (
        <section className='day-switches'>
            <div className="section-header">
                <h2>Day parting</h2>

                <div className='actions'>
                    <div className='disabled-example'>
                        <div/>
                        Disabled
                    </div>

                    <div className='active-example'>
                        <div/>
                        Active
                    </div>

                    <button onClick={handleReset}>
                        <img src={reloadIcon} alt=""/>
                        Reset
                    </button>
                </div>
            </div>


            <div className="switches">
                {hoursStatus.map((day, dayIndex) => (
                    <div className="row" key={day.day}>
                        <div className='day-name'>
                            <Switch
                                checked={day.value.every(item => item)}
                                onChange={() => handleSwitchDay(dayIndex, day.value.every(item => item))}
                            />
                            {day.shortName}
                        </div>

                        {day.value.map((status, timeIndex) => (
                            <div className='statistic-item' key={`time_${timeIndex + dayIndex}`}>
                                {dayIndex === 0 && <div className="time-name">
                                    {moment(timeIndex + 1, 'HH').format('hh A')}
                                </div>}


                                <div
                                    onClick={() => handleSwitchHour(dayIndex, timeIndex, status)}
                                    className='statistic-information'
                                    style={{background: status ? '#6D6DF6' : '#E0E1E6'}}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </section>
    )
};


export default DaySwitches

