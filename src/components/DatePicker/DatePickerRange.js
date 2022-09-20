import React, {Component} from 'react'
import {DatePicker as AntDatePicker} from 'antd'
// import moment from 'moment'
import moment from 'moment-timezone'

import './DatePicker.less'
import {SVG} from "../../utils/icons"
import {activeTimezone} from "../../pages"

const {RangePicker} = AntDatePicker

const defaultRanges = {
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
}

class DatePicker extends Component {
    handleChange = ([start, end]) => {
        const {timeRange} = this.props

        timeRange(
            start ? start : null,
            end ? end : null
        )
    }


    disabledDate = (current) => {
        if(this.props.disabled) {
            return current && this.props.disabled(current)
        } else {
            return current && moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
        }
    }

    render() {
        const {value, locale, ranges, allowClear=true, onCalendarChange, className,dropdownClassName, format='DD/MM/YY', placeholder='', renderExtraFooter, open, onOpenChange} = this.props

        return (
            <div className="DatePicker">
                <RangePicker
                    ranges={ranges || defaultRanges}
                    className={`pw-range-date-picker ${className || ''}`}
                    dropdownClassName={`pw-date-picker-dropdown ${dropdownClassName || ''}`}
                    separator="-"
                    allowClear={allowClear}
                    format={format}
                    locale={locale}
                    suffixIcon={<SVG id={'select-icon'}/>}
                    disabledDate={this.disabledDate}
                    value={value}
                    placeholder={placeholder}
                    getCalendarContainer={(trigger) => trigger.parentNode}
                    getPopupContainer={trigger => trigger.parentNode}
                    onCalendarChange={onCalendarChange}
                    renderExtraFooter={renderExtraFooter}
                    open={open}

                    onOpenChange={onOpenChange}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

DatePicker.propTypes = {}

DatePicker.defaultProps = {}

export default DatePicker
