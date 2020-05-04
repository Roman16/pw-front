import React, {useState} from "react";
import '../components/Steps.less';
import {SVG} from "../../../../utils/icons";
import {history} from "../../../../utils/history";
import {Steps} from "antd";
import ConnectMws from "../components/ConnectMws/ConnectMws";
import SuccessPage from "../components/SuccessPage/SuccessPage";
import {userService} from "../../../../services/user.services";
import {userActions} from "../../../../actions/user.actions";
import {useDispatch} from "react-redux";

const {Step} = Steps;

const customDot = (dot) => (
    <span>
        {dot}
    </span>
);

const ConnectMWSJourney = () => {
    const [currentStep, setCurrentStep] = useState(3);
    const [fields, setFields] = useState({});
    const [connectMwsStatus, setConnectMwsStatus] = useState('connect')
    const dispatch = useDispatch();

    const closeJourney = () => {
        history.push('./account-settings')
    }

    const goNextStep = () => setCurrentStep(prev => prev + 1);

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
            dispatch(userActions.setInformation(res))
            setCurrentStep(prevState => prevState + 1)
        } catch (e) {
            setConnectMwsStatus('error');
        }
    }

    const tryAgainMws = () => {
        setConnectMwsStatus('connect')
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
                    <Step title="Connect Amazon Advertising" status={'finish'}/>
                </Steps>

                {currentStep === 3 && <ConnectMws
                    onGoNextStep={goNextStep}
                    onChangeInput={changeInputHandler}
                    onConnectMws={onConnectMws}
                    connectMwsStatus={connectMwsStatus}
                    onClose={closeJourney}
                    tryAgainMws={tryAgainMws}
                />}

                {currentStep === 4 && <SuccessPage/>}
            </div>
        </div>
    )
};

export default ConnectMWSJourney;