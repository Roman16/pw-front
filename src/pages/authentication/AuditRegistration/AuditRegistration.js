import React, {useState} from "react"
import './AuditRegistration.less'
import logo from '../../../assets/img/ProfitWhales-logo-white.svg'
import {history} from "../../../utils/history"
import amazonSpnWhiteLogo from '../../../assets/img/amazon-spn-logo-white.png'
import advertisingWhiteLogo from '../../../assets/img/logo/amazon-advertising-white.png'
import UserComments from "./UserComments/UserComments"
import RegistrationProgress from "./RegistrationProgress/RegistrationProgress"
import RegistrationForm from "./RegistrationForm/RegistrationForm"

const AuditRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <div className="audit-registration-page">
            <div className="logo-block" onClick={() => history.push('/')}>
                <img src={logo} alt=""/>
            </div>

            <div className="registration-description">
                <h1>
                    <span>Get</span> Your Amazon Advertising Campaigns <span>Reviews Today</span>
                </h1>

                <p>
                    This is not an automated, computer-generated audit. We recognize and embrace the value of <br/>
                    artificial intelligence, but we find that actual human involvement is required to best
                    identify <br/>
                    potential concerns and opportunities.
                </p>
            </div>

            <div className="row">
                <RegistrationForm
                    setStep={value => setCurrentStep(value)}
                />

                <UserComments currentStep={currentStep}/>
            </div>

            <div className="registration-footer">
                <p>
                    We are an official partner on the Amazon Service Provider <br/>
                    Network and with Amazon Advertising.
                </p>

                <div className="logos">
                    <img src={amazonSpnWhiteLogo} alt=""/>
                    <img src={advertisingWhiteLogo} alt=""/>
                </div>
            </div>
        </div>
    )

}

export default AuditRegistration
