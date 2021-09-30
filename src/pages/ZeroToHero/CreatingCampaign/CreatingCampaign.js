import React, {memo, useState} from "react"
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
        [addedProducts, setAddedProducts] = useState([]),
        [openedSteps, setOpenedSteps] = useState(0),
        [activeProductIndex, setActiveProductIndex] = useState(0),
        [invalidField, setInvalidField] = useState()

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
        if (step === 1 && addedProducts.length === 0) {
            notification.error({
                title: 'You haven’t chosen any product yet! ',
                description: 'Please select one product you want to create campaign for.'
            })
        } else if (step === 4) {
            history.push('/zero-to-hero/settings/create-success')
        } else {
            setCurrentStep(step)
            setOpenedSteps(openedSteps > step - 1 ? openedSteps : step - 1)
        }
    }

    const addProductHandler = (products) => setAddedProducts([...products.map(i => ({...i, ...initialProductSettings}))])

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

                onAddProducts={addProductHandler}
            />

            {currentStep === 1 && <RequiredSettings
                product={addedProducts[activeProductIndex]}
                portfolioList={portfolioList}
                invalidField={invalidField}

                onUpdate={updateProductHandler}
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

                onChangeStep={setStepHandler}
            />
        </div>
    )
}

export default memo(CreatingCampaign)