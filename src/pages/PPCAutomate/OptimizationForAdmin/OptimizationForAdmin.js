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


const CancelToken = axios.CancelToken
let source = null

let productInformationFromRequest = {}

const OptimizationForAdmin = () => {
    const [productInformation, setProductInformation] = useState({}),
        [visibleDrawer, setVisibleDrawer] = useState(false),
        [stopProcessing, setStopProcessing] = useState(false),
        [startProcessing, setStartProcessing] = useState(false)

    const dispatch = useDispatch()

    const {productId} = useSelector(state => ({
        productId: state.products.selectedProduct.id || null,
    }))


    const getProductInformation = async () => {
        source && source.cancel()
        source = CancelToken.source()

        try {
            const res = await productsServices.getProductDetails(productId, source.token)
            if (res.status === 'STOPPED') {
                res.optimization_strategy = null
            }
            productInformationFromRequest = {...res}
            setProductInformation(res)
        } catch (e) {
            console.log(e)
        }
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
            await productsServices.updateProductById({
                ...productInformation,
                optimization_strategy: 'AchieveTargetACoS',
                product_id: productId,
                status: 'STOPPED',
            })

            productInformationFromRequest = {
                ...productInformation,
                status: 'STOPPED',
                optimization_strategy: null
            }

            dispatch(productsActions.updateProduct({
                id: productInformation.product_id,
                status: 'STOPPED',
            }))

            setProductInformation({
                ...productInformation,
                status: 'STOPPED',
                optimization_strategy: null
            })

            notification.error({title: 'The optimization is paused'})
        } catch (e) {
            console.log(e)
        }

        setStopProcessing(false)
    }

    const startOptimizationHandler = async () => {
        setStartProcessing(true)

        try {
            await productsServices.updateProductById({
                ...productInformation,
                product_id: productId,
                status: 'RUNNING',
            })

            productInformationFromRequest = {
                ...productInformation,
                status: 'RUNNING',
            }

            setProductInformation({
                ...productInformation,
                status: 'RUNNING',
            })

            dispatch(productsActions.updateProduct({
                id: productId,
                status: 'RUNNING',
            }))

            notification.start({title: 'Optimization successfully started'})
        } catch (e) {
            console.log(e)
        }

        setStartProcessing(false)
    }

    const updateInformationHandler = async () => {
        setStartProcessing(true)

        if(productInformation.optimization_strategy !== null) {
            try {
                const product = {
                    ...productInformation,
                    product_id: productId,
                    status: 'RUNNING'
                }

                await productsServices.updateProductById(product)
                productInformationFromRequest = product
                setProductInformation(product)
                dispatch(productsActions.updateProduct(product))

            } catch (e) {
                console.log(e)
            }
        } else {
            stopOptimizationHandler()
        }
        setStartProcessing(false)
    }


    useEffect(() => {
        if (productId) getProductInformation()
    }, [productId])

    return (
        <div
            className={`optimization-for-admin-page ${productInformation.optimization_strategy == null ? 'disabled' : ''}`}>
            <OptimizationStatus
                product={productInformation}
            />

            <OptimizationSettings
                product={productInformation}
                isDisabled={productInformation.optimization_strategy == null}
                onUpdateField={updateProductInformationHandler}
                onShowDescription={() => setVisibleDrawer(true)}
                onStop={stopOptimizationHandler}
                processing={stopProcessing}
            />

            <OptimizationVariations
                product={productInformation}
                updateOptimizationOptions={() => {
                }}
            />

            <CampaignsConfiguration
                productId={productId}
                optimizationJobId={productInformation.id}
            />

            <SaveChanges
                product={productInformation}
                hasChanges={JSON.stringify(productInformationFromRequest) !== JSON.stringify(productInformation)}
                processing={startProcessing}
                onRevert={revertInformationHandler}
                onStart={startOptimizationHandler}
                onUpdate={updateInformationHandler}
            />

            <StrategiesDescription
                visible={visibleDrawer}
                onClose={() => setVisibleDrawer(false)}
            />

        </div>
    )
}

export default OptimizationForAdmin
