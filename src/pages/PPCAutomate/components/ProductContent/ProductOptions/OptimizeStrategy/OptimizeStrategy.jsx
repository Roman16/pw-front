import React, { Component } from 'react';
import { Icon } from 'antd';
import Button from '../../../../../../components/Buttons';
import './OptimizeStrategy.less';

const StrategyItem = ({ caption, selected }) => (
    <div className={`StrategyItem ${selected ? 'selected' : ''}`}>
        <div className="caption">{caption}</div>
        <div className="params">
            <div className="params-item">
                <div className="params-name">Spend</div>
                <div className="params-value low">Low</div>
            </div>
            <div className="params-item">
                <div className="params-name">Profit</div>
                <div className="params-value mid">Mid</div>
            </div>
            <div className="params-item">
                <div className="params-name">Acos</div>
                <div className="params-value high">High</div>
            </div>
            <div className="params-item">
                <div className="params-name">Trafic</div>
                <div className="params-value low">Low</div>
            </div>
        </div>
        <div className="strategy-control">
            {selected
                ? (<Icon type="check" className="check" />)
                : (<Button className="strategy-btn">Select</Button>)
            }
        </div>
    </div>
);

class OptimizeStrategy extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="OptimizeStrategy">
                <div className="strategies">
                    <StrategyItem caption="Organic Profit" />
                    <StrategyItem caption="Organic Boost" selected />
                    <StrategyItem caption="Product Liquidation" />
                    <StrategyItem caption="Product Lounce" />
                </div>
                <div className="descriptions">
                    Mistake: Duplicate Keywords. Keyword in ad group in campaign
                    'duplicateCampaignName' is a duplicate of keyword 'originKeywordText' in ad
                    group 'originAdGroupName' in campaign
                </div>
            </div>
        );
    }
}

OptimizeStrategy.propTypes = {};

OptimizeStrategy.defaultProps = {};

export default OptimizeStrategy;
