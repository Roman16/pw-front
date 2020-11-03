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
import {multiSelectVariations} from './CampaignsConfiguration/CampaignsConfiguration'
import _ from 'lodash'

const CancelToken = axios.CancelToken
let source = null

let productInformationFromRequest = {},
    campaignSettingsFromRequest = []

const OptimizationForAdmin = () => {
    const [productInformation, setProductInformation] = useState({}),
        [visibleDrawer, setVisibleDrawer] = useState(false),
        [stopProcessing, setStopProcessing] = useState(false),
        [productProcessing, setProductProcessing] = useState(false),
        [campaignSettings, setCampaignSettings] = useState([])

    const dispatch = useDispatch()

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

    const getCampaignSettings = async () => {
        try {
            const res = await productsServices.getCampaignsSettings(productInformation.id)

            campaignSettingsFromRequest = res.result.map(campaign => ({
                ...campaign.custom_settings,
                campaignName: campaign.campaignName,
                campaign_id: campaign.campaignId,
                enable_optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts),
                optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts) ? campaign.optimization_parts : multiSelectVariations.map(item => item.value)
            }))

            setCampaignSettings(res.result.map(campaign => ({
                ...campaign.custom_settings,
                campaignName: campaign.campaignName,
                campaign_id: campaign.campaignId,
                enable_optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts),
                optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts) ? campaign.optimization_parts : multiSelectVariations.map(item => item.value)
            })))
        } catch (e) {
            console.log(e)
        }
    }

    const updateCampaignSettingsHandler = (data) => {
        setCampaignSettings(data)
    }

    const showNotification = (text) => {
        notification.error({title: text})
    }

    const updateProductInformationHandler = (name, value) => {
        setProductInformation({
            ...productInformation,
            [name]: value
        })

    }

    const bidValidator = () => {
        const product = productInformation

        if (product.optimization_strategy === 'AchieveTargetACoS' && product.desired_target_acos == null) {
            showNotification('Target ACoS is required field!')
            return false
        }

        if (product.min_manual_bid) {
            if (product.max_manual_bid && product.min_manual_bid > product.max_manual_bid) {
                showNotification('Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)')
                return false
            } else if (product.min_manual_bid < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        if (product.max_manual_bid) {
            if (product.max_manual_bid < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        if (product.min_auto_bid) {
            if (product.max_auto_bid && product.min_auto_bid > product.max_auto_bid) {
                showNotification('Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)')
                return false
            } else if (product.min_auto_bid < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        if (product.max_auto_bid) {
            if (product.max_manual_bid < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        return true
    }

    const campaignValidator = () => {
        for (let campaign of campaignSettings) {
            if (campaign.min_bid) {
                if (campaign.min_bid > campaign.max_bid) {
                    showNotification('Min Bid should be less than Max Bid')
                    return false
                    break
                } else if (campaign.min_bid < 0.02) {
                    showNotification('Bids should be greater than or equal to 0.02$')
                    return false
                    break
                }
            }

            if (campaign.max_bid) {
                if (campaign.max_bid < 0.02) {
                    showNotification('Bids should be greater than or equal to 0.02$')
                    return false
                    break
                }
            }
        }

        return true

    }

    const revertInformationHandler = () => {
        setProductInformation({...productInformationFromRequest})
        setCampaignSettings([...campaignSettingsFromRequest.map(item => ({...item}))])
    }

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
            if (productInformation.product_margin_value) {
                if (bidValidator() && campaignValidator()) {
                    try {
                        const product = {
                            ...productInformation,
                            status: 'RUNNING'
                        }

                        const custom_campaigns_settings = campaignSettings.map(item => ({
                                campaign_id: item.campaign_id,
                                dont_optimize: item.dont_optimize || false,
                                dont_use_metrics: item.dont_use_metrics || false,
                                optimization_parts: (!item.enable_optimization_parts || item.optimization_parts.length === 0) ? null : item.optimization_parts,
                                ...item.min_bid && {min_bid: item.min_bid},
                                ...item.max_bid && {max_bid: item.max_bid}
                            }
                        ))

                        if (campaignSettings.length > 0) {
                            await productsServices.updateCampaignsBlacklist(productInformation.id, {custom_campaigns_settings})
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
                        campaignSettingsFromRequest = campaignSettings
                    } catch (e) {
                        console.log(e)
                    }
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

    const hasChanges = (JSON.stringify(productInformationFromRequest) !== JSON.stringify(productInformation)) || (JSON.stringify(campaignSettingsFromRequest) !== JSON.stringify(campaignSettings))

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
                jobsList={campaignSettings}
                getSettings={getCampaignSettings}
                onUpdate={updateCampaignSettingsHandler}
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
