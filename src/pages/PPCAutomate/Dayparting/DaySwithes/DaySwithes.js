import React, {Component} from 'react';
import reloadIcon from '../../../../assets/img/icons/reload-icon.svg';
import {Switch} from "antd";
import moment from "moment";
import Selection from "@simonwep/selection-js/src/selection";
import shortid from "shortid";
import './DaySwitches.less';
import {hold} from "../../../../utils/hold";
import {daypartingServices} from "../../../../services/dayparting.services";
import {notification} from "../../../../components/Notification";

const defaultList = Array.from({length: 168}, () => '1').join('');

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];

const hours = Array.from({length: 24}, (item, index) => index);

const selection = Selection.create({
    // Class for the selection-area
    class: 'selection-area',

    // All elements in this container can be selected
    selectables: ['.statistic-information'],

    // The container is also the boundary in this case
    boundaries: ['.multi-select'],
    singleClick: false,
});


class DaySwitches extends Component {
    state = {
        hoursStatus: [...defaultList]
    };

    handleUpdateStatus = async () => {
        hold(async () => {
            try {
                await daypartingServices.updateDayPartingParams(this.state.hoursStatus.join(''));
                notification.success({title: 'Saved'})
            } catch (e) {
                notification.error({title: 'Not Saved'})
            }
        }, 1000)

    };

    handleReset = () => {
        this.setState({
            hoursStatus: [...defaultList]
        });
    };

    handleSwitchHour = (index, value) => {
        let newList = [...this.state.hoursStatus];
        newList[index] = value === '1' ? '0' : '1';

        this.setState({
            hoursStatus: [...newList]
        })
    };

    handleSwitchRow = (row, value) => {
        let newList = this.state.hoursStatus.map((item, index) => {
            if (index >= 24 * row && index < 24 * (row + 1)) {
                return value ? '1' : '0'
            } else {
                return item
            }
        });

        this.setState({
            hoursStatus: [...newList]
        })
    };

    handleSwitchColumn = (column, value) => {
        let newList = [...this.state.hoursStatus];
        [0, 1, 2, 3, 4, 5, 6].forEach(item => {
            newList[24 * item + column] = value ? '1' : '0';
        });

        this.setState({
            hoursStatus: [...newList]
        })
    };

    componentDidMount() {
        let status = 'false';

        selection
            .on('start', ({selected}) => {
                if (selected.length > 0) {
                    status = selected[0].getAttribute('value');
                }
            })
            .on('move', (event) => {
                const {changed: {removed}, selected} = event;
                if (selected.length > 0) {
                    if (status === '0') {
                        for (const el of selected) {
                            el.classList.remove('removed');
                            el.classList.add('selected');
                        }

                        if (removed.length > 0) {
                            for (const el of removed) {
                                el.classList.remove('selected');
                            }
                        }
                    } else {
                        for (const el of selected) {
                            el.classList.add('removed');
                        }

                        if (removed.length > 0) {
                            for (const el of removed) {
                                el.classList.remove('removed');
                            }
                        }
                    }
                }
            })
            .on('stop', ({selected}) => {
                let newList = [...this.state.hoursStatus];

                for (const el of selected) {
                    el.classList.remove('removed');
                    el.classList.remove('selected');
                }

                if (selected.length > 0) {
                    if (status === '0') {
                        selected.forEach(item => {
                            newList[item.getAttribute('hourIndex')] = '1';
                        });
                    } else {
                        selected.forEach(item => {
                            newList[item.getAttribute('hourIndex')] = '0';
                        });
                    }
                }

                this.setState({
                    hoursStatus: [...newList]
                })
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.hoursStatus.join('') !== this.state.hoursStatus.join('')) {
            this.handleUpdateStatus()
        }
    }

    render() {
        const {hoursStatus} = this.state;

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

                        <button onClick={this.handleReset}>
                            <img src={reloadIcon} alt=""/>
                            Reset
                        </button>
                    </div>
                </div>

                <div className="switches">
                    <div className="row time-name">
                        <div/>
                        {hours.map((status, timeIndex) => (
                            <div key={shortid.generate()}>
                                {moment(timeIndex + 1, 'HH').format('hh A')}
                                <Switch
                                    checked={[0, 1, 2, 3, 4, 5, 6].map(item => hoursStatus[24 * item + timeIndex]).every(item => item === '1')}
                                    onChange={(value) => this.handleSwitchColumn(timeIndex, value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col day-axis">
                            {days.map((day, dayIndex) => (
                                <div className='day-name' key={shortid.generate()}>
                                    <Switch
                                        checked={hoursStatus.slice(24 * dayIndex, 24 * (dayIndex + 1)).every(item => item === '1')}
                                        onChange={(value) => this.handleSwitchRow(dayIndex, value)}
                                    />
                                    <span>
                                       {window.devicePixelRatio === 2 ? day[0] : day}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="col multi-select">
                            {hoursStatus.map((value, hourIndex) => (
                                <div className='statistic-item' key={shortid.generate()}>
                                    <div
                                        onClick={() => this.handleSwitchHour(hourIndex, value)}
                                        className={value === '1' ? 'statistic-information active' : 'statistic-information'}
                                        hourIndex={hourIndex}
                                        value={value}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default DaySwitches

