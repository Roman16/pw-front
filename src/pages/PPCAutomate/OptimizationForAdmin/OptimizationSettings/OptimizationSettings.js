import React from "react"
import './OptimizationSettings.less'
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import acosTargetingImage from "../../../../assets/img/optimization/acos-targeting.png"
import productLaunchImage from "../../../../assets/img/optimization/product-launch.png"
import organicSalesGrowthImage from "../../../../assets/img/optimization/organic-sales-growth.png"
import revenueGrowthImage from "../../../../assets/img/optimization/revenue-growth.png"
import profitablePpcImage from "../../../../assets/img/optimization/profitable-ppc.png"

const Option = Select.Option

const strategies = [
    {
        name: 'ACoS Targeting',
        key: 'AchieveTargetACoS',
    },
    {
        name: 'Product Launch',
        key: 'LaunchProduct',
    },
    {
        name: 'Organic Sales Growth',
        key: 'BoostOverallProfit',
    },
    {
        name: 'Revenue Growth',
        key: 'GrowOverallSales',
    },
    {
        name: 'Profitable PPC',
        key: 'BoostPPCProfit',
    },
]


const OptimizationSettings = ({product, ifDisabled, onUpdateField}) => {
    console.log(product)

    return (
        <section className={'optimization-settings-section'}>
            <div className="section-header">
                <h2>Settings</h2>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">
                        Choose Strategy
                        <a>Read more</a>
                    </div>

                    <CustomSelect value={product.optimization_strategy} onChange={(value) => onUpdateField('optimization_strategy', value)}>
                        <Option value={null}>Choose Strategy</Option>
                        {strategies.map(item => (
                            <Option value={item.key}>{item.name}</Option>
                        ))}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <div className="label">Min Bid (Manual Campaign)</div>

                    <InputCurrency
                        disabled={ifDisabled}
                        value={product.min_manual_bid}
                    />
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Enter your target ACoS</div>

                    <InputCurrency
                        value={product.desired_target_acos}
                        typeIcon={'percent'}
                        disabled={product.optimization_strategy !== 'AchieveTargetACoS'}
                    />

                    <h4>
                        Only for ACoS Targeting Strategy
                    </h4>
                </div>

                <div className="form-group">
                    <div className="label">Max Bid (Manual Campaign)</div>

                    <InputCurrency
                        disabled={ifDisabled}
                        value={product.max_manual_bid}
                    />
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Net Margin</div>

                    <InputCurrency
                        typeIcon={'percent'}
                        value={product.product_margin_value}
                        disabled={ifDisabled}
                    />
                </div>

                <div className="form-group">
                    <div className="label">Min Bid (Auto Campaign)</div>

                    <InputCurrency
                        disabled={ifDisabled}
                        value={product.min_auto_bid}
                    />
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Product Price</div>

                    <p className={'product-price'}>{product.item_price && `$${product.item_price} `}(retrieved from
                        Amazon)</p>
                </div>

                <div className="form-group">
                    <div className="label">Max Bid (Auto Campaign)</div>

                    <InputCurrency
                        disabled={ifDisabled}
                        value={product.max_auto_bid}
                    />
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="label">Overwrite Product Price</div>

                    <InputCurrency
                        value={product.item_price_from_user}
                        disabled={ifDisabled}
                    />
                </div>
                <div className="form-group">

                </div>
            </div>

        </section>
    )
}

export default OptimizationSettings
