import React, {useState} from "react";
import {SVG} from "../../../../../utils/icons";

import './BiddingStrategies.less';
import {Radio} from "antd";
import InputCurrency from "../../../../../components/Inputs/InputCurrency";

const BiddingStrategies = ({campaigns, onUpdate}) => {
    const [sectionCollapse, setSectionCollapse] = useState(true);

    const changeBrandHandler = (value) => {
        onUpdate({
            campaigns: {
                ...campaigns,
                ...value
            }
        });
    };

    return (
        <section className={`bidding-strategies ${sectionCollapse ? 'collapsed' : ''}`}>
            <div className="section-header hover" onClick={() => setSectionCollapse(prevState => !prevState)}>
                <div className="container">
                    <h2>Bidding strategies and bids adjustments <span className={'optional'}>optional</span></h2>

                    <button>
                        <SVG id='select-icon'/>
                    </button>

                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Campaign bidding strategy:</h3>
                    </div>

                    <div className="col">
                        <p>
                            When you create a Sponsored Products campaign, you can choose from three bidding strategies.
                        </p>
                    </div>
                </div>

                <Radio.Group
                    value={campaigns.bidding_strategy}
                    onChange={({target: {value}}) => changeBrandHandler({bidding_strategy: value})}
                >
                    <div className="row">
                        <div className="col">
                            <Radio value={'DYNAMIC_BIDS_DOWN_ONLY'}>
                                Dynamic bids - down only

                                <span className={'recommend-label'}>Recommended by Profit Whales</span>
                            </Radio>

                            <div className="radio-description down-only">
                                Amazon will lower your bids in real time when your ad may be less likely to convert to a
                                sale. Any campaigns created before January 2019 used this setting.
                            </div>
                        </div>

                        <div className="col">
                            <p>
                                Dynamic bids - down only<br/>
                                When you choose the dynamic bids - down only strategy, Amazon will reduce your bids in
                                real-time for clicks that may be less likely to convert to a sale.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Radio value={'DYNAMIC_BIDS_UP_AND_DOWN'}>
                                Dynamic bids - up and down
                            </Radio>

                            <div className="radio-description up-down">
                                Amazon will raise your bids (by a maximum of 100%) in real time when your ad may be more
                                likely to convert to a sale, and lower your bids when less likely to convert to a sale.
                            </div>
                        </div>

                        <div className="col">
                            <p>
                                Dynamic bids - up and down<br/>
                                When you choose the dynamic bids - up and down’ strategy, Amazon will increase your bids
                                in real-time for clicks that may be more likely to convert to a sale, and reduce them
                                for clicks that are less likely to convert to a sale. We do not recommend using this
                                strategy.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Radio value={'FIXED_BIDS'}>
                                Fixed bids
                            </Radio>

                            <div className="radio-description">
                                Amazon will use your exact bid and any manual adjustments you set, and won’t change your
                                bids based on likelihood of sale.
                            </div>
                        </div>

                        <div className="col">
                            <p>
                                Fixed bids<br/>
                                When you choose the fixed bids strategy, Amazon will use your exact bid for all
                                opportunities and will not adjust your bids based on the likelihood of a conversion.
                                Compared to dynamic bidding strategies, you may get more impressions, but fewer
                                conversions for your ad spend with this strategy. This bidding strategy works best for
                                Product Launches.
                            </p>
                        </div>
                    </div>
                </Radio.Group>


                <div className="row">
                    <div className="col">
                        <h3>Adjust bids by placement:</h3>

                        <div className="form-group">
                            <label htmlFor="">Top of Search (first page)</label>
                            <InputCurrency
                                typeIcon={'percent'}
                                value={campaigns.adjust_bid_by_placements.top_of_search}
                                onChange={(top_of_search) => changeBrandHandler({
                                    adjust_bid_by_placements: {
                                        ...campaigns.adjust_bid_by_placements,
                                        top_of_search
                                    }
                                })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Product pages (competitors pages)</label>
                            <InputCurrency
                                typeIcon={'percent'}
                                value={campaigns.adjust_bid_by_placements.product_pages}
                                onChange={(product_pages) => changeBrandHandler({
                                    adjust_bid_by_placements: {
                                        ...campaigns.adjust_bid_by_placements,
                                        product_pages
                                    }
                                })}
                            />
                        </div>
                    </div>

                    <div className="col">
                        <p>
                            In addition to selecting a bidding strategy, you can also set different bids by placement.
                            You can enter a percent increase to your base bid for two placements: top of search (first
                            page) and product pages.
                            <br/>
                            <a href="https://sellercentral.amazon.com/gp/help/GD4WPBFXSE2YQ8QM" target={'_blank'}>
                                Learn more about Adjusting Bids by Placement
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default BiddingStrategies;