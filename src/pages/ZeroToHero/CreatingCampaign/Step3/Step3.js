import React from "react"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {NavigationButtons} from "../SelectProduct/SelectProduct"
import './Step3.less'
import RelevantKeywords from "./RelevantKeywords/RelevantKeywords"

export const Step3 = ({
                          visible,
                          product,

                          onChangeStep,
                          onUpdate
                      }) => {

    return (<section className={`step step-3 ${visible ? 'visible' : ''}`}>
        <div className="bg-container">
            <div className="container">
                <div className="section-header">
                    <div className="step-count">Step 4/6</div>
                    <h2>Fine-tuning <span>optional</span></h2>
                    <p>
                        This step is optional and you can skip it if you don't have an additional information requested below.
                    </p>
                </div>

                <RelevantKeywords
                    keywords={product.relevant_keywords}
                    onUpdate={onUpdate}
                />

                <NavigationButtons
                    onNextStep={() => onChangeStep(4)}
                    onPrevStep={() => onChangeStep(2)}
                />
            </div>

            <div className="progress-bar">
                <div/>
            </div>
        </div>
    </section>)
}