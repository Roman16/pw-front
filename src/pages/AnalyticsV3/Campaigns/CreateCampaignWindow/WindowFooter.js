import React from "react"
import {Spin} from "antd"

const WindowFooter = ({steps, currentStep, goNext, goPrevious, onCreate, createButtonTitle, disableNextStep, processing}) => {

    return (
        <div className="window-footer">

            {currentStep !== 0 && <button
                className="btn white"
                onClick={goPrevious}
                disabled={processing}
            >
                Previous
            </button>}

            {currentStep !== steps.length - 1 && <button
                className="btn default"
                onClick={goNext}
                disabled={disableNextStep}
            >
                Next
            </button>}

            {currentStep === steps.length - 1 && <button
                className="btn default"
                onClick={onCreate}
                disabled={processing}
            >
                {createButtonTitle}

                {processing && <Spin size={'small'}/>}
            </button>}
        </div>
    )
}

export default WindowFooter
