import React from "react"
import {NavigationButtons} from "../SelectProduct/SelectProduct"
import NegativeKeywords from "./NegativeKeywords/NegativeKeywords"
import './Step4.less'

export const Step4 = ({
                          visible,
                          product,

                          onChangeStep,
                          onUpdate,
                      }) => {

    return (<section className={`step step-4 ${visible ? 'visible' : ''}`}>
        <div className="bg-container">
            <div className="container">
                <div className="section-header">
                    <div className="step-count">Step 5/6</div>
                    <h2>Fine-tuning <span>optional</span></h2>
                    <p>
                        This step is optional and you can skip it if you don't have an additional information requested below.
                    </p>
                </div>

                <div className="edit-block negative_keywords">
                    <div className="col">
                        <label htmlFor="" style={{}}>Negative keywords</label>
                        <p>Add negative keywords to help our software eliminate keywords that are not relevant to your product.</p>
                    </div>

                    <NegativeKeywords
                        keywords={product.negative_keywords}
                        onUpdate={onUpdate}
                    />
                </div>

                <NavigationButtons
                    onNextStep={() => onChangeStep(5)}
                    onPrevStep={() => onChangeStep(3)}
                />
            </div>

            <div className="progress-bar">
                <div/>
            </div>
        </div>
    </section>)

}