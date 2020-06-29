import React, {useState} from "react";
import '../components/Steps.less';
import {Steps} from "antd";
import SuccessPage from "../components/SuccessPage/SuccessPage";
import {SVG} from "../../../../utils/icons";
import ConnectPpc from "../components/ConnectPpc/ConnectPpc";
import {history} from "../../../../utils/history";
import {useSelector} from "react-redux";

const {Step} = Steps;

const customDot = (dot) => (
    <span>
        {dot}
    </span>
);

const ConnectPPCJourney = () => {
    const [currentStep, setCurrentStep] = useState(4);
    const {ppcConnected} = useSelector(state => ({
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
    }));

    const closeJourney = () => {
        history.push('./account/api-connections')
    }

    const goNextStep = () => setCurrentStep(prev => prev + 1)

    if (ppcConnected) {
        history.push('/account/api-connections')
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

                {currentStep === 4 && <ConnectPpc
                    onGoNextStep={goNextStep}
                    onGoBackStep={closeJourney}
                    onClose={closeJourney}
                />}

                {currentStep === 5 && <SuccessPage/>}
            </div>
        </div>

    )
};

export default ConnectPPCJourney;