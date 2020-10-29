import React, {useEffect, useState} from "react"
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus"
import {productsServices} from "../../../services/products.services"
import {useSelector} from "react-redux"
import OptimizationVariations from "./OptimizationVariations/OptimizationVariations"
import CampaignsConfiguration from "./CampaignsConfiguration/CampaignsConfiguration"
import OptimizationSettings from "./OptimizationSettings/OptimizationSettings"
import SaveChanges from "./SaveChanges/SaveChanges"
import axios from "axios"


const CancelToken = axios.CancelToken
let source = null

const OptimizationForAdmin = () => {
    const [productInformation, setProductInformation] = useState({})

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
                ifDisabled={productInformation.optimization_strategy == null}
                onUpdateField={updateProductInformationHandler}
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

            <SaveChanges/>
        </div>
    )
}

export default OptimizationForAdmin
