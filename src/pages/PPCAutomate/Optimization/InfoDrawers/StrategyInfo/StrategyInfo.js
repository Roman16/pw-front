import React, { Component } from 'react';
import { StrategyItem } from '../../OptimizationStrategy/OptimizationStrategy';
import './StrategyInfo.less';

const info = [
    {
        key: 'strategy0',
        caption: 'Product Launch',
        value: 'LaunchProduct',
        text: `This strategy is for Sellers who want to launch the product.
The algorithm will be more aggressive with the bids, so you will get your first sales, reviews, and increase your brand awareness. 
The ACoS could be two times higher than your break-even ACoS.`
    },
    {
        key: 'strategy1',
        caption: 'PPC Profit Growth',
        value: 'BoostPPCProfit',
        text: `This strategy is for Sellers who want to increase their Profit From Advertising campaigns.
The Software will kill all the bleeding and unprofitable keywords to make sure you will get the best ROAS possible from your keywords.`
    },
    {
        key: 'strategy2',
        caption: 'Boost Overall Profit',
        value: 'BoostOverallProfit',
        text: `This strategy is for Sellers who want to keep their organic ranking positions with PPC efforts so they can make more profit from Organic Sales. In this case, your ACoS will be the same as your break-even ACoS.`
    },
    {
        key: 'strategy3',
        caption: 'Revenue Growth',
        value: 'GrowOverallSales',
        text: `This strategy is for Sellers who want to boost their  Advertising and Organic Sales so to grow their ranking positions. It requires increasing your Ad budget and keeping the ACoS higher than your break-even ACoS.`
    }
];

class StrategyInfo extends Component {
    state = {};

    render() {
        return (
            <div className="StrategyInfo">
                {/*{info.map(({ caption, key, text, value }) => (*/}
                {/*    <div key={key} className="info-item">*/}
                {/*        <div className="info-caption small">{caption}</div>*/}

                {/*        <StrategyItem caption={caption} value={value} info/>*/}
                {/*        <div>*/}
                {/*            <div className="info-caption large">{caption}</div>*/}
                {/*            <div>{text}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        );
    }
}

StrategyInfo.propTypes = {};

StrategyInfo.defaultProps = {};

export default StrategyInfo;
