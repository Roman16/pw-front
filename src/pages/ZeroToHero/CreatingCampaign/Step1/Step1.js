import React from "react"
import {Input} from "antd"
import MultiTextArea from "../../components/MultiTextArea/MultiTextArea"
import './Step1.less'
import {NavigationButtons} from "../SelectProduct/SelectProduct"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {SeedKeywords} from "./SeedKeywords/SeedKeywords"
import {
    cleanMainKeyword,
    findExistingDuplicateOfNewMainKeyword
} from "../../components/MultiTextArea/isMainKeywordValid"


export const Step1 = ({
                          visible,
                          invalidField,
                          onUpdate,

                          product: {
                              campaigns,
                              brand,
                              name
                          },

                          onChangeStep,
                      }) => {


    const changeBrandHandler = (value, isInvalid) => {
        onUpdate({
            brand: {
                ...brand,
                ...value
            }
        }, isInvalid)
    }

    return (<section className={`step step-1 ${visible ? 'visible' : ''}`}>
        <div className="bg-container">
            <div className="container">
                <div className="section-header">
                    <div className="step-count">Step 2/6</div>
                    <h2>Tell us about your product</h2>
                    <p>
                        In this step Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh donec sed egestas
                        faucibus.
                    </p>
                </div>

                <div className={`form-group col edit-block name`}>
                    <label htmlFor="">
                        Your Brand Name
                    </label>

                    <Input
                        maxLength={80}
                        placeholder={'Your Brand Name'}
                        value={brand.name}
                        onChange={({target: {value}}) => changeBrandHandler({name: value}, invalidField === 'brandName')}
                    />
                </div>

                <div className={`col text-area-group edit-block competitor_brand_names`}>
                    <label>
                        Competitors Brand Names
                    </label>
                    <p>
                        Add minimum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh donec sed egestas
                        faucibus.
                    </p>

                    <MultiTextArea
                        unique={true}
                        value={brand.competitor_brand_names}
                        onChange={(competitor_brand_names) => changeBrandHandler({competitor_brand_names}, invalidField === 'brandCompetitorsNames')}
                    />
                </div>

                <SeedKeywords
                    campaigns={campaigns}
                    name={name}

                    onUpdate={onUpdate}
                />

                <NavigationButtons
                    disabled={!brand.name || brand.competitor_brand_names.length === 0 || [
                        ...campaigns.main_keywords
                            .filter(item => item.hasMeaningfulWords !== false)
                            .filter(item => {
                                const clearKeyword = cleanMainKeyword(item.value)
                                return !findExistingDuplicateOfNewMainKeyword(clearKeyword, campaigns.main_keywords.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
                            })
                    ].length < 3}

                    onNextStep={() => onChangeStep(2)}
                    onPrevStep={() => onChangeStep(0)}
                />
            </div>

            <div className="progress-bar">
                <div/>
            </div>
        </div>
    </section>)

}