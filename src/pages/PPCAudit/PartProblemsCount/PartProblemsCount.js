import React from "react"
import './PartProblemsCount.less'
import {scanningStatusEnums} from "../PPCAudit"

const problems = [
    {
        key: '',
        title: 'Poor Performing Keywords:'
    },
    {
        key: '',
        title: 'Poor Performing PATs:'
    },
    {
        key: '',
        title: 'No Keywords:'
    },
    {
        key: '',
        title: 'No PATs:'
    },
    {
        key: '',
        title: 'Poor Semantic Core:'
    },
    {
        key: '',
        title: 'No Black Box:'
    },
]

const PartProblemsCount = ({scanningStatus}) => {
    const inProcessingScanning = scanningStatus === scanningStatusEnums.PROCESSING

    return (<ul className={`part-problems-count ${inProcessingScanning ? 'processing' : ''}`}>
        {problems.map(i => <li>
            <p>{i.title}</p>

            <h4>{inProcessingScanning ? '' : '100'}</h4>
        </li>)}
    </ul>)
}

export default PartProblemsCount