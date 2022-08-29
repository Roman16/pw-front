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
                        In this step Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh donec sed egestas
                        faucibus.
                    </p>
                </div>

                <div className="edit-block negative_keywords">
                    <div className="col">
                        <label htmlFor="" style={{}}>Negative keywords</label>
                        <p>Add minimum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh donec sed
                            egestas</p>
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