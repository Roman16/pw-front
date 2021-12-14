import React from "react"
import './ScanningProcessingStatus.less'

const ScanningProcessingStatus = () => {

    return (<div className={'scanning-processing-status'}>
        <h2>Scanning</h2>
        <p>It takes up to 15 minutes to finish scanning your ads. </p>
        <button className={'btn grey'}>Stop Scanning</button>
    </div>)
}

export default ScanningProcessingStatus