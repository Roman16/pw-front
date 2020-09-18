import React, {Fragment, useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {Drawer} from "antd"
import axios from "axios"

import OptimizationStrategy from "./OptimizationStrategy/OptimizationStrategy"
import OptionsInfo from "./InfoDrawers/OptionInfo/OptionInfo"
import StrategyInfo from "./InfoDrawers/StrategyInfo/StrategyInfo"
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus"
import OptimizationIncludes from "./OptimizationIncludes/OptimizationIncludes"

import {productsServices} from "../../../services/products.services"
import {notification} from "../../../components/Notification"
import {productsActions} from "../../../actions/products.actions"

import "./Optimization.less"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import OptimizationChanges from "./OptimizationChanges/OptimizationChanges"
import CampaignsConfiguration from "./CampaignsConfiguration/CampaignsConfiguration"

const CancelToken = axios.CancelToken
let source = null

const Optimization = () => {
    const [selectedProduct, setProduct] = useState({}),
        [infoType, setInfoType] = useState(false),
        [processing, setProcessing] = useState(false)

    const dispatch = useDispatch()

    const {productId, selectedAll, productList, productsFetching} = useSelector(state => ({
        productId: state.products.selectedProduct.id || null,
        selectedAll: state.products.selectedAll,
        productList: state.products.productList,
        productsFetching: state.products.fetching,
        isAgencyUser: state.user.user.is_agency_client
    }))


    useEffect(() => {
        if ((selectedAll || productId) && productList.length > 0 && !productsFetching) {
            setProcessing(true)

            async function fetchProductDetails() {
                source && source.cancel()

                source = CancelToken.source()

                try {
                    const res = await productsServices.getProductDetails(selectedAll ? 'all' : productId, source.token)

                    setProduct(res)
                    setProcessing(false)
                } catch (e) {
                    console.log(e)
                    setProcessing(false)
                }
            }

            fetchProductDetails()
        }

    }, [productId, selectedAll])


    async function startOptimizationHandler(optimization_strategy, targetAcosValue, netMargin) {
        setProcessing(true)


        if (optimization_strategy === 'AchieveTargetACoS' && (!targetAcosValue || targetAcosValue === 0 || targetAcosValue < 0)) {
            notification.error({
                title: 'Enter your target ACoS first'
            })
        } else {
            try {
                await productsServices.updateProductById({
                    ...selectedProduct,
                    product_id: selectedAll ? 'all' : productId,
                    status: 'RUNNING',
                    optimization_strategy,
                    ...optimization_strategy === 'AchieveTargetACoS' && {
                        desired_target_acos: targetAcosValue
                    }
                })

                setProduct({
                    ...selectedProduct,
                    status: 'RUNNING',
                    optimization_strategy,
                    ...netMargin && {
                        product_margin: true,
                        product_margin_value: netMargin,
                    }
                })


                dispatch(productsActions.updateProduct({
                    id: selectedAll ? 'all' : productId,
                    status: 'RUNNING',
                    optimization_strategy
                }))

                notification.start({title: 'Optimization successfully started'})
            } catch (e) {
                console.log(e)
            }
        }


        setProcessing(false)
    }

    const updateOptimizationOptions = (options) => {
        setProduct({
            ...selectedProduct,
            ...options
        })
    }

    async function onSaveTargetAcos(targetAcos) {
        if (!targetAcos || targetAcos === 0 || targetAcos < 0) {
            notification.error({
                title: 'Enter your target ACoS first'
            })
        } else {
            try {
                await productsServices.updateProductById({
                    ...selectedProduct,

                    product_id: selectedAll ? 'all' : productId,
                    status: selectedProduct.status,
                    optimization_strategy: selectedProduct.optimization_strategy ? selectedProduct.optimization_strategy : 'AchieveTargetACoS',
                    desired_target_acos: targetAcos
                })

                notification.success({
                    title: 'Saved'
                })

            } catch (e) {
                console.log(e)
            }
        }
    }

    async function stopOptimizationHandler() {
        setProcessing(true)

        try {
            await productsServices.updateProductById({
                ...selectedProduct,

                product_id: selectedAll ? 'all' : productId,
                status: 'STOPPED',
                optimization_strategy: selectedProduct.optimization_strategy
            })

            setProduct({
                ...selectedProduct,
                status: 'STOPPED',
                optimization_strategy: selectedProduct.optimization_strategy
            })

            dispatch(productsActions.updateProduct({
                id: selectedAll ? 'all' : selectedProduct.product_id,
                status: 'STOPPED',
                optimization_strategy: selectedProduct.optimization_strategy
            }))

            notification.error({title: 'The optimization is paused'})
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    function showDrawerHandler(type) {
        setInfoType(type)
    }

    function closeDrawerHandler() {
        setInfoType(false)
    }

    return (
        <Fragment>
            <div className="optimization-page">
                <OptimizationIncludes
                    product={selectedProduct}
                    selectedAll={selectedAll}
                    onShowDrawer={showDrawerHandler}
                    updateOptimizationOptions={updateOptimizationOptions}
                    optimizationJobId={selectedProduct.id}
                />

                <OptimizationChanges
                    countChanges={selectedProduct.total_changes}
                />

                <OptimizationStatus
                    product={selectedProduct}
                />

                {localStorage.getItem('adminToken') && <CampaignsConfiguration
                    productId={productId}
                    optimizationJobId={selectedProduct.id}
                />}

                <OptimizationStrategy
                    productId={productId}
                    product={selectedProduct}
                    selectedAll={selectedAll}
                    processing={processing}

                    onShowDrawer={showDrawerHandler}
                    onStart={startOptimizationHandler}
                    onStop={stopOptimizationHandler}
                    onSaveTargetAcos={onSaveTargetAcos}
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
        </Fragment>
    )
}

export default Optimization
