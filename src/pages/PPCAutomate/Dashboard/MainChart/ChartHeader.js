import React, {Fragment} from "react";
import {Switch} from "antd";
import moment from "moment";
import DatePicker from "../../../../components/DatePicker/DatePickerRange";
import {SVG} from "../../../../utils/icons";
import {activeTimezone} from "../../../index"

const ChartHeader = ({timeRange, onChangeSwitch, selectedRangeDate, firstActiveMetricTitle, secondActiveMetricTitle, showWeekChart, showDailyChart, showOptimizationChart}) => {
    return (
        <div className="chart-header">
            <DatePicker
                timeRange={timeRange}
                defaultValue={selectedRangeDate.startDate === 'lifetime' ? null : [selectedRangeDate.startDate, selectedRangeDate.endDate]}
            />

            <div className="switches">
                <div className='switch-block week-switch'>
                    <Switch
                        checked={showWeekChart}
                        onChange={e => onChangeSwitch('week', e)}
                    />

                    <span>7-day average</span>
                </div>

                <div className='switch-block daily-switch'>
                    <Switch
                        checked={showDailyChart}
                        onChange={e => onChangeSwitch('daily', e)}
                    />
                    <span>Daily</span>
                </div>

                <div className='switch-block optimization-switch'>
                    <Switch
                        checked={showOptimizationChart}
                        onChange={e => onChangeSwitch('optimization', e)}
                    />
                    <span>Optimization status</span>
                </div>
            </div>

            <div className='chart-legend'>
                {(moment().tz(activeTimezone).subtract(3, "days") < moment(selectedRangeDate.endDate) || selectedRangeDate.endDate === 'lifetime') &&
                <div className="first-line">
                    <span className="dashed-line">
                        <SVG id='dashed-lines'/>
                    </span>

                    Gathering data
                </div>}

                {showOptimizationChart && <Fragment>
                    <div className="optimization-line started">
                        <SVG id='optimization-started'/>
                        Optimization started
                    </div>

                    <div className="optimization-line paused">
                        <SVG id='optimization-paused'/>
                        Optimization paused
                    </div>
                </Fragment>}
            </div>
        </div>
    )
};
export default ChartHeader;