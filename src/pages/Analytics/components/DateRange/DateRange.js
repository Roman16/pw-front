import React from "react"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const DateRange = () => {
    const dispatch = useDispatch()
    const {selectedDate} = useSelector(state => ({
        selectedDate: state.analytics.selectedRangeDate
    }))


    const changeDateHandler = (startDate, endDate) => {
        dispatch(analyticsActions.setDateRange({startDate, endDate}))
    }

    return (
        <DatePicker
            timeRange={changeDateHandler}
            defaultValue={selectedDate.startDate === 'lifetime' ? null : [selectedDate.startDate, selectedDate.endDate]}
        />
    )
}

export default React.memo(DateRange)