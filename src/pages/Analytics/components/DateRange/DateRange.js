import React from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import moment from "moment"
import preciseDiff from "moment-precise-range-plugin"

const DateRange = ({tableOptions}) => {
    const dispatch = useDispatch()
    const {selectedDate} = useSelector(state => ({
        selectedDate: state.analytics.selectedRangeDate
    }))

    const dateDiff = moment.preciseDiff(selectedDate.endDate, selectedDate.startDate, true)
    const endPrevDate = moment(selectedDate.startDate).subtract(1, 'days')
    const startPrevDate = moment(selectedDate.startDate).subtract(1, 'days').subtract(dateDiff)


    const changeDateHandler = (startDate, endDate) => {
        dispatch(analyticsActions.setDateRange({startDate: startDate || 'lifetime', endDate: endDate || 'lifetime'}))
    }

    return (
        <div className={`datepicker-block ${tableOptions.comparePreviousPeriod ? 'compare' : ''}`}>
            <DatePicker
                timeRange={changeDateHandler}
                placeholder={'lifetime'}
                defaultValue={selectedDate.startDate === 'lifetime' ? null : [moment(selectedDate.startDate), moment(selectedDate.endDate)]}
            />

            <div className="compare-date">
                Compared: {`${moment(startPrevDate).format('DD/MM/YY')} - ${moment(endPrevDate).format('DD/MM/YY')}`}
            </div>
        </div>
    )
}

export default React.memo(DateRange)
