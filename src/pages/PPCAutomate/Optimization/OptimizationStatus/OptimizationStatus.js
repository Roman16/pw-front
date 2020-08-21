import React from 'react';
import './OptimizationStatus.less';
import {history} from "../../../../utils/history";
import moment from "moment";
import {Link} from "react-router-dom";
import {SVG} from "../../../../utils/icons";

const strategies = {
    'AchieveTargetACoS': 'ACoS Targeting',
    'LaunchProduct': 'Product Launch',
    'BoostOverallProfit': 'Organic Sales Growth',
    'GrowOverallSales': 'Revenue Growth',
    'BoostPPCProfit': 'Profitable PPC'
};

const StatusInfo = ({caption, value = '', statusColor = '', icon}) => (
    <div className="status-info">
        <SVG id={`optimization-${icon}`}/>

        <div>
            <h5 className="caption">{caption}</h5>
            <h4 className={statusColor}>{value}</h4>
        </div>
    </div>
);

const OptimizationStatus = ({product: {status, created_at, today_changes, optimization_strategy, updated_at}}) => {

    return (
        <div className="product-status">
                <StatusInfo
                    caption="Status"
                    icon={'status-icon'}
                    value={status === 'RUNNING' ? 'Active' : 'Inactive'}
                    statusColor={status === 'RUNNING' ? 'active' : 'inactive'}
                />

                <StatusInfo
                    caption="Start Date"
                    icon={'date'}
                    value={status === 'RUNNING' && created_at ? moment(created_at).format('DD/MM/Y') : undefined}
                />

                <StatusInfo
                    caption="Last Updated Date"
                    icon={'last-update'}
                    value={status === 'RUNNING' && updated_at ? moment(updated_at, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/Y') : undefined}
                />

                <StatusInfo
                    caption="Today Changes"
                    icon={'today-changes'}
                    value={status === 'RUNNING' && today_changes}
                />

                <StatusInfo
                    caption="Current Strategy"
                    icon={'strategy'}
                    value={status === 'RUNNING' ? strategies[optimization_strategy] : undefined}
                />
        </div>
    );
};

export default OptimizationStatus;
