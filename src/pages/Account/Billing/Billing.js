import React, {useState} from "react";
import {Drawer} from 'antd';

import './Billing.less';
import './DrawerWindows/Window.less';
import Navigation from "../Navigation/Navigation";
import AccountBilling from "./AccountBilling";
import CompanyDetails from "./CompanyDetails";
import BillingHistory from "./BillingHistory";

import UpdateCompanyInformationWindow from "./DrawerWindows/UpdateCompanyInformationWindow";


const Billing = () => {
    const [openedWindow, openWindow] = useState(null);

    function handleOpenWindow(window) {
        openWindow(window)
    }

    return (
        <div className="user-cabinet billing-page">
            <Navigation/>

            <AccountBilling/>

            <CompanyDetails
                onOpenWindow={handleOpenWindow}
            />

            <BillingHistory/>

            <Drawer
                placement="right"
                className='account-drawer'
                closable={false}
                onClose={() => openWindow(null)}
                visible={openedWindow}
            >
                <UpdateCompanyInformationWindow/>
            </Drawer>
        </div>
    );
};

export default Billing;
