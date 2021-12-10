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

const fakeCampaignConfiguration = [
    {
        "campaignId": "242934841676092",
        "campaignName": "M4O Matcha 4 Oz (Brands)",
        "custom_settings": {
            "campaign_id": "242934841676092",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "8218692389796",
        "campaignName": "M4O Matcha 4 Oz (ST Exact / Phrase)",
        "custom_settings": {
            "campaign_id": "8218692389796",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "205805238754209",
        "campaignName": "M4O Matcha 4 Oz - Matcha (TPKP)",
        "custom_settings": {
            "campaign_id": "205805238754209",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": null
        }
    },
    {
        "campaignId": "13396533313597",
        "campaignName": "M4O Matcha 4 Oz (CA)",
        "custom_settings": {
            "campaign_id": "13396533313597",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "214011109328725",
        "campaignName": "M4O Matcha 4 Oz - Matcha Powder (TPKP)"
    },
    {
        "campaignId": "210386042690172",
        "campaignName": "PW_EZ-QEI5-AHVA (PAT)",
        "custom_settings": {
            "campaign_id": "210386042690172",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "7467024606829",
        "campaignName": "M4O Matcha 4 Oz (TPK Exact)",
        "custom_settings": {
            "campaign_id": "7467024606829",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": null
        }
    },
    {
        "campaignId": "26480278379269",
        "campaignName": "M4O Matcha 4 Oz (TPA)",
        "custom_settings": {
            "campaign_id": "26480278379269",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "73793861235524",
        "campaignName": "M4O Matcha 4 Oz - Matcha Green Tea Powder (TPKP)"
    },
    {
        "campaignId": "55185943184293",
        "campaignName": "PW_EZ-QEI5-AHVA (ST Exact / Phrase)",
        "custom_settings": {
            "campaign_id": "55185943184293",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "77619044236271",
        "campaignName": "M4O Matcha 4 Oz (Broad Negative)",
        "custom_settings": {
            "campaign_id": "77619044236271",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": null
        }
    },
    {
        "campaignId": "179329445533514",
        "campaignName": "M4O Matcha 4 Oz (Exact Simple)",
        "custom_settings": {
            "campaign_id": "179329445533514",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "95421578052102",
        "campaignName": "M4O Matcha 4 Oz - Green Matcha Powder (TPKP)"
    },
    {
        "campaignId": "20218206924026",
        "campaignName": "M4O Matcha 4 Oz (Exact Other)",
        "custom_settings": {
            "campaign_id": "20218206924026",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": [
                "bid_optimization_keywords",
                "bid_optimization_pats",
                "pause_bleeding_keywords",
                "pause_bleeding_pats",
                "remove_duplicates"
            ]
        }
    },
    {
        "campaignId": "108015054330725",
        "campaignName": "M4O Matcha 4 Oz (Auto CTA)",
        "custom_settings": {
            "campaign_id": "108015054330725",
            "dont_optimize": false,
            "dont_use_metrics": false,
            "optimization_parts": null
        }
    }
]

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

    const {productId, selectedProduct, user} = useSelector(state => ({
        selectedProduct: state.products.selectedProduct,
        productId: state.products.selectedProduct.id || null,
        user: state.user,
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
            const {result} = await productsServices.getProductDetails(productId, source.token)

            const product = result.optimization_jobs

            if (product.status === 'STOPPED') {
                product.optimization_strategy = null
            }

            setProductInformationFromRequest({
                ...product,
                ...product.status === 'STOPPED' && defaultOptimizationVariations,
                product_id: productId,
                ...product.product

            })
            setProductInformation({
                ...product,
                ...product.status === 'STOPPED' && defaultOptimizationVariations,
                product_id: productId,
                ...product.product
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

            //====================================================
            // res.result = fakeCampaignConfiguration //fake data
            //====================================================

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

        if (name === 'item_price_from_user') {
            setProductInformation({
                ...productInformation,
                default_variation: {
                    ...productInformation.default_variation,
                    [name]: value
                }
            })
        } else {
            setProductInformation({
                ...productInformation,
                [name]: value
            })
        }
    }

    const setProductCogs = async () => {
        if (productId) {
            try {
                const {result} = await productsServices.getProductDetails(productId, source.token)

                const product = result.optimization_jobs

                setProductInformationFromRequest({
                    ...productInformationFromRequest,
                    default_variation: {
                        ...productInformationFromRequest.default_variation,
                        cogs: product.default_variation.cogs
                    }
                })

                setProductInformation({
                    ...productInformation,
                    default_variation: {
                        ...productInformation.default_variation,
                        cogs: product.default_variation.cogs
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
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

            await productsServices.stopProductOptimization(productInformation.product_id)

            setProductInformationFromRequest(product)
            setProductInformation(product)

            dispatch(productsActions.changeOptimizationStatus({
                id: productInformation.product_id,
                status: 'STOPPED',
                optimization_indicator_state: {level: "INDICATOR_STATUS_INFORMATIONAL", state: "STOPPED_BY_USER"}
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
            if (productInformation.default_variation && productInformation.default_variation.cogs) {
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

                        if (selectedProduct.variations && selectedProduct.variations.length > 0) {
                            if (product.default_variation.item_price_from_user !== productInformationFromRequest.default_variation.item_price_from_user) {
                                await Promise.all([productsServices.updateVariationSettings({
                                    id: product.default_variation.id,
                                    item_price_from_user: product.default_variation.item_price_from_user
                                }), productsServices.updateProductSettingsById(_.omit(product, 'item_price_from_user'))])
                            } else {
                                await productsServices.updateProductSettingsById(_.omit(product, 'item_price_from_user'))
                            }
                        } else {
                            await productsServices.updateProductSettingsById({
                                ...product,
                                item_price_from_user: product.default_variation.item_price_from_user
                            })
                        }

                        const startRes = await productsServices.startProductOptimization(product)

                        setProductInformation(product)

                        dispatch(productsActions.changeOptimizationStatus({
                            id: productInformation.product_id,
                            status: 'RUNNING',
                            optimization_indicator_state: startRes.result.optimization_jobs.optimization_indicator_state
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
                    onSetCogs={setProductCogs}
                    onShowDescription={() => setVisibleDrawer(true)}
                />

                <OptimizationVariations
                    product={productInformation}
                    onUpdateField={updateProductInformationHandler}
                />

                {user.user.is_agency_client && <CampaignsConfiguration
                    productId={productId}
                    optimizationJobId={productInformation.id}
                    productInformation={productInformation}
                    isDisabled={productInformation.optimization_strategy == null}
                    jobsList={campaignSettings}
                    loading={loadingCampaignSettings}
                    getSettings={getCampaignSettings}
                    onUpdate={updateCampaignSettingsHandler}
                />}

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
