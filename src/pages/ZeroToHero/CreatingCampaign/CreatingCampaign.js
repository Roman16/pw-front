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


const CreatingCampaign = () => {
    const [currentStep, setCurrentStep] = useState(0),
        [portfolioList, setPortfolioList] = useState([]),
        [addedProducts, setAddedProducts] = useState([]),
        [openedSteps, setOpenedSteps] = useState(0),
        [activeProductIndex, setActiveProductIndex] = useState(0)

    const dispatch = useDispatch()

    const {productAmount, invalidField, paidBatch} = useSelector(state => ({
        productAmount: state.zth.productAmount,
        invalidField: state.zth.invalidField.field,
        paidBatch: state.zth.paidBatch
    }))

    const updateProductHandler = (params, isInvalid) => {
        dispatch(zthActions.updateActiveProduct(params))

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
        } else {
            setCurrentStep(step)
            setOpenedSteps(openedSteps > step ? openedSteps : step)
        }
    }

    const addProductHandler = (products) => setAddedProducts(products)

    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            <Navigation
                currentStep={currentStep}
                openedSteps={openedSteps}

                onChangeStep={setCurrentStep}
            />

            <SelectProduct
                visible={currentStep === 0}

                addedProducts={addedProducts}

                onAddProducts={addProductHandler}
            />

            {currentStep === 1 && <RequiredSettings
                visible={currentStep === 1}

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