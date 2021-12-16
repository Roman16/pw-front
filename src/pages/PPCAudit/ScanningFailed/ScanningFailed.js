import React from "react"
import './ScanningFailed.less'
import img from '../../../assets/img/scanner/scanning-failed-img.svg'

const ScanningFailed = ({onResetStatus}) => {

    const openChatHandler = () => window.Intercom('show')

    return (
        <div className={'scanning-failed'}>
            <img src={img} alt=""/>

            <h2>Scanning failed</h2>

            <p>
                Error occurred while scanning this product. <br/>
                Check our help center to resolve this problem <br/>
                or come back later and try again.
            </p>

            <div className="actions">
                <button className="btn grey" onClick={openChatHandler}>Help Center</button>
                <button className="btn default" onClick={onResetStatus}>Try Again</button>
            </div>
        </div>
    )
}

export default ScanningFailed