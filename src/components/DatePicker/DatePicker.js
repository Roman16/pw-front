import React, {Component} from 'react';
import moment from 'moment';

import {
    DateRangePicker,
} from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './DatePicker.less';


const today = moment();
const tomorrow = moment().add(1, 'day');
const presets = [
    {
        text: 'Today',
        start: today,
        end: today,
    },
    {
        text: 'Tomorrow',
        start: tomorrow,
        end: tomorrow,
    },
    {
        text: 'Next Week',
        start: today,
        end: moment().add(1, 'week'),
    },
    {
        text: 'Next Month',
        start: today,
        end: moment().add(1, 'month'),
    }
];

class DatePicker extends Component {
    state = {
        startDate: '',
        endDate: ''
    };

    handleChange = ([start, end]) => {
        const {timeRange} = this.props;

        timeRange(
            start ? start.format('D-M-YY') : null,
            end ? end.format('D-M-YY') : null
        );
    };

    disabledDate = current => {
        return current && current > moment().endOf('day');
    };

    renderDatePresets() {
        return (
            <div>
                {presets.map(({text, start, end}) => {
                    return (
                        <button
                            key={text}
                            type="button"
                            onClick={() => this.onDatesChange({startDate: start, endDate: end})}
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="DatePicker">
                <DateRangePicker
                    renderCalendarInfo={this.renderDatePresets}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({startDate, endDate}) => this.setState({
                        startDate,
                        endDate
                    })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                /></div>
        );
    }
}

export default DatePicker;
