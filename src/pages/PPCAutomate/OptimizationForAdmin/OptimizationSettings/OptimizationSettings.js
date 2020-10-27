import React from "react"
import './OptimizationSettings.less'
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"

const Option = Select.Option

const OptimizationSettings = () => {

    return (
        <section className={'optimization-settings-section'}>
            <div className="section-header">
                <h2>Settings</h2>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Choose Strategy</div>

                    <CustomSelect>
                        <Option value={1}>1</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <div className="label">Min Bid (Manual Campaign)</div>

                    <InputCurrency/>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Enter your target ACoS</div>

                    <InputCurrency typeIcon={'percent'}/>

                    <h4>
                        Only for ACoS Targeting Strategy
                    </h4>
                </div>

                <div className="form-group">
                    <div className="label">Max Bid (Manual Campaign)</div>

                    <InputCurrency/>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Net Margin</div>

                    <InputCurrency typeIcon={'percent'}/>
                </div>

                <div className="form-group">
                    <div className="label">Min Bid (Auto Campaign)</div>

                    <InputCurrency/>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Product Price</div>

                    <p className={'product-price'}>$200.00 (retrieved from Amazon)</p>
                </div>

                <div className="form-group">
                    <div className="label">Min Bid (Auto Campaign)</div>

                    <InputCurrency/>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Overwrite Product Price</div>

                    <InputCurrency/>
                </div>
            </div>

        </section>
    )
}

export default OptimizationSettings
