import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker as AntDatePicker } from 'antd';

import './DatePicker.less';

const { RangePicker } = AntDatePicker;

class DatePicker extends Component {
    handleChange = ([start, end]) => {
        const { timeRange } = this.props;

        timeRange(start.format('Y-M-D'), end.format('Y-M-D'));
        console.log(start.format('Y-M-D'), end.format('Y-M-D'));
    };

    render() {


        return (
            <div
                className="DatePicker"
            >

                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        Yesterday: [moment(new Date())
                            .add(-1, 'days'), moment()],
                        'Last 7 Days': [moment(new Date())
                            .add(-7, 'days'), moment()],
                        'Last 14 Days': [moment(new Date())
                            .add(-14, 'days'), moment()],
                        'Last 30 Days': [moment(new Date())
                            .add(-30, 'days'), moment()],
                        'Year to date': [moment(new Date())
                            .add(-365, 'days'), moment()],
                    }}
                    format="YYYY/MM/DD"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
