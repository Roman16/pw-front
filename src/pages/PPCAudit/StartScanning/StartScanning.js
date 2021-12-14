import React from "react"
import './StartScanning.less'
import img from '../../../assets/img/scanner/start-scanning-img.svg'
import InputCurrency from "../../../components/Inputs/InputCurrency"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

const StartScanning = ({onStart}) => {

    return (<div className="start-scanning">
        <img src={img} alt=""/>
        <h2>Start scanning</h2>
        <p>
            Enter your COGS Lorem ipsum dolor sit amet, <br/> consectetur adipiscing elit.
        </p>

        <div className="form-group">
            <label htmlFor="">
                Enter COGS <InformationTooltip/>
            </label>

            <InputCurrency/>
        </div>

        <button className="btn default" onClick={onStart}>
            Start scanning
        </button>
    </div>)
}


export default StartScanning