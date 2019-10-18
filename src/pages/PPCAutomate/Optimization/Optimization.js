import React, { Component, Fragment } from 'react';
import { Drawer, Icon } from 'antd';
import { connect } from 'react-redux';

import ProductList from '../../../components/ProductList/ProductList';
import OptimizationOptions from './OptimizationOptions/OptimizationOptions';
import OptimizationStrategy from './OptimizationStrategy/OptimizationStrategy';

import OptionsInfo from './InfoItem/OptionInfo/OptionInfo';
import StrategyInfo from './InfoItem/StrategyInfo/StrategyInfo';
import OptimizationStatus from './OptimizationStatus/OptimizationStatus';
import LastReports from './LastReports/LastReports';

import { productsActions } from '../../../actions/products.actions';

import './Optimization.less';

class Optimization extends Component {
    state = {
        isLess: false,
        visible: false,
        infoType: '',
        selectedStrategy: null,

        // product: {
        //     add_negative_keywords: this.props.product.add_negative_keywords,
        //     optimize_keywords: this.props.product.optimize_keywords,
        //     create_new_keywords: this.props.product.create_new_keywords,
        //     optimize_pats: this.props.product.optimize_pats,
        //     add_negative_pats: this.props.product.add_negative_pats,
        //     create_new_pats: this.props.product.create_new_pats,
        // }
    };

    showDrawer = type => {
        this.setState({
            visible: true,
            infoType: type
        });
    };

    onCloseDrawer = () => {
        this.setState({
            visible: false
        });
    };

    toLess = () => {
        this.setState({
            isLess: !this.state.isLess
        });
    };

    onSelectProduct = product => {
        this.props.selectProduct(product);
    };

    handleUpdateProduct = product => {
        console.log(product);
    };

    render() {
        const {
            isLess,
                selectedStrategy
        } = this.state,
            {
                product
            } = this.props;

        return (
            <Fragment>
                <div className="optimization-page">
                    <ProductList onSelectProduct={this.onSelectProduct} />

                    <div className="product-options">
                        <div className={`options ${!isLess ? 'more' : 'less'}`}>
                            <OptimizationOptions
                                onChange={this.onChangeOptions}
                                openInformation={() => this.showDrawer('options')}
                                product={product}
                            />

                            <OptimizationStrategy
                                onSelect={this.onSelectStrategy}
                                openInformation={() => this.showDrawer('strategy')}
                                selectedStrategy={selectedStrategy}
                                product={product}
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
                                    className={`icon ${
                                        isLess ? 'more' : 'less'
                                    }`}
                                    onClick={this.toLess}
                                >
                                    <Icon type="up" />
                                </div>
                            </div>
                        </div>

                        <OptimizationStatus
                            onSwitchOptimization={this.handleUpdateProduct}
                        />

                        <LastReports isLess={isLess} />
                    </div>
                </div>

                <Drawer
                    title="Did you know that you can pause your ProfitWhales account?"
                    width={500}
                    onClose={this.onCloseDrawer}
                    visible={this.state.visible}
                >
                    {this.state.infoType === 'options' ? (
                        <OptionsInfo />
                    ) : (
                        <StrategyInfo />
                    )}
                </Drawer>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.selectedProduct
});

const mapDispatchToProps = dispatch => ({
    updateProduct: (product) => {
        dispatch(productsActions.updateProduct(product));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Optimization);

export default connect(mapStateToProps, mapDispatchToProps)(Optimization);