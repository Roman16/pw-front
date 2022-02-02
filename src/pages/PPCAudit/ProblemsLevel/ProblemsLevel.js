import React from "react"
import './ProblemsLevel.less'
import {scanningStatusEnums} from "../PPCAudit"
import loaderImg from "../../../assets/img/loader.svg"
import _ from 'lodash'

const problems = [
    {
        key: 'critical_severity_issues_count',
        title: 'Critical problems',
        filterKey: 'Critical'
    },
    {
        key: 'major_severity_issues_count',
        title: 'Major problems',
        filterKey: 'Major'
    },
    {
        key: 'minor_severity_issues_count',
        title: 'Minor problems',
        filterKey: 'Minor'
    },
]

const ProblemsLevel = ({scanningStatus, product, filters, onSetFilters}) => {
    const processing = scanningStatus === scanningStatusEnums.PROCESSING

    const currentFilter = _.find(filters, {filterBy: 'severity'})

    const addFilterHandler = (title, key) => {
        onSetFilters([
            {
                filterBy: 'severity',
                type: {label: 'Is one of', key: 'one_of'},
                value: [_.find(problems, {key: key}).filterKey],
            }
        ])
    }

    const removeFilterHandler = () => onSetFilters([])

    return (<ul className={`problems-count ${processing ? 'processing' : ''}`}>
        {problems.map(i => <li key={i.key}>
            {!processing && (!(currentFilter && currentFilter.value.includes(i.filterKey)) ?
                <AddFilterButton onClick={() => addFilterHandler(i.title, i.key)}/>
                :
                <RemoveFilterButton onClick={removeFilterHandler}/>)}
            <p>{i.title}:</p>
            <h3>{processing ? <img src={loaderImg} alt=""/> : product[i.key]}</h3>
        </li>)}
    </ul>)
}

const AddFilterButton = ({onClick}) => <button onClick={onClick} className="btn icon">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path
                d="M17.8223 4.17995L11.6961 11.1643V15.623C11.6961 15.7793 11.6101 15.926 11.4693 16.0023L7.97504 17.9428C7.9066 17.9809 7.83034 18 7.75213 18C7.67391 18 7.5957 17.9809 7.52726 17.9409C7.39038 17.8628 7.30435 17.7179 7.30435 17.5635V11.1643L1.17815 4.17995C0.98848 3.96454 0.947417 3.67289 1.06865 3.41555C1.18988 3.15822 1.44604 3 1.73543 3H17.2631C17.5525 3 17.8086 3.16012 17.9299 3.41555C18.053 3.67099 18.012 3.96454 17.8223 4.17995Z"
            />
            <path
                d="M16.1 8C16.1 7.17157 15.4284 6.5 14.6 6.5C13.7716 6.5 13.1 7.17157 13.1 8V10.1H11C10.1716 10.1 9.5 10.7716 9.5 11.6C9.5 12.4284 10.1716 13.1 11 13.1H13.1V15.2C13.1 16.0284 13.7716 16.7 14.6 16.7C15.4284 16.7 16.1 16.0284 16.1 15.2V13.1H18.2C19.0284 13.1 19.7 12.4284 19.7 11.6C19.7 10.7716 19.0284 10.1 18.2 10.1H16.1V8Z"
                stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</button>

const RemoveFilterButton = ({onClick}) => <button onClick={onClick} className="btn icon">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path
                d="M17.8223 4.17995L11.6961 11.1643V15.623C11.6961 15.7793 11.6101 15.926 11.4693 16.0023L7.97504 17.9428C7.9066 17.9809 7.83034 18 7.75213 18C7.67391 18 7.5957 17.9809 7.52726 17.9409C7.39038 17.8628 7.30435 17.7179 7.30435 17.5635V11.1643L1.17815 4.17995C0.98848 3.96454 0.947417 3.67289 1.06865 3.41555C1.18988 3.15822 1.44604 3 1.73543 3H17.2631C17.5525 3 17.8086 3.16012 17.9299 3.41555C18.053 3.67099 18.012 3.96454 17.8223 4.17995Z"
                fill="#6959AB"/>
            <path
                d="M13.6 10.1001H11C10.1716 10.1001 9.5 10.7717 9.5 11.6001C9.5 12.4285 10.1716 13.1001 11 13.1001H13.6H15.6H18.2C19.0284 13.1001 19.7 12.4285 19.7 11.6001C19.7 10.7717 19.0284 10.1001 18.2 10.1001H15.6H13.6Z"
                fill="#6959AB" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
</button>

export default ProblemsLevel