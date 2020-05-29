import React from "react";
import {SVG} from "../../../../../utils/icons";

import './BiddingStrategies.less';
import {Radio} from "antd";
import InputCurrency from "../../../../../components/Inputs/InputCurrency";

const BiddingStrategies = () => {

    return (
        <section className={'bidding-strategies'}>
            <div className="section-header">
                <div className="container">
                    <h2>Bidding strategies and bids adjustments <span className={'optional'}>optional</span></h2>

                    <button><SVG id='select-icon'/></button>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Campaign bidding strategy:</h3>

                        <Radio.Group>
                            <Radio value={'create'}>
                                Dynamic bids - down only

                                <span className={'recommend-label'}>Recommended by Profit Whales</span>
                            </Radio>

                            <div className="radio-description">
                                Amazon will lower your bids in real time when your ad may be less likely to convert to a
                                sale. Any campaigns created before January 2019 used this setting.
                            </div>
                            {/*---------------------------------------------------------------------------------------*/}
                            <Radio value={'select'}>
                                Dynamic bids - up and down
                            </Radio>

                            <div className="radio-description">
                                Amazon will raise your bids (by a maximum of 100%) in real time when your ad may be more
                                likely to convert to a sale, and lower your bids when less likely to convert to a sale.
                            </div>
                            {/*---------------------------------------------------------------------------------------*/}
                            <Radio value={'no'}>
                                Fixed bids
                            </Radio>

                            <div className="radio-description">
                                Amazon will use your exact bid and any manual adjustments you set, and won’t change your
                                bids based on likelihood of sale.
                            </div>
                        </Radio.Group>

                    </div>

                    <div className="col">
                        <p>
                            When you create a Sponsored Products campaign, you can choose from three bidding strategies.
                        </p>

                        <p>
                            Dynamic bids - down only <br/>
                            When you choose the dynamic bids - down only strategy, Amazon will reduce your bids in
                            real-time for clicks that may be less likely to convert to a sale. If
                            Amazon sees an opportunity where we predict your ad may be less likely to convert to a sale
                            (for example, a less relevant search query, on a placement that does not perform well,
                            etc.), it might lower your bid for that auction.
                        </p>

                        <p>
                            Dynamic bids - up and down <br/>
                            When you choose the dynamic bids - up and down' strategy, Amazon will increase your bids in
                            real-time for clicks that may be more likely to convert to a
                            sale, and reduce them for clicks that are less likely to convert to a sale. We do not
                            recommend using this strategy.
                        </p>

                        <p>
                            Fixed bids <br/>
                            When you choose the fixed bids strategy, Amazon will use your exact bid for all
                            opportunities and will not adjust your bids based on the likelihood of a conversion.
                            Compared to dynamic bidding strategies, you may get more impressions, but fewer conversions
                            for your ad spend with this strategy. This bidding strategy works best for Product Launches.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h3>Adjust bids by placement:</h3>

                        <div className="form-group">
                            <label htmlFor="">Top of Search (first page)</label>
                            <InputCurrency typeIcon={'percent'}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Product pages (competitors pages)</label>
                            <InputCurrency typeIcon={'percent'}/>
                        </div>
                    </div>

                    <div className="col">
                        <p>
                            In addition to selecting a bidding strategy, you can also set different bids by placement.
                            You can enter a percent increase to your base bid for two placements: top of search (first
                            page) and product pages. If you choose to set bids by placement, bids will be increased by
                            the specified amounts when your ads compete for opportunities on those placements. <br/>
                            <a href="#"> Learn more about Adjusting Bids by Placement</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default BiddingStrategies;