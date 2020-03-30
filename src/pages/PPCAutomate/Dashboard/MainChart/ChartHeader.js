import React from "react";
import {Switch} from "antd";
import moment from "moment";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import {SVG} from "../../../../utils/icons";

const ChartHeader = ({timeRange, onChangeSwitch, selectedRangeDate, firstActiveMetricTitle, secondActiveMetricTitle, showWeekChart, showDailyChart}) => {
    return (
        <div className="chart-header">
            <div className='switch-block week-switch'>
                <Switch
                    checked={showWeekChart}
                    onChange={onChangeSwitch('week')}
                />

                <span>7-day average</span>

                <div className='line-fill'>
                    <span className="green-line">
                        <SVG id='green-line'/>
                    </span>
                    <span className="violet-line">
                         <SVG id='violet-line'/>
                    </span>
                </div>
            </div>


            <div className='switch-block daily-switch'>
                <Switch
                    checked={showDailyChart}
                    onChange={onChangeSwitch('daily')}
                />
                <span>Daily</span>

                <span className='daily-icon'>
                     <SVG id='daily-line'/>
                </span>
            </div>


            <div className='chart-legend'>
                {firstActiveMetricTitle && <div className="first-line">
                    <span className="green-line">
                        <SVG id='green-line'/>
                    </span>

                    {firstActiveMetricTitle}
                </div>}

                {secondActiveMetricTitle && <div className="second-line">
                    <span className="violet-line">
                         <SVG id='violet-line'/>
                    </span>

                    {secondActiveMetricTitle}
                </div>}
            </div>

            <DatePicker
                timeRange={timeRange}
                defaultValue={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate), moment(selectedRangeDate.endDate)]}
            />
        </div>
    )
};
export default ChartHeader;