import React from "react"
import {Progress, Steps} from 'antd'
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
        <>
            <div className="registration-progress desc">
                <Steps direction="vertical" size="small" current={currentStep}>
                    {steps.map((item, index) => (
                        <Step title={item}/>
                    ))}
                </Steps>
            </div>

            <div className="registration-progress mob">
                <div className="progress-block">
                    <Progress strokeColor={'#6D6DF6'} type="circle" percent={(100 / 7) * (currentStep + 1)}
                              format={percent => ``}/>
                    <div className="step">
                        {currentStep === 7 ?
                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 12.6667L9.2 20L23.6 2" stroke="#6D6DF6" stroke-width="4"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            :
                            <><span>{currentStep + 1}</span> of 7 </>
                        }
                    </div>
                </div>
                <h2>{currentStep === 7 ? 'Done!' : steps[currentStep]}</h2>
            </div>
        </>
    )
}

export default RegistrationProgress
