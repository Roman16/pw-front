import React, {useEffect, useState} from "react"
import OptimizationStatus from "./OptimizationStatus/OptimizationStatus"
import {productsServices} from "../../../services/products.services"
import {useSelector} from "react-redux"
import OptimizationVariations from "./OptimizationVariations/OptimizationVariations"
import CampaignsConfiguration from "./CampaignsConfiguration/CampaignsConfiguration"
import OptimizationSettings from "./OptimizationSettings/OptimizationSettings"
import SaveChanges from "./SaveChanges/SaveChanges"

const OptimizationForAdmin = () => {
    const [productInformation, setProductInformation] = useState({})

    const {productId} = useSelector(state => ({
        productId: state.products.selectedProduct.id || null,
    }))


    const getProductInformation = async () => {
        try {
            const res = await productsServices.getProductDetails(productId)
            setProductInformation(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (productId) getProductInformation()
    }, [productId])

    return (
        <div className="optimization-for-admin-page">
            <OptimizationStatus
                product={productInformation}
            />

            <OptimizationSettings
                product={productInformation}
            />

            <OptimizationVariations
                product={productInformation}
                updateOptimizationOptions={() => {}}
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
