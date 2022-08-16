import React, {useState} from "react"
import '../components/Steps.less'
import SuccessPage from "../components/SuccessPage/SuccessPage"
import ConnectPpc from "../components/ConnectPpc/ConnectPpc"
import {history} from "../../../../utils/history"
import Navigations from "../components/Navigations/Navigations"

const ConnectPPCJourney = ({match}) => {
    const [currentStep, setCurrentStep] = useState(2)

    const closeJourney = () => {
        history.push('/account/api-connections')
    }

    const goNextStep = () => setCurrentStep(prev => prev + 1)

    return (
        <div className="amazon-connect full-journey">
            <Navigations
                current={currentStep}
            />

            <div className="container">
                {currentStep === 2 && <ConnectPpc
                    regionId={match.params.regionId}

                    onGoNextStep={goNextStep}
                    onGoBackStep={closeJourney}
                    onClose={closeJourney}
                />}

                {currentStep === 3 && <SuccessPage/>}
            </div>
        </div>

    )
}

export default ConnectPPCJourney