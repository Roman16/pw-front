import React, {useState, Component} from 'react';
import reloadIcon from '../../../../assets/img/icons/reload-icon.svg';
import {Switch} from "antd";
import moment from "moment";
import Selection from "@simonwep/selection-js/src/selection";
import {debounce} from "throttle-debounce";
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

const selection = new Selection({

    // Class for the selection-area-element
    class: 'selection-area',

    // px, how many pixels the point should move before starting the selection (combined distance).
    // Or specifiy the threshold for each axis by passing an object like {x: <number>, y: <number>}.
    startThreshold: 10,

    // Disable the selection functionality for touch devices
    disableTouch: false,

    // On which point an element should be selected.
    // Available modes are cover (cover the entire element), center (touch the center) or
    // the default mode is touch (just touching it).
    mode: 'touch',

    // Behaviour on single-click
    // Available modes are 'native' (element was mouse-event target) or
    // 'touch' (element got touched)
    tapMode: 'native',

    // Enable single-click selection (Also disables range-selection via shift + ctrl)
    singleClick: true,

    // Query selectors from elements which can be selected
    selectables: ['.statistic-information'],

    // Query selectors for elements from where a selection can be start
    startareas: ['.switches'],

    // Query selectors for elements which will be used as boundaries for the selection
    boundaries: ['.switches'],

    // Query selector or dom node to set up container for selection-area-element
    selectionAreaContainer: '.switches',

    // On scrollable areas the number on px per frame is devided by this amount.
    // Default is 10 to provide a enjoyable scroll experience.
    scrollSpeedDivider: 10
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


    selection.on('stop', evt => {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            const status = evt.selected[0].getAttribute('value') === 'false';
            evt.selected.forEach(item => {
                let newList = [...hoursStatus];
                newList[item.getAttribute('rowindex')].value[item.getAttribute('columnindex')] = status;

                setStatus(newList);

                clearInterval(intervalId);
            });
        }, 10)
    });

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
                                    className='statistic-information'
                                    style={{background: status ? '#6D6DF6' : '#E0E1E6'}}
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

