import React from 'react'
import './OptimizationStatus.less'
import moment from "moment"
import {SVG} from "../../../../utils/icons"

const strategies = {
    'AchieveTargetACoS': 'ACoS Targeting',
    'LaunchProduct': 'Product Launch',
    'BoostOverallProfit': 'Organic Sales Growth',
    'GrowOverallSales': 'Revenue Growth',
    'BoostPPCProfit': 'Profitable PPC'
}

const OptimizationStatus = ({product: {status = '', created_at, today_changes, optimization_strategy, updated_at, settings_last_updated_at}}) => {

    return (
        <ul className="optimization-status">
            <li>
                <SVG id={`optimization-changes`}/>

                <div>
                    <h5>Total Changes</h5>
                    <h4>{status === 'RUNNING' && today_changes}</h4>
                </div>
            </li>

            <li>
                <SVG id={`optimization-Status`}/>

                <div>
                    <h5>Status</h5>
                    <h4 style={{color: status === 'RUNNING' ? '#7DD4A1' : '#eb5757'}}>{status === 'RUNNING' ? 'Active' : 'Inactive'}</h4>
                </div>
            </li>

            <li>
                <SVG id={`optimization-start-date`}/>

                <div>
                    <h5>Start Date</h5>
                    <h4>{status === 'RUNNING' && created_at ? moment(created_at).format('DD.MM.YYYY') : undefined}</h4>
                </div>
            </li>

            <li>
                <SVG id={`optimization-start-date`}/>

                <div>
                    <h5>Last Updated Date</h5>
                    <h4>{status === 'RUNNING' && settings_last_updated_at ? moment(settings_last_updated_at).format('DD.MM.YYYY') : undefined}</h4>
                </div>
            </li>

            <li>
                <SVG id={`optimization-changes2`}/>

                <div>
                    <h5>Today Changes</h5>
                    <h4>{status === 'RUNNING' && today_changes}</h4>
                </div>
            </li>
            <li>
                <SVG id={`optimization-strategy2`}/>

                <div>
                    <h5>Current Strategy</h5>
                    <h4>{status === 'RUNNING' ? strategies[optimization_strategy] : undefined}</h4>
                </div>
            </li>
        </ul>
    )
}

export default OptimizationStatus
