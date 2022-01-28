import React from "react"
import './ProblemsType.less'
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
        key: 'poor_semantic_core_issues_count',
        title: 'Poor Semantic Core:'
    },
    {
        key: '',
        title: 'No Black Box:'
    },
]

const ProblemsType = ({product, scanningStatus}) => {
    const inProcessingScanning = scanningStatus === scanningStatusEnums.PROCESSING

    return (<ul className={`part-problems-count ${inProcessingScanning ? 'processing' : ''}`}>
        {problems.map(i => <li>
            <p>{i.title}</p>

            <h4>{inProcessingScanning ? '' : product[i.key]}</h4>
        </li>)}
    </ul>)
}

//
// duplicate_targetings_issues_count: null
// poor_performing_targetings_issues_count: null
// processing_result: null
// targetings_harvesting_issues_count: null

export default ProblemsType