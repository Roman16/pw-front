import React from "react"
import {Radio} from "antd"
import KeywordsList from "../../Targetings/CreateTargetingsWindow/KeywordsList"
import TargetsList from "../../Targetings/CreateTargetingsWindow/TargetsList"

export const NegativeTargetingsDetails = ({createData, onChange, disabled, onValidate}) => {

    return(<div className={'targetings-details-step'}>
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

        {createData.targetingType === 'keywords' ? <KeywordsList
            createData={createData}
            targetingType={createData.targetingType}
            keywords={createData.keywords}
            onUpdate={(value) => onChange({keywords: value})}
            onValidate={onValidate}
            disabled={disabled}
        /> : <TargetsList
            createData={createData}
            targetingType={createData.targetingType}
            keywords={createData.targets}
            onUpdate={(value) => onChange({targets: value})}
            onValidate={onValidate}
            disabled={disabled}
        />}

    </div>)
}