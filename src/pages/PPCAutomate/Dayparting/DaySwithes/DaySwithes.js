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
        value: Array.from({length: 24}, () => false)
    },
];

const selection = Selection.create({
    // Class for the selection-area
    class: 'selection-area',

    // All elements in this container can be selected
    selectables: ['.statistic-information'],

    // The container is also the boundary in this case
    boundaries: ['.switches'],
    singleClick: false,

});

let intervalId = null;

const DaySwitches = () => {

    const [hoursStatus, setStatus] = useState([...defaultList.map(item => ({
        ...item,
        value: [...item.value]
    }))]);

    function handleReset() {
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

    function handleSwitchRow(row, value) {
        let newList = [...hoursStatus];
        newList[row].value = Array.from({length: 24}, () => !value);

        setStatus(newList)
    }

    function handleSwitchColumn(column, value) {
        let newList = [...hoursStatus];

        newList.forEach(item => {
            item.value[column] = !value
        });

        setStatus(newList)
    }

    useEffect(() => {
        let status = 'false';

        selection
            .on('start', ({selected}) => {
                if (selected[0]) {
                    status = selected[0].getAttribute('value');
                }
            })
            .on('move', (event) => {
                const {changed: {removed, added}, selected} = event;
                // Add a custom class to the elements that where selected.
                if (selected.length > 0) {
                    if (status === 'false') {
                        for (const el of selected) {
                            el.classList.add('selected');
                        }

                        if (removed.length > 0) {
                            for (const el of removed) {
                                el.classList.remove('selected');
                            }
                        }
                    } else {
                        for (const el of selected) {
                            el.classList.remove('selected');
                        }

                        if (removed.length > 0) {
                            for (const el of removed) {
                                el.classList.add('selected');
                            }
                        }
                    }
                }
            })
            .on('stop', (event) => {
                let newList = [...defaultList.map(item => ({
                    ...item,
                    value: [...item.value]
                }))];

                const allSelected = document.querySelectorAll('.statistic-information.selected');
                allSelected.forEach(item => {
                    newList[item.getAttribute('rowindex')].value[item.getAttribute('columnindex')] = true;
                });

                setStatus(newList);
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
                                onChange={() => handleSwitchRow(dayIndex, day.value.every(item => item))}
                            />
                            <span>
                                 {window.devicePixelRatio === 2 ? day.shortName[0] : day.shortName}
                            </span>
                        </div>

                        {day.value.map((status, timeIndex) => (
                            <div className='statistic-item' key={shortid.generate()}>
                                {dayIndex === 0 && <div className="time-name">
                                    {moment(timeIndex + 1, 'HH').format('hh A')}
                                    <Switch
                                        checked={hoursStatus.every(item => item.value[timeIndex])}
                                        onChange={() => handleSwitchColumn(timeIndex, hoursStatus.every(item => item.value[timeIndex]))}
                                    />
                                </div>}

                                <div
                                    onClick={() => handleSwitchHour(dayIndex, timeIndex, status)}
                                    className={status ? 'statistic-information selected' : 'statistic-information'}
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

