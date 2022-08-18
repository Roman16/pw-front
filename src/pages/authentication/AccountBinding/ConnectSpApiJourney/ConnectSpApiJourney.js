import React, {useState} from "react"
import '../components/Steps.less'
import {history} from "../../../../utils/history"
import ConnectSpApi from "../components/ConnectSpApi/ConnectSpApi"
import SuccessPage from "../components/SuccessPage/SuccessPage"
import {userService} from "../../../../services/user.services"
import {userActions} from "../../../../actions/user.actions"
import {useDispatch, useSelector} from "react-redux"
import Navigations from "../components/Navigations/Navigations"
import _ from 'lodash'

const ConnectSpApiJourney = ({match}) => {
    const [currentStep, setCurrentStep] = useState(1)

    const connectedAmazonAccounts = useSelector(state => state.user.amazonRegionAccounts)

    const closeJourney = () => {
        history.push('/account/api-connections')
    }

    const goNextStep = () => setCurrentStep(3)

    return (
        <div className="amazon-connect full-journey">
            <Navigations
                current={currentStep}
            />

            <div className="container">
                {currentStep === 1 && <ConnectSpApi
                    regionId={match.params.regionId}
                    region={_.find(connectedAmazonAccounts, {id: +match.params.regionId}).region_type}

                    onGoNextStep={goNextStep}
                    onClose={closeJourney}
                />}

                {currentStep === 3 && <SuccessPage/>}
            </div>
        </div>
    )
}

export default ConnectSpApiJourney
