import React from "react"
import {Steps} from "antd"

const {Step} = Steps

const steps = [
    'Advertising Type',
    'Campaign',
    'Ad Group',
    'Product Ads',
    'Targetings',
    'Overview',
]

const CreateProcessing = ({step, skippedSteps}) => {

    return (
        <div className="processing-steps">
            <Steps direction="vertical" size="small" current={step}>
                {steps.map((item, index) => (
                    <Step title={item} status={skippedSteps.includes(index) ? 'error' : index < step ? 'finish' : 'wait'}/>
                ))}
            </Steps>

        </div>
    )
}

export default CreateProcessing
