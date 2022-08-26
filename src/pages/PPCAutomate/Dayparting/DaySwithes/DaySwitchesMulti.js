import React, {Component, Fragment} from 'react'
import {Spin, Switch} from "antd"
import moment from "moment"
import tz from 'moment-timezone'

import Selection from "@simonwep/selection-js/src/selection"
import shortid from "shortid"
import './DaySwitches.less'
import {daypartingServices} from "../../../../services/dayparting.services"
import {notification} from "../../../../components/Notification"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {connect} from "react-redux"
import axios from "axios"
import {productsActions} from '../../../../actions/products.actions'
import {NavLink} from "react-router-dom"
import {SVG} from "../../../../utils/icons"
import {daypartingActions} from "../../../../actions/dayparting.actions"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {round} from "../../../../utils/round"
import {activeTimezone} from "../../../index"

const CancelToken = axios.CancelToken
let source = null


const timeLineShift = 24 - (moment.tz.zone(activeTimezone).utcOffset(moment().utc()) / 60)

const defaultList = Array.from({length: 168}, () => '1').join('')

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
]

const hours = Array.from({length: 24}, (item, index) => index)

const selection = Selection.create({
    // Class for the selection-area
    class: 'selection-area',

    // All elements in this container can be selected
    selectables: ['.statistic-information'],

    // The container is also the boundary in this case
    boundaries: ['.multi-select.enabled'],
    singleClick: false,
})

let timeoutId = null

class DaySwitchesMulti extends Component {
    state = {
        hoursStatus: [...defaultList],
        visibleWindow: false,
        processing: false,
        activeDayparting: false,
        hasDayparting: false,
        initialState: '',
        fetchingData: false
    }

    localFetching = false


    deactivateDaypartingHandler = async () => {
        this.setState({
            processing: true
        })

        try {
            await daypartingServices.deactivateMultiDayparting({
                campaignId: this.props.selectedCampaigns.map(i => i.id)
            })

            this.props.selectedCampaigns.forEach(i => {
                this.props.deactivated(i.id)
            })

            notification.success({title: 'Done!'})

            this.setState({
                activeDayparting: false,
                visibleWindow: false
            })
        } catch (e) {
            console.log(e)
        }

        setTimeout(() => {
            this.setState({
                processing: false
            })
        }, 500)
    }

    activateDaypartingHandler = async () => {
        this.setState({
            processing: true
        })

        try {
            await daypartingServices.activateMultiDayparting({
                state: this.state.hoursStatus,
                campaignId: this.props.selectedCampaigns.map(i => i.id)
            })

            this.props.selectedCampaigns.forEach(i => {
                this.props.activated(i.id)
            })

            this.setState({
                activeDayparting: true,
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            processing: false
        })
    }

    switchDayPartingHandler = () => {
        if (this.props.selectedCampaigns.length > 0) {
            if (this.state.activeDayparting) {
                if (timeoutId) {
                    this.forceUpdateStatus(this.props.campaignId, this.state.hoursStatus)
                }

                this.setState({
                    visibleWindow: true
                })
            } else {
                this.activateDaypartingHandler()
            }
        }
    }


    handleUpdateStatus = async () => {
        clearTimeout(timeoutId)

        if (this.props.selectedCampaigns.length > 0) {
            timeoutId = setTimeout(async () => {
                try {
                    await daypartingServices.activateMultiDayparting({
                        campaignId: this.props.selectedCampaigns.map(i => i.id),
                        state: [...this.state.hoursStatus.slice(timeLineShift, 168), ...this.state.hoursStatus.slice(0, timeLineShift)]
                    })
                    notification.success({title: 'Saved'})
                    timeoutId = null
                } catch (e) {
                    console.log(e)
                }
            }, 1000)
        }
    }

    forceUpdateStatus = async (id, status) => {
        clearTimeout(timeoutId)

        if (id) {
            try {
                daypartingServices.updateDayPartingParams({
                    campaignId: id,
                    state_encoded_string: [...status.slice(timeLineShift, 168), ...status.slice(0, timeLineShift)].join('')
                })
                    .then(() => {
                        notification.success({title: 'Saved'})
                        timeoutId = null
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }

    handleReset = () => {
        if (defaultList !== this.state.hoursStatus.join('')) {
            this.setState({
                hoursStatus: [...defaultList]
            }, this.handleUpdateStatus)
        }
    }

    handleSwitchHour = (index, value) => {
        let newList = [...this.state.hoursStatus]
        newList[index] = value === '1' ? '0' : '1'

        this.setState({
            hoursStatus: [...newList]
        }, this.handleUpdateStatus)
    }

    handleSwitchRow = (row, value) => {
        let newList = this.state.hoursStatus.map((item, index) => {
            if (index >= 24 * row && index < 24 * (row + 1)) {
                return value ? '1' : '0'
            } else {
                return item
            }
        })

        this.setState({
            hoursStatus: [...newList]
        }, this.handleUpdateStatus)
    }

    handleSwitchColumn = (column, value) => {
        let newList = [...this.state.hoursStatus];
        [0, 1, 2, 3, 4, 5, 6].forEach(item => {
            newList[24 * item + column] = value ? '1' : '0'
        })

        this.setState({
            hoursStatus: [...newList]
        }, this.handleUpdateStatus)
    }

    copySettingsHandler = () => {
        this.props.copyParams(this.state.hoursStatus)

        notification.success({title: 'Copied!'})
    }

    pasteSettingsHandler = () => {
        if (this.props.copiedParams !== this.state.hoursStatus.join('')) {
            this.setState({
                hoursStatus: [...this.props.copiedParams]
            }, this.handleUpdateStatus)
        }
    }

    componentDidMount() {
        let status = 'false'

        if (this.props.selectedCampaigns.every(i => i.hasEnabledDayparting) && !this.state.activeDayparting) {
            this.setState({
                activeDayparting: true,
            })
        }

        // this.getDaypartingStatus()

        selection
            .on('start', ({selected}) => {
                if (selected.length > 0) {
                    status = selected[0].getAttribute('value')
                }
            })
            .on('move', (event) => {
                const {changed: {removed}, selected} = event
                if (selected.length > 0) {
                    if (status === '0') {
                        for (const el of selected) {
                            el.classList.remove('removed')
                            el.classList.add('selected')
                        }

                        if (removed.length > 0) {
                            for (const el of removed) {
                                el.classList.remove('selected')
                            }
                        }
                    } else {
                        for (const el of selected) {
                            el.classList.add('removed')
                        }

                        if (removed.length > 0) {
                            for (const el of removed) {
                                el.classList.remove('removed')
                            }
                        }
                    }
                }
            })
            .on('stop', ({selected}) => {
                let newList = [...this.state.hoursStatus]

                for (const el of selected) {
                    el.classList.remove('removed')
                    el.classList.remove('selected')
                }

                if (selected.length > 0) {
                    if (status === '0') {
                        selected.forEach(item => {
                            newList[item.getAttribute('hourIndex')] = '1'
                        })
                    } else {
                        selected.forEach(item => {
                            newList[item.getAttribute('hourIndex')] = '0'
                        })
                    }
                }

                this.setState({
                    hoursStatus: [...newList]
                }, this.handleUpdateStatus)
            })
    }

    componentWillUnmount() {
        if (timeoutId) {
            this.forceUpdateStatus(this.props.selectedCampaigns, this.state.hoursStatus)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedCampaigns !== this.props.selectedCampaigns) {
            this.setState({
                hoursStatus: [...defaultList],
                visibleWindow: false,
                processing: false,
                activeDayparting: this.props.selectedCampaigns.every(i => i.hasEnabledDayparting),
                hasDayparting: false,
                initialState: '',
                fetchingData: false
            })
        }
    }


    render() {
        const {hoursStatus, activeDayparting, visibleWindow, processing, initialState, fetchingData} = this.state

        return (
            <Fragment>
                <section
                    className={`${(fetchingData || this.props.fetchingCampaignList) ? 'day-switches in-processing' : 'day-switches'}  ${activeDayparting ? 'enabled' : 'disabled'}`}>
                    <div className="section-header">
                        <h2>Dayparting</h2>

                        <div className="legend">
                            <div className='active example'>
                                <div/>
                                Active
                            </div>

                            <div className='inactive example'>
                                <div/>
                                Inactive
                            </div>
                        </div>


                        <div className='actions'>
                            <button
                                data-intercom-target='switch-dayparting'
                                className='btn default p15 switch-day-parting'
                                onClick={this.switchDayPartingHandler}
                                disabled={processing || !this.props.selectedCampaigns.length > 0}
                            >
                                {activeDayparting ? 'Disable Day-parting' : 'Enable Day-parting'}
                            </button>

                            <div className={`reset-btn`} onClick={activeDayparting && this.handleReset}>
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M1.875 11.5441C1.875 15.5238 5.13959 18.75 9.16667 18.75C13.1937 18.75 16.4583 15.5238 16.4583 11.5441C16.4583 7.56442 13.1937 4.33824 9.16667 4.33824H6.04167M6.04167 4.33824L9.16667 1.25M6.04167 4.33824L9.16667 7.42647"
                                            stroke="#353A3E" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                    </g>
                                </svg>

                                Reset
                            </div>

                            <div className="copy-btn" onClick={this.copySettingsHandler}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M2.34177 1H12.5696C12.7584 1 12.9114 1.15302 12.9114 1.34177V14.3544C12.9114 14.5432 12.7584 14.6962 12.5696 14.6962H2.34177C2.15302 14.6962 2 14.5432 2 14.3544V1.34177C2 1.15302 2.15302 1 2.34177 1Z"
                                            stroke="#353A3E" stroke-width="2"/>
                                        <path
                                            d="M6.64548 5.30371H16.8733C17.0621 5.30371 17.2151 5.45673 17.2151 5.64548V18.6581C17.2151 18.8469 17.0621 18.9999 16.8733 18.9999H6.64548C6.45673 18.9999 6.30371 18.8469 6.30371 18.6581V5.64548C6.30371 5.45673 6.45673 5.30371 6.64548 5.30371Z"
                                            fill="white" stroke="#353A3E" stroke-width="2"/>
                                    </g>
                                </svg>

                                COPY
                            </div>


                            {this.props.copiedParams ? activeDayparting ?
                                <div className="past-btn" onClick={this.pasteSettingsHandler}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path
                                                d="M2.34177 1H12.5696C12.7584 1 12.9114 1.15302 12.9114 1.34177V14.3544C12.9114 14.5432 12.7584 14.6962 12.5696 14.6962H2.34177C2.15302 14.6962 2 14.5432 2 14.3544V1.34177C2 1.15302 2.15302 1 2.34177 1Z"
                                                stroke="#353A3E" stroke-width="2"/>
                                            <path
                                                d="M6.64548 5.30371H16.8733C17.0621 5.30371 17.2151 5.45673 17.2151 5.64548V18.6581C17.2151 18.8469 17.0621 18.9999 16.8733 18.9999H6.64548C6.45673 18.9999 6.30371 18.8469 6.30371 18.6581V5.64548C6.30371 5.45673 6.45673 5.30371 6.64548 5.30371Z"
                                                fill="#353A3E" stroke="#353A3E" stroke-width="2"/>
                                        </g>
                                    </svg>

                                    PASTE
                                </div>
                                :
                                <InformationTooltip
                                    type='custom'
                                    overlayClassName={'diff-tooltip'}
                                    getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
                                    position="bottomRight"
                                    description={!activeDayparting ? 'Enable day-parting first' : 'No copied params'}>
                                    <div className="past-btn">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path
                                                    d="M2.34177 1H12.5696C12.7584 1 12.9114 1.15302 12.9114 1.34177V14.3544C12.9114 14.5432 12.7584 14.6962 12.5696 14.6962H2.34177C2.15302 14.6962 2 14.5432 2 14.3544V1.34177C2 1.15302 2.15302 1 2.34177 1Z"
                                                    stroke="#353A3E" stroke-width="2"/>
                                                <path
                                                    d="M6.64548 5.30371H16.8733C17.0621 5.30371 17.2151 5.45673 17.2151 5.64548V18.6581C17.2151 18.8469 17.0621 18.9999 16.8733 18.9999H6.64548C6.45673 18.9999 6.30371 18.8469 6.30371 18.6581V5.64548C6.30371 5.45673 6.45673 5.30371 6.64548 5.30371Z"
                                                    fill="#353A3E" stroke="#353A3E" stroke-width="2"/>
                                            </g>
                                        </svg>

                                        PASTE
                                    </div>
                                </InformationTooltip>
                                : ''}
                        </div>
                    </div>

                    <div className="description">
                        You are currently setting up Dayparting
                        for <b>{this.props.selectedCampaigns.length || 0}</b> campaigns at the same time. Changing any
                        settings here will apply <br/>it to selected campaigns and overwrite any individual settings
                        each campaign may have.
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
                                    <div
                                        {...dayIndex === 0 && {'data-intercom-target': 'dayparting-switches'}}
                                        className='day-name'
                                        key={shortid.generate()}
                                    >
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

                    {(fetchingData || this.props.fetchingCampaignList) && <div className="disable-page-loading">
                        <Spin size="large"/>
                    </div>}
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
                            settings will be saved. <br/> Please note, that this campaign will be set to its initial
                            state.
                        </p>

                        <div className="action">
                            {processing ? <Spin/> : <Fragment>
                                <button
                                    className='btn white'
                                    onClick={this.deactivateDaypartingHandler}>
                                    Yes
                                </button>

                                <button
                                    className='btn default'
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
    selectedCampaigns: state.dayparting.selectedCampaign,
    fetchingCampaignList: state.dayparting.processing,
    copiedParams: state.dayparting.copiedParams,
})

const mapDispatchToProps = dispatch => ({
    activated: (id) => dispatch(daypartingActions.activateDayparing(id)),
    deactivated: (id) => dispatch(daypartingActions.deactivateDayparing(id)),
    copyParams: (params) => dispatch(daypartingActions.copyParams(params)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DaySwitchesMulti)

