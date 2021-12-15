import React from "react"
import './ProblemsCount.less'
import {scanningStatusEnums} from "../PPCAudit"
import loaderImg from "../../../assets/img/loader.svg"

const problems = [
    {
        key: 'poor_performingKeywords',
        title: 'Critical problems:'
    },
    {
        key: 'poor_performing_keywords',
        title: 'Major problems:'
    },
    {
        key: 'poor_performing_keywords',
        title: 'Minor problems:'
    },
]

const ProblemsCount = ({scanningStatus}) => {
    const inProcessingScanning = scanningStatus === scanningStatusEnums.PROCESSING

    return (<ul className={`problems-count ${inProcessingScanning ? 'processing' : ''}`}>
        {problems.map(i => <li key={i.key}>
            <p>{i.title}</p>
            <h3>{inProcessingScanning ? <img src={loaderImg} alt=""/> : '100'}</h3>
        </li>)}
    </ul>)
}

export default ProblemsCount