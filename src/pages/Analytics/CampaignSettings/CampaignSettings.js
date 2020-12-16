import React, {useEffect, useState} from "react"
import './CampaignSettings.less'
import {Input, Radio, Switch} from "antd"
import DatePicker from "../../../components/DatePicker/DatePicker"
import InputCurrency from "../../../components/Inputs/InputCurrency"
import {useSelector} from "react-redux"
import {analyticsServices} from "../../../services/analytics.services"
import moment from "moment"
import _ from 'lodash'

const SP = 'SponsoredProducts',
    SB = 'SponsoredBrands',
    SD = 'SponsoredDisplay'

const CampaignSettings = () => {
    const mainState = useSelector(state => state.analytics.mainState)

    const [settingParams, setSettingsParams] = useState({
        servingStatus: '',
        bidding_adjustments_predicate: [],
        bidding_adjustments_percentage: []
    })

    const getSettingsDetails = async () => {
        try {
            const res = await analyticsServices.fetchSettingsDetails('campaigns', mainState.campaignId)
            setSettingsParams({...res.response, id: mainState.campaignId})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (mainState.campaignId) {
            getSettingsDetails()
        }
    }, [mainState])


    return (
        <div className={'campaign-settings-workplace'}>
            <div className="row">
                <div className="label">
                    Campaign Name
                </div>

                <div className="value name">
                    <div className="form-group">
                        <Input
                            disabled
                            placeholder={'Campaign Name'}
                            value={settingParams.name}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Campaign ID
                </div>

                <div className="value">
                    {settingParams.id || '-'}
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Portfolio
                </div>

                <div className="value portfolio">
                    <div className="form-group">
                        {/*<CustomSelect*/}
                        {/*    disabled*/}
                        {/*    placeholder={'Select existing portfolio'}*/}
                        {/*>*/}
                        {/*    <Option value={'1'}>1</Option>*/}
                        {/*</CustomSelect>*/}

                        <Input disabled value={settingParams.portfolioName}/>
                    </div>

                </div>
            </div>

            <div className="row advertising-type">
                <div className="label">
                    Type
                </div>

                <div className="value">
                    {_.lowerCase(settingParams.advertisingType)}
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Status
                </div>

                <div className="value state">
                    {settingParams.state === 'archived' ? <span className={'archived'}>Archived</span> :
                        <div className='switch-block'>
                            <Switch
                                checked={settingParams.state !== 'paused'}
                                disabled
                                // onChange={e => onChangeSwitch('week', e)}
                            />

                            {settingParams.state !== 'paused' ? <span className={'active'}>Active</span> :
                                <span className={'paused'}>Paused</span>}
                        </div>}
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Serving Status
                </div>

                <div className="value status">
                    {_.lowerCase(settingParams.servingStatus)}
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Schedule
                </div>

                <div className="value date">
                    <DatePicker
                        showToday={false}
                        disabled
                        value={settingParams.startDate && moment(settingParams.startDate, 'YYYYMMDD')}
                    />

                    <DatePicker
                        showToday={false}
                        disabled
                        value={settingParams.endDate && moment(settingParams.endDate, 'YYYYMMDD')}
                    />
                </div>
            </div>

            <div className="row">
                <div className="label">
                    Budget
                </div>

                <div className="value budget">
                    <div className="form-group">
                        <InputCurrency
                            disabled
                            value={settingParams.advertisingType === SP ? settingParams.dailyBudget : settingParams.budget}
                        />
                    </div>
                    <span>{settingParams.advertisingType === SP ? 'Daily' : settingParams.budgetType}</span>
                </div>
            </div>

            <div className="row targeting">
                <div className="label">
                    Campaign targeting
                </div>

                <div className="value">
                    {settingParams.advertisingType === SP && <p>{settingParams.targetingType} Targeting</p>}
                    {settingParams.advertisingType === SB && <p>Manual Targeting</p>}
                    {settingParams.advertisingType === SD && <p>{
                        settingParams.tactic === 'remarketing' ? 'Views remarketing (Auto Targeting)' :
                            settingParams.tactic === 'T00020' ? 'Product Targeting (Manual Targeting)' :
                                settingParams.tactic === 'T00030' ? 'Audiences (Manual targeting)' :
                                    'Manual Targeting'
                    }</p>}
                </div>
            </div>

            {settingParams.advertisingType === SP && <>
                <div className="row">
                    <div className="label">
                        Campaign Bidding Strategy
                    </div>

                    <div className="value strategy">
                        <Radio.Group
                            disabled
                            value={settingParams.bidding_strategy}
                        >
                            <div className="col">
                                <Radio value={'legacyForSales'}>
                                    Dynamic bids - down only
                                </Radio>

                                <div className="radio-description down-only">
                                    Amazon will lower your bids in real time when your ad may be less likely to convert
                                    to a
                                    sale. Any campaigns created before January 2019 used this setting.
                                </div>
                            </div>

                            <div className="col">
                                <Radio value={'autoForSales'}>
                                    Dynamic bids - up and down
                                </Radio>

                                <div className="radio-description up-down">
                                    Amazon will raise your bids (by a maximum of 100%) in real time when your ad may be
                                    more
                                    likely to convert to a sale, and lower your bids when less likely to convert to a
                                    sale.
                                </div>
                            </div>

                            <div className="col">
                                <Radio value={'manual'}>
                                    Fixed bids
                                </Radio>

                                <div className="radio-description">
                                    Amazon will use your exact bid and any manual adjustments you set, and won’t change
                                    your
                                    bids based on likelihood of sale.
                                </div>
                            </div>
                        </Radio.Group>

                    </div>
                </div>

                <div className="row">
                    <div className="label">
                        Adjust bids by placements <br/> (replaces Bid+)
                    </div>

                    <div className="value bids">
                        <div className="description">
                            In addition to your bidding strategy, you can increase bids by up to 900%.
                            <a href="#">Learn more</a>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">
                                Top of Search (first page)
                            </label>

                            <InputCurrency
                                disabled
                                typeIcon={'percent'}
                                value={settingParams.bidding_adjustments_predicate.includes('placementTop') ? settingParams.bidding_adjustments_percentage[_.findIndex(settingParams.bidding_adjustments_predicate, 'placementTop')] : undefined}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">
                                Product pages (competitors pages)
                            </label>

                            <InputCurrency
                                disabled
                                typeIcon={'percent'}
                                value={settingParams.bidding_adjustments_predicate.includes('placementProductPage') ? settingParams.bidding_adjustments_percentage[_.findIndex(settingParams.bidding_adjustments_predicate, 'placementProductPage')] : undefined}
                            />
                        </div>
                    </div>
                </div>
            </>}


            {/*<div className="actions">*/}
            {/*    <button className="btn white">Cancel</button>*/}
            {/*    <button className="btn default">Save Changes</button>*/}
            {/*</div>*/}
        </div>
    )
}

export default CampaignSettings
