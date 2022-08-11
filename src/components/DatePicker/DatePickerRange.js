import React, {Component} from 'react'
import {DatePicker as AntDatePicker} from 'antd'
// import moment from 'moment'
import moment from 'moment-timezone'

import './DatePicker.less'
import {SVG} from "../../utils/icons"
import {activeTimezone} from "../../pages"

const {RangePicker} = AntDatePicker

class DatePicker extends Component {
    handleChange = ([start, end]) => {
        const {timeRange} = this.props

        timeRange(
            start ? start : null,
            end ? end : null
        )
    }


    disabledDate = current => {
        return current && moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
    }

    render() {
        const {value, locale} = this.props

        return (
            <div className="DatePicker">
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        Yesterday: [
                            moment().tz(activeTimezone).add(-1, 'days'),
                            moment().tz(activeTimezone).add(-1, 'days'),
                        ],
                        'Last 7 Days': [
                            moment().tz(activeTimezone).add(-6, 'days'),
                            moment().tz(activeTimezone)
                        ],
                        'Last 14 Days': [
                            moment().tz(activeTimezone).add(-13, 'days'),
                            moment().tz(activeTimezone)
                        ],
                        'Last 30 Days': [
                            moment().tz(activeTimezone).add(-29, 'days'),
                            moment().tz(activeTimezone)
                        ],
                        'Year to date': [
                            moment(new Date(new Date().getFullYear(), 0, 1)),
                            moment()
                        ],
                        Lifetime: [
                            null,
                            null
                        ]
                    }}
                    className={'pw-range-date-picker'}
                    dropdownClassName={'pw-date-picker-dropdown'}
                    separator="-"
                    format="DD/MM/YY"
                    locale={locale}
                    suffixIcon={<SVG id={'select-icon'}/>}
                    onChange={this.handleChange}
                    disabledDate={this.disabledDate}
                    value={value}
                    getCalendarContainer={(trigger) => trigger.parentNode}
                    getPopupContainer={trigger => trigger.parentNode}
                />
            </div>
        )
    }
}

DatePicker.propTypes = {}

DatePicker.defaultProps = {}

export default DatePicker
