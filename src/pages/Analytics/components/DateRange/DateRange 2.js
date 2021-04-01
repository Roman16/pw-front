import React from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import moment from "moment"

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
                defaultValue={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate), moment(selectedRangeDate.endDate)]}
            />

            {selectedRangeDate.startDate !== 'lifetime' && <div className="compare-date">
                Compared: {`${moment(startPrevDate).format('DD/MM/YY')} - ${moment(endPrevDate).format('DD/MM/YY')}`}
            </div>}
        </div>
    )
}

export default React.memo(DateRange)
