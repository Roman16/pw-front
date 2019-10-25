import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Checkbox } from 'antd';
import moment from 'moment';

import './OptimizationStrategy.less';

const strategyValue = {
    BoostOverallProfit: {
        Spend: 'Mid',
        Profit: 'High',
        ACOS: 'Mid',
        Trafic: 'High'
    },
    BoostPPCProfit: {
        Spend: 'Low',
        Profit: 'Mid',
        ACOS: 'Low',
        Trafic: 'Low'
    },
    GrowOverallSales: {
        Spend: 'High',
        Profit: 'Mid',
        ACOS: 'High',
        Trafic: 'High'
    },
    LaunchProduct: {
        Spend: 'Max',
        Profit: 'Low',
        ACOS: 'High',
        Trafic: 'Max'
    }
};

export const StrategyItem = ({ caption, selected, onSelect, value }) => (
    <div className={`strategy-item ${selected ? 'selected' : ''}`}>
        <div className="caption-strategy">
            <div className="strategy-checkbox">
                <Checkbox isRound checked={selected} onClick={onSelect} />
            </div>
            {caption}
        </div>

        <div className="params">
            <div className="params-item">
                <div className="params-name">Spend</div>
                <div
                    className={`params-value ${strategyValue[
                        value
                    ].Spend.toLowerCase()}`}
                >
                    {strategyValue[value].Spend}
                </div>
            </div>

            <div className="params-item">
                <div className="params-name">Profit</div>
                <div
                    className={`params-value ${strategyValue[
                        value
                    ].Profit.toLowerCase()}`}
                >
                    {strategyValue[value].Profit}
                </div>
            </div>

            <div className="params-item">
                <div className="params-name">Acos</div>
                <div
                    className={`params-value ${strategyValue[
                        value
                    ].ACOS.toLowerCase()}`}
                >
                    {strategyValue[value].ACOS}
                </div>
            </div>

            <div className="params-item">
                <div className="params-name">Trafic</div>
                <div
                    className={`params-value ${strategyValue[
                        value
                    ].Trafic.toLowerCase()}`}
                >
                    {strategyValue[value].Trafic}
                </div>
            </div>
        </div>

        <div className="strategy-control">
            {selected ? (
                <Icon type="check" className="check" />
            ) : (
                <Button
                    className="strategy-btn"
                    onClick={() => onSelect(value)}
                >
                    Select
                </Button>
            )}
        </div>
    </div>
);

const OptimizationStrategy = ({
    onSelect,
    selectedStrategy,
    openInformation,
    product: { optimization_strategy },
    expireIn
}) => {
    const todaysDate = moment(new Date());
    const oDate = moment(expireIn * 1000);
    const freeTrial = oDate.diff(todaysDate, 'days');

    return (
        <div className="optimize-strategy">
            <div className="product-info">
                <div className="product-select">
                    <span>Select which optimize Strategy</span>
                    <Icon
                        type="info-circle"
                        theme="filled"
                        onClick={openInformation}
                    />
                </div>

                <div className="additional">
                    <p className="free-trial">
                        Free Trial
                        <span>{freeTrial >= 0 ? freeTrial : 0}</span>
                        Days Left
                    </p>
                    <div className="btn-upgrade">
                        <Button
                            onClick={() => {
                                window.open(
                                    `${window.BASE_URL}/account/subscriptions`
                                );
                            }}
                        >
                            Upgrade Now
                            <Icon
                                type="arrow-up"
                                style={{ color: '#8fd39d' }}
                            />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="strategies options-content">
                <StrategyItem
                    caption="Organic (Overall) Profit"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === 'BoostOverallProfit'
                            : optimization_strategy === 'BoostOverallProfit'
                    }
                    onSelect={onSelect}
                    value="BoostOverallProfit"
                />
                <StrategyItem
                    caption="Organic Boost"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === 'BoostPPCProfit'
                            : optimization_strategy === 'BoostPPCProfit'
                    }
                    onSelect={onSelect}
                    value="BoostPPCProfit"
                />
                <StrategyItem
                    caption="Product Liquidation"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === 'GrowOverallSales'
                            : optimization_strategy === 'GrowOverallSales'
                    }
                    onSelect={onSelect}
                    value="GrowOverallSales"
                />
                <StrategyItem
                    caption="Product Lounce"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === 'LaunchProduct'
                            : optimization_strategy === 'LaunchProduct'
                    }
                    onSelect={onSelect}
                    value="LaunchProduct"
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    expireIn: state.user.plans.ppc_automation.expire_in
});

export default connect(mapStateToProps)(OptimizationStrategy);
