import React, {useState, Component, useEffect} from 'react';
import reloadIcon from '../../../../assets/img/icons/reload-icon.svg';
import {Switch} from "antd";
import moment from "moment";
import Selection from "@simonwep/selection-js/src/selection";
import shortid from "shortid";

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
        value: Array.from({length: 24}, () => true)
    },
];

const selection = Selection.create({
    // Class for the selection-area
    class: 'selection-area',

    // All elements in this container can be selected
    selectables: ['.statistic-information'],

    // The container is also the boundary in this case
    boundaries: ['.switches']
});

let intervalId = null;

const DaySwitches = () => {
    const [hoursStatus, setStatus] = useState(defaultList);

    function handleReset() {
        setStatus(hoursStatus.map(item => ({
            ...item,
            value: Array.from({length: 24}, () => false)
        })))
    }

    function handleSwitchHour(dayIndex, timeIndex, value, event) {
        event.stopPropagation();

        let newList = [...hoursStatus];
        newList[dayIndex].value[timeIndex] = !value;

        setStatus(newList)
    }

    function handleSwitchDay(dayIndex, value) {
        let newList = [...hoursStatus];
        newList[dayIndex].value = Array.from({length: 24}, () => !value);

        setStatus(newList)
    }

    useEffect(() => {
        selection
            .on('move', ({changed: {removed, added}}) => {
                // Add a custom class to the elements that where selected.
                if(added[0]) {
                    console.log(added[0].getAttribute('value'));

                }

                for (const el of added) {
                    el.classList.add('selected');
                }

                // Remove the class from elements that where removed
                // since the last selection
                if (removed.length > 0) {
                    for (const el of removed) {
                        el.classList.remove('selected');
                    }
                }

            })
            .on('stop', (event) => {
                let newList = [...hoursStatus];
                console.log(hoursStatus);
                event.selected.forEach(item => {
                    newList[item.getAttribute('rowindex')].value[item.getAttribute('columnindex')] = true;
                });
                //
                setStatus(newList);

                // inst.keepSelection();
            });
    }, []);

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
                    <div className="row" key={shortid.generate()}>
                        <div className='day-name'>
                            <Switch
                                checked={day.value.every(item => item)}
                                onChange={() => handleSwitchDay(dayIndex, day.value.every(item => item))}
                            />
                            {day.shortName}
                        </div>

                        {day.value.map((status, timeIndex) => (
                            <div className='statistic-item' key={shortid.generate()}>
                                {dayIndex === 0 && <div className="time-name">
                                    {moment(timeIndex + 1, 'HH').format('hh A')}
                                </div>}

                                <div
                                    className={status ? 'selected statistic-information' : 'statistic-information'}
                                    rowindex={dayIndex}
                                    columnindex={timeIndex}
                                    value={status}
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

