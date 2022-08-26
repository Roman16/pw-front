import React from "react"
import {NavigationButtons} from "../SelectProduct/SelectProduct"
import './Step2.less'
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Checkbox, Radio} from "antd"
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
                    <p>
                        In this step Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh donec sed egestas
                        faucibus.
                    </p>
                </div>

                <div className={`col form-group ${invalidField.includes('daily_budget') ? 'error-field' : ''}`}>
                    <label>
                        ZTH Campaigns Daily Budget
                        <InformationTooltip
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

                <br/>

                <div className={`col form-group ${invalidField.includes('default_bid') ? 'error-field' : ''}`}>
                    <label>
                        Default Bid

                        <InformationTooltip
                            description={`We use this information as the starter point to put the bids on our different campaigns with different objections. Please enter your average bid for the given product.`}
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
                <br/>

                <div className="col form-group radio">
                    <label htmlFor="">
                        Set campaigns status to Paused on upload
                        <InformationTooltip
                            description={`If this option is enabled, Zero to Hero campaigns will be uploaded in <b>Paused</b> Status in case you want to activate them later.`}/>
                    </label>
                    <Radio.Group
                        value={campaigns.set_to_paused}
                        onChange={({target: {value}}) => changeCampaignsHandler({set_to_paused: value})}
                    >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </div>

                <br/>

                <div className="col form-group radio">
                    <label htmlFor="">
                        Pause existing keywords / PTs that are duplicates of ZTH targetings
                        <InformationTooltip
                            description={'If this option is enabled, we will try to find existing keywords / PTs on your account related to your product that are duplicates of targetings we would create in Zero to Hero\n' +
                            '                                    campaigns on upload to Advertising Console. Such duplicates will be paused to prevent competition between them and new Zero to Hero campaigns. Works best when "Use\n' +
                            '                                    existing PPC keywords / PTs for ZTH campaigns" is enabled. We recommend enabling this option.'}/>
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