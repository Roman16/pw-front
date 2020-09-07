import React from "react"
import './ProductSettings.less'
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Radio} from "antd"

const ProductSettings = () => {

    return (
        <section className="product-settings">
            <div className="col">
                <h2>Product Settings</h2>
                <p className="note">Note: We recommend use Dinamic Bids - Down only</p>

                <div className="description">
                    <h3>
                        Adjust bids placement (replaces Bid+)
                    </h3>
                    <p>In addition to your bidding strategy, you can increase bids by up to 900%. </p>
                    <a href="#">Learn more</a>
                </div>

                <h3>Adjust bids by placement:</h3>

                <div className="form-group">
                    <label htmlFor="">Top of Search (first page)</label>
                    <InputCurrency disabled iconType={'percent'}/>
                </div>

                <div className="form-group">
                    <label htmlFor="">Product pages (competitors pages)</label>
                    <InputCurrency disabled iconType={'percent'}/>
                </div>
            </div>


            <div className="col bidding-strategy">
                <h2>Campaign bidding strategy:</h2>


                <Radio.Group
                    disabled
                    // value={campaigns.bidding_strategy}
                    // onChange={({target: {value}}) => changeBrandHandler({bidding_strategy: value})}
                >
                    <div className="col">
                        <Radio value={'legacyForSales'}>
                            Dynamic bids - down only

                            {/*<span className={'recommend-label'}>Recommended by Profit Whales</span>*/}
                        </Radio>

                        <div className="radio-description down-only">
                            Amazon will lower your bids in real time when your ad may be less likely to convert to a
                            sale. Any campaigns created before January 2019 used this setting.
                        </div>
                    </div>

                    <div className="col">
                        <Radio value={'autoForSales'}>
                            Dynamic bids - up and down
                        </Radio>

                        <div className="radio-description up-down">
                            Amazon will raise your bids (by a maximum of 100%) in real time when your ad may be more
                            likely to convert to a sale, and lower your bids when less likely to convert to a sale.
                        </div>
                    </div>

                    <div className="col">
                        <Radio value={'manual'}>
                            Fixed bids
                        </Radio>

                        <div className="radio-description">
                            Amazon will use your exact bid and any manual adjustments you set, and won’t change your
                            bids based on likelihood of sale.
                        </div>
                    </div>
                </Radio.Group>
            </div>
        </section>
    )
}

export default ProductSettings