import React from "react"
import './StepActions.less'

const StepActions = ({currentStep, onChangeStep}) => {

    return (
        <div className="zth-step-actions">
            <button className="sds-btn white">Cancel</button>
            <button className="sds-btn default" onClick={() => onChangeStep(currentStep + 1)}>Next</button>
        </div>
    )
}

export default StepActions