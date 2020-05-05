import React from 'react';
import ReportTable from './ReportTable/ReportTable';
import SubscriptionNotificationWindow from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tabs from "./Tabs/Tabs";
import FreeTrial from "../../../components/FreeTrial/FreeTrial";
import Filters from "./Filters/Filters";

function Report() {
    return (
        <div className="product-main basic-container reports-page">
            <FreeTrial product={'ppc'}/>

            <Tabs />

            <Filters/>

            <ReportTable />

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount />
        </div>
    );
}

export default React.memo(Report);
