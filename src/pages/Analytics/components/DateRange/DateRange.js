import React from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import moment from 'moment-timezone'
import locale from 'antd/lib/locale/en_US.js.map'

const DateRange = ({tableOptions, onChange, selectedRangeDate}) => {
    const dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)
    const endPrevDate = moment(selectedRangeDate.startDate).subtract(1, 'days')
    const startPrevDate = moment(selectedRangeDate.startDate).subtract(1, 'days').subtract(dateDiff)

    return (
        <div
            className={`datepicker-block ${selectedRangeDate.startDate !== 'lifetime' && tableOptions.comparePreviousPeriod ? 'compare' : ''}`}>
            <DatePicker
                timeRange={onChange}
                placeholder={'lifetime'}
                locale={locale}
                value={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate).tz('America/Los_Angeles'), moment(selectedRangeDate.endDate).tz('America/Los_Angeles')]}
            />

            {selectedRangeDate.startDate !== 'lifetime' && <div className="compare-date">
                Compared: {`${moment(startPrevDate).format('DD/MM/YY')} - ${moment(endPrevDate).format('DD/MM/YY')}`}
            </div>}
        </div>
    )
}

export default React.memo(DateRange)
