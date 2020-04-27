import React from "react";
import {Switch} from "antd";
import moment from "moment";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import {SVG} from "../../../../utils/icons";

const ChartHeader = ({timeRange, onChangeSwitch, selectedRangeDate, firstActiveMetricTitle, secondActiveMetricTitle, showWeekChart, showDailyChart, showOptimizationChart}) => {
    return (
        <div className="chart-header">
            <DatePicker
                timeRange={timeRange}
                defaultValue={selectedRangeDate.startDate === 'lifetime' ? null : [moment(selectedRangeDate.startDate), moment(selectedRangeDate.endDate)]}
            />

            <div className="row">
                <div className="switches">
                    <div className='switch-block week-switch'>
                        <Switch
                            checked={showWeekChart}
                            onChange={e => onChangeSwitch('week', e)}
                        />

                        <span>7-day average</span>

                        {/*<div className='line-fill'>*/}
                    {/*<span className="green-line">*/}
                    {/*    <SVG id='green-line'/>*/}
                    {/*</span>*/}
                    {/*        <span className="violet-line">*/}
                    {/*     <SVG id='violet-line'/>*/}
                    {/*</span>*/}
                    {/*    </div>*/}
                    </div>

                    <div className='switch-block daily-switch'>
                        <Switch
                            checked={showDailyChart}
                            onChange={e => onChangeSwitch('daily', e)}
                        />
                        <span>Daily</span>

                        {/*<span className='daily-icon'>*/}
                     {/*<SVG id='daily-line'/>*/}
                {/*</span>*/}
                    </div>

                    <div className='switch-block optimization-switch'>
                        <Switch
                            checked={showOptimizationChart}
                            onChange={e => onChangeSwitch('optimization', e)}
                        />
                        <span>Optimization status</span>

                        {/*<SVG id='optimization-status'/>*/}
                    </div>
                </div>

                <div className='chart-legend'>
                    {(firstActiveMetricTitle || secondActiveMetricTitle) && <div className="first-line">
                    <span className="dashed-line">
                        <SVG id='dashed-lines'/>
                    </span>

                        Gathering data
                    </div>}

                    <div className="optimization-line started">
                        <SVG id='optimization-started'/>
                        Optimization started
                    </div>

                    <div className="optimization-line paused">
                        <SVG id='optimization-paused'/>
                        Optimization paused
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ChartHeader;