import React from "react"
import {Radio} from "antd"
import {MultiTextarea} from "./MultiTextarea"

export const NegativeTargetingsDetails = ({createData, onChange, disabled}) =>
    <div className={'targetings-details-step'}>
        <div className={`row `}>
            <div className="col">
                <Radio.Group
                    value={createData.negativeTargetingType}
                    disabled={createData.disabledNegativeTargetingType || disabled}
                    className={'targeting-type-radio'}
                    onChange={({target: {value}}) => onChange({negativeTargetingType: value})}
                >
                    <h4>Targeting type</h4>
                    <p className={'block-description'}>
                        Can't be changed since ad group already
                        has {createData.negativeTargetingType === 'keywords' ? 'keyword' : 'product'} targetings
                    </p>

                    <Radio value={'keywords'}>
                        Keyword Targeting
                    </Radio>
                    <div className="radio-description">
                        Choose keywords to help your products appear in shopper searches.
                    </div>
                    <br/>
                    <Radio value={'targets'}>
                        Product Targeting
                    </Radio>

                    <div className="radio-description">
                        Choose specific products, categories, brands, or other product features to target your ads.
                    </div>
                </Radio.Group>
            </div>

            <div className="col description">

            </div>
        </div>

        {createData.negativeTargetingType === 'keywords' ? <>
            <div className={`negative-keywords keyword-targetings ${disabled ? 'disabled' : ''}`}>
                <div className="bid-block">
                    <h3>Negative Keywords</h3>
                </div>

                <MultiTextarea
                    keywords={createData.negativeKeywords}
                    disabled={disabled}
                    keywordTypeEnums={[
                        {
                            key: 'negativePhrase',
                            name: 'Phrase'
                        },
                        {
                            key: 'negativeExact',
                            name: 'Exact'
                        }
                    ]}
                    onChange={(arr) => onChange({negativeKeywords: arr})}
                />
            </div>
            <br/>
            <div className={`negative-keywords keyword-targetings ${disabled ? 'disabled' : ''}`}>
                <div className="bid-block">
                    <h3>Negative Campaign Keywords</h3>
                </div>

                <MultiTextarea
                    keywords={createData.negativeCampaignKeywords}
                    disabled={disabled}
                    keywordTypeEnums={[
                        {
                            key: 'negativePhrase',
                            name: 'Phrase'
                        },
                        {
                            key: 'negativeExact',
                            name: 'Exact'
                        }
                    ]}
                    onChange={(arr) => onChange({negativeCampaignKeywords: arr})}
                />
            </div>
        </> : <>
            <div className={`negative-keywords keyword-targetings ${disabled ? 'disabled' : ''}`}>
                <div className="bid-block">
                    <h3>Negative Targetings</h3>
                </div>

                <MultiTextarea
                    keywords={createData.negativeTargets}
                    disabled={disabled}
                    keywordTypeEnums={[{
                        key: 'asins',
                        name: 'ASINs'
                    },
                        {
                            key: 'categories',
                            name: 'Categories'
                        },
                    ]}
                    onChange={(arr) => onChange({negativeTargets: arr})}
                />
            </div>
            <br/>
            <div className={`negative-keywords keyword-targetings ${disabled ? 'disabled' : ''}`}>
                <div className="bid-block">
                    <h3>Negative Campaign Targetings</h3>
                </div>

                <MultiTextarea
                    keywords={createData.negativeCampaignTargets}
                    disabled={disabled}
                    keywordTypeEnums={[{
                        key: 'asins',
                        name: 'ASINs'
                    },
                        {
                            key: 'categories',
                            name: 'Categories'
                        },
                    ]}
                    onChange={(arr) => onChange({negativeCampaignTargets: arr})}
                />
            </div>
        </>}
    </div>