import React from "react";
import {Switch} from "antd";
import dailyLineIcon from '../../../../assets/img/icons/daily-line.svg';

import DatePicker from "../../../../components/DatePicker/DatePickerOLD";

const ChartHeader = () => {
    return (
        <div className="chart-header">
            <div className='pair-name'> Clicks / CTR</div>

            <div className='switch-block weak-switch'>
                <Switch
                    // onChange={this.handleChangeSwitch}
                />

                7-day average
            </div>

            <div className='line-fill'>
                <div className="green-line"></div>
                <div className="violet-line"></div>
            </div>

            <div className='switch-block daily-switch'>
                <Switch
                    // onChange={this.handleChangeSwitch}
                />

                Daily
            </div>

            <img src={dailyLineIcon} alt="" className='daily-icon'/>

            <div className='chart-legend'>
                <div className="first-line">
                    <div className="green-line"></div>
                    Clicks
                </div>

                <div className="second-line">
                    <div className="violet-line"></div>
                    CTR
                </div>
            </div>

            <DatePicker
                timeRange={(e) => console.log(e)}
            />
        </div>
    )
};
export default ChartHeader;