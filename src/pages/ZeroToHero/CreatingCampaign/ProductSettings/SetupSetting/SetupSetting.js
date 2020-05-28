import React from "react";
import {Input, Radio} from 'antd';


import './SetupSetting.less';
import DatePicker from "../../../../../components/DatePicker/DatePicker";


const SetupSetting = () => {

    return (
        <section className={'setup-setting'}>
            <div className="section-header">
                <div className="container">
                    <h2>ZTH Setup Settings</h2>
                </div>
            </div>

            <div className="container">

                <div className="row portfolio-settings">
                    <div className="col">
                        <h3>Portfolio Settings</h3>

                        <Radio.Group defaultValue={1}>
                            <Radio value={1}>
                                Create portfolio
                            </Radio>

                            <div className="radio-description form-group">
                                <Input/>
                            </div>

                            <Radio value={2}>
                                Use existing portfolio
                            </Radio>

                            <div className="radio-description form-group">
                                <Input/>
                            </div>

                            <Radio value={3}>
                                No portfolio
                            </Radio>
                        </Radio.Group>
                    </div>

                    <div className="col">
                        <p>
                            At Profit Whales, we use Portfolios to better organize advertising campaigns for different
                            products so that you can adjust them in the Advertising Console more easily. We highly
                            encourage
                            you to use this option.
                        </p>
                    </div>
                </div>

                <div className="row date-settings">
                    <div className="col">
                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Start</label>

                                <DatePicker
                                    showToday={false}
                                    getPopupContainer={trigger => trigger}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">End</label>
                                <DatePicker
                                    showToday={false}
                                    getPopupContainer={trigger => trigger}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <p>
                            You can use the start date to activate campaigns at a specific time if you need it. Also by
                            clicking on “ Set campaigns status to “paused” will upload campaigns with Paused Status in
                            case you want to switch them on later.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SetupSetting;