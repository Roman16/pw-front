import React, {useEffect} from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import moment from 'moment-timezone'
import {activeTimezone} from "../../../index"


const ranges = {
    Today: [moment().tz(activeTimezone), moment().tz(activeTimezone)],
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

const DateRange = ({
                       tableOptions,
                       onChange,
                       selectedRangeDate,
                       compareDate,
                       onChangeCompareDate
}) => {
    let dateDiff,
        endPrevDate,
        startPrevDate

    if (tableOptions.comparePreviousPeriod) {
        dateDiff = moment.duration(moment(selectedRangeDate.endDate).diff(moment(selectedRangeDate.startDate)))
        endPrevDate = moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days')
        startPrevDate = moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days').subtract(dateDiff)
    }

    const onCalendarChangeHandler = (date) => startDate = date[0]

    useEffect(() => {
        moment.tz.setDefault(activeTimezone)

        return (() => {
            moment.tz.setDefault()
        })
    }, [])


    return (
        <div
            className={`datepicker-block ${selectedRangeDate.startDate !== 'lifetime' && tableOptions.comparePreviousPeriod ? 'compared' : ''}`}>
            <DatePicker
                wrapClassName={'main-datepicker'}
                timeRange={(start, end) => {
                    startDate = undefined

                    onChange(start, end)
                }}
                ranges={ranges}
                placeholder={'lifetime'}
                allowClear={false}
                disabled={current => {
                    if (current) {
                        if (startDate) {
                            return moment(current).endOf('day') > moment(startDate).tz(activeTimezone).add(62, 'days').endOf('day') || moment(current).endOf('day') < moment(startDate).tz(activeTimezone).subtract(61, 'days').endOf('day') || moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
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

            {selectedRangeDate.startDate !== 'lifetime' && <DatePicker
                wrapClassName={'compare-datepicker'}
                timeRange={(start, end) => {
                    startDate = undefined
                    onChangeCompareDate(start, end)
                }}

                allowClear={false}
                disabled={current => {
                    if (current) {
                        if (startDate) {
                            return moment(current).endOf('day') > moment(startDate).tz(activeTimezone).add(62, 'days').endOf('day') || moment(current).endOf('day') < moment(startDate).tz(activeTimezone).subtract(61, 'days').endOf('day') || moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
                        } else {
                            return moment(current).endOf('day') > moment().tz(activeTimezone).endOf('day')
                        }
                    } else {
                        return false
                    }
                }}
                onCalendarChange={onCalendarChangeHandler}
                value={compareDate.startDate === 'lifetime' ? null : [moment(compareDate.startDate, 'YYYY-MM-DD'), moment(compareDate.endDate, 'YYYY-MM-DD')]}
            />
            }
        </div>
    )
}

export default React.memo(DateRange)
