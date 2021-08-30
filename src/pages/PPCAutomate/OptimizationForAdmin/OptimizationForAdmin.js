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
import ConfirmActionPopup from "../../../components/ModalWindow/ConfirmActionPopup"

const CancelToken = axios.CancelToken
let source = null

let campaignSettingsFromRequest = [],
    defaultOptimizationVariations = {},
    prevProduct = {id: null}

optimizationOptions.forEach(item => {
    defaultOptimizationVariations[item.value] = true
})

const OptimizationForAdmin = () => {
    const [productInformation, setProductInformation] = useState({}),
        [productInformationFromRequest, setProductInformationFromRequest] = useState(null),
        [visibleDrawer, setVisibleDrawer] = useState(false),
        [stopProcessing, setStopProcessing] = useState(false),
        [saveProcessing, setSaveProcessing] = useState(false),
        [productProcessing, setProductProcessing] = useState(false),
        [campaignSettings, setCampaignSettings] = useState([]),
        [loadingCampaignSettings, setLoadingCampaignSettings] = useState(false),
        [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false)

    const dispatch = useDispatch()

    const {productId, selectedProduct} = useSelector(state => ({
        selectedProduct: state.products.selectedProduct,
        productId: state.products.selectedProduct.id || null,
    }))

    const hasChanges = productInformationFromRequest !== null ? ((JSON.stringify(productInformationFromRequest) !== JSON.stringify(productInformation)) || (JSON.stringify(campaignSettingsFromRequest) !== JSON.stringify(campaignSettings))) : false

    const getProductInformation = async () => {
        source && source.cancel()
        source = CancelToken.source()

        setProductProcessing(true)
        setVisibleConfirmWindow(false)
        setCampaignSettings([])

        prevProduct = selectedProduct

        try {
            const res = await productsServices.getProductDetails(productId, source.token)
            if (res.status === 'STOPPED') {
                res.optimization_strategy = null

                optimizationOptions.forEach(item => {
                    res[item.value] = true
                })
            }
            setProductInformationFromRequest({
                ...res,
                ...res.status === 'STOPPED' && defaultOptimizationVariations,
                product_id: productId

            })
            setProductInformation({
                ...res,
                ...res.status === 'STOPPED' && defaultOptimizationVariations,
                product_id: productId
            })
        } catch (e) {
            console.log(e)
        }

        setProductProcessing(false)
    }

    const getCampaignSettings = async () => {
        setLoadingCampaignSettings(true)

        try {
            const res = await productsServices.getCampaignsSettings(productInformation.id)

            campaignSettingsFromRequest = res.result.map(campaign => ({
                ...campaign.custom_settings,
                campaignName: campaign.campaignName,
                campaign_id: campaign.campaignId,
                enable_optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts),
                optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts) ? campaign.custom_settings.optimization_parts : multiSelectVariations.map(item => item.value),
            }))

            setCampaignSettings(res.result.map(campaign => ({
                ...campaign.custom_settings,
                campaignName: campaign.campaignName,
                campaign_id: campaign.campaignId,
                enable_optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts),
                optimization_parts: !!(campaign.custom_settings && campaign.custom_settings.optimization_parts) ? campaign.custom_settings.optimization_parts : multiSelectVariations.map(item => item.value),
            })))
        } catch (e) {
            console.log(e)
        }

        setLoadingCampaignSettings(false)
    }

    const updateCampaignSettingsHandler = (data) => {
        setCampaignSettings([...data.map(item => ({...item}))])
    }

    const showNotification = (text) => {
        notification.error({title: text})
    }

    const updateProductInformationHandler = (name, value) => {
        name === 'cogs' && setProductInformationFromRequest({...productInformationFromRequest, cogs: value})

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

        if (product.min_bid_manual_campaign) {
            if (product.max_bid_manual_campaign && product.min_bid_manual_campaign > product.max_bid_manual_campaign) {
                showNotification('Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)')
                return false
            } else if (product.min_bid_manual_campaign < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        if (product.max_bid_manual_campaign) {
            if (product.max_bid_manual_campaign < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        if (product.min_bid_auto_campaign) {
            if (product.max_bid_auto_campaign && product.min_bid_auto_campaign > product.max_bid_auto_campaign) {
                showNotification('Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)')
                return false
            } else if (product.min_bid_auto_campaign < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        if (product.max_bid_auto_campaign) {
            if (product.max_bid_auto_campaign < 0.02) {
                showNotification('Bids should be greater than or equal to 0.02$')
                return false
            }
        }

        return true
    }

    const campaignValidator = () => {
        for (let campaign of campaignSettings) {
            if (campaign.min_bid) {
                if (campaign.max_bid && campaign.min_bid > campaign.max_bid) {
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

            setProductInformationFromRequest(product)
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
        setSaveProcessing(true)

        if (productInformation.optimization_strategy !== null) {
            if (productInformation.cogs) {
                if (bidValidator() && campaignValidator()) {
                    try {
                        const product = {
                            ...productInformation,
                            status: 'RUNNING'
                        }


                        const custom_campaigns_settings = campaignSettings.map(item => {
                                return ({
                                    campaign_id: item.campaign_id,
                                    dont_optimize: item.dont_optimize || false,
                                    dont_use_metrics: item.dont_use_metrics || false,
                                    optimization_parts: (!item.enable_optimization_parts || item.optimization_parts.length === 0) ? null : item.optimization_parts,
                                    ...item.min_bid && {min_bid: item.min_bid},
                                    ...item.max_bid && {max_bid: item.max_bid}
                                })
                            }
                        )

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

                        setProductInformationFromRequest(product)
                        campaignSettingsFromRequest = campaignSettings

                        optimizationOptions.forEach(item => {
                            defaultOptimizationVariations[item.value] = product[item.value]
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
            } else {
                notification.error({title: 'CoGS is required field!'})
            }
        } else {
            stopOptimizationHandler()
        }

        setSaveProcessing(false)
    }

    const cancelChangingProduct = () => {
        dispatch(productsActions.fetchProductDetails(prevProduct))
        setVisibleConfirmWindow(false)
    }

    useEffect(() => {
        if (hasChanges && productId !== prevProduct.id) {
            setVisibleConfirmWindow(true)
        } else {
            if (productId && (productId !== prevProduct.id)) getProductInformation()
        }
    }, [productId])

    useEffect(() => {
        return () => {
            setProductInformationFromRequest(null)
            prevProduct = {id: null}
        }
    }, [])


    return (
        <>
            <div
                className={`optimization-for-admin-page ${productInformation.optimization_strategy == null ? 'disabled' : ''}`}>
                <OptimizationStatus
                    product={productInformation}
                />

                <OptimizationSettings
                    product={productInformation}
                    isDisabled={productInformation.optimization_strategy == null}
                    processing={stopProcessing}
                    hasVariations={selectedProduct && (selectedProduct.variations || false)}

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
                    loading={loadingCampaignSettings}
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

                {productProcessing && <div className="save-loader"><Spin size={'large'}/></div>}
            </div>

            {saveProcessing && <div className="page-loader"><Spin size={'large'}/></div>}

            <ConfirmActionPopup
                className={'confirm-remove-product-window'}
                visible={visibleConfirmWindow}
                title={'Are you sure you want to change product?'}
                description={'Changes you made are not saved and will be lost.'}
                handleOk={getProductInformation}
                handleCancel={cancelChangingProduct}
            />

            <Prompt
                when={hasChanges}
                message="Are you sure? The current scanning results will be lost"
            />
        </>
    )
}

export default OptimizationForAdmin
