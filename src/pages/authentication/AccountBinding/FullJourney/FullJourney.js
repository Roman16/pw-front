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
import {userActions} from "../../../../actions/user.actions";
import {useDispatch, useSelector} from "react-redux";
import Navigations from "../components/Navigations/Navigations"

const {Step} = Steps;


const FullJourney = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [fields, setFields] = useState({
        account_name: '',
        account_region: 'north_america',
        account_type: 'seller_account',
        mws_auth_token: '',
        merchant_id: ''
    });
    const {mwsId, userEmail, mwsConnected, ppcConnected} = useSelector(state => ({
        mwsId: state.user.account_links[0].amazon_mws.id,
        userEmail: state.user.user.email,
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
    }))
    const dispatch = useDispatch();

    const [connectMwsStatus, setConnectMwsStatus] = useState('connect')

    const goNextStep = () => {
        if (localStorage.getItem('userFromAgency') && localStorage.getItem('userFromAgency') === userEmail && currentStep === 4) {
            history.push('/success-connect');
        } else {
            setCurrentStep(prevState => prevState + 1);
        }
    }

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
            const res = await userService.setMWS({
                ...fields,
                ...mwsId && {id: mwsId}
            });
            dispatch(userActions.setInformation(res))
            setCurrentStep(prevState => prevState + 1)
        } catch (e) {
            setConnectMwsStatus('error');
        }
    }

    const tryAgainMws = () => {
        setConnectMwsStatus('connect')
    }

    const closeJourney = () => {
        history.push('/welcome')
    }

    useEffect(() => {
        if (mwsConnected && !ppcConnected) {
            history.push('./connect-ppc-account');
        } else if (!mwsConnected && ppcConnected) {
            history.push('./connect-mws-account');
        } else if (mwsConnected && ppcConnected) {
            history.push('/account/api-connections');
        }
    }, [])


    return (
        <div className="amazon-connect full-journey">
            <Navigations
                current={currentStep}
            />

            <div className="container">

                {currentStep === 0 && <ChooseAccount
                    onGoNextStep={goNextStep}
                />}

                {currentStep === 1 && <SelectRegion
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onCancel={closeJourney}
                />}

                {currentStep === 2 && <AccountName
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onChangeInput={changeInputHandler}
                    accountName={fields.account_name}
                    onCancel={closeJourney}
                />}

                {currentStep === 3 && <ConnectMws
                    fields={fields}
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