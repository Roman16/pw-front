import React from "react";
import {Icon, Button, Checkbox} from "antd";

import "./OptimizationStrategy.less";

const strategyValue = {
    BoostOverallProfit: {
        Spend: "Mid",
        Profit: "High",
        ACOS: "Mid",
        Trafic: "High"
    },
    BoostPPCProfit: {
        Spend: "Low",
        Profit: "Mid",
        ACOS: "Low",
        Trafic: "Low"
    },
    GrowOverallSales: {
        Spend: "High",
        Profit: "Mid",
        ACOS: "High",
        Trafic: "High"
    },
    LaunchProduct: {
        Spend: "Max",
        Profit: "Low",
        ACOS: "High",
        Trafic: "Max"
    }
};

export const StrategyItem = ({caption, selected, onSelect, value, info}) => (
    <div className={`strategy-item ${selected ? "selected" : ""}`}>
        <div className="caption-strategy">
            <div className="strategy-checkbox">
                <Checkbox isRound checked={selected} onClick={onSelect}/>
            </div>
            {caption}
        </div>

        <div className="params">
            <div className="params-item">
                <div className="params-name">Spend</div>
                <div
                    className={`params-value ${strategyValue[value].Spend.toLowerCase()}`}
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
                    className={`params-value ${strategyValue[value].ACOS.toLowerCase()}`}
                >
                    {strategyValue[value].ACOS}
                </div>
            </div>

            <div className="params-item">
                <div className="params-name">Traffic</div>
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
                <Icon type="check" className="check"/>
            ) : (
                <Button
                    className="strategy-btn"
                    onClick={() => !info && onSelect(value)}
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
                                  product: {optimization_strategy}
                              }) => {
    return (
        <div className="optimize-strategy">
            <div className="strategies options-content">
                <StrategyItem
                    caption="Product Launch"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === "LaunchProduct"
                            : optimization_strategy === "LaunchProduct"
                    }
                    onSelect={onSelect}
                    value="LaunchProduct"
                />
                <StrategyItem
                    caption="PPC Profit Growth"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === "BoostPPCProfit"
                            : optimization_strategy === "BoostPPCProfit"
                    }
                    onSelect={onSelect}
                    value="BoostPPCProfit"
                />
                <StrategyItem
                    caption="Boost Overall Profit"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === "BoostOverallProfit"
                            : optimization_strategy === "BoostOverallProfit"
                    }
                    onSelect={onSelect}
                    value="BoostOverallProfit"
                />
                <StrategyItem
                    caption="Revenue Growth"
                    selected={
                        selectedStrategy
                            ? selectedStrategy === "GrowOverallSales"
                            : optimization_strategy === "GrowOverallSales"
                    }
                    onSelect={onSelect}
                    value="GrowOverallSales"
                />
            </div>
        </div>
    );
};

export default OptimizationStrategy;
