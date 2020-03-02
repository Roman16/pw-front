import React, {Fragment, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Drawer} from "antd";

import "./Optimization.less";

import FreeTrial from "../../../components/FreeTrial/FreeTrial";
import OptimizationStrategy from "./OptimizationStrategy/OptimizationStrategy";
import OptionsInfo from "./InfoDrawers/OptionInfo/OptionInfo";
import StrategyInfo from "./InfoDrawers/StrategyInfo/StrategyInfo";
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus";
import OptimizationIncludes from "./OptimizationIncludes/OptimizationIncludes";

import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";

import {productsServices} from "../../../services/products.services";
import {notification} from "../../../components/Notification";
import {productsActions} from "../../../actions/products.actions";

const Optimization = () => {
    const [selectedProduct, setProduct] = useState({}),
        [infoType, setInfoType] = useState(false),
        [processing, setProcessing] = useState(false);

    const dispatch = useDispatch();

    const {productId, selectedAll} = useSelector(state => ({
        productId: state.products.selectedProduct.id,
        selectedAll: state.products.selectedAll,
    }));


    useEffect(() => {
        if (selectedAll || productId) {
            async function fetchProductDetails() {
                try {
                    const res = await productsServices.getProductDetails(selectedAll ? 'all' : productId);

                    setProduct(res);
                } catch (e) {
                    console.log(e);
                }
            }

            fetchProductDetails();
        }

    }, [productId, selectedAll]);

    async function startOptimizationHandler(optimization_strategy, targetAcosValue, netMargin) {
        setProcessing(true);

        try {
            await productsServices.updateProductById({
                product_id: selectedAll ? 'all' : productId,
                status: 'RUNNING',
                optimization_strategy,
                ...optimization_strategy === 'ACoS_targeting' && {
                    target_acos: targetAcosValue
                }
            });

            setProduct({
                ...selectedProduct,
                status: 'RUNNING',
                optimization_strategy,
                ...netMargin && {
                    product_margin: true,
                    product_margin_value: netMargin,
                }
            });

            dispatch(productsActions.updateProduct({
                id: selectedAll ? 'all' : selectedProduct.product_id,
                status: 'RUNNING',
                optimization_strategy
            }));

            notification.start({title: 'Optimization successfully started'})
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    }

    async function stopOptimizationHandler(optimization_strategy) {
        setProcessing(true);

        try {
            await productsServices.updateProductById({
                product_id: selectedAll ? 'all' : productId,
                status: 'STOPPED',
                optimization_strategy
            });

            setProduct({
                ...selectedProduct,
                status: 'STOPPED',
                optimization_strategy
            });

            dispatch(productsActions.updateProduct({
                id: selectedAll ? 'all' : selectedProduct.product_id,
                status: 'STOPPED',
                optimization_strategy
            }));

            notification.error({title: 'The optimization is paused'})
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
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
                    selectedAll={selectedAll}
                    processing={processing}

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

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount/>
        </Fragment>
    );
};

export default Optimization;
