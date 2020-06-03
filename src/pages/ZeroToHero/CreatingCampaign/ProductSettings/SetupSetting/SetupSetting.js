import React, {useState} from "react";
import {Checkbox, DatePicker as AntDatePicker, Input, Radio, Select} from 'antd';


import './SetupSetting.less';
import DatePicker from "../../../../../components/DatePicker/DatePicker";
import InputCurrency from "../../../../../components/Inputs/InputCurrency";
import CustomSelect from "../../../../../components/Select/Select";
import MultiTextArea from "../../../components/MultiTextArea/MultiTextArea";
import moment from "moment";

const Option = Select.Option;


const SetupSetting = ({
                          onUpdate, product: {
        portfolio,
        campaigns,
        brand
    }
                      }) => {

    const changePortfolioHandler = (value) => {
        onUpdate({
            portfolio: {
                ...portfolio,
                ...value
            }
        });
    };

    const changeCampaignsHandler = (value) => {
        onUpdate({
            campaigns: {
                ...campaigns,
                ...value
            }
        });
    };

    const changeBrandHandler = (value) => {
        onUpdate({
            brand: {
                ...brand,
                ...value
            }
        });
    };


    const changeDateHandler = (type, date) => {
        changeCampaignsHandler({
            [`${type}_date`]: moment(date).format('YYYY-MM-DD'),
        });
    };

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

                        <Radio.Group value={portfolio.portfolioType}
                                     onChange={({target: {value}}) => changePortfolioHandler({portfolioType: value})}>
                            <Radio value={'create'}>
                                Create portfolio
                            </Radio>

                            <div className="radio-description form-group">
                                <Input
                                    value={portfolio.name}
                                    onChange={({target: {value}}) => changePortfolioHandler({name: value})}
                                    disabled={portfolio.portfolioType !== 'create'}
                                    placeholder={'Portfolio Name'}
                                />
                            </div>

                            <Radio value={'select'}>
                                Use existing portfolio
                            </Radio>

                            <div className="radio-description form-group">
                                <CustomSelect
                                    value={portfolio.id}
                                    onChange={(value) => changePortfolioHandler({id: value})}
                                    disabled={portfolio.portfolioType !== 'select'}
                                    placeholder={'Select existing portfolio'}
                                >
                                    <Option value={'portfolio1'}>Portfolio1</Option>
                                    <Option value={'portfolio2'}>Portfolio2</Option>
                                </CustomSelect>
                            </div>

                            <Radio value={'no-portfolio'}>
                                No portfolio
                            </Radio>
                        </Radio.Group>
                    </div>

                    <div className="col">
                        <p className={'portfolio-p'}>
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
                                    value={moment(campaigns.start_date, 'YYYY-MM-DD')}
                                    onChange={(date) => changeDateHandler('start', date)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">End</label>
                                <DatePicker
                                    showToday={false}
                                    format="MMM DD, YYYY"
                                    value={campaigns.end_date && moment(campaigns.end_date, 'YYYY-MM-DD')}
                                    onChange={(date) => changeDateHandler('end', date)}
                                />
                            </div>
                        </div>

                        <Checkbox
                            checked={campaigns.set_to_paused}
                            onChange={({target: {checked}}) => changeCampaignsHandler({set_to_paused: checked})}
                        >
                            Set campaigns status to “<b>paused</b>”
                        </Checkbox>
                    </div>

                    <div className="col">
                        <p className={'date-p'}>
                            You can use the start date to activate campaigns at a specific time if you need it. Also by
                            clicking on “ Set campaigns status to “paused” will upload campaigns with Paused Status in
                            case you want to switch them on later.
                        </p>
                    </div>
                </div>

                <div className="row daily-budget-settings">
                    <div className="col">
                        <h3>Daily budget</h3>

                        <InputCurrency
                            value={campaigns.daily_budget}
                            onChange={daily_budget => changeCampaignsHandler({daily_budget})}
                        />

                        <div className="recommended-budget">
                            Recommended Daily Budget: <span>$500</span>
                        </div>
                    </div>

                    <div className="col">
                        <p className={'budget-p'}>
                            Daily budget is used to put a limit on how much you'll spend on this particular Product.
                            This amount will split between the campaigns the software will create. Based on your sales
                            and sales history, we are providing you with our "Recommended Daily Budget."
                        </p>
                    </div>
                </div>

                <div className="row default-bid-settings">
                    <div className="col">
                        <h3>Default Bid</h3>

                        <InputCurrency
                            value={campaigns.default_bid}
                            onChange={default_bid => changeCampaignsHandler({default_bid})}
                        />
                    </div>

                    <div className="col">
                        <p className={'bid-p'}>
                            Default Bid is the maximum amount you will pay for a click when the target triggers your ad.
                            We’ll use this information as the starter point to set our bids for all the keywords and
                            targets.
                        </p>
                    </div>
                </div>

                <div className="row main-keywords-setting">
                    <div className="col">
                        <h3>Enter your main keywords (add up to 5)</h3>

                        <MultiTextArea
                            value={campaigns.main_keywords}
                            onChange={(main_keywords) => changeCampaignsHandler({main_keywords})}
                            max={5}
                        />
                    </div>

                    <div className="col">
                        <p className={'keywords-p'}>
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
                                value={brand.name}
                                onChange={({target: {value}}) => changeBrandHandler({name: value})}
                            />
                        </div>
                    </div>

                    <div className="col">
                        <p className={'brand-name-p'}>
                            For certain campaigns with the “Brand Defence” goal we need to know your Brand name.
                        </p>
                    </div>
                </div>

                <div className="row competitors-brands-name-setting">
                    <div className="col">
                        <h3>Enter Your Competitors Brands Names</h3>

                        <MultiTextArea
                            value={brand.competitor_brand_names}
                            onChange={(competitor_brand_names) => changeBrandHandler({competitor_brand_names})}
                        />
                    </div>

                    <div className="col">
                        <p className={'brands-names-p'}>
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