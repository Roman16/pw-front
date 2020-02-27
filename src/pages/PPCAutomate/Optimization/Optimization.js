import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Drawer} from "antd";

import FreeTrial from "../../../components/FreeTrial/FreeTrial";

import OptimizationOptions from "./OptimizationOptions/OptimizationOptions";
import OptimizationStrategy from "./OptimizationStrategy/OptimizationStrategy";

import OptionsInfo from "./InfoDrawers/OptionInfo/OptionInfo";
import StrategyInfo from "./InfoDrawers/StrategyInfo/StrategyInfo";
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus";
import NetMarginWindow from './NetMarginWindow/NetMarginWindow';

import {productsActions} from "../../../actions/products.actions";

import "./Optimization.less";
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import {notification} from "../../../components/Notification";
import {productsServices} from "../../../services/products.services";
import OptimizationIncludes from "./OptimizationIncludes/OptimizationIncludes";

const Optimization = () => {
    const [selectedProduct, setProduct] = useState({}),
        [infoType, setInfoType] = useState(false),
        [visibleNetMarginWindow, setNetMarginWindow] = useState(false);

    const {productId, selectedAll} = useSelector(state => ({
        productId: state.products.selectedProduct.id,
        selectedAll: state.products.selectedAll,
    }));

    // state = {
    //     isLess: false,
    //     visible: false,
    //     infoType: "",
    //     product: this.props.selectedProduct,
    //     selectedStrategy: this.props.selectedProduct.optimization_strategy
    // };
    //
    // showDrawer = type => this.setState({visible: true, infoType: type});
    //
    // onCloseDrawer = () => this.setState({visible: false});
    //
    // toLess = () => this.setState({isLess: !this.state.isLess});
    //
    // // handleChange
    //
    // onSelectStrategy = strategy => {
    //     const product = this.props.selectedProduct;
    //     this.setState(
    //         {
    //             selectedStrategy: strategy
    //         },
    //         () => {
    //             if (product.status === "RUNNING" && !this.props.selectedAll) {
    //                 clearTimeout(timerId);
    //
    //                 timerId = setTimeout(() => {
    //
    //                     this.handleUpdateProduct();
    //                 }, 1000);
    //             } else {
    //                 this.props.updateOptions({optimization_strategy: strategy});
    //             }
    //         }
    //     );
    // };
    //
    // handleUpdateProduct = () => {
    //     const {selectedStrategy} = this.state,
    //         {updateProduct, selectedProduct, updateOptions} = this.props;
    //
    //
    //     updateProduct({
    //         ...selectedProduct,
    //         optimization_strategy: selectedStrategy
    //     });
    //
    //     updateOptions({
    //         optimization_strategy: selectedStrategy,
    //         add_negative_keywords: selectedProduct.add_negative_keywords,
    //         optimize_keywords: selectedProduct.optimize_keywords,
    //         create_new_keywords: selectedProduct.create_new_keywords,
    //         optimize_pats: selectedProduct.optimize_pats,
    //         add_negative_pats: selectedProduct.add_negative_pats,
    //         create_new_pats: selectedProduct.create_new_pats
    //     });
    //
    //     clearTimeout(timerId);
    //     timerId = null;
    //
    //     notification.success({title: 'The strategy is changed'});
    // };
    //
    // static getDerivedStateFromProps(props, state) {
    //     if (props.selectedProduct.id !== state.product.id) {
    //
    //         if (state.product.status === "RUNNING" && !props.selectedAll && timerId) {
    //             clearTimeout(timerId);
    //             timerId = null;
    //
    //             productsServices.updateProductById({...state.product, optimization_strategy: state.selectedStrategy})
    //                 .then(() => {
    //                     notification.success({title: 'The strategy is changed'});
    //                 })
    //         }
    //
    //
    //         if (props.selectedProduct.status === "RUNNING" && !props.selectedAll) {
    //
    //             return {
    //                 product: props.selectedProduct,
    //                 selectedStrategy: props.selectedProduct.optimization_strategy
    //             };
    //         } else {
    //             return {
    //                 product: {
    //                     ...props.selectedProduct,
    //                     ...props.defaultOptions
    //                 },
    //                 selectedStrategy: props.defaultOptions.optimization_strategy
    //             };
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const res = await productsServices.getProductDetails(selectedAll ? 'all' : productId);

                setProduct(res);
            } catch (e) {
                console.log(e);
            }
        }

        fetchProductDetails();
    }, [productId, selectedAll]);

    function startOptimizationHandler(strategy) {
        productsServices.updateProductById({
            product_id: selectedAll ? 'all' : productId,
            status: 'RUNNING',
            optimization_strategy: strategy
        })
    }

    function stopOptimizationHandler() {
        productsServices.updateProductById({
            product_id: selectedAll ? 'all' : productId,
            status: 'STOPPED',
        })
    }

    function showDrawerHandler(type) {
        setInfoType(type);
    }

    function closeDrawerHandler() {
        setInfoType(false);
    }

    return (
        <Fragment>
            <div className="optimization-page">
                <FreeTrial product={'ppc'}/>

                <div className="product-optimization-info">
                    <OptimizationIncludes
                        onShowDrawer={showDrawerHandler}
                    />

                    <OptimizationStatus
                        product={selectedProduct}
                    />
                </div>

                <OptimizationStrategy
                    product={selectedProduct}

                    onShowDrawer={showDrawerHandler}
                    onStart={startOptimizationHandler}
                    onStop={stopOptimizationHandler}
                />
            </div>

            <Drawer
                title={infoType === "options"
                    ? "Here is the quick review of the actions you can automate with the Software."
                    : "Here is the quick review of the PPC Strategies you can reach with our Software."
                }
                width={500}
                onClose={closeDrawerHandler}
                visible={infoType}
            >
                {infoType === "options" ? <OptionsInfo/> : <StrategyInfo/>}
            </Drawer>


            <NetMarginWindow
                isShowModal={visibleNetMarginWindow}
                selectedAll={selectedAll}
                // handleCancel={cancelModal}
                // handleOk={handleOk}
            />

            {/*<ConfirmActionPopup*/}
            {/*    visible={showAllStartConfirmModal}*/}
            {/*    handleOk={() => this.toStart(RUNNING)}*/}
            {/*    handleCancel={() => this.setState({showAllStartConfirmModal: false})}*/}
            {/*    title={'Are you ready to start?'}*/}
            {/*    description={'Are you sure you want to start the same optimization strategy for All Products?'}*/}
            {/*/>*/}

            {/*<ConfirmActionPopup*/}
            {/*    visible={showFirstStartConfirmModal}*/}
            {/*    handleOk={() => this.toStart(RUNNING)}*/}
            {/*    handleCancel={() => this.setState({*/}
            {/*        showFirstStartConfirmModal: false,*/}
            {/*        dontShowStartNotificationAgain: false*/}
            {/*    })}*/}
            {/*    handleChangeCheckbox={(e) => {*/}
            {/*        this.setState({dontShowStartNotificationAgain: e.target.checked})*/}
            {/*    }}*/}
            {/*    title={'Are you ready to start?'}*/}
            {/*    description={'This action will result in the automatic management of your campaigns by our algorithm.'}*/}
            {/*    checkboxText={`Don't show this message again`}*/}
            {/*/>*/}

            {/*<ConfirmActionPopup*/}
            {/*    visible={showStopConfirmModal}*/}
            {/*    handleOk={() => this.toStart(STOPPED)}*/}
            {/*    handleCancel={() => this.setState({*/}
            {/*        showStopConfirmModal: false,*/}
            {/*        dontShowStopNotificationAgain: false*/}
            {/*    })}*/}
            {/*    handleChangeCheckbox={(e) => {*/}
            {/*        this.setState({dontShowStopNotificationAgain: e.target.checked})*/}
            {/*    }}*/}
            {/*    title={' Are you sure you want to stop?'}*/}
            {/*    description={'We will stop the optimization of your active Amazon PPC campaigns. You can restart it anytime.'}*/}
            {/*    checkboxText={selectedAll ? null : `Don't show this message again`}*/}

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount/>
        </Fragment>
    );
};

export default Optimization;
