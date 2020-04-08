import React, { Component } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';
import tz from 'moment-timezone';

import DateIcon from './DateIcon/DateIcon';
import './DatePicker.less';

const { RangePicker } = AntDatePicker;

class DatePicker extends Component {
    handleChange = ([start, end]) => {
        const { timeRange } = this.props;

        timeRange(
            start ? start.format('D-M-YY') : null,
            end ? end.format('D-M-YY') : null
        );
    };

    disabledDate = current => {
        return current && current > moment().tz('America/Los_Angeles').endOf('day');
    };

    render() {
        const {defaultValue} = this.props;

        return (
            <div className="DatePicker">
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        Yesterday: [
                            moment(new Date()).add(-1, 'days'),
                            moment(new Date()).add(-1, 'days'),
                        ],
                        'Last 7 Days': [
                            moment(new Date()).add(-7, 'days'),
                            moment()
                        ],
                        'Last 14 Days': [
                            moment(new Date()).add(-14, 'days'),
                            moment()
                        ],
                        'Last 30 Days': [
                            moment(new Date()).add(-30, 'days'),
                            moment()
                        ],
                        'Year to date': [
                            moment(new Date(new Date().getFullYear(), 0, 1)),
                            moment()
                        ],
                        Lifetime: [
                            null,
                            null
                        ]
                    }}
                    separator="-"
                    format="DD/MM/YY"
                    suffixIcon={<DateIcon />}
                    onChange={this.handleChange}
                    disabledDate={this.disabledDate}
                    defaultValue={defaultValue}
                />
            </div>
        );
    }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
