import React from "react"
import {Steps} from "antd"
import {SVG} from "../../../../utils/icons"

const {Step} = Steps

const steps = [
    'Advertising Type',
    'Campaign',
    'Ad Group',
    'Product Ads',
    'Targetings',
    'Overview',
]

const CreateProcessing = ({step, skippedSteps, setStep, finishedSteps, processSteps}) => {
    const getStepStatus = (step) => {
        if (skippedSteps.includes(step)) return 'error'
        else if (finishedSteps.includes(step) && !skippedSteps.includes(step + 1)) return 'finish'
        else if (skippedSteps.includes(step + 1) || processSteps.includes(step)) return 'process'
        else return 'wait'
    }

    return (
        <div className="processing-steps">
            <Steps direction="vertical" size="small" current={step}>
                {steps.map((item, index) => (
                    <Step
                        onClick={() => setStep(index)}
                        title={item}
                        status={getStepStatus(index)}
                        icon={<SVG id={'checked-white-icon'}/>}
                    />
                ))}
            </Steps>

        </div>
    )
}

export default React.memo(CreateProcessing)
