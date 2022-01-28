import React, {useState} from "react"
import './ScanningProcessingStatus.less'
import loaderImg from '../../../assets/img/loader.svg'
import {scanningStatusEnums} from "../PPCAudit"
import moment from 'moment'
import ScanAgainWindow from "./ScanAgainWindow"
import {Spin} from "antd"

const ScanningProcessingStatus = ({scanningStatus, stopProcessing, product, onStop, onStart}) => {
    const [visibleWindow, setVisibleWindow] = useState(false)

    if (scanningStatus === scanningStatusEnums.PROCESSING) {
        return (<div className={'scanning-processing-status'}>
            <div className="col">
                <h2>Scanning <img src={loaderImg} alt=""/></h2>
                <p>It takes up to 15 minutes to finish scanning your ads.</p>
            </div>

            <button disabled={stopProcessing} className={'btn grey stop'} onClick={onStop}>
                Stop Scanning
                {stopProcessing && <Spin size={'small'}/>}
            </button>
        </div>)
    } else if (scanningStatus === scanningStatusEnums.FINISHED) {
        return (<>
            <div className={'scanning-processing-status'}>
                <div className="col">
                    <h2>{product.audit_issues_count} problems found</h2>
                    <p className={'last-scan'}>{moment(product.updated_at).format('DD MMM YYYY, HH:mm')}</p>
                </div>

                <button className={'btn grey'} onClick={() => setVisibleWindow(true)}>Scan again</button>
            </div>

            <ScanAgainWindow
                visible={visibleWindow}
                product={product}
                onClose={() => setVisibleWindow(false)}
                onStart={onStart}
            />
        </>)
    } else return ''
}


export default ScanningProcessingStatus