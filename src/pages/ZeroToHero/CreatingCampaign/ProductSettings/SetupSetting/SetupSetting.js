import React, {useState} from "react";
import {Checkbox, Input, Radio, Select} from 'antd';


import './SetupSetting.less';
import DatePicker from "../../../../../components/DatePicker/DatePicker";
import InputCurrency from "../../../../../components/Inputs/InputCurrency";
import CustomSelect from "../../../../../components/Select/Select";
import MultiTextArea from "../../../components/MultiTextArea/MultiTextArea";

const Option = Select.Option;


const SetupSetting = () => {
    const [portfolioType, setPortfolioType] = useState('create');

    const changeRadioHandler = ({target: {value}}) => setPortfolioType(value);

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

                        <Radio.Group value={portfolioType} onChange={changeRadioHandler}>
                            <Radio value={'create'}>
                                Create portfolio
                            </Radio>

                            <div className="radio-description form-group">
                                <Input
                                    disabled={portfolioType !== 'create'}
                                    placeholder={'Portfolio Name'}
                                />
                            </div>

                            <Radio value={'select'}>
                                Use existing portfolio
                            </Radio>

                            <div className="radio-description form-group">
                                <CustomSelect
                                    disabled={portfolioType !== 'select'}
                                    placeholder={'Select existing portfolio'}
                                >
                                    <Option value={'test'}>Test</Option>
                                </CustomSelect>
                            </div>

                            <Radio value={'no'}>
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
                                    format="MMM DD, YYYY"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">End</label>
                                <DatePicker
                                    showToday={false}
                                    format="MMM DD, YYYY"
                                />
                            </div>
                        </div>

                        <Checkbox
                            // onChange={(e) => setPausedCampaigns(e.target.checked)}
                        >
                            Set campaigns status to “paused”
                        </Checkbox>


                    </div>

                    <div className="col">
                        <p>
                            You can use the start date to activate campaigns at a specific time if you need it. Also by
                            clicking on “ Set campaigns status to “paused” will upload campaigns with Paused Status in
                            case you want to switch them on later.
                        </p>
                    </div>
                </div>

                <div className="row daily-budget-settings">
                    <div className="col">
                        <h3>Daily budget</h3>

                        <InputCurrency/>

                        <div className="recommended-budget">
                            Recommended Daily Budget: <span>$500</span>
                        </div>
                    </div>

                    <div className="col">
                        <p>
                            Daily budget is used to put a limit on how much you'll spend on this particular Product.
                            This amount will split between the campaigns the software will create. Based on your sales
                            and sales history, we are providing you with our "Recommended Daily Budget."
                        </p>
                    </div>
                </div>

                <div className="row default-bid-settings">
                    <div className="col">
                        <h3>Default Bid</h3>

                        <InputCurrency/>
                    </div>

                    <div className="col">
                        <p>
                            Default Bid is the maximum amount you will pay for a click when the target triggers your ad.
                            We’ll use this information as the starter point to set our bids for all the keywords and
                            targets.
                        </p>
                    </div>
                </div>

                <div className="row main-keywords-setting">
                    <div className="col">
                        <h3>Enter your main keywords (add up to 5)</h3>

                        <MultiTextArea/>
                    </div>

                    <div className="col">
                        <p>
                            That's the most critical part of creating Zero to Hero campaigns for your product. You need
                            to enter up to 5 most popular keywords that people use to find your product on the Amazon
                            marketplace. You can analyze your Title's of your competitors to find these keywords. That
                            action will help us to create campaigns with the relevant keywords to your product.
                        </p>
                    </div>
                </div>

                <div className="row brand-name-setting">
                    <div className="col">
                        <h3>Enter Your Brand Name</h3>

                        <div className="form-group">
                            <Input
                                placeholder={'Your Brand Name'}
                            />
                        </div>
                    </div>

                    <div className="col">
                        <p>
                            For certain campaigns with the “Brand Defence” goal we need to know your Brand name.
                        </p>
                    </div>
                </div>

                <div className="row competitors-brands-name-setting">
                    <div className="col">
                        <h3>Enter Your Competitors Brands Names</h3>

                        <MultiTextArea/>
                    </div>

                    <div className="col">
                        <p>
                            For the campaigns with the “Steal Marketshare” object, we need to know the top 5 or 10 of
                            your competitors that you want to steal sales from. We will use this as a starting point to
                            get the brand names of all your competitors.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SetupSetting;