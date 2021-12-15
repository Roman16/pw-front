import React from "react"
import './ScanningProcessingStatus.less'
import loaderImg from '../../../assets/img/loader.svg'
import {scanningStatusEnums} from "../PPCAudit"
import moment from 'moment'

const ScanningProcessingStatus = ({scanningStatus, onStop}) => {
    if (scanningStatus === scanningStatusEnums.PROCESSING) {
        return (<div className={'scanning-processing-status'}>
            <div className="col">
                <h2>Scanning <img src={loaderImg} alt=""/></h2>
                <p>It takes up to 15 minutes to finish scanning your ads.</p>
            </div>

            <button className={'btn grey stop'} onClick={onStop}>Stop Scanning</button>
        </div>)
    } else if (scanningStatus === scanningStatusEnums.FINISHED) {
        return (<div className={'scanning-processing-status'}>
            <div className="col">
                <h2>100 problems found</h2>
                <p className={'last-scan'}>{moment().format('DD MMM YYYY, HH:mm')}</p>
            </div>

            <button className={'btn grey'}>Scan again</button>
        </div>)
    } else return ''
}


export default ScanningProcessingStatus