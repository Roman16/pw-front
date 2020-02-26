import React, {Component, Fragment} from 'react';
import reloadIcon from '../../../../assets/img/icons/reload-icon.svg';
import {Spin, Switch} from "antd";
import moment from "moment";
import Selection from "@simonwep/selection-js/src/selection";
import shortid from "shortid";
import './DaySwitches.less';
import {daypartingServices} from "../../../../services/dayparting.services";
import {notification} from "../../../../components/Notification";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";
import {connect} from "react-redux";
import axios from "axios";

const CancelToken = axios.CancelToken;
let source = null;
const timeLineShift = 16;

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
    boundaries: ['.multi-select.enabled'],
    singleClick: false,
});

let timeoutId = null;

class DaySwitches extends Component {
    state = {
        hoursStatus: [...defaultList],
        visibleWindow: false,
        processing: false,
        activeDayparting: false,
        hasDayparting: false,
        initialState: ''
    };

    deactivateDaypartingHandler = async () => {
        this.setState({
            processing: true
        });

        try {
            await daypartingServices.deactivateDayparting({campaignId: this.props.campaignId});

            this.setState({
                activeDayparting: false,
                visibleWindow: false
            })
        } catch (e) {
            console.log(e);
        }

        setTimeout(() => {
            this.setState({
                processing: false
            });
        }, 500)
    };

    activateDaypartingHandler = async () => {
        this.setState({
            processing: true
        });

        try {
            if (this.state.hasDayparting) {
                await daypartingServices.activateDayparting({campaignId: this.props.campaignId});
            } else {
                await daypartingServices.updateDayPartingParams({
                    campaignId: this.props.campaignId,
                    state_encoded_string: defaultList,
                    status: 'ACTIVE'
                });
            }

            this.setState({
                activeDayparting: true,
            })
        } catch (e) {
            console.log(e);
        }

        this.setState({
            processing: false
        });
    };

    switchDayPartingHandler = () => {
        if (this.props.campaignId) {
            if (this.state.activeDayparting) {
                if (timeoutId) {
                    this.forceUpdateStatus(this.props.campaignId, this.state.hoursStatus)
                }

                this.setState({
                    visibleWindow: true
                })
            } else {
                this.activateDaypartingHandler();
            }
        }
    };

    getDaypartingStatus = async () => {
        this.setState({
            activeDayparting: false
        });

        try {
            source && source.cancel();
            source = CancelToken.source();

            const res = await daypartingServices.getDayPartingParams({
                campaignId: this.props.campaignId,
                cancelToken: source.token
            });

            if (res.response[0]) {
                this.setState({
                    hoursStatus: [...res.response[0].state_encoded_string.slice(168 - timeLineShift, 168), ...res.response[0].state_encoded_string.slice(0, 168 - timeLineShift)],
                    activeDayparting: res.response[0].status === 'ACTIVE',
                    initialState: res.response[0].initial_campaign_state,
                    hasDayparting: true
                });
            } else {
                this.setState({
                    hoursStatus: [...defaultList],
                    activeDayparting: false,
                    hasDayparting: false
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleUpdateStatus = async () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            try {
                await daypartingServices.updateDayPartingParams({
                    campaignId: this.props.campaignId,
                    state_encoded_string: [...this.state.hoursStatus.slice(timeLineShift, 168), ...this.state.hoursStatus.slice(0, timeLineShift)].join('')
                });
                notification.success({title: 'Saved'});
                timeoutId = null;
            } catch (e) {
                console.log(e);
            }
        }, 1000)
    };

    forceUpdateStatus = async (id, status) => {
        clearTimeout(timeoutId);

        try {
            daypartingServices.updateDayPartingParams({
                campaignId: id,
                state_encoded_string: [...status.slice(timeLineShift, 168), ...status.slice(0, timeLineShift)].join('')
            })
                .then(() => {
                    notification.success({title: 'Saved'});
                    timeoutId = null;
                });
        } catch (e) {
            console.log(e);
        }
    };

    handleReset = () => {
        if (defaultList !== this.state.hoursStatus.join('')) {
            this.setState({
                hoursStatus: [...defaultList]
            }, this.handleUpdateStatus);
        }
    };

    handleSwitchHour = (index, value) => {
        let newList = [...this.state.hoursStatus];
        newList[index] = value === '1' ? '0' : '1';

        this.setState({
            hoursStatus: [...newList]
        }, this.handleUpdateStatus)
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
        }, this.handleUpdateStatus)
    };

