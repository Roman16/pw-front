import React, {useState} from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import moment from 'moment-timezone'
import locale from 'antd/lib/locale/en_US.js.map'
import {activeTimezone} from "../../../index"

const ranges = {
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
    ]
}

let startDate

const DateRange = ({tableOptions, onChange, selectedRangeDate}) => {
    let dateDiff,
        endPrevDate,
        startPrevDate

    if (tableOptions.comparePreviousPeriod) {
        dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)
        endPrevDate = moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days')
        startPrevDate = moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days').subtract(dateDiff)
    }

    const onCalendarChangeHandler = (date) => startDate = date[0]

    return (
        <div
            className={`datepicker-block ${selectedRangeDate.startDate !== 'lifetime' && tableOptions.comparePreviousPeriod ? 'compare' : ''}`}>
            <DatePicker
                timeRange={(start, end) => {
                    startDate = undefined

                    onChange(start, end)
                }}
                ranges={ranges}
                placeholder={'lifetime'}
                locale={locale}
                allowClear={false}
                disabled={current => {
                    if (current) {
                        if (startDate) {
                            return moment(current).endOf('day') > moment(startDate).add(62, 'days').tz(activeTimezone).endOf('day') || moment(current).endOf('day') < moment(startDate).subtract(61, 'days').tz(activeTimezone).endOf('day') || moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
                        } else {
                            return moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
                        }
                    } else {
                        return false
                    }
                }}
                onCalendarChange={onCalendarChangeHandler}
                value={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate, 'YYYY-MM-DD'), moment(selectedRangeDate.endDate, 'YYYY-MM-DD')]}
            />

            {selectedRangeDate.startDate !== 'lifetime' && <div className="compare-date">
                Compared: {`${moment(startPrevDate).format('DD/MM/YY')} - ${moment(endPrevDate).format('DD/MM/YY')}`}
            </div>}
        </div>
    )
}

export default React.memo(DateRange)
