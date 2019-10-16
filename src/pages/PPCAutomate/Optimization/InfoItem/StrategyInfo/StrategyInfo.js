import React, {Component} from 'react';
import {StrategyItem} from '../../OptimizationStrategy/OptimizationStrategy';
import './StrategyInfo.less';

const info = [
    {
        key: 'strategy0',
        caption: 'Organic Profit',
        value: 'BoostOverallProfit',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    },
    {
        key: 'strategy1',
        caption: 'Organic Boost',
        value: 'BoostPPCProfit',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    },
    {
        key: 'strategy2',
        caption: 'Product Liquidation',
        value: 'GrowOverallSales',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    },
    {
        key: 'strategy3',
        caption: 'Product Lounce',
        value: 'LaunchProduct',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    },
];

class StrategyInfo extends Component {
    state = {};

    render() {
        return (
            <div className="StrategyInfo">
                {info.map(({
                               caption, key, text, value
                           }) => (
                    <div key={key} className="info-item">
                        <div className="info-caption small">{caption}</div>

                        <StrategyItem caption={caption} value={value}/>
                        <div>
                            <div className="info-caption large">{caption}</div>
                            <div>{text}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

StrategyInfo.propTypes = {};

StrategyInfo.defaultProps = {};

export default StrategyInfo;
