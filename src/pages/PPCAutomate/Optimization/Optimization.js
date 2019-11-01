import React, {Component, Fragment} from 'react';
import {Drawer, Icon} from 'antd';
import {connect} from 'react-redux';
import {debounce} from 'throttle-debounce';

import FreeTrial from '../../../components/FreeTrial/FreeTrial';

import ProductList from '../../../components/ProductList/ProductList';
import OptimizationOptions from './OptimizationOptions/OptimizationOptions';
import OptimizationStrategy from './OptimizationStrategy/OptimizationStrategy';

import OptionsInfo from './InfoItem/OptionInfo/OptionInfo';
import StrategyInfo from './InfoItem/StrategyInfo/StrategyInfo';
import OptimizationStatus from './OptimizationStatus/OptimizationStatus';
import LastReports from './LastReports/LastReports';

import {productsActions} from '../../../actions/products.actions';

import './Optimization.less';

class Optimization extends Component {
    state = {
        isLess: false,
        visible: false,
        infoType: '',
        product: this.props.selectedProduct,
        selectedStrategy: this.props.selectedProduct.optimization_strategy
    };

    showDrawer = type => this.setState({visible: true, infoType: type});

    onCloseDrawer = () => this.setState({visible: false});

    toLess = () => this.setState({isLess: !this.state.isLess});

    onSelectStrategy = strategy => {
        const product = this.props.selectedProduct;
        this.setState(
            {
                selectedStrategy: strategy
            },
            () => {
                if (product.status === 'RUNNING') {
                    this.props.updateOptions({
                        optimization_strategy: strategy,
                        add_negative_keywords: product.add_negative_keywords,
                        optimize_keywords: product.optimize_keywords,
                        create_new_keywords: product.create_new_keywords,
                        optimize_pats: product.optimize_pats,
                        add_negative_pats: product.add_negative_pats,
                        create_new_pats: product.create_new_pats,
                    });

                    this.handleUpdateProduct();
                } else {
                    this.props.updateOptions({optimization_strategy: strategy});
                }
            }
        );
    };

    handleUpdateProduct = debounce(500, false, () => {
        const {selectedStrategy} = this.state,
            {updateProduct, selectedProduct} = this.props;

        updateProduct({
            ...selectedProduct,
            optimization_strategy: selectedStrategy,
        });
    });

    static getDerivedStateFromProps(props, state) {
        if (props.selectedProduct.id !== state.product.id) {
            if (
                props.selectedProduct.status === 'RUNNING' &&
                !props.selectedAll
            ) {
                return {
                    product: props.selectedProduct,
                    selectedStrategy:
                    props.selectedProduct.optimization_strategy
                };
            } else {
                return {
                    product: {
                        ...props.selectedProduct,
                        ...props.defaultOptions
                    },
                    selectedStrategy: props.defaultOptions.optimization_strategy
                };
            }
        } else {
            return null;
        }
    }

    render() {
        const {isLess, selectedStrategy, infoType} = this.state,
            {selectedProduct, selectedAll} = this.props;

        return (
            <Fragment>
                <div className="optimization-page">
                    <ProductList/>

                    <div className="product-options">
                        <div className="options">
                            <div className={`product-info ${isLess && 'more'}`}>
                                <div className="product-info-automate">
                                    <span>
                                        What Parts Do You Want To Automate?
                                    </span>
                                    <Icon
                                        type="info-circle"
                                        theme="filled"
                                        onClick={() =>
                                            this.showDrawer('options')
                                        }
                                    />
                                </div>

                                <div className="product-info-strategy">
                                    <div className="product-select">
                                        <span>
                                            Select Optimization Strategy
                                        </span>
                                        <Icon
                                            type="info-circle"
                                            theme="filled"
                                            onClick={() =>
                                                this.showDrawer('strategy')
                                            }
                                        />
                                    </div>
                                    <FreeTrial/>
                                    {selectedAll && !isLess && (
                                        <div className="description-all">
                                            Changes to those settings will be
                                            applied to all selected products
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                className={`options-strategy ${
                                    isLess ? 'more' : 'less'
                                }`}
                            >
                                <OptimizationOptions
                                    selectedProduct={selectedProduct}
                                />

                                <OptimizationStrategy
                                    onSelect={this.onSelectStrategy}
                                    selectedStrategy={selectedStrategy}
                                    product={selectedProduct}
                                    selectedAll={selectedAll}
                                />

                                <div className="descriptions options-content">
                                    {`NOTE! You can only choose one Strategy per product. Also, you can have any number of Optimization Parts, and you can change them anytime you want even if the product is already under optimization.`}
                                </div>
                            </div>

                            <div
                                className={`less-more-control ${
                                    isLess ? 'more' : 'less'
                                }`}
                            >
                                <div
                                    role="button"
                                    className={`icon ${
                                        isLess ? 'more' : 'less'
                                    }`}
                                    onClick={this.toLess}
                                >
                                    <Icon type="up"/>
                                </div>
                            </div>
                        </div>

                        <OptimizationStatus product={selectedProduct}/>

                        <LastReports
                            isLess={isLess}
                            productId={selectedAll ? 'all' : selectedProduct.id}
                        />
                    </div>
                </div>

                <Drawer
                    title={
                        infoType === 'options'
                            ? 'Here is the quick review of the actions you can automate with the Software.'
                            : 'Here is the quick review of the PPC Strategies you can reach with our Software.'
                    }
                    width={500}
                    onClose={this.onCloseDrawer}
                    visible={this.state.visible}
                >
                    {infoType === 'options' ? (
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
    selectedAll: state.products.selectedAll
});

const mapDispatchToProps = dispatch => ({
    updateProduct: product => {
        dispatch(productsActions.updateProduct(product));
    },
    updateOptions: data => {
        dispatch(productsActions.updateOptions(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Optimization);
