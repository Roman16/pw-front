import React from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import moment from "moment"

const DateRange = () => {
    const dispatch = useDispatch()
    const {selectedDate} = useSelector(state => ({
        selectedDate: state.analytics.selectedRangeDate
    }))


    const changeDateHandler = (startDate, endDate) => {
        dispatch(analyticsActions.setDateRange({startDate: startDate || 'lifetime', endDate: endDate || 'lifetime'}))
    }

    return (
        <DatePicker
            timeRange={changeDateHandler}
            placeholder={'lifetime'}
            defaultValue={selectedDate.startDate === 'lifetime' ? null : [moment(selectedDate.startDate), moment(selectedDate.endDate)]}
        />
    )
}

export default React.memo(DateRange)
