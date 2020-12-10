import React from "react"
import {Steps} from 'antd'
import './RegistrationProgress.less'

const {Step} = Steps

const steps = [
    'Advertising goals',
    'Monthly Ad spend',
    'Monthly Sales',
    'Marketplace',
    'Amount of products',
    'Contact Info',
    'Product Details',
]

const RegistrationProgress = ({currentStep}) => {

    return (
        <div className="registration-progress">
            <Steps direction="vertical" size="small" current={currentStep}>
                {steps.map((item, index) => (
                    <Step title={item} />
                ))}
            </Steps>
        </div>
    )
}

export default RegistrationProgress
