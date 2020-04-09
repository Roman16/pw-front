import React from 'react';
import './OptimizationStatus.less';
import {history} from "../../../../utils/history";
import moment from "moment";

const strategies = {
    'AchieveTargetACoS': 'ACoS Targeting',
    'LaunchProduct': 'Product Launch',
    'BoostOverallProfit': 'Organic Sales Growth',
    'GrowOverallSales': 'Revenue Growth',
    'BoostPPCProfit': 'Profitable PPC'
};

const StatusInfo = ({caption, value = '', statusColor = ''}) => (
    <div className="status-info">
        <div className="caption">{caption}</div>
        <div className={statusColor}>{value}</div>
    </div>
);

const OptimizationStatus = ({product: {status, created_at, total_changes, today_changes, optimization_strategy}}) => {

    return (
        <section className="product-status">
            <div className="section-header">
                <h3>Current Status </h3>

                <button
                    className='btn default'
                    onClick={() => history.push('/ppc/report')}
                    data-intercom-target='redirect-reports-page-button'
                >
                    Check Changes
                </button>
            </div>

            <div className="row">
                <StatusInfo
                    caption="Status"
                    value={status === 'RUNNING' ? 'Active' : 'Inactive'}
                    statusColor={status === 'RUNNING' ? 'active' : 'inactive'}
                />

                <StatusInfo
                    caption="Start Date"
                    value={created_at ? moment(created_at).format('DD/MM/Y') : undefined}
                />

                <StatusInfo
                    caption="Total Changes"
                    value={status === 'RUNNING' && total_changes}
                />

                <StatusInfo
                    caption="Today Changes"
                    value={status === 'RUNNING' && today_changes}
                />

                <StatusInfo
                    caption="Current Strategy"
                    value={status === 'RUNNING' ? strategies[optimization_strategy] : undefined}
                />

            </div>
        </section>
    );
};

export default OptimizationStatus;
