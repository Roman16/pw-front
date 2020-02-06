import React, {Component, Fragment} from "react";
import {Drawer, Icon} from "antd";
import {connect} from "react-redux";
import {debounce} from "throttle-debounce";

import FreeTrial from "../../../components/FreeTrial/FreeTrial";

import OptimizationOptions from "./OptimizationOptions/OptimizationOptions";
import OptimizationStrategy from "./OptimizationStrategy/OptimizationStrategy";

import OptionsInfo from "./InfoItem/OptionInfo/OptionInfo";
import StrategyInfo from "./InfoItem/StrategyInfo/StrategyInfo";
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus";
import LastReports from "./LastReports/LastReports";

import {productsActions} from "../../../actions/products.actions";

import "./Optimization.less";
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import {notification} from "../../../components/Notification";
import {productsServices} from "../../../services/products.services";

let timerId = null;

class Optimization extends Component {
    state = {
        isLess: false,
        visible: false,
        infoType: "",
        product: this.props.selectedProduct,
        selectedStrategy: this.props.selectedProduct.optimization_strategy
    };

    showDrawer = type => this.setState({visible: true, infoType: type});

    onCloseDrawer = () => this.setState({visible: false});

    toLess = () => this.setState({isLess: !this.state.isLess});

    // handleChange

    onSelectStrategy = strategy => {
        const product = this.props.selectedProduct;
        this.setState(
            {
                selectedStrategy: strategy
            },
            () => {
                if (product.status === "RUNNING" && !this.props.selectedAll) {
                    clearTimeout(timerId);

                    timerId = setTimeout(() => {

                        this.handleUpdateProduct();
                    }, 1000);
                } else {
                    this.props.updateOptions({optimization_strategy: strategy});
                }
            }
        );
    };

    handleUpdateProduct = () => {
        const {selectedStrategy} = this.state,
            {updateProduct, selectedProduct, updateOptions} = this.props;


        updateProduct({
            ...selectedProduct,
            optimization_strategy: selectedStrategy
        });

        updateOptions({
            optimization_strategy: selectedStrategy,
            add_negative_keywords: selectedProduct.add_negative_keywords,
            optimize_keywords: selectedProduct.optimize_keywords,
            create_new_keywords: selectedProduct.create_new_keywords,
            optimize_pats: selectedProduct.optimize_pats,
            add_negative_pats: selectedProduct.add_negative_pats,
            create_new_pats: selectedProduct.create_new_pats
        });

        clearTimeout(timerId);
        timerId = null;

        notification.success({title: 'The strategy is changed'});
    };

    static getDerivedStateFromProps(props, state) {
        if (props.selectedProduct.id !== state.product.id) {

            if (state.product.status === "RUNNING" && !props.selectedAll && timerId) {
                clearTimeout(timerId);
                timerId = null;

                productsServices.updateProductById({...state.product, optimization_strategy: state.selectedStrategy})
                    .then(() => {
                        notification.success({title: 'The strategy is changed'});
                    })
            }


            if (props.selectedProduct.status === "RUNNING" && !props.selectedAll) {

                return {
                    product: props.selectedProduct,
                    selectedStrategy: props.selectedProduct.optimization_strategy
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
                    {/*<ProductList />*/}

                    <div className="product-options">
                        <FreeTrial product={'ppc'}/>

                        <div className="options">
                            <div className={`options-strategy ${isLess ? "more" : "less"}`}>
                                <div className="product-info-automate">
                                    <span>What Parts Do You Want To Automate?</span>
                                    <Icon
                                        type="info-circle"
                                        theme="filled"
                                        onClick={() => this.showDrawer("options")}
                                    />
                                </div>
                                <OptimizationOptions selectedProduct={selectedProduct}/>

                                <div className="product-info-strategy">
                                    <div className="product-select">
                                        <span>Select Optimization Strategy</span>
                                        <Icon
                                            type="info-circle"
                                            theme="filled"
                                            onClick={() => this.showDrawer("strategy")}
                                        />
                                    </div>
                                    {selectedAll && !isLess && (
                                        <div className="description-all">
                                            Changes to those settings will be applied to all selected
                                            products
                                        </div>
                                    )}
                                </div>
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

                            <div className={`less-more-control ${isLess ? "more" : "less"}`}>
                                <div
                                    role="button"
                                    className={`icon ${isLess ? "more" : "less"}`}
                                    onClick={this.toLess}
                                >
                                    <Icon type="up"/>
                                </div>
                            </div>
                        </div>

                        <OptimizationStatus product={selectedProduct}/>

                        <LastReports productId={selectedAll ? "all" : selectedProduct.id}/>
                    </div>
                </div>

                <Drawer
                    title={
                        infoType === "options"
                            ? "Here is the quick review of the actions you can automate with the Software."
                            : "Here is the quick review of the PPC Strategies you can reach with our Software."
                    }
                    width={500}
                    onClose={this.onCloseDrawer}
                    visible={this.state.visible}
                >
                    {infoType === "options" ? <OptionsInfo/> : <StrategyInfo/>}
                </Drawer>

                <SubscriptionNotificationWindow product={'ppc'}/>
                <LoadingAmazonAccount/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Optimization);
