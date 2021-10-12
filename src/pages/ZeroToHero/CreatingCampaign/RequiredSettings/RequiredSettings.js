import React, {useEffect, useState} from "react"
import MultiTextArea from "../../components/MultiTextArea/MultiTextArea"
import {Checkbox, Input, Radio, Select, Spin} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import CustomSelect from "../../../../components/Select/Select"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import moment from "moment"
import './RequiredSettings.less'
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {zthServices} from "../../../../services/zth.services"
import {
    disabledEndDate,
    disabledStartDate
} from "../../../Analytics/Campaigns/CreateCampaignWindow/CreateSteps/CampaignDetails"
import axios from "axios"
import _ from 'lodash'

const Option = Select.Option

const CancelToken = axios.CancelToken
let source = null

let prevCheckKeywords = []


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

    const [keysCountProcessing, setKeysCountProcessing] = useState(false),
        [keywordEstimations, setKeywordEstimations] = useState(0),
        [mainKeywords, setMainKeywords] = useState([])

    const changeProductHandler = (value, isInvalid) => {
        onUpdate({
            ...value
        }, isInvalid)
    }

    const changePortfolioHandler = (value, isInvalid) => {
        onUpdate({
            portfolio: {
                ...portfolio,
                ...value,
                ...value.id ? {selectName: portfolioList.find(i => i.id === value.id).name} : {}
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

    const changeMainKeywordsHandler = (list) => {
        onUpdate({
            campaigns: {
                ...campaigns,
                main_keywords: list
            }
        }, 'mainKeywords')


        mainKeywords.forEach(i => {
            if (_.find(list, {value: i.value})) {

            } else {
                i.cancel.cancel()
            }
        })

        setMainKeywords(list.map(i => {
            if (!i.isDuplicate) {
                i.cancel = CancelToken.source()
            }

            return i
        }))
    }

    const getKeysEstimation = async (item) => {
        setKeysCountProcessing(true)

        try {
            zthServices.getKeysCount([item.value], item.cancel.token)
                .then(({result}) => {
                    setKeywordEstimations(result.keywordEstimations)
                })
        } catch (e) {

        }

        setKeysCountProcessing(false)

    }

    const changeDateHandler = (type, date) => {
        changeCampaignsHandler({
            [`${type}_date`]: date ? moment.tz(`${moment(date).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString() : null,
        })
    }

    useEffect(() => {
        mainKeywords.forEach((i) => {
            getKeysEstimation(i)
        })
    }, [mainKeywords])

    return (
        <section className={`step required-setting`}>
            <div className="bg-container">
                <div className="container">
                    <div className="block main-keywords-setting">
                        <div className="row">
                            <div className={`col ${invalidField === 'mainKeywords' ? 'error-field' : ''}`}>
                                <h3 className={'required'}>Seed Keywords <i>*</i></h3>
                                <p>Please add a minimum of 3 Seed Keywords that customers use to find your Product</p>

                                <MultiTextArea
                                    value={campaigns.main_keywords}
                                    onChange={changeMainKeywordsHandler}
                                    max={5}
                                    toMark={true}
                                    productName={name}
                                    unique={true}
                                />

                                <p>Estimated keywords count for campaigns:
                                    {keysCountProcessing ? <Spin size={'small'}/> : keywordEstimations === 0 ?
                                        <InformationTooltip
                                            type={'custom'}
                                            description={'Add Seed Keywords to get an estimated amount of keywords that your campaigns will have.'}>
                                            <span>0</span>
                                        </InformationTooltip>
                                        :
                                        <InformationTooltip
                                            type={'custom'}
                                            overlayClassName={'estimate-description'}
                                            description={<div className={''}>
                                                This is an estimated amount of keywords we will be able to gather based
                                                on provided Seed Keywords. Contributions by each keyword:

                                                <ul>
                                                    {keywordEstimations.map(i => (
                                                        <li>
                                                            <span>{i.keywordText}</span>: {i.lowResultsCountRounded} - {i.highResultsCountRounded}
                                                        </li>))}
                                                </ul>

                                                Note that amount of keywords for product will be capped at 5000 to
                                                prevent overextension on campaigns with low-performing keywords.
                                            </div>}>
                                            <span>{keywordEstimations.reduce((sum, currentValue) => sum + currentValue.lowResultsCountRounded, 0) > 2500 ? '2500' : keywordEstimations.reduce((sum, currentValue) => sum + currentValue.lowResultsCountRounded, 0)} - {keywordEstimations.reduce((sum, currentValue) => sum + currentValue.highResultsCountRounded, 0) > 5000 ? '5000' : keywordEstimations.reduce((sum, currentValue) => sum + currentValue.highResultsCountRounded, 0)}</span>
                                        </InformationTooltip>}
                                </p>
                            </div>

                            <div className="col">
                                <p className={'description keywords-p'}>
                                    That’s the most critical part of creating Zero to Hero campaigns for your product.
                                    You
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
                                <h3 className={'required'}>Portfolio Settings <i>*</i></h3>

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
                                    products so that you can adjust them in the Advertising Console more easily. We
                                    highly
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
                                        <label htmlFor="" className={'required'}>Start <i>*</i></label>

                                        <DatePicker
                                            showToday={false}
                                            format="MMM DD, YYYY"
                                            value={moment(campaigns.start_date)}
                                            onChange={(date) => changeDateHandler('start', date)}
                                            allowClear={false}
                                            disabledDate={(data) => disabledStartDate(moment(data).endOf('day').add(1, 'd'), campaigns.end_date && moment(campaigns.end_date).endOf('day').add(1, 'd'))}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">End</label>
                                        <DatePicker
                                            showToday={false}
                                            format="MMM DD, YYYY"
                                            value={campaigns.end_date ? moment(campaigns.end_date) : undefined}
                                            onChange={(date) => changeDateHandler('end', date)}
                                            disabledDate={data => disabledEndDate(moment(data).endOf('day').add(1, 'd'), campaigns.start_date)}
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
                                <label className={'required'}>ZTH Campaigns Daily Budget <i>*</i></label>

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
                                    Daily budget is used to put a limit on how much you'll spend on this particular
                                    product.
                                    This amount will be split between the Zero to Hero campaigns.
                                </p>
                            </div>
                        </div>

                        <div className="row default-bid-settings">
                            <div className={`col form-group ${invalidField === 'defaultBid' ? 'error-field' : ''}`}>
                                <label className={'required'}>Default Bid <i>*</i></label>

                                <InputCurrency
                                    value={campaigns.default_bid}
                                    max={1000}
                                    onChange={default_bid => changeCampaignsHandler({default_bid}, invalidField === 'defaultBid')}
                                />
                            </div>

                            <div className="col">
                                <p className={'description bid-p'}>
                                    We use this information as the starter point to put the bids on our different
                                    campaigns
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
                                    <label htmlFor="" className={'required'}>Your Brand Name <i>*</i></label>
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
                                    For the campaigns with the “Steal Marketshare” object, we need to know the top 5 or
                                    10
                                    of
                                    your competitors that you want to steal sales from. We will use this as a starting
                                    point
                                    to
                                    get the brand names of all your competitors.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="block required-zth-settings">
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
                                    If this option is enabled, we will try to find existing keywords / PTs on your
                                    account
                                    related to your product. These existing targetings will be merged into our Zero to
                                    Hero
                                    campaigns structure, so you will have everything in one place in Advertising
                                    Console. We
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
                                    If this option is enabled, we will try to find existing keywords / PTs on your
                                    account
                                    related to your product that are duplicates of targetings we would create in Zero to
                                    Hero
                                    campaigns on upload to Advertising Console. Such duplicates will be paused to
                                    prevent
                                    competition between them and new Zero to Hero campaigns. Works best when "Use
                                    existing
                                    PPC
                                    keywords / PTs for ZTH campaigns" is enabled. We recommend enabling this option.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default RequiredSettings