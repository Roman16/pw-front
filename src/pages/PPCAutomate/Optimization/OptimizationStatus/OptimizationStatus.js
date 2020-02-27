import React from 'react';
import './OptimizationStatus.less';
import {history} from "../../../../utils/history";
import moment from "moment";

const StatusInfo = ({caption, value = '-----', statusColor = ''}) => (
    <div className="status-info">
        <div className="caption">{caption}</div>
        <div className={statusColor}>{value}</div>
    </div>
);

const OptimizationStatus = ({product: {status, created_at, total_changes, today_changes}}) => {

    return (
        <section className="product-status">
            <h3>Current Status</h3>

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
                    value={total_changes}
                />

                <StatusInfo
                    caption="Today Changes"
                    value={today_changes}
                />

                <button
                    className='btn default'
                    onClick={() => history.push('/ppc/report')}
                >
                    VIEW REPORT
                </button>
            </div>
        </section>
    );
};

export default OptimizationStatus;