    handleSwitchColumn = (column, value) => {
        let newList = [...this.state.hoursStatus];
        [0, 1, 2, 3, 4, 5, 6].forEach(item => {
            newList[24 * item + column] = value ? '1' : '0';
        });

        this.setState({
            hoursStatus: [...newList]
        }, this.handleUpdateStatus)
    };

    componentDidMount() {
        let status = 'false';

        this.getDaypartingStatus();

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
                }, this.handleUpdateStatus)
            });
    }

    componentWillUnmount() {
        if (timeoutId) {
            this.forceUpdateStatus(this.props.campaignId, this.state.hoursStatus)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.campaignId !== this.props.campaignId) {
            if (timeoutId) {
                this.forceUpdateStatus(prevProps.campaignId, prevState.hoursStatus)
            }

            this.getDaypartingStatus()
        }

        //     window.onbeforeunload = confirmExit;
        //     function confirmExit() {
        //         return "You have attempted to leave this page. Are you sure?";
        //     }
    }


    render() {
        const {hoursStatus, activeDayparting, visibleWindow, processing, initialState} = this.state;

        return (
            <Fragment>
                <section className={`day-switches ${activeDayparting ? 'enabled' : 'disabled'}`}>
                    <div className="section-header">
                        <button
                            className='btn default switch-day-parting'
                            onClick={this.switchDayPartingHandler}
                            disabled={processing || !this.props.campaignId}
                        >
                            {activeDayparting ? 'Disable Day Parting' : 'Enable Day Parting'}
                        </button>

                        <div className='actions'>
                            <div className='disabled-example'>
                                <div/>
                                Disabled
                            </div>

                            <div className='active-example'>
                                <div/>
                                Active
                            </div>

                            <button className='btn' onClick={this.handleReset} disabled={!activeDayparting}>
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
                                    {moment(timeIndex, 'HH').format('hh A')}
                                    <Switch
                                        disabled={!activeDayparting}
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
                                            disabled={!activeDayparting}
                                            checked={hoursStatus.slice(24 * dayIndex, 24 * (dayIndex + 1)).every(item => item === '1')}
                                            onChange={(value) => this.handleSwitchRow(dayIndex, value)}
                                        />
                                        <span>
                                       {window.devicePixelRatio === 2 ? day[0] : day}
                                    </span>
                                    </div>
                                ))}
                            </div>

                            <div className={`col multi-select ${activeDayparting ? 'enabled' : 'disabled'}`}>
                                {hoursStatus.map((value, hourIndex) => (
                                    <div className='statistic-item' key={shortid.generate()}>
                                        <div
                                            onClick={() => activeDayparting && this.handleSwitchHour(hourIndex, value)}
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


                <ModalWindow
                    visible={visibleWindow}
                    className={'confirm-disable-day-parting-window'}
                    handleCancel={() => this.setState({visibleWindow: false})}
                    footer={false}
                >
                    <Fragment>
                        <h2>Are you sure?</h2>
                        <p>
                            This will result in pausing the day-parting feature for this particular campaign. Your
                            settings will be saved. <br/> Please note, that this campaign will be set to its initial state: <br/>
                            <b>{initialState}</b>
                        </p>

                        <div className="action">
                            {processing ? <Spin/> : <Fragment>
                                <button
                                    className='btn default'
                                    onClick={this.deactivateDaypartingHandler}>
                                    Yes
                                </button>

                                <button
                                    className='btn green-btn'
                                    onClick={() => this.setState({visibleWindow: false})}>
                                    No
                                </button>
                            </Fragment>}
                        </div>
                    </Fragment>
                </ModalWindow>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    campaignId: state.products.selectedProduct.id
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DaySwitches);

