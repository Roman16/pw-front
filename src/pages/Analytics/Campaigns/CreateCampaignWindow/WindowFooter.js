import React from "react"

const WindowFooter = ({steps, currentStep, goNext, goPrevious, onCreate, createButtonTitle, disableNextStep}) => {

    return (
        <div className="window-footer">

            {currentStep !== 0 && <button
                className="btn white"
                onClick={goPrevious}
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
            >
                {createButtonTitle}
            </button>}
        </div>
    )
}

export default WindowFooter
