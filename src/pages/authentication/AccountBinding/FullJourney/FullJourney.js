import React, {useEffect, useState} from "react";
import {Steps} from 'antd';
import LogoBlock from "../components/LogoBlock/LogoBlock";
import {SVG} from "../../../../utils/icons";
import ChooseAccount from "../components/ChooseAccount/ChooseAccount";
import AccountName from "../components/AccountName/AccountName";
import ConnectPpc from "../components/ConnectPpc/ConnectPpc";
import SelectRegion from "../components/SelectRegion/SelectRegion";
import ConnectMws from "../components/ConnectMws/ConnectMws";
import SuccessPage from "../components/SuccessPage/SuccessPage";

const {Step} = Steps;

const customDot = (dot) => (
    <span>
        {dot}
    </span>
);

const FullJourney = () => {
    const [currentStep, setCurrentStep] = useState(2);

    const goNextStep = () => setCurrentStep(prevState => prevState + 1)

    const goBackStep = () => setCurrentStep(prevState => prevState - 1)

    useEffect(() => {
        console.log(currentStep);
    }, [currentStep])

    return (
        <div className="amazon-connect full-journey">
            <div className="container">
                <button className={'close-connect'}>
                    <SVG id='close-page'/>
                </button>

                <LogoBlock/>

                <Steps size="small" current={currentStep} progressDot={customDot}>
                    <Step title="Choose Account"/>
                    <Step title="Name Your Account"/>
                    <Step title="Connect Amazon Advertising"/>
                    <Step title="Select Region"/>
                    <Step title="Connect MWS"/>
                </Steps>

                {currentStep === 0 && <ChooseAccount
                    onGoNextStep={goNextStep}
                />}

                {currentStep === 1 && <AccountName
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                />}

                {currentStep === 2 && <ConnectPpc
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                />}

                {currentStep === 3 && <SelectRegion
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                />}

                {currentStep === 4 && <ConnectMws
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                />}

                {currentStep === 5 && <SuccessPage
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                />}
            </div>
        </div>
    )
};

export default FullJourney;