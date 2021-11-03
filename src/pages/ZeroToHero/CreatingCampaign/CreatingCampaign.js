import React, {memo, useEffect, useState} from "react"
import '../ZeroToHero.less'
import './CreatingCampaign.less'
import Navigation from "./Navigation/Navigation"
import SelectProduct from "./SelectProduct/SelectProduct"
import StepActions from "./StepActions/StepActions"
import RequiredSettings from "./RequiredSettings/RequiredSettings"
import {useDispatch, useSelector} from "react-redux"
import {zthActions} from "../../../actions/zth.actions"
import OptionalSettings from "./OptionalSettings/OptionalSettings"
import Overview from "./Overview/Overview"
import {notification} from "../../../components/Notification"
import moment from "moment"
import {history} from "../../../utils/history"
import {zthServices} from "../../../services/zth.services"
import {cleanMainKeyword, findExistingDuplicateOfNewMainKeyword} from "../components/MultiTextArea/isMainKeywordValid"
import {Prompt} from "react-router-dom"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import AvailableZTHWindow from "./AvailableZTHWindow/AvailableZTHWindow"


const initialProductSettings = {
    portfolio: {
        type: 'CreateNew',
        no_portfolio: false
    },
    campaigns: {
        start_date: moment.tz(`${moment(new Date()).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString(),
        set_to_paused: false,
        main_keywords: [],
        bidding_strategy: 'legacyForSales',
        adjust_bid_by_placements: {},
    },
    brand: {
        competitor_brand_names: []
    },
    relevant_keywords: [],
    negative_keywords: [],
    use_existing_ppc_targetings: true,
    pause_existing_duplicates_of_zth_targetings: true
}

const CreatingCampaign = () => {
    const [currentStep, setCurrentStep] = useState(0),
        [portfolioList, setPortfolioList] = useState([]),
        [addedProducts, setAddedProducts] = useState([{...initialProductSettings}]),
        [openedSteps, setOpenedSteps] = useState(-1),
        [activeProductIndex, setActiveProductIndex] = useState(0),
        [invalidField, setInvalidField] = useState([]),
        [createProcessing, setCreateProcessing] = useState(false),
        [pageLoading, setPageLoading] = useState(true),
        [visibleAvailableWindow, setVisibleAvailableWindow] = useState(false)

    const dispatch = useDispatch()

    const updateProductHandler = (params, isInvalid) => {
        setAddedProducts([{...addedProducts[0], ...params}])

        if (isInvalid) {
            dispatch(zthActions.setInvalidField({
                productIndex: null,
                field: '',
            }))
        }
    }

    const setStepHandler = (step) => {
        const budget = addedProducts[0].campaigns.daily_budget,
            bid = addedProducts[0].campaigns.default_bid

        if (step === 1 && addedProducts.length === 0) {
            notification.error({
                title: 'You haven’t chosen any product yet! ',
                description: 'Please select one product you want to create campaign for.'
            })
        } else if (step >= 2 && (budget < 1 || budget > 1000000 || bid < 0.02 || bid > 1000)) {
            setCurrentStep(1)
            notification.error({title: 'Please enter correct value!'})

            if (budget < 1 || budget > 1000000) setInvalidField(prevState => [...prevState, 'daily_budget'])
            if (bid < 0.02 || bid > 1000) setInvalidField(prevState => [...prevState, 'default_bid'])
        } else if (step === 4) {
            createCampaignHandler()
        } else {
            setCurrentStep(step)
            setOpenedSteps(openedSteps > step - 1 ? openedSteps : step - 1)
        }
    }

    const addProductHandler = (product) => setAddedProducts([{
        ...addedProducts[0], ...product,
        campaigns: {...addedProducts[0].campaigns, main_keywords: []}
    }])

    const fetchPortfolios = async () => {
        try {
            const {result} = await zthServices.getUserPortfolio()
            setPortfolioList(result)
        } catch (e) {
            console.log(e)
            setPortfolioList()
        }
    }

    const createCampaignHandler = async () => {
        try {
            setCreateProcessing(true)

            const setupSettingsFilter = (arr) => {
                return arr.map(product => ({
                    product_id: product.id,
                    portfolio: {
                        type: product.portfolio.type,
                        enum: product.portfolio.type === 'NoPortfolio',
                        ...product.portfolio.type === 'CreateNew' ? {name: product.portfolio.name, ...product.portfolio.monthly_recurring_budget && {monthly_recurring_budget: product.portfolio.monthly_recurring_budget}} : {id: product.portfolio.id}
                    },
                    campaigns: {
                        ...product.campaigns,
                        main_keywords: [
                            ...product.campaigns.main_keywords
                                .filter(item => item.hasMeaningfulWords !== false)
                                .reverse()
                                .filter(item => {
                                    const clearKeyword = cleanMainKeyword(item.value)
                                    return !findExistingDuplicateOfNewMainKeyword(clearKeyword, product.campaigns.main_keywords.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
                                })
                                .reverse()
                                .map(item => item.value)
                        ],
                    },
                    brand: product.brand,
                    relevant_keywords: product.relevant_keywords,
                    negative_keywords: {
                        exact: product.negative_keywords.filter(item => item.type === 'exact').map(item => item.text),
                        phrase: product.negative_keywords.filter(item => item.type === 'phrase').map(item => item.text)
                    },
                    use_existing_ppc_targetings: product.use_existing_ppc_targetings,
                    pause_existing_duplicates_of_zth_targetings: product.pause_existing_duplicates_of_zth_targetings,
                }))
            }

            const res = await zthServices.saveSettings({
                setup_settings: setupSettingsFilter(addedProducts)
            })

            setTimeout(() => {
                history.push('/zero-to-hero/settings/create-success')
                setCreateProcessing(false)
            }, 100)
        } catch (e) {
            console.log(e)
            setCreateProcessing(false)
        }
    }

    const requiredSettingsValidation = () => {
        const product = addedProducts[0]
        if ([
            ...product.campaigns.main_keywords
                .filter(item => item.hasMeaningfulWords !== false)
                .reverse()
                .filter(item => {
                    const clearKeyword = cleanMainKeyword(item.value)
                    return !findExistingDuplicateOfNewMainKeyword(clearKeyword, product.campaigns.main_keywords.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
                })
                .reverse()
                .map(item => item.value)
        ].length < 3) {
            // notification.error({title: 'Please enter at least 3 main keywords'})
            // setField('mainKeywords')
            return true
        } else if (product.portfolio.type === 'CreateNew' && (!product.portfolio.name || product.portfolio.name === '')) {
            // notification.error({title: 'Please enter the portfolio name'})
            // setField('portfolioName')
            return true
        } else if (product.portfolio.type === 'UseExisting' && (!product.portfolio.id)) {
            // notification.error({title: 'Please select the existing portfolio'})
            // setField('portfolioId')
            return true
        } else if (!product.campaigns.daily_budget) {
            // notification.error({title: 'Please enter your daily budged'})
            // setField('dailyBudget')
            return true
        } else if (!product.campaigns.default_bid) {
            // notification.error({title: 'Please enter your default bid'})
            // setField('defaultBid')
            return true
        } else if (!product.brand.name) {
            // notification.error({title: 'Please enter your Brand Name'})
            // setField('brandName')
            return true
        } else {
            return false
        }
    }

    const checkIncompleteJobs = async () => {
        setPageLoading(true)

        try {
            const {result} = await zthServices.checkIncompleteJobs()

            if (result.max_available_count_of_unpaid_zth_for_current_user === 0) setVisibleAvailableWindow(true)
        } catch (e) {
            console.log(e)
        }

        setPageLoading(false)
    }

    useEffect(() => {
        fetchPortfolios()

        checkIncompleteJobs()
    }, [])

    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            <Navigation
                currentStep={currentStep}
                openedSteps={openedSteps}

                onChangeStep={setStepHandler}
            />

            <SelectProduct
                visible={currentStep === 0}
                addedProducts={addedProducts}
                openedSteps={openedSteps}

                onAddProducts={addProductHandler}
                onChangeOpenedSteps={setOpenedSteps}
            />

            {currentStep === 1 && <RequiredSettings
                product={addedProducts[activeProductIndex]}
                portfolioList={portfolioList}
                invalidField={invalidField}

                onUpdate={updateProductHandler}
                onUpdateInvalidFields={setInvalidField}
            />}

            {currentStep === 2 && <OptionalSettings
                product={addedProducts[activeProductIndex]}
                portfolioList={portfolioList}
                invalidField={invalidField}

                onUpdate={updateProductHandler}
            />}

            {currentStep === 3 && <Overview
                product={addedProducts[activeProductIndex]}
            />}

            <StepActions
                currentStep={currentStep}
                product={addedProducts[activeProductIndex]}
                createProcessing={createProcessing}
                disabled={currentStep === 1 ? requiredSettingsValidation() : false}

                onChangeStep={setStepHandler}
            />

            <AvailableZTHWindow
                visible={visibleAvailableWindow}
            />

            <Prompt
                when={openedSteps >= 0 && !createProcessing}
                message={'zth-settings'}
            />
        </div>
    )
}

export default memo(CreatingCampaign)