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

import './Optimization.less';

class Optimization extends Component {
    state = {
        isLess: false,
        visible: false,
        infoType: '',
        product: this.props.selectedProduct,
        selectedStrategy: this.props.selectedProduct.optimization_strategy,
    };

    showDrawer = type => this.setState({visible: true, infoType: type});

    onCloseDrawer = () => this.setState({visible: false});

    toLess = () => this.setState({isLess: !this.state.isLess});

    onSelectStrategy = strategy => this.setState({selectedStrategy: strategy}, this.handleUpdateProduct);

    handleUpdateProduct = debounce(500, false, () => {
        const {product, selectedStrategy} = this.state;

        product.status === 'RUNNING' && this.props.updateProduct({
            ...product,
            optimization_strategy: selectedStrategy
        })
    });

    static getDerivedStateFromProps(props, state) {
        if (props.selectedProduct.id !== state.product.id) {
            if (props.selectedProduct.status === 'RUNNING') {
                return ({
                    product: props.selectedProduct,
                    selectedStrategy: props.selectedProduct.optimization_strategy
                })
            } else {
                return ({
                    product: {...props.selectedProduct, ...props.defaultOptions},
                    selectedStrategy: props.defaultOptions.optimization_strategy
                })
            }
        } else {
            return null
        }
    }

    render() {
        const {
                isLess,
                selectedStrategy,
                product
            } = this.state,
            {
                selectedProduct,
            } = this.props;

        return (
            <Fragment>
                <div className="optimization-page">
                    <ProductList/>

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
                                product={selectedProduct}
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

                        <OptimizationStatus/>

                        <LastReports isLess={isLess}/>
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
    defaultOptions: state.products.defaultOptimizationOptions
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

