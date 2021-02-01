import React from "react"

const WindowFooter = ({currentStep, goNext, goPrevious, onCreate}) => {

    return (
        <div className="window-footer">

            {currentStep !== 0 && <button
                className="btn white"
                onClick={goPrevious}
            >
                Previous
            </button>}

            {currentStep !== 5 && <button
                className="btn default"
                onClick={goNext}
            >
                Next
            </button>}

            {currentStep === 5 && <button
                className="btn default"
                onClick={onCreate}
            >
                Create Campaign
            </button>}
        </div>
    )
}

export default WindowFooter
