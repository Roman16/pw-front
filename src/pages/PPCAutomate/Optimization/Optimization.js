import React, {Component, Fragment} from 'react';
import {Drawer, Icon} from 'antd';
import {connect} from 'react-redux';
import {debounce} from 'throttle-debounce';

import ProductList from '../../../components/ProductList/ProductList';
import OptimizationOptions from './OptimizationOptions/OptimizationOptions';
import OptimizationStrategy from './OptimizationStrategy/OptimizationStrategy';

import OptionsInfo from './InfoItem/OptionInfo/OptionInfo';
import StrategyInfo from './InfoItem/StrategyInfo/StrategyInfo';
import OptimizationStatus from './OptimizationStatus/OptimizationStatus';
import LastReports from './LastReports/LastReports';

import {productsActions} from '../../../actions/products.actions';
import {productsServices} from "../../../services/products.services";

import './Optimization.less';
import {reportsServices} from "../../../services/reports.services";

class Optimization extends Component {
    state = {
        isLess: false,
        visible: false,
        infoType: '',
        product: {},
        selectedStrategy: '',
        lastReports: []
    };

    showDrawer = type => this.setState({visible: true, infoType: type});

    onCloseDrawer = () => this.setState({visible: false});

    toLess = () => this.setState({isLess: !this.state.isLess});

    onSelectStrategy = strategy => {
        this.setState({
            selectedStrategy: strategy
        }, () => {
            this.props.updateOptions({optimization_strategy: strategy});
            if (this.state.product.status === 'RUNNING') this.handleUpdateProduct();
        });
    };

    handleUpdateProduct = debounce(500, false, () => {
        const {product, selectedStrategy} = this.state;

        productsServices.updateProductById({
            ...product,
            id: product.product_id,
            optimization_strategy: selectedStrategy
        });
    });


    onSelectProduct = async (product) => {
        if (product === 'all') {
            const [detail, reports] = await Promise.all([productsServices.getProductDetails(product), reportsServices.getLastReports(product)]);

            this.setState({
                product: {...detail, ...this.props.defaultOptions},
                selectedStrategy: this.props.defaultOptions.optimization_strategy,
                lastReports: reports
            })
        } else {
            this.props.selectProduct(product);

            const [detail, reports] = await Promise.all([productsServices.getProductDetails(product.id), reportsServices.getLastReports(product.id)]);
            if (detail.status === 'RUNNING') {
                this.setState({
                    product: detail,
                    selectedStrategy: detail.optimization_strategy,
                    lastReports: reports
                })
            } else {
                this.setState({
                    product: {...detail, ...this.props.defaultOptions},
                    selectedStrategy: this.props.defaultOptions.optimization_strategy,
                    lastReports: reports
                })
            }
        }

    };


    render() {
        const {
                isLess,
                selectedStrategy,
                product,
                lastReports
            } = this.state,
            {
                selectedProduct,
                selectedAll
            } = this.props;

        return (
            <Fragment>
                <div className="optimization-page">
                    <ProductList
                        onSelect={this.onSelectProduct}
                    />

                    <div className="product-options">
                        <div className={`options ${!isLess ? 'more' : 'less'}`}>
                            <OptimizationOptions
                                openInformation={() => this.showDrawer('options')}
                                selectedProduct={product}
                            />

                            <OptimizationStrategy
                                onSelect={this.onSelectStrategy}
                                openInformation={() => this.showDrawer('strategy')}
                                selectedStrategy={selectedStrategy}
                                product={product}
                                selectedAll={selectedAll}
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
                            product={product}
                        />

                        <LastReports
                            isLess={isLess}
                            lastReports={lastReports}
                        />
                    </div>
                </div>

                <Drawer
                    title="Did you know that you can pause your ProfitWhales account?"
                    width={500}
                    onClose={this.onCloseDrawer}
                    visible={this.state.visible}
                >
                    {this.state.infoType === 'options' ? (
                        <OptionsInfo/>
                    ) : (
                        <StrategyInfo/>
                    )}
                </Drawer>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    selectedProduct: state.products.selectedProduct,
    defaultOptions: state.products.defaultOptimizationOptions,
    selectedAll: state.products.selectedAll,

});

const mapDispatchToProps = dispatch => ({
    selectProduct: (product) => {
        dispatch(productsActions.selectProduct(product));
    },
    updateProduct: (product) => {
        dispatch(productsActions.updateProduct(product));
    },
    updateOptions: (data) => {
        dispatch(productsActions.updateOptions(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Optimization);

