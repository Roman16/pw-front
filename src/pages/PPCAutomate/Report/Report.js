import React, {Fragment} from 'react';
import ReportTable from './ReportTable/ReportTable';
import SubscriptionNotificationWindow from "../../../components/ModalWindow/SubscriptionNotificationWindow";

function Report() {
    return (
        <div className="product-main basic-container reports-page">
            <ReportTable />

            <SubscriptionNotificationWindow product={'ppc'}/>
        </div>
    );
}

export default Report;
