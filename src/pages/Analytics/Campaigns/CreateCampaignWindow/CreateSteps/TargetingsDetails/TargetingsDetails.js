import React from "react"
import {Radio, Switch} from "antd"
import InputCurrency from "../../../../../../components/Inputs/InputCurrency"
import './TargetingsDetails.less'
import NegativeKeywords from "./NegativeKeywords"
import NegativePats from "./NegativePats"
import KeywordTargetingsList from "./KeywordTargetingsList"

const TargetingsDetails = ({campaignData, onChange}) => {

    const disabledBlock = !campaignData.create_targetings

    if (campaignData.targetings_type === 'automatic_targeting') {
        return (<div className={'step step-4 targetings-details-step'}>
            <div className="row">
                <div className="col">
                    <Radio.Group value={campaignData.create_targetings}
                                 onChange={({target: {value}}) => onChange({create_targetings: value})}>
                        <h4>Targetings</h4>

                        <Radio value={true}>
                            Create Targetings
                        </Radio>

                        <Radio value={false}>
                            Do not create Targetings
                        </Radio>
                    </Radio.Group>
                </div>
            </div>

            <div className={`row ${disabledBlock ? 'disabled' : ''}`}>
                <div className="col">
                    <h3>Title</h3>

                    <div className="switch-table">
                        <div className="row header">
                            <div>Targeting Groups</div>
                            <div>Bid</div>
                        </div>
                        <div className="row">
                            <div className={'switch-block'}>
                                <Switch
                                    checked={campaignData.enabled_target_close_match}
                                    onChange={(value) => onChange({enabled_target_close_match: value})}
                                    disabled={disabledBlock}
                                />
                                Close match
                            </div>

                            <div className={'form-group'}>
                                <InputCurrency
                                    step={0.01}
                                    disabled={disabledBlock || !campaignData.enabled_target_close_match}
                                    value={campaignData.target_close_match}
                                    onChange={value => onChange({target_close_match: value})}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <Switch
                                    checked={campaignData.enabled_target_loose_match}
                                    onChange={(value) => onChange({enabled_target_loose_match: value})}
                                    disabled={disabledBlock}
                                />
                                Loose match
                            </div>
                            <div className={'form-group'}>
                                <InputCurrency
                                    step={0.01}
                                    disabled={disabledBlock || !campaignData.enabled_target_loose_match}
                                    value={campaignData.target_loose_match}
                                    onChange={value => onChange({target_loose_match: value})}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <Switch
                                    checked={campaignData.enabled_target_substitutes}
                                    onChange={(value) => onChange({enabled_target_substitutes: value})}
                                    disabled={disabledBlock}
                                />
                                Substitutes
                            </div>

                            <div className={'form-group'}>
                                <InputCurrency
                                    step={0.01}
                                    disabled={disabledBlock || !campaignData.enabled_target_substitutes}
                                    value={campaignData.target_substitutes}
                                    onChange={value => onChange({target_substitutes: value})}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <Switch
                                    checked={campaignData.enabled_target_complements}
                                    onChange={(value) => onChange({enabled_target_complements: value})}
                                    disabled={disabledBlock}
                                />
                                Complements
                            </div>

                            <div className={'form-group'}>
                                <InputCurrency
                                    step={0.01}
                                    disabled={disabledBlock || !campaignData.enabled_target_complements}
                                    value={campaignData.target_complements}
                                    onChange={value => onChange({target_complements: value})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                    consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                    massa
                    faucibus blandit justo. Sed et orci tortor pellentesque sed
                </div>
            </div>

            <NegativeKeywords
                disabled={disabledBlock}
                keywords={campaignData.negative_keywords}
                onUpdate={onChange}
                title={'Negative Keywords'}
            />

            <NegativePats
                disabled={disabledBlock}
                keywords={campaignData.negative_pats}
                onUpdate={onChange}
            />
        </div>)
    } else if (campaignData.targetings_type === 'manual_targeting') {
        return (<div className={'step step-4 targetings-details-step'}>
            <div className="row">
                <div className="col">
                    <Radio.Group
                        value={campaignData.create_targetings}
                        onChange={({target: {value}}) => onChange({create_targetings: value})}
                    >
                        <h4>Targetings</h4>

                        <Radio value={true}>
                            Create Targetings
                        </Radio>

                        <Radio value={false}>
                            Do not create Targetings
                        </Radio>
                    </Radio.Group>
                </div>
            </div>

            <div className={`row ${disabledBlock ? 'disabled' : ''}`}>
                <div className="col">
                    <Radio.Group
                        value={campaignData.t_targeting_type}
                        onChange={({target: {value}}) => onChange({t_targeting_type: value})}
                    >
                        <h4>Targeting type</h4>

                        <Radio value={'keyword'}>
                            Keyword Targeting
                        </Radio>
                        <div className="radio-description">
                            Choose keywords to help your products appear in shopper searches.
                        </div>

                        <Radio value={'product'}>
                            Product Targeting
                        </Radio>

                        <div className="radio-description">
                            Choose specific products, categories, brands, or other product features to target your ads.
                        </div>
                    </Radio.Group>

                    <div className="bid-block">
                        <h3>Keyword targeting</h3>

                        <div className="form-group row">
                            <label htmlFor="">Bid</label>
                            <InputCurrency/>
                        </div>
                    </div>
                </div>

                <div className="col description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                    consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam
                    massa
                    faucibus blandit justo. Sed et orci tortor pellentesque sed
                </div>
            </div>

            <KeywordTargetingsList
                disabled={disabledBlock}
                keywords={campaignData.keyword_targetings}
                onUpdate={onChange}
                withMatchType={campaignData.t_targeting_type === 'keyword'}
            />

            <NegativeKeywords
                disabled={disabledBlock}
                keywords={campaignData.negative_keywords}
                onUpdate={onChange}
                withMatchType={campaignData.t_targeting_type === 'keyword'}
                title={'Negative Keyword Targeting'}
            />
        </div>)
    }
}

export default TargetingsDetails
