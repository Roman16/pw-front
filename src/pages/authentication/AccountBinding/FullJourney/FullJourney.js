import React, {useEffect, useState} from "react"
import ChooseAccount from "../components/ChooseAccount/ChooseAccount"
import AccountName from "../components/AccountName/AccountName"
import ConnectPpc from "../components/ConnectPpc/ConnectPpc"
import SelectRegion from "../components/SelectRegion/SelectRegion"
import ConnectMws from "../components/ConnectMws/ConnectMws"
import SuccessPage from "../components/SuccessPage/SuccessPage"
import {history} from "../../../../utils/history"
import _ from 'lodash'

import '../components/Steps.less'
import {userService} from "../../../../services/user.services"
import {userActions} from "../../../../actions/user.actions"
import {useDispatch, useSelector} from "react-redux"
import Navigations from "../components/Navigations/Navigations"

const FullJourney = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [fields, setFields] = useState({
        account_alias: '',
        region_type: 'NORTH_AMERICA',
        mws_auth_token: '',
        seller_id: ''
    })
    const {userEmail} = useSelector(state => ({
            userEmail: state.user.user.email,
        })),
        connectedAmazonAccounts = useSelector(state => state.user.amazonRegionAccounts)

    const dispatch = useDispatch()

    const [connectMwsStatus, setConnectMwsStatus] = useState('connect')

    const goNextStep = () => {
        if (localStorage.getItem('userFromAgency') && localStorage.getItem('userFromAgency') === userEmail && currentStep === 4) {
            history.push('/success-connect')
        } else {
            setCurrentStep(prevState => prevState + 1)
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
        e.preventDefault()
        setConnectMwsStatus('processing')

        try {
            const {result} = await userService.createAmazonRegionAccount({
                ...fields,
            })

            dispatch(userActions.setAmazonRegionAccounts([...connectedAmazonAccounts, result]))

            setCurrentStep(prevState => prevState + 1)
        } catch (e) {
            setConnectMwsStatus('error')
        }
    }

    const tryAgainMws = () => {
        setConnectMwsStatus('connect')
    }

    const closeJourney = () => {
        history.push('/welcome')
    }

    useEffect(() => {
        if (_.find(connectedAmazonAccounts, {region_type: 'NORTH_AMERICA'}) && _.find(connectedAmazonAccounts, {region_type: 'EUROPE'}) && _.find(connectedAmazonAccounts, {region_type: 'FAR_EAST'})) {
            setFields({
                ...fields,
                region_type: undefined
            })
        } else if (_.find(connectedAmazonAccounts, {region_type: 'NORTH_AMERICA'}) && _.find(connectedAmazonAccounts, {region_type: 'EUROPE'})) {
            setFields({
                ...fields,
                region_type: 'FAR_EAST'
            })
        } else if (_.find(connectedAmazonAccounts, {region_type: 'NORTH_AMERICA'})) {
            setFields({
                ...fields,
                region_type: 'EUROPE'
            })
        } else {
            setFields({
                ...fields,
                region_type: 'NORTH_AMERICA'
            })
        }
    }, [connectedAmazonAccounts])

    return (
        <div className="amazon-connect full-journey">
            <Navigations
                current={currentStep}
            />

            <div className="container">

                {currentStep === 0 && <ChooseAccount
                    onGoNextStep={goNextStep}
                    onCancel={closeJourney}
                />}

                {currentStep === 1 && <SelectRegion
                    connectedAmazonAccounts={connectedAmazonAccounts}
                    region={fields.region_type}
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onCancel={closeJourney}
                    onChangeInput={changeInputHandler}

                />}

                {currentStep === 2 && <AccountName
                    onGoNextStep={goNextStep}
                    onGoBackStep={goBackStep}
                    onChangeInput={changeInputHandler}
                    accountName={fields.account_alias}
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
                    regionId={_.find(connectedAmazonAccounts, {region_type: fields.region_type}).id}
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
}

export default FullJourney