import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {dashboardActions} from '../../../../actions/dashboard.actions';
import {Switch} from "antd";
import dailyLineIcon from '../../../../assets/img/icons/daily-line.svg';
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import moment from "moment";

const ChartHeader = () => {
    const dispatch = useDispatch();
    const {showWeekChart, showDailyChart, selectedRangeDate, activeMetrics} = useSelector(state => ({
        showWeekChart: state.dashboard.showWeekChart,
        showDailyChart: state.dashboard.showDailyChart,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        activeMetrics: state.dashboard.activeMetrics,
    }));

    const handleChangeSwitch = (type) => () => {
        dispatch(dashboardActions.switchChart(type))
    };

    const timeRange = (start, end) => {
        console.log(start);
        console.log(end);
        dispatch(dashboardActions.selectDateRange([
            moment(start, 'DD-MM-YYYY'). format('YYYY-MM-DD'),
            moment(end, 'DD-MM-YYYY'). format('YYYY-MM-DD'),
        ]))
    };

    return (
        <div className="chart-header">
            <div className='pair-name'>
                {activeMetrics[0].title}
                /
                {activeMetrics[1].title}
            </div>

            <div className='switch-block week-switch'>
                <Switch
                    checked={showWeekChart}
                    onChange={handleChangeSwitch('week')}
                />

                7-day average
            </div>

            <div className='line-fill'>
                <div className="green-line"></div>
                <div className="violet-line"></div>
            </div>

            <div className='switch-block daily-switch'>
                <Switch
                    checked={showDailyChart}
                    onChange={handleChangeSwitch('daily')}
                />

                Daily
            </div>

            <img src={dailyLineIcon} alt="" className='daily-icon'/>

            <div className='chart-legend'>
                <div className="first-line">
                    <div className="green-line"></div>
                    {activeMetrics[0].title}
                </div>

                <div className="second-line">
                    <div className="violet-line"></div>
                    {activeMetrics[1].title}
                </div>
            </div>

            <DatePicker
                timeRange={timeRange}
                defaultValue={[moment(selectedRangeDate.startDate), moment(selectedRangeDate.endDate)]}
            />
        </div>
    )
};
export default ChartHeader;