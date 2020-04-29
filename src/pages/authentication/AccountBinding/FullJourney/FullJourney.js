import React, {useEffect, useState} from "react";
import {Steps} from 'antd';
import {SVG} from "../../../../utils/icons";
import ChooseAccount from "../components/ChooseAccount/ChooseAccount";
import AccountName from "../components/AccountName/AccountName";
import ConnectPpc from "../components/ConnectPpc/ConnectPpc";
import SelectRegion from "../components/SelectRegion/SelectRegion";
import ConnectMws from "../components/ConnectMws/ConnectMws";
import SuccessPage from "../components/SuccessPage/SuccessPage";
import {history} from "../../../../utils/history";

import '../components/Steps.less';
import {userService} from "../../../../services/user.services";

const {Step} = Steps;

const customDot = (dot) => (
    <span>
        {dot}
    </span>
);

const FullJourney = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [fields, setFields] = useState({
        region: 'north_america',
        account: 'seller_account'
    });
    const [connectMwsStatus, setConnectMwsStatus] = useState('connect')

    const goNextStep = () => setCurrentStep(prevState => prevState + 1)

    const goBackStep = () => setCurrentStep(prevState => prevState - 1)

    const changeInputHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const onConnectMws = async (e) => {
        e.preventDefault();
        setConnectMwsStatus('processing');

        try {
            const res = await userService.setMWS(fields);
            setCurrentStep(prevState => prevState + 1)
        } catch (e) {
            setConnectMwsStatus('error');
        }
    }

    const tryAgainMws = () => {
        setConnectMwsStatus('connect')
    }

    const closeJourney = () => {
        history.push('./welcome')
    }

    return (
        <div className="amazon-connect full-journey">
            <div className="container">
                <button className={'close-connect'} onClick={closeJourney}>
                    <SVG id='close-page'/>
                </button>

                <Steps size="small" current={currentStep} progressDot={customDot}>
                    <Step title="Choose Account"/>
                    <Step title="Name Your Account"/>
                    <Step title="Select Region"/>
                    <Step title="Connect MWS"/>
                    <Step title="Connect Amazon Advertising"/>
                </Steps>

                {currentStep === 0 && <ChooseAccount
                    onGoNextStep={goNextStep}
                />}

                {currentStep === 1 && <AccountName
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onChangeInput={changeInputHandler}
                />}

                {currentStep === 2 && <SelectRegion
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                />}

                {currentStep === 3 && <ConnectMws
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onChangeInput={changeInputHandler}
                    onConnectMws={onConnectMws}
                    connectMwsStatus={connectMwsStatus}
                    onClose={closeJourney}
                    tryAgainMws={tryAgainMws}
                />}

                {currentStep === 4 && <ConnectPpc
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onClose={closeJourney}
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