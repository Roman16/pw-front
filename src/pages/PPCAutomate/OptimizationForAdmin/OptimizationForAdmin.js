import React, {useEffect, useState} from "react"
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus"
import {productsServices} from "../../../services/products.services"
import {useDispatch, useSelector} from "react-redux"
import OptimizationVariations from "./OptimizationVariations/OptimizationVariations"
import CampaignsConfiguration from "./CampaignsConfiguration/CampaignsConfiguration"
import OptimizationSettings from "./OptimizationSettings/OptimizationSettings"
import SaveChanges from "./SaveChanges/SaveChanges"
import axios from "axios"
import StrategiesDescription from "./StrategiesDescription/StrategiesDescription"
import {productsActions} from "../../../actions/products.actions"
import {notification} from "../../../components/Notification"
import {Spin} from "antd"
import {Prompt} from "react-router-dom"
import {optimizationOptions} from './OptimizationVariations/OptimizationVariations'

const CancelToken = axios.CancelToken
let source = null

let productInformationFromRequest = {}

const OptimizationForAdmin = () => {
    const [productInformation, setProductInformation] = useState({}),
        [visibleDrawer, setVisibleDrawer] = useState(false),
        [stopProcessing, setStopProcessing] = useState(false),
        [productProcessing, setProductProcessing] = useState(false)

    const dispatch = useDispatch()

    document.querySelector('ed')

    const {productId} = useSelector(state => ({
        productId: state.products.selectedProduct.id || null,
    }))


    const getProductInformation = async () => {
        source && source.cancel()
        source = CancelToken.source()

        setProductProcessing(true)

        try {
            const res = await productsServices.getProductDetails(productId, source.token)
            if (res.status === 'STOPPED') {
                res.optimization_strategy = null

                optimizationOptions.forEach(item => {
                    res[item.value] = true
                })
            }
            productInformationFromRequest = {...res}
            setProductInformation(res)
        } catch (e) {
            console.log(e)
        }

        setProductProcessing(false)
    }

    const updateProductInformationHandler = (name, value) => {
        setProductInformation({
            ...productInformation,
            [name]: value
        })

    }

    const revertInformationHandler = () => setProductInformation({...productInformationFromRequest})

    const stopOptimizationHandler = async () => {
        setStopProcessing(true)

        try {
            const product = {
                ...productInformation,
                status: 'STOPPED',
                optimization_strategy: null
            }

            await productsServices.updateProductById({
                ...product,
                optimization_strategy: 'AchieveTargetACoS',
            })

            productInformationFromRequest = product
            setProductInformation(product)

            dispatch(productsActions.updateProduct({
                id: productInformation.product_id,
                status: 'STOPPED',
            }))

            notification.error({title: 'The optimization is paused'})
        } catch (e) {
            console.log(e)
        }

        setStopProcessing(false)
    }

    const startOptimizationHandler = async () => {
        setProductProcessing(true)

        if (productInformation.optimization_strategy !== null) {
            if (productInformation.desired_target_acos) {
                try {
                    const product = {
                        ...productInformation,
                        status: 'RUNNING'
                    }

                    await productsServices.updateProductSettingsById(product)

                    await productsServices.updateProductById(product)
                    setProductInformation(product)

                    dispatch(productsActions.updateProduct({
                        id: productInformation.product_id,
                        status: 'RUNNING',
                    }))


                    notification.start({title: productInformationFromRequest.status === 'RUNNING' ? 'Changes saved!' : 'Optimization successfully started'})

                    productInformationFromRequest = product
                } catch (e) {
                    console.log(e)
                }
            } else {
                notification.error({title: 'Net Margin is required field!'})
            }
        } else {
            stopOptimizationHandler()
        }

        setProductProcessing(false)
    }


    useEffect(() => {
        if (productId) getProductInformation()
    }, [productId])

    const hasChanges = JSON.stringify(productInformationFromRequest) !== JSON.stringify(productInformation)

    return (
        <div
            className={`optimization-for-admin-page ${productInformation.optimization_strategy == null ? 'disabled' : ''}`}>
            <OptimizationStatus
                product={productInformation}
            />

            <OptimizationSettings
                product={productInformation}
                isDisabled={productInformation.optimization_strategy == null}
                processing={stopProcessing}

                onUpdateField={updateProductInformationHandler}
                onStop={stopOptimizationHandler}
                onShowDescription={() => setVisibleDrawer(true)}
            />

            <OptimizationVariations
                product={productInformation}
                onUpdateField={updateProductInformationHandler}
            />

            <CampaignsConfiguration
                productId={productId}
                optimizationJobId={productInformation.id}
                isDisabled={productInformation.optimization_strategy == null}
            />

            <SaveChanges
                product={productInformation}
                hasChanges={hasChanges}
                onRevert={revertInformationHandler}
                onStart={startOptimizationHandler}
            />

            <StrategiesDescription
                visible={visibleDrawer}
                onClose={() => setVisibleDrawer(false)}
            />


            {productProcessing && <div className="page-loader"><Spin size={'large'}/></div>}

            <Prompt
                when={hasChanges}
                message="Are you sure? The current scanning results will be lost"
            />
        </div>
    )
}

export default OptimizationForAdmin
