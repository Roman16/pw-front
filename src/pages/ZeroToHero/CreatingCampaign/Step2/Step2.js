import React from "react"
import {NavigationButtons} from "../SelectProduct/SelectProduct"
import './Step2.less'
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import { Radio} from "antd"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"


export const Step2 = ({
                          visible,
                          invalidField,
                          product: {
                              campaigns,
                              pause_existing_duplicates_of_zth_targetings,
                          },

                          onChangeStep,
                          onUpdate,
                          onUpdateInvalidFields,

                      }) => {

    const changeCampaignsHandler = (value, isInvalid) => {
        onUpdateInvalidFields([...invalidField.filter(i => !Object.keys(value).includes(i))])

        onUpdate({
            campaigns: {
                ...campaigns,
                ...value
            }
        }, isInvalid)
    }

    const changeProductHandler = (value, isInvalid) => {
        onUpdate({
            ...value
        }, isInvalid)
    }


    return (<section className={`step step-2 ${visible ? 'visible' : ''}`}>
        <div className="bg-container">
            <div className="container">
                <div className="section-header">
                    <div className="step-count">Step 3/6</div>
                    <h2>Campaigns Settings</h2>
                </div>

                <div className={`col form-group  edit-block daily_budget`}>
                    <label>
                        Target Campaigns Daily Budget

                        <InformationTooltip
                            type={'new-info'}
                            description={` Daily budget is used to put a limit on how much you'll spend on this particular product. This amount will be split between the Zero to Hero campaigns.`}
                        />
                    </label>

                    <InputCurrency
                        value={campaigns.daily_budget}
                        placeholder={0}
                        onChange={daily_budget => changeCampaignsHandler({daily_budget}, invalidField === 'dailyBudget')}
                    />

                    {invalidField.includes('daily_budget') && <p className={'error-description'}>
                        {campaigns.daily_budget < 1 ? 'Daily budget should be greater than or equal to $1.00' : 'Daily budget should be less than or equal to $1000000.00'}
                    </p>}
                </div>

                <div className={`col form-group edit-block default_bid`}>
                    <label>
                        Starting Bid

                        <InformationTooltip
                            type={'new-info'}
                            description={`Please enter an average bid used to advertise this product or average bid for a niche.
<br/><br/>
This bid will be used as a baseline for targetings in Zero to Hero campaigns. Some targetings will have lower or a bit higher bids than the one you provided, based on the goal of each campaign.`}
                        />
                    </label>

                    <InputCurrency
                        value={campaigns.default_bid}
                        placeholder={0}
                        onChange={default_bid => changeCampaignsHandler({default_bid}, invalidField === 'defaultBid')}
                    />

                    {invalidField.includes('default_bid') && <p className={'error-description'}>
                        {campaigns.default_bid < 0.02 ? 'Bid should be greater than or equal to $0.02' : 'Bid should be less than or equal to $1000.00'}
                    </p>}
                </div>

                <div className="col form-group radio edit-block set_to_paused">
                    <label htmlFor="">
                        Enable campaigns after upload

                        <InformationTooltip
                            type={'new-info'}
                            description={`If this option is set to "Yes", Zero to Hero campaigns will be uploaded to your Amazon Account in <b>Enabled</b> Status and will begin working immediately.`}/>
                    </label>

                    <Radio.Group
                        value={campaigns.set_to_paused}
                        onChange={({target: {value}}) => changeCampaignsHandler({set_to_paused: value})}
                    >
                        <Radio value={false}>Yes</Radio>
                        <Radio value={true}>No</Radio>
                    </Radio.Group>
                </div>

                <div className="col form-group radio edit-block pause_existing_duplicates_of_zth_targetings">
                    <label htmlFor="">
                        Pause existing keywords / PTs that are duplicates of ZTH targetings
                        <InformationTooltip
                            type={'new-info'}
                            description={`If this option is set to "Yes", then when uploading Zero to Hero campaigns to your Advertising Console we will pause your existing keywords / PTs that are advertising this product and are duplicates of keywords / PTs in Zero to Hero campaigns.<br/><br/>Those duplicates should be paused to prevent competition between them and your new Zero to Hero advertising campaigns. We recommend leaving this option at "Yes".`}/>
                    </label>

                    <Radio.Group
                        value={pause_existing_duplicates_of_zth_targetings}
                        onChange={({target: {value}}) => changeProductHandler({pause_existing_duplicates_of_zth_targetings: value})}
                    >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </div>

                <NavigationButtons
                    onNextStep={() => onChangeStep(3)}
                    onPrevStep={() => onChangeStep(1)}
                    disabled={!campaigns.daily_budget || !campaigns.default_bid}
                />
            </div>

            <div className="progress-bar">
                <div/>
            </div>
        </div>
    </section>)
}