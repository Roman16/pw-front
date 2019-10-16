import React, {Component, Fragment} from "react";
import {Drawer, Button, Col, Row, Icon} from 'antd';

import ProductList from '../../../components/ProductList/ProductList';
import OptimizationOptions, {options} from './OptimizationOptions/OptimizationOptions';
import OptimizationStrategy from './OptimizationStrategy/OptimizationStrategy';

import OptionsInfo from './InfoItem/OptionInfo/OptionInfo';
import StrategyInfo from './InfoItem/StrategyInfo/StrategyInfo';


import './Optimization.less';

class Optimization extends Component {
    state = {
        isLess: false,
        visible: false,
        infoType: ''
    };

    showDrawer = (type) => {
        this.setState({
            visible: true,
            infoType: type
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onSelectProduct = (product) => {
        console.log(product);
    };

    toLess = () => {
        this.setState({
            isLess: !this.state.isLess
        })
    };

    render() {
        const {
            isLess
        } = this.state;
        return (
            <Fragment>
                <div className='optimization-page'>
                    <ProductList
                        onSelectProduct={this.onSelectProduct}
                    />

                    <div className="product-options">
                        <div className={`options ${!isLess ? 'more' : 'less'}`}>
                            <OptimizationOptions
                                openInformation={() => this.showDrawer('options')}
                            />

                            <OptimizationStrategy
                                openInformation={() => this.showDrawer('strategy')}
                            />

                            <div className="descriptions options-content">
                                {` What is PAT? Product Attribute Targeting is
                            a powerful new way to target manual Amazon Sponsored Product campaigns.
                             It allows sellers to target ads by either
                             ASIN or Category (brands, prices, and ratings).`}
                            </div>
                        </div>

                        <div className="less-more-control">
                            {/* eslint-disable-next-line max-len */}
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                            <div
                                role="button"
                                className={`icon ${isLess ? 'more' : 'less'}`}
                                onClick={this.toLess}
                            >
                                <Icon type="up"/>
                            </div>
                        </div>
                    </div>
                </div>

                <Drawer
                    title="Did you know that you can pause your ProfitWhales account?"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {this.state.infoType === 'options' ? <OptionsInfo/> : <StrategyInfo />}

                </Drawer>
            </Fragment>
        )
    }
}

export default Optimization;