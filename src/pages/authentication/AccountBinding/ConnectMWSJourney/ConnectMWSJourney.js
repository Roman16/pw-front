import React, {useState} from "react"
import '../components/Steps.less'
import {history} from "../../../../utils/history"
import ConnectMws from "../components/ConnectMws/ConnectMws"
import SuccessPage from "../components/SuccessPage/SuccessPage"
import {userService} from "../../../../services/user.services"
import {userActions} from "../../../../actions/user.actions"
import {useDispatch, useSelector} from "react-redux"
import Navigations from "../components/Navigations/Navigations"
import _ from 'lodash'

const ConnectMWSJourney = ({match}) => {
    const [currentStep, setCurrentStep] = useState(1)

    const [connectMwsStatus, setConnectMwsStatus] = useState('connect')
    const connectedAmazonAccounts = useSelector(state => state.user.amazonRegionAccounts)

    const [fields, setFields] = useState({
        mws_auth_token: '',
        seller_id: _.find(connectedAmazonAccounts, {region_type: match.params.regionType}).seller_id,
        region_type: match.params.regionType
    })

    const dispatch = useDispatch()


    const closeJourney = () => {
        history.push('/account/api-connections')
    }

    const goNextStep = () => setCurrentStep(prev => prev + 1)

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
          const {result} =  await userService.attachMWS({
                mws_auth_token: fields.mws_auth_token,
                amazon_region_account_id: _.find(connectedAmazonAccounts, {region_type: match.params.regionType}).id
            })

            dispatch(userActions.updateAmazonRegionAccount(result))

            setCurrentStep(3)
        } catch (e) {
            setConnectMwsStatus('error')
        }
    }

    const tryAgainMws = () => {
        setConnectMwsStatus('connect')
    }

    return (
        <div className="amazon-connect full-journey">
            <Navigations
                current={currentStep}
            />

            <div className="container">
                {currentStep === 1 && <ConnectMws
                    onGoNextStep={goNextStep}
                    onChangeInput={changeInputHandler}
                    onConnectMws={onConnectMws}
                    connectMwsStatus={connectMwsStatus}
                    fields={fields}
                    onClose={closeJourney}
                    tryAgainMws={tryAgainMws}
                    disabled={true}
                />}

                {currentStep === 3 && <SuccessPage/>}
            </div>
        </div>
    )
}

export default ConnectMWSJourney
