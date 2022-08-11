import React from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import moment from 'moment-timezone'
import locale from 'antd/lib/locale/en_US.js.map'

const DateRange = ({tableOptions, onChange, selectedRangeDate}) => {
    let dateDiff,
        endPrevDate,
        startPrevDate

    if (tableOptions.comparePreviousPeriod) {
        dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)
        endPrevDate = moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days')
        startPrevDate = moment(selectedRangeDate.startDate, 'YYYY-MM-DD').subtract(1, 'days').subtract(dateDiff)
    }

    return (
        <div
            className={`datepicker-block ${selectedRangeDate.startDate !== 'lifetime' && tableOptions.comparePreviousPeriod ? 'compare' : ''}`}>
            <DatePicker
                timeRange={onChange}
                placeholder={'lifetime'}
                locale={locale}
                value={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate, 'YYYY-MM-DD'), moment(selectedRangeDate.endDate, 'YYYY-MM-DD')]}
            />

            {selectedRangeDate.startDate !== 'lifetime' && <div className="compare-date">
                Compared: {`${moment(startPrevDate).format('DD/MM/YY')} - ${moment(endPrevDate).format('DD/MM/YY')}`}
            </div>}
        </div>
    )
}

export default React.memo(DateRange)
