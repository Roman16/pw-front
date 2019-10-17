import React, { Component } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

import DateIcon from './DateIcon/DateIcon';
import './DatePicker.less';

const { RangePicker } = AntDatePicker;

class DatePicker extends Component {
    handleChange = ([start, end]) => {
        const { timeRange } = this.props;

        // timeRange(start.format('D-M-YY'), end.format('D-M-YY'));
        // console.log(start.format('D-M-YY'), end.format('D-M-YY'));
    };

    disabledDate = current => {
        return current && current > moment().endOf('day');
    };

    render() {
        return (
            <div className="DatePicker">
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        Yesterday: [
                            moment(new Date()).add(-1, 'days'),
                            moment()
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
                            moment(new Date()).add(-365, 'days'),
                            moment()
                        ]
                    }}
                    format="DD/MM/YY"
                    suffixIcon={<DateIcon />}
                    onChange={this.handleChange}
                    disabledDate={this.disabledDate}
                />
            </div>
        );
    }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
