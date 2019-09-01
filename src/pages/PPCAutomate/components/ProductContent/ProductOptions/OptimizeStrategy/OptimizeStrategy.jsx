import React, { Component } from 'react';
import { Icon } from 'antd';
import Button from '../../../../../../components/Buttons';
import Checkbox from '../../../../../../components/Checkbox';
import './OptimizeStrategy.less';


const strategyValue = {
    BoostOverallProfit: {
        Spend: 'Mid',
        Profit: 'High',
        ACOS: 'Mid',
        Trafic: 'High',

    },
    BoostPPCProfit: {
        Spend: 'Low',
        Profit: 'Mid',
        ACOS: 'Low',
        Trafic: 'Low',
    },
    GrowOverallSales: {
        Spend: 'High',
        Profit: 'Mid',
        ACOS: 'High',
        Trafic: 'High',
    },
    LaunchProduct: {
        Spend: 'Max',
        Profit: 'Low',
        ACOS: 'High',
        Trafic: 'Max',
    },

};


export const StrategyItem = ({
    caption, selected, onSelect, value = 'BoostOverallProfit',
}) => (
    <div className={`StrategyItem ${selected ? 'selected' : ''}`}>
        <div className="caption-strategy">
            <div className="strategy-checkbox">
                <Checkbox isRound checked={selected} onClick={onSelect} />
            </div>
            {caption}
        </div>
        <div className="params">
            <div className="params-item">
                <div className="params-name">Spend</div>
                <div className={`params-value ${strategyValue[value].Spend.toLowerCase()}`}>
                    {strategyValue[value].Spend}
                </div>
            </div>
            <div className="params-item">
                <div className="params-name">Profit</div>
                <div className={`params-value ${strategyValue[value].Profit.toLowerCase()}`}>
                    {strategyValue[value].Profit}
                </div>
            </div>
            <div className="params-item">
                <div className="params-name">Acos</div>
                <div className={`params-value ${strategyValue[value].ACOS.toLowerCase()}`}>
                    {strategyValue[value].ACOS}
                </div>
            </div>
            <div className="params-item">
                <div className="params-name">Trafic</div>
                <div className={`params-value ${strategyValue[value].Trafic.toLowerCase()}`}>
                    {strategyValue[value].Trafic}

                </div>
            </div>
        </div>
        <div className="strategy-control">
            {selected
                ? (<Icon type="check" className="check" />)
                : (<Button className="strategy-btn" onClick={onSelect}>Select</Button>)
            }
        </div>
    </div>
);

class OptimizeStrategy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStrategy: 2,
        };
    }

    onSelectStrategy = (strategyItem) => {
        this.setState({
            selectedStrategy: strategyItem,
        });
    };

    render() {
        const { selectedStrategy } = this.state;


        return (
            <div className="OptimizeStrategy">
                <div className="strategies">
                    <StrategyItem
                        caption="Organic (Overall) Profit"
                        selected={selectedStrategy === 1}
                        onSelect={() => this.onSelectStrategy(1)}
                        value="BoostOverallProfit"
                    />
                    <StrategyItem
                        caption="Organic Boost"
                        selected={selectedStrategy === 2}
                        onSelect={() => this.onSelectStrategy(2)}
                        value="BoostPPCProfit"
                    />
                    <StrategyItem
                        caption="Product Liquidation"
                        selected={selectedStrategy === 3}
                        onSelect={() => this.onSelectStrategy(3)}
                        value="GrowOverallSales"

                    />
                    <StrategyItem
                        caption="Product Lounce"
                        selected={selectedStrategy === 4}
                        onSelect={() => this.onSelectStrategy(4)}
                        value="LaunchProduct"

                    />
                </div>
            </div>
        );
    }
}

OptimizeStrategy.propTypes = {};

OptimizeStrategy.defaultProps = {};

export default OptimizeStrategy;
