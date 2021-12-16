import React, {useState} from "react"
import './StartScanning.less'
import img from '../../../assets/img/scanner/start-scanning-img.svg'
import InputCurrency from "../../../components/Inputs/InputCurrency"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import CogsWindow from "../../PPCAutomate/OptimizationForAdmin/OptimizationSettings/CogsWindow"

const StartScanning = ({onStart, product}) => {
    const [visibleCogsWindow, setVisibleCogsWindow] = useState(false)

    return (<>
        <div className="start-scanning-section">
            <img src={img} alt=""/>
            <h2>Start scanning</h2>
            <p>
                Enter your COGS Lorem ipsum dolor sit amet, <br/> consectetur adipiscing elit.
            </p>

            <div className="form-group">
                <label htmlFor="">
                    Enter COGS <InformationTooltip/>
                </label>

                <InputCurrency
                    disabled
                    onClick={() => setVisibleCogsWindow(true)}
                />
            </div>

            <button className="btn default" onClick={onStart}>
                Start scanning
            </button>

            <p className="rescan-description">
                <b>Note:</b> After starting new scanning the current scanning <br/> results will be lost.
            </p>
        </div>

        <CogsWindow
            visible={visibleCogsWindow}
            productId={product && product.id}
            // productId={product.product_id}
            product={product}
            onSetCogs={() => {
            }}
            setCurrentCogs={() => {
            }}
            onClose={() => {
                setVisibleCogsWindow(false)
            }}
        />
    </>)
}


export default StartScanning