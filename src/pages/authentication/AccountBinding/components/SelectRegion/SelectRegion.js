import React from "react"
import {SVG} from "../../../../../utils/icons"
import './SelectRegion.less'

import americaImage from '../../../../../assets/img/north-america-bg.svg'
import europeImage from '../../../../../assets/img/europe-bg.svg'
import asiaImage from '../../../../../assets/img/asia-pacific-bg.svg'
import {Radio} from "antd"

const SelectRegion = ({onGoNextStep, onGoBackStep, onCancel}) => {

    return (
        <section className={'select-region-section'}>
            <h2>What region is this account in?</h2>

            <ul className="regions">
                <li className={'active'}>
                    <h4>North America</h4>
                    <img src={americaImage} alt=""/>
                    <Radio checked/>
                </li>
                <li>
                    <div className="soon">soon</div>
                    <h4>Europe</h4>
                    <img src={europeImage} alt=""/>
                    <Radio disabled/>
                </li>
                <li>
                    <div className="soon">soon</div>
                    <h4>Asia-Pacific</h4>
                    <img src={asiaImage} alt=""/>
                    <Radio disabled/>
                </li>
            </ul>

            <div className="actions">
                <div className="row">
                    <button type={'button'} className="btn grey back" onClick={onGoBackStep}>
                        <SVG id={'left-grey-arrow'}/>
                        Back
                    </button>

                    <button className="btn default next" onClick={onGoNextStep}>
                        Next
                        <SVG id={'right-white-arrow'}/>
                    </button>
                </div>
                <button className="btn cancel" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </section>
    )
}

export default SelectRegion