import React from "react"
import {Radio} from "antd"
import {MultiTextarea} from "./MultiTextarea"

export const NegativeTargetingsDetails = ({createData, onChange, disabled}) => {

    return (<div className={'targetings-details-step'}>
        <div className={`row `}>
            <div className="col">
                <Radio.Group
                    value={createData.targetingType}
                    disabled={createData.disabledTargetingType}
                    onChange={({target: {value}}) => onChange({targetingType: value})}
                >
                    <h4>Targeting type</h4>
                    <p className={'block-description'}>
                        Can't be changed since ad group already
                        has {createData.targetingType === 'keywords' ? 'keyword' : 'product'} targetings
                    </p>

                    <Radio value={'keywords'}>
                        Keyword Targeting
                    </Radio>
                    <div className="radio-description">
                        Choose keywords to help your products appear in shopper searches.
                    </div>

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

        {createData.targetingType === 'keywords' ? <>
            <div className={`negative-keywords keyword-targetings ${disabled ? 'disabled' : ''}`}>
                <div className="bid-block">
                    <h3>Negative Keywords</h3>
                </div>

                <MultiTextarea
                    keywords={createData.negativeKeywords}
                    keywordTypeEnums={[{
                        key: 'broad',
                        name: 'Broad'
                    },
                        {
                            key: 'phrase',
                            name: 'Phrase'
                        },
                        {
                            key: 'exact',
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
                    keywordTypeEnums={[{
                        key: 'broad',
                        name: 'Broad'
                    },
                        {
                            key: 'phrase',
                            name: 'Phrase'
                        },
                        {
                            key: 'exact',
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
    </div>)
}