import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

import DateIcon from './DateIcon/DateIcon';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './DatePicker.less';

const today = moment();
const tomorrow = moment().add(1, 'day');
const presets = [
    {
        text: 'Today',
        startDate: today,
        endDate: today
    },
    {
        text: 'Tomorrow',
        startDate: tomorrow,
        endDate: tomorrow
    },
    {
        text: 'Next Week',
        startDate: today,
        endDate: moment().add(1, 'week')
    },
    {
        text: 'Next Month',
        startDate: today,
        endDate: moment().add(1, 'month')
    }
];

class DatePicker extends Component {
    state = {
        startDate: '',
        endDate: '',
        focusedInput: null
    };

    // handleChange = ([start, end]) => {
    //     const { timeRange } = this.props;

    //     timeRange(
    //         start ? start.format('DD-MM-YY') : null,
    //         end ? end.format('DD-MM-YY') : null
    //     );
    // };

    // disabledDate = current => {
    //     return current && current > moment().endOf('day');
    // };

    renderDatePresets() {
        const onDatesChange = () => {
            console.log('onChange');
            // console.log('qwe', qwe);
        };

        return (
            <div className="Presets">
                {presets.map(({ text, startDate, endDate }) => {
                    return (
                        <button
                            className="PresetsBtn"
                            key={text}
                            type="button"
                            onClick={() =>
                                this.onDatesChange(startDate, endDate)
                            }
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
        );
    }

    render() {
        const { startDate, endDate, focusedInput } = this.state;
        console.log('startDate :', startDate);
        console.log('endDate :', endDate);
        console.log('focusedInput :', focusedInput);

        return (
            <div className="date-picker">
                <DateRangePicker
                    renderCalendarInfo={this.renderDatePresets}
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) =>
                        this.setState({
                            startDate,
                            endDate
                        })
                    } // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput =>
                        this.setState({ focusedInput })
                    } // PropTypes.func.isRequired,
                    small
                    customInputIcon={<DateIcon />}
                    showClearDates
                    reopenPickerOnClearDates
                    regular
                />
            </div>
        );
    }
}

export default DatePicker;
