import React, {Component, Fragment} from "react";
import {Drawer, Icon} from 'antd';
import {connect} from 'react-redux';

import ProductList from '../../../components/ProductList/ProductList';
import OptimizationOptions from './OptimizationOptions/OptimizationOptions';
import OptimizationStrategy from './OptimizationStrategy/OptimizationStrategy';

import OptionsInfo from './InfoItem/OptionInfo/OptionInfo';
import StrategyInfo from './InfoItem/StrategyInfo/StrategyInfo';
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus";
import LastReports from "./LastReports/LastReports";


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

    onCloseDrawer = () => {
        this.setState({
            visible: false,
        });
    };

    toLess = () => {
        this.setState({
            isLess: !this.state.isLess
        })
    };

    onSelectProduct = (product) => {
    };

    handleUpdateProduct = (product) => {
        console.log(product);
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

                            <div className="less-more-control">
                                <div
                                    role="button"
                                    className={`icon ${isLess ? 'more' : 'less'}`}
                                    onClick={this.toLess}
                                >
                                    <Icon type="up"/>
                                </div>
                            </div>
                        </div>

                        <OptimizationStatus
                        onSwitchOptimization={this.handleUpdateProduct}
                        />

                        <LastReports />
                    </div>
                </div>

                <Drawer
                    title="Did you know that you can pause your ProfitWhales account?"
                    width={500}
                    onClose={this.onCloseDrawer}
                    visible={this.state.visible}
                >
                    {this.state.infoType === 'options' ? <OptionsInfo/> : <StrategyInfo />}

                </Drawer>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Optimization);