import React from 'react';
import ReportTable from './ReportTable/ReportTable';
import SubscriptionNotificationWindow from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Report() {
    return (
        <div className="product-main basic-container reports-page">
            <ReportTable />

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount />
        </div>
    );
}

export default React.memo(Report);
