import React, { Component } from 'react';
import { StrategyItem } from '../../OptimizeStrategy';
import './StrategyInfo.less';

const info = [
    {
        key: 'strategy0',
        caption: 'Organic Profit',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    }, {
        key: 'strategy1',
        caption: 'Organic Boost',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    }, {
        key: 'strategy2',
        caption: 'Product Liquidation',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    }, {
        key: 'strategy3',
        caption: 'Product Lounce',
        text: `Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua.Lorem 
           ipsum dolor sit amet, consectetur adipiscing `,
    },
];


class StrategyInfo extends Component {
    render() {
        return (
            <div className="StrategyInfo">
                {info.map(({ caption, key, text }) => (
                    <div key={key} className="info-item">
                        <StrategyItem caption={caption} />
                        <div>
                            <div className="info-caption">{caption}</div>
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
