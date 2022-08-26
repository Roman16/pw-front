import React, {memo, useEffect, useState} from "react"
import '../ZeroToHero.less'
import './CreatingCampaign.less'
import SelectProduct from "./SelectProduct/SelectProduct"
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
import {activeTimezone} from "../../index"
import {SelectedProduct} from "./SelectedProduct/SelectedProduct"
import {Step1} from "./Step1/Step1"
import {Step2} from "./Step2/Step2"
import {Step3} from "./Step3/Step3"
import {Step4} from "./Step4/Step4"


const initialProductSettings = {
    portfolio: {
        type: 'CreateNew',
        no_portfolio: false
    },
    campaigns: {
        start_date: moment.tz(`${moment(new Date()).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, activeTimezone).toISOString(),
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
        [openedSteps, setOpenedSteps] = useState(-1),
        [invalidField, setInvalidField] = useState([]),
        [createProcessing, setCreateProcessing] = useState(false),
        [pageLoading, setPageLoading] = useState(true),
        [visibleAvailableWindow, setVisibleAvailableWindow] = useState(false),
        [selectedProduct, setSelectedProduct] = useState({...initialProductSettings})

    const dispatch = useDispatch()

    const updateProductHandler = (params, isInvalid) => {
        setSelectedProduct(prevState => ({...prevState, ...params}))

        if (isInvalid) {
            dispatch(zthActions.setInvalidField({
                productIndex: null,
                field: '',
            }))
        }
    }

    const setStepHandler = (step) => {
        const budget = selectedProduct.campaigns.daily_budget,
            bid = selectedProduct.campaigns.default_bid

        if (step === 1 && !selectedProduct) {
            notification.error({
                title: 'You haven’t chosen any product yet! ',
                description: 'Please select one product you want to create campaign for.'
            })
        } else if (step >= 2 && (budget < 1 || budget > 1000000 || bid < 0.02 || bid > 1000)) {
            setCurrentStep(1)

            if ((budget < 1 || budget > 1000000) && (bid < 0.02 || bid > 1000)) {
                notification.error({title: 'Please enter correct Daily Budget'})
                setInvalidField(prevState => [...prevState, 'daily_budget', 'default_bid'])
            } else if (budget < 1 || budget > 1000000) {
                setInvalidField(prevState => [...prevState, 'daily_budget'])
                notification.error({title: 'Please enter correct Daily Budget'})
            } else if (bid < 0.02 || bid > 1000) {
                setInvalidField(prevState => [...prevState, 'default_bid'])
                notification.error({title: 'Please enter correct Default Bid'})
            }

            setTimeout(() => {
                document.querySelector('.error-field') && document.querySelector('.error-field').scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                })
            }, 10)
        } else if (step === 6) {
            createCampaignHandler()
        } else {
            setCurrentStep(step)
            setOpenedSteps(openedSteps > step - 1 ? openedSteps : step - 1)
        }
    }


    const addProductHandler = (product) => setSelectedProduct({
        ...product,
        ...initialProductSettings
    })

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
                setup_settings: setupSettingsFilter([selectedProduct])
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
        const product = selectedProduct
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
            <div className="steps">
                <SelectProduct
                    visible={currentStep === 0}
                    selectedProduct={selectedProduct}
                    openedSteps={openedSteps}

                    onAddProducts={addProductHandler}
                    onChangeOpenedSteps={setOpenedSteps}
                    onChangeStep={setStepHandler}
                />

                <Step1
                    visible={currentStep === 1}
                    product={selectedProduct}
                    portfolioList={portfolioList}
                    invalidField={invalidField}

                    onUpdate={updateProductHandler}
                    onUpdateInvalidFields={setInvalidField}
                    onChangeStep={setStepHandler}
                />

                <Step2
                    visible={currentStep === 2}
                    product={selectedProduct}
                    invalidField={invalidField}

                    onUpdate={updateProductHandler}
                    onUpdateInvalidFields={setInvalidField}
                    onChangeStep={setStepHandler}
                />

                <Step3
                    visible={currentStep === 3}
                    product={selectedProduct}

                    onUpdate={updateProductHandler}
                    onChangeStep={setStepHandler}
                />

                <Step4
                    visible={currentStep === 4}
                    product={selectedProduct}

                    onUpdate={updateProductHandler}
                    onChangeStep={setStepHandler}
                />

                {/*{currentStep === 2 && <OptionalSettings*/}
                {/*    product={selectedProduct}*/}
                {/*    portfolioList={portfolioList}*/}
                {/*    invalidField={invalidField}*/}

                {/*    onUpdate={updateProductHandler}*/}
                {/*/>}*/}

                {currentStep === 5 && <Overview
                    product={selectedProduct}
                    onChangeStep={setStepHandler}
                    onCreate={createCampaignHandler}
                />}
            </div>

            <SelectedProduct
                product={selectedProduct}
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