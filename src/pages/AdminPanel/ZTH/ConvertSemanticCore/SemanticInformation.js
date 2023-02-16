import React, {useEffect, useState} from "react"
import {Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const SemanticInformation = ({semanticInfo = {}, semanticData = {}, onChange, campaignsCompressionStrategyEnums}) => {
    const [productName, setProductName] = useState(semanticData.conversionOptions.productInformation.productName),
        [campaignsCompressionStrategy, setCampaignsCompressionStrategy] = useState(semanticData.conversionOptions.zeroToHero.campaignsCompressionStrategy)

    useEffect(() => {
        onChange({
            ...semanticData,
            conversionOptions: {
                ...semanticData.conversionOptions,
                productInformation: {
                    ...semanticData.conversionOptions.productInformation,
                    productName
                },
                zeroToHero: {
                    ...semanticData.conversionOptions.zeroToHero,
                    campaignsCompressionStrategy
                }
            }
        })

    }, [productName, campaignsCompressionStrategy])

    return (
        <div className="core-information">
            <br/>
            <br/>
            <h2>Semantic Core Information</h2>

            <div>Template version: <b>{`  ${semanticInfo.markupVersion}`}</b></div>
            <br/>
            <div>Zero to Hero version used: <b>{`  ${semanticInfo.zeroToHeroVersion}`}</b></div>
            <br/>

            <div className="form-group product-name">
                <label>Product name:</label>
                <Input
                    placeholder="Enter product name"
                    id="{{'product-name-' + sheetData.id}}"
                    type="text"
                    className="form-control"
                    value={productName}
                    onChange={({target: {value}}) => setProductName(value)}
                />
            </div>

            <div className="form-group campaign-strategy">
                <label htmlFor="campaignsCompressionStrategy">Choose campaign compression strategy:</label>

                <CustomSelect
                    className="form-control"
                    value={campaignsCompressionStrategy}
                    onChange={value => setCampaignsCompressionStrategy(value)}
                    getPopupContainer={trigger => trigger}
                >
                    {campaignsCompressionStrategyEnums.map(item => (
                        <Option value={item}>{item}</Option>
                    ))}
                </CustomSelect>
            </div>
        </div>

    )
}

export default React.memo(SemanticInformation)
