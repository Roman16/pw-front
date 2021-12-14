import React from "react"
import './ProblemsCount.less'

const problems = [
    {
        key: 'poor_performingKeywords',
        title: 'Poor Performing Keywords:'
    },
    {
        key: 'poor_performing_keywords',
        title: 'Poor Performing Keywords:'
    },
    {
        key: 'poor_performing_keywords',
        title: 'Poor Performing Keywords:'
    },
    {
        key: 'poor_performingKeywords',
        title: 'Poor Performing Keywords:'
    },
    {
        key: 'poor_performing_keywords',
        title: 'Poor Performing Keywords:'
    },
    {
        key: 'poor_performing_keywords',
        title: 'Poor Performing Keywords:'
    },
]

const ProblemsCount = () => {
    return (<ul className={'problems-count'}>
        {problems.map(i => <li key={i.key}>
            <p>{i.title}</p>
            <h3>100</h3>
        </li>)}
    </ul>)
}

export default ProblemsCount