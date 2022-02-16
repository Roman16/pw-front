import React, {useState} from "react"
import './ScanningProcessingStatus.less'
import loaderImg from '../../../assets/img/loader.svg'
import {scanningStatusEnums} from "../PPCAudit"
import moment from 'moment'
import ScanAgainWindow from "./ScanAgainWindow"
import {Spin} from "antd"

const ScanningProcessingStatus = ({scanningStatus, stopProcessing, product, onStop, onStart, onUpdateCogs, onOpenStrategyDescription}) => {
    const [visibleWindow, setVisibleWindow] = useState(false)

    const isExpired = product.performed_at ? moment().diff(moment(product.performed_at), 'days') > 7 : false


    const restartHandler = (props) => {
        onStart(props)
        setVisibleWindow(false)
    }

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
                    {isExpired ?
                        <p className={'last-scan'}>
                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M24.3888 24.9998H1.61555C0.872165 24.9998 0.38867 24.2175 0.721121 23.5526L12.1078 0.779348C12.4763 0.0422991 13.5281 0.0423016 13.8966 0.77935L25.2832 23.5526C25.6157 24.2175 25.1322 24.9998 24.3888 24.9998ZM13.0022 8.27962C12.2327 8.27962 11.6089 8.90345 11.6089 9.67298C11.6089 10.4425 12.2327 11.0663 13.0022 11.0663C13.7717 11.0663 14.3956 10.4425 14.3956 9.67298C14.3956 8.90345 13.7717 8.27962 13.0022 8.27962ZM15.4406 22.2132C15.8254 22.2132 16.1373 21.9013 16.1373 21.5165C16.1373 21.1317 15.8254 20.8198 15.4406 20.8198C15.0558 20.8198 14.7439 20.5079 14.7439 20.1232V13.1564C14.7439 12.7716 14.432 12.4597 14.0472 12.4597H11.9572H11.2605C10.8758 12.4597 10.5638 12.7716 10.5638 13.1564C10.5638 13.5411 10.8758 13.853 11.2605 13.853C11.6453 13.853 11.9572 14.165 11.9572 14.5497V20.1232C11.9572 20.5079 11.6453 20.8198 11.2605 20.8198C10.8758 20.8198 10.5638 21.1317 10.5638 21.5165C10.5638 21.9013 10.8758 22.2132 11.2605 22.2132H15.4406Z"
                                      fill="#FFAF52"/>
                            </svg>

                            Last scan: {moment(product.performed_at).format('DD MMM YYYY, HH:mm')} (Expired)
                        </p>
                        :
                        <p className={'last-scan'}>
                            Last scan: {moment(product.performed_at).format('DD MMM YYYY, HH:mm')}
                        </p>}
                </div>

                <button className={'btn default'} onClick={() => setVisibleWindow(true)}>Scan again</button>
            </div>

            <ScanAgainWindow
                visible={visibleWindow}
                product={product}
                onClose={() => setVisibleWindow(false)}
                onStart={restartHandler}
                onUpdateCogs={onUpdateCogs}
                onOpenStrategyDescription={onOpenStrategyDescription}
            />
        </>)
    } else return ''
}


export default ScanningProcessingStatus