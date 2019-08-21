import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRange } from './react-date-range';
import { Input, Icon } from 'antd';
import './DatePicker.less';

class DatePicker extends Component {
    constructor(props) {
        super(props);


        this.state = {
            dataFormat: null,
            showDatePicker: false,
        };
        this.myRef = React.createRef();
    }

    handleChange = ({ startDate, endDate }) => {
        this.setState({
            dataFormat: `${startDate.format('MM/DD/YYYY')}-${endDate.format('MM/DD/YYYY')}`,
        });
    };


    toShowDatePicker = () => {
        this.setState({
            showDatePicker: true,
        });
    };

    toHideDatePicker = () => {
        this.setState({
            showDatePicker: false,
        });
    };

    render() {
        const { dataFormat, showDatePicker } = this.state;


        return (
            <div
                className="DatePicker"
            >

                <Input
                    onClick={this.toShowDatePicker}
                    value={dataFormat}
                    prefix={<Icon type="calendar" />}
                />
                <div
                    className="date-picker-wrapper"
                >
                    {showDatePicker && (
                        <>
                            <DateRange
                                ranges={{
                                    Today: {
                                        startDate: moment(new Date()).add(0, 'days'),
                                        endDate: moment(),
                                        key: 'selection1',
                                    },
                                    Yesterday: {
                                        startDate: moment(new Date()).add(-1, 'days'),
                                        endDate: moment(),
                                        key: 'selection2',
                                    },
                                    'Last 7 Days': {
                                        startDate: moment(new Date()).add(-7, 'days'),
                                        endDate: moment(),
                                        key: 'selection3',
                                    },
                                    'Last 14 Days': {
                                        startDate: moment(new Date()).add(-14, 'days'),
                                        endDate: moment(),
                                        key: 'selection4',
                                    },
                                    'Last 30 Days': {
                                        startDate: moment(new Date()).add(-30, 'days'),
                                        endDate: moment(),
                                        key: 'selection5',
                                    },
                                    'Year to date': {
                                        startDate: moment(new Date()).add(-365, 'days'),
                                        endDate: moment(),
                                        key: 'selection6',
                                    },

                                }}
                                showSelectionPreview
                                onChange={this.handleChange}
                                onClick={this.te}
                                direction="horizontal"

                            />
                            <div className="blur-date" onClick={this.toHideDatePicker} />
                        </>
                    )}
                </div>
            </div>
        );
    }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
