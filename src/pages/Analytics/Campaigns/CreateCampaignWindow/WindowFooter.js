import React from "react"

const WindowFooter = ({currentStep, goNext, goPrevious}) => {

    return (
        <div className="window-footer">

            {currentStep !== 0 && <button
                className="btn white"
                onClick={goPrevious}
            >
                Previous
            </button>}

            <button
                className="btn default"
                onClick={goNext}
            >
                Next
            </button>
        </div>
    )
}

export default WindowFooter
