import React, {Component} from 'react'
import {DatePicker as AntDatePicker} from 'antd'
import moment from 'moment'
import tz from 'moment-timezone'
import locale from 'antd/lib/locale/en_US.js.map'

import './DatePicker.less'
import {SVG} from "../../utils/icons"

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
        return current && moment(current) > moment().tz('America/Los_Angeles').endOf('day')
    }

    render() {
        const {defaultValue} = this.props

        return (
            <div className="DatePicker">
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        Yesterday: [
                            moment().tz('America/Los_Angeles').add(-1, 'days'),
                            moment().tz('America/Los_Angeles').add(-1, 'days'),
                        ],
                        'Last 7 Days': [
                            moment().tz('America/Los_Angeles').add(-6, 'days'),
                            moment().tz('America/Los_Angeles')
                        ],
                        'Last 14 Days': [
                            moment().tz('America/Los_Angeles').add(-13, 'days'),
                            moment().tz('America/Los_Angeles')
                        ],
                        'Last 30 Days': [
                            moment().tz('America/Los_Angeles').add(-29, 'days'),
                            moment().tz('America/Los_Angeles')
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
                    defaultValue={defaultValue}
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
