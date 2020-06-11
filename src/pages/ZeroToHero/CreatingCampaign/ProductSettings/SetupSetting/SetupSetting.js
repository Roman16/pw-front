import React, {useEffect} from "react";
import {Checkbox, Input, Radio, Select} from 'antd';
import tz from 'moment-timezone';

import DatePicker from "../../../../../components/DatePicker/DatePicker";
import InputCurrency from "../../../../../components/Inputs/InputCurrency";
import CustomSelect from "../../../../../components/Select/Select";
import MultiTextArea from "../../../components/MultiTextArea/MultiTextArea";
import moment from "moment";
import './SetupSetting.less';

const Option = Select.Option;


const SetupSetting = ({
                          onUpdate,
                          portfolioList,
                          invalidField,
                          selectedProductName,
                          product: {
                              portfolio,
                              campaigns,
                              brand
                          }
                      }) => {

    const changePortfolioHandler = (value, isInvalid) => {
        onUpdate({
            portfolio: {
                ...portfolio,
                ...value
            }
        }, isInvalid);
    };

    const changeCampaignsHandler = (value, isInvalid) => {
        onUpdate({
            campaigns: {
                ...campaigns,
                ...value
            }
        }, isInvalid);
    };

    const changeBrandHandler = (value, isInvalid) => {
        onUpdate({
            brand: {
                ...brand,
                ...value
            }
        }, isInvalid);
    };


    const changeDateHandler = (type, date) => {
        changeCampaignsHandler({
            [`${type}_date`]: date ? moment.tz(`${moment(date).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString() : null,
        });
    };

    useEffect(() => {
        if (invalidField) {
            document.querySelector('.error-field').scrollIntoView({block: "center", behavior: "smooth"});
        }
    }, [invalidField]);

    return (
        <section className={'setup-setting'}>
            <div className="section-header">
                <div className="container">
                    <h2>ZTH Setup Settings</h2>
                </div>
            </div>

            <div className="container">
                <div className="row main-keywords-setting">
                    <div className={`col ${invalidField === 'mainKeywords' ? 'error-field' : ''}`}>
                        <h3>Please Add a Minimum of 3 Top Keywords that Customers Use to Find Your Product</h3>

                        <MultiTextArea
                            value={campaigns.main_keywords}
                            onChange={(main_keywords) => changeCampaignsHandler({main_keywords}, invalidField === 'mainKeywords')}
                            max={5}
                            toMark={true}
                            productName={selectedProductName}
                        />
                    </div>

                    <div className="col">
                        <p className={'keywords-p'}>
                            That’s the most critical part of creating Zero to Hero campaigns for your product. You need
                            to enter up to 5 most popular keywords that people use to find your product on the Amazon
                            marketplace. You can analyze your competitor’s Titles to find these keywords. That action
                            will help us to create campaigns with the relevant keywords to your product.
                        </p>
                    </div>
                </div>

                <div className="row portfolio-settings">
                    <div className="col">
                        <h3>Portfolio Settings</h3>

                        <Radio.Group value={portfolio.type}
                                     onChange={({target: {value}}) => changePortfolioHandler({
                                         type: value,
                                         no_portfolio: value === 'NoPortfolio'
                                     }, invalidField === 'portfolioName' || invalidField === 'portfolioId')}
                        >
                            <Radio value={'CreateNew'}>
                                Create portfolio
                            </Radio>

                            <div
                                className={`radio-description form-group ${invalidField === 'portfolioName' ? 'error-field' : ''}`}>
                                <Input
                                    value={portfolio.name}
                                    onChange={({target: {value}}) => changePortfolioHandler({name: value}, invalidField === 'portfolioName')}
                                    disabled={portfolio.type !== 'CreateNew'}
                                    placeholder={'Portfolio Name'}
                                />
                            </div>

                            <Radio value={'UseExisting'}>
                                Use existing portfolio
                            </Radio>

                            <div
                                className={`radio-description form-group ${invalidField === 'portfolioId' ? 'error-field' : ''}`}>
                                <CustomSelect
                                    value={portfolio.id}
                                    onChange={(value) => changePortfolioHandler({id: value}, invalidField === 'portfolioId')}
                                    disabled={portfolio.type !== 'UseExisting'}
                                    placeholder={'Select existing portfolio'}
                                >
                                    {portfolioList.map(portfolio => (
                                        <Option value={portfolio.id}>{portfolio.name}</Option>
                                    ))}
                                </CustomSelect>
                            </div>

                            <Radio value={'NoPortfolio'}>
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
                                    value={moment(campaigns.start_date)}
                                    onChange={(date) => changeDateHandler('start', date)}
                                    allowClear={false}
                                    disabledDate={current => moment().tz('America/Los_Angeles').add(-1, 'days') >= current && moment()}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">End</label>
                                <DatePicker
                                    showToday={false}
                                    format="MMM DD, YYYY"
                                    value={campaigns.end_date && moment(campaigns.end_date)}
                                    onChange={(date) => changeDateHandler('end', date)}
                                    disabledDate={current => moment(campaigns.start_date).tz('America/Los_Angeles') > current && moment()}
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
                    <div className={`col ${invalidField === 'dailyBudget' ? 'error-field' : ''}`}>
                        <h3>Daily budget</h3>

                        <InputCurrency
                            value={campaigns.daily_budget}
                            onChange={daily_budget => changeCampaignsHandler({daily_budget}, invalidField === 'dailyBudget')}
                        />

                        {/*<div className="recommended-budget">*/}
                        {/*    Recommended Daily Budget: <span>$500</span>*/}
                        {/*</div>*/}
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
                    <div className={`col ${invalidField === 'defaultBid' ? 'error-field' : ''}`}>
                        <h3>Default Bid</h3>

                        <InputCurrency
                            value={campaigns.default_bid}
                            max={1000}
                            onChange={default_bid => changeCampaignsHandler({default_bid}, invalidField === 'defaultBid')}
                        />
                    </div>

                    <div className="col">
                        <p className={'bid-p'}>
                            We use this information as the starter point to put the bids on our different campaigns with
                            different objections. Please enter your average bid for the given product.
                        </p>
                    </div>
                </div>

                <div className="row brand-name-setting">
                    <div className="col">
                        <h3>Enter Your Brand Name</h3>

                        <div className={`form-group ${invalidField === 'brandName' ? 'error-field' : ''}`}>
                            <Input
                                maxLength={80}
                                placeholder={'Your Brand Name'}
                                value={brand.name}
                                onChange={({target: {value}}) => changeBrandHandler({name: value}, invalidField === 'brandName')}
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
                    <div className={`col ${invalidField === 'brandCompetitorsNames' ? 'error-field' : ''}`}>
                        <h3>Enter Your Competitors Brands Names</h3>

                        <MultiTextArea
                            value={brand.competitor_brand_names}
                            onChange={(competitor_brand_names) => changeBrandHandler({competitor_brand_names}, invalidField === 'brandCompetitorsNames')}
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