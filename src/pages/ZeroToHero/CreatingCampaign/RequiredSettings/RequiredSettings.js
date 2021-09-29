import React, {useEffect} from "react"
import MultiTextArea from "../../components/MultiTextArea/MultiTextArea"
import {Checkbox, Input, Radio, Select} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import CustomSelect from "../../../../components/Select/Select"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import moment from "moment"
import './RequiredSettings.less'
import InformationTooltip from "../../../../components/Tooltip/Tooltip"

const Option = Select.Option

const RequiredSettings = ({
                              onUpdate,
                              portfolioList,
                              invalidField,
                              product: {
                                  portfolio,
                                  campaigns,
                                  brand,
                                  use_existing_ppc_targetings,
                                  pause_existing_duplicates_of_zth_targetings,
                                  name
                              }
                          }) => {

    const changeProductHandler = (value, isInvalid) => {
        onUpdate({
            ...value
        }, isInvalid)
    }

    const changePortfolioHandler = (value, isInvalid) => {
        onUpdate({
            portfolio: {
                ...portfolio,
                ...value
            }
        }, isInvalid)
    }

    const changeCampaignsHandler = (value, isInvalid) => {
        onUpdate({
            campaigns: {
                ...campaigns,
                ...value
            }
        }, isInvalid)
    }

    const changeBrandHandler = (value, isInvalid) => {
        onUpdate({
            brand: {
                ...brand,
                ...value
            }
        }, isInvalid)
    }


    const changeDateHandler = (type, date) => {
        changeCampaignsHandler({
            [`${type}_date`]: date ? moment.tz(`${moment(date).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString() : null,
            ...type === 'start' && moment(campaigns.end_date) < moment(date) && {
                end_date: date ? moment.tz(`${moment(date).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString() : null,
            }
        })
    }

    useEffect(() => {
        if (invalidField) {
            // document.querySelector('.error-field').scrollIntoView({block: "center", behavior: "smooth"});
        }
    }, [invalidField])

    return (
        <section className={`step required-setting`}>
            <div className="container">
                <div className="block main-keywords-setting">
                    <div className="row">
                        <div className={`col ${invalidField === 'mainKeywords' ? 'error-field' : ''}`}>
                            <h3>Seed Keywords</h3>
                            <p><b>Please add a minimum of 3 Seed Keywords that customers use to find your Product</b>
                            </p>

                            {/*<a*/}
                            {/*    href="https://learn.profitwhales.com/en/articles/4201379-seed-keywords-best-practices"*/}
                            {/*    target={'_blank'}*/}
                            {/*>*/}
                            {/*    Here is the guide on how to do it*/}
                            {/*</a>*/}

                            <MultiTextArea
                                value={campaigns.main_keywords}
                                onChange={(main_keywords) => changeCampaignsHandler({main_keywords}, invalidField === 'mainKeywords')}
                                max={5}
                                toMark={true}
                                productName={name}
                                unique={true}
                            />

                            <p><b>Estimated keywords count for campaigns: <InformationTooltip
                                type={'custom'}
                                description={'This is an estimated amount of keywords we will be able to gather based on provided Seed Keywords. Contributions by each keyword:'}>
                                <span>100 - 700</span>
                            </InformationTooltip></b></p>
                        </div>

                        <div className="col">
                            <p className={'description keywords-p'}>
                                That’s the most critical part of creating Zero to Hero campaigns for your product. You
                                need
                                to enter up to 5 most popular keywords that people use to find your product on the
                                Amazon
                                marketplace. You can analyze your competitor’s Titles to find these keywords. That
                                action
                                will help us to create campaigns with the relevant keywords to your product.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="block portfolio-settings">
                    <div className="row">
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

                                <div className="row">
                                    <div
                                        className={`radio-description form-group ${invalidField === 'portfolioName' ? 'error-field' : ''}`}>
                                        <Input
                                            value={portfolio.name}
                                            onChange={({target: {value}}) => changePortfolioHandler({name: value}, invalidField === 'portfolioName')}
                                            disabled={portfolio.type !== 'CreateNew'}
                                            placeholder={'Portfolio Name'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Portfolio Monthly Budget</label>

                                        <InputCurrency
                                            value={portfolio.monthly_recurring_budget}
                                            disabled={portfolio.type !== 'CreateNew'}
                                            onChange={budget => changePortfolioHandler({monthly_recurring_budget: budget})}
                                        />
                                    </div>
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
                            <p className={'description portfolio-p'}>
                                At Profit Whales, we use Portfolios to better organize advertising campaigns for
                                different
                                products so that you can adjust them in the Advertising Console more easily. We highly
                                encourage
                                you to use this option.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="block date-settings">
                    <div className="row title">
                        <h3>Campaign Settings</h3>
                    </div>

                    <div className="row">
                        <div className="col">

                            <div className="row">
                                <div className="form-group mr-20">
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
                        </div>

                        <div className="col">
                            <p className={'description date-p'}>
                                You can use the start date to activate campaigns at a specific time if you need it.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Checkbox
                                checked={campaigns.set_to_paused}
                                onChange={({target: {checked}}) => changeCampaignsHandler({set_to_paused: checked})}
                            >
                                Set campaigns Status to <b>Paused</b> on upload to Amazon
                            </Checkbox>
                        </div>

                        <div className="col">
                            <p className={'description'}>
                                If this option is enabled, Zero to Hero campaigns will be uploaded
                                in <b>Paused</b> Status
                                in case you want to activate them later.
                            </p>
                        </div>
                    </div>

                    <div className="row daily-budget-settings">
                        <div className={`col form-group ${invalidField === 'dailyBudget' ? 'error-field' : ''}`}>
                            <label>ZTH Campaigns Daily Budget</label>

                            <InputCurrency
                                value={campaigns.daily_budget}
                                onChange={daily_budget => changeCampaignsHandler({daily_budget}, invalidField === 'dailyBudget')}
                            />

                            {/*<div className="recommended-budget">*/}
                            {/*    Recommended Daily Budget: <span>$500</span>*/}
                            {/*</div>*/}
                        </div>

                        <div className="col">
                            <p className={'description budget-p'}>
                                Daily budget is used to put a limit on how much you'll spend on this particular product.
                                This amount will be split between the Zero to Hero campaigns.
                            </p>
                        </div>
                    </div>

                    <div className="row default-bid-settings">
                        <div className={`col form-group ${invalidField === 'defaultBid' ? 'error-field' : ''}`}>
                            <label>Default Bid</label>

                            <InputCurrency
                                value={campaigns.default_bid}
                                max={1000}
                                onChange={default_bid => changeCampaignsHandler({default_bid}, invalidField === 'defaultBid')}
                            />
                        </div>

                        <div className="col">
                            <p className={'description bid-p'}>
                                We use this information as the starter point to put the bids on our different campaigns
                                with
                                different objections. Please enter your average bid for the given product.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="block brand-name-setting">
                    <div className="title row">
                        <h3>Brand Settings</h3>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className={`form-group ${invalidField === 'brandName' ? 'error-field' : ''}`}>
                                <label htmlFor="">Your Brand Name</label>
                                <Input
                                    maxLength={80}
                                    placeholder={'Your Brand Name'}
                                    value={brand.name}
                                    onChange={({target: {value}}) => changeBrandHandler({name: value}, invalidField === 'brandName')}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <p className={'description brand-name-p'}>
                                For certain campaigns with the “Brand Defence” goal we need to know your Brand name.
                            </p>
                        </div>
                    </div>

                    <div className="row competitors-brands-name-setting">
                        <div className={`col ${invalidField === 'brandCompetitorsNames' ? 'error-field' : ''}`}>
                            <label>Competitors Brands Names</label>

                            <MultiTextArea
                                unique={true}
                                value={brand.competitor_brand_names}
                                onChange={(competitor_brand_names) => changeBrandHandler({competitor_brand_names}, invalidField === 'brandCompetitorsNames')}
                            />
                        </div>

                        <div className="col">
                            <p className={'description brands-names-p'}>
                                For the campaigns with the “Steal Marketshare” object, we need to know the top 5 or 10
                                of
                                your competitors that you want to steal sales from. We will use this as a starting point
                                to
                                get the brand names of all your competitors.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="block zth-settings">
                    <div className="title">
                        <h3>ZTH Settings</h3>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Checkbox
                                checked={use_existing_ppc_targetings}
                                onChange={({target: {checked}}) => changeProductHandler({use_existing_ppc_targetings: checked})}
                            >
                                Use existing PPC keywords / PTs for ZTH campaigns
                            </Checkbox>
                        </div>

                        <div className="col">
                            <p className={'description'}>
                                If this option is enabled, we will try to find existing keywords / PTs on your account
                                related to your product. These existing targetings will be merged into our Zero to Hero
                                campaigns structure, so you will have everything in one place in Advertising Console. We
                                recommend enabling this option.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Checkbox
                                checked={pause_existing_duplicates_of_zth_targetings}
                                onChange={({target: {checked}}) => changeProductHandler({pause_existing_duplicates_of_zth_targetings: checked})}
                            >
                                Pause existing keywords / PTs that are duplicates of ZTH targetings
                            </Checkbox>
                        </div>

                        <div className="col">
                            <p className={'description'}>
                                If this option is enabled, we will try to find existing keywords / PTs on your account
                                related to your product that are duplicates of targetings we would create in Zero to
                                Hero
                                campaigns on upload to Advertising Console. Such duplicates will be paused to prevent
                                competition between them and new Zero to Hero campaigns. Works best when "Use existing
                                PPC
                                keywords / PTs for ZTH campaigns" is enabled. We recommend enabling this option.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default RequiredSettings