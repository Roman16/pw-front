import React, {useEffect} from "react"

const steps = [
    'Contact information',
    'Brand information',
    'Monthly Ad Spend',
    'Monthly Sales',
    'Marketplace',
    'Amount of products',
    'Your goal'
]

let lastAvailableStep = 0

const Steps = ({activeStep, goToStep}) => {
    const setStepHandler = (index) => {
        if (index <= lastAvailableStep) goToStep(index)
    }

    useEffect(() => {
        if (activeStep > lastAvailableStep) lastAvailableStep = activeStep
    }, [activeStep])

    return (<div className="steps">
        <ul>
            {steps.map((step, index) => <li
                onClick={() => setStepHandler(index)}
                className={activeStep === index ? 'active' : index <= lastAvailableStep ? 'finished' : ''}>
                {step}

                <div className="bg">
                    <span>{step}</span>
                </div>
            </li>)}
        </ul>
    </div>)
}

export default Steps