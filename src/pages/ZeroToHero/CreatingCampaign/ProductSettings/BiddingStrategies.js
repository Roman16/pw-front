import React from "react";
import {SVG} from "../../../../utils/icons";

const BiddingStrategies = () => {

    return (
        <section className={'bidding-strategies'}>
            <div className="section-header">
                <div className="container">
                    <h2>Bidding strategies and bids adjustments <span className={'optional'}>optional</span></h2>

                    <button><SVG id='select-icon'/></button>
                </div>
            </div>

        </section>
    )
};

export default BiddingStrategies;