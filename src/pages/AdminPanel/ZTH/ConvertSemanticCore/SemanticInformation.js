import React from "react"
import {Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const SemanticInformation = ({semantic = {}}) => {

    return(
        <div className="core-information">
            <br/>
            <br/>

            <h2>Semantic Core Information</h2>

            <div className="row">Template version: <b>{semantic.markupVersion}</b></div>
            <br/>
            <div className="row">Zero to Hero version used: <b>{semantic.zeroToHeroVersion}</b></div>
            <br/>
            <div className="form-group product-name">
                <label>Product name:</label>
                <Input
                    placeholder="Enter product name"
                    id="{{'product-name-' + sheetData.id}}"
                    type="text"
                    className="form-control"
                    value={semantic.productName}
                />
            </div>

            <div className="form-group campaign-strategy">
                <label htmlFor="campaignsCompressionStrategy">Choose campaign compression strategy:</label>

                <CustomSelect className="form-control" value={semantic.campaignsCompressionStrategy}>
                    <Option value={'Wide'}>Wide</Option>
                    <Option value={'Simple'}>Simple</Option>
                    <Option value={'Compact'}>Compact</Option>
                </CustomSelect>
            </div>
        </div>

    )
}

export default SemanticInformation
