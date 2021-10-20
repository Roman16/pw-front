import React, {useState} from "react"
import '../components/Steps.less'
import {SVG} from "../../../../utils/icons"
import {history} from "../../../../utils/history"
import {Steps} from "antd"
import ConnectMws from "../components/ConnectMws/ConnectMws"
import SuccessPage from "../components/SuccessPage/SuccessPage"
import {userService} from "../../../../services/user.services"
import {userActions} from "../../../../actions/user.actions"
import {useDispatch, useSelector} from "react-redux"
import Navigations from "../components/Navigations/Navigations"

const {Step} = Steps

const customDot = (dot) => (
    <span>
        {dot}
    </span>
)

const ConnectMWSJourney = () => {
    const [currentStep, setCurrentStep] = useState(3)
    const [fields, setFields] = useState({})
    const [connectMwsStatus, setConnectMwsStatus] = useState('connect')
    const dispatch = useDispatch()

    const {mwsId, mwsConnected} = useSelector(state => ({
        mwsId: state.user.account_links[0].amazon_mws.id,
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
    }))

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
            const res = await userService.setMWS({
                ...fields,
                ...mwsId && {id: mwsId}
            })
            dispatch(userActions.setInformation(res))
            setCurrentStep(prevState => prevState + 1)
        } catch (e) {
            setConnectMwsStatus('error')
        }
    }

    const tryAgainMws = () => {
        setConnectMwsStatus('connect')
    }

    if (mwsConnected) {
        history.push('/account/api-connections')
    }

    return (
        <div className="amazon-connect full-journey">
            <Navigations
                current={currentStep}
            />

            <div className="container">
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
}

export default ConnectMWSJourney
