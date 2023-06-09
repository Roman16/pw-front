import React, {useEffect, useState} from "react"
import {Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const SemanticInformation = ({semanticInfo, semanticData,allEnums, onChange, campaignsCompressionStrategyEnums}) => {
    const changeTextFieldHandler = (data) => onChange({
        ...semanticData,
        conversionOptions: {
            ...semanticData.conversionOptions,
            productInformation: {
                ...semanticData.conversionOptions.productInformation,
                ...data
            }
        }
    })

    const changeSelectFieldsHandler = (data) => onChange({
        ...semanticData,
        conversionOptions: {
            ...semanticData.conversionOptions,
            zeroToHero: {
                ...semanticData.conversionOptions.zeroToHero,
                ...data
            }
        }
    })

    return (
        <div className="core-information">
            <h2>Semantic Core Information</h2>

            <div>Template version: <b>{`  ${semanticInfo.markupVersion}`}</b></div>
            <br/>
            <div>Zero to Hero version used: <b>{`  ${semanticInfo.zeroToHeroVersion}`}</b></div>
            <br/>

            <div className="row cols-4">
                <div className="form-group">
                    <label>Main product name:</label>
                    <Input
                        placeholder="Enter product name"
                        value={semanticData.conversionOptions.productInformation.mainProductName}
                        onChange={({target: {value}}) => changeTextFieldHandler({mainProductName: value})}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Main product ASIN:</label>
                    <Input
                        type="text"
                        value={semanticData.conversionOptions.productInformation.mainProductAsin}
                        onChange={({target: {value}}) => changeTextFieldHandler({mainProductAsin: value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Main product SKU:</label>
                    <Input
                        type="text"
                        value={semanticData.conversionOptions.productInformation.mainProductSku}
                        onChange={({target: {value}}) => changeTextFieldHandler({mainProductSku: value})}
                    />
                </div>
            </div>

            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Choose campaign name generation strategy:</label>
                    <CustomSelect
                        value={semanticData.conversionOptions.zeroToHero.campaignNameGenerationStrategyType}
                        onChange={campaignNameGenerationStrategyType => changeSelectFieldsHandler({campaignNameGenerationStrategyType})}
                    >
                        {allEnums.enums.CampaignNameGenerationStrategyType.map(type => (
                            <Option value={type}>
                                {type}
                            </Option>
                        ))}
                    </CustomSelect>
                </div>
            </div>


            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="campaignsCompressionStrategy">Choose campaign compression strategy:</label>
                    <CustomSelect
                        className="form-control"
                        value={semanticData.conversionOptions.zeroToHero.campaignsCompressionStrategy}
                        onChange={(campaignsCompressionStrategy) => changeSelectFieldsHandler({campaignsCompressionStrategy})}
                        getPopupContainer={trigger => trigger}
                    >
                        {allEnums.enums.CampaignsCompressionStrategy.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </CustomSelect>
                </div>
            </div>
        </div>

    )
}

export default React.memo(SemanticInformation)
