import React, {useState} from "react";
import {Drawer} from 'antd';

import './Billing.less';
import './DrawerWindows/Window.less';
import Navigation from "../Navigation/Navigation";
import AccountBilling from "./AccountBilling";
import CompanyDetails from "./CompanyDetails";
import BillingHistory from "./BillingHistory";

import UpdateCompanyInformationWindow from "./DrawerWindows/UpdateCompanyInformationWindow";
import AddCard from "./DrawerWindows/AddCard";
import {CardNumberElement, Elements, StripeProvider} from "react-stripe-elements";

const company = {
    name: 'Test company'
};

const Billing = () => {
    const [openedWindow, openWindow] = useState(null);

    function handleOpenWindow(window) {
        openWindow(window)
    }

    function handleCloseWindow() {
        openWindow(null)
    }

    function handleSaveCompanyInformation(company) {
        console.log(company);
        openWindow(null);
    }

    function handleAddNewCard(data) {
        console.log(data);
        openWindow(null);
    }

    function renderDrawer() {
        if (openedWindow === 'company') {
            return (
                <UpdateCompanyInformationWindow
                    onClose={handleCloseWindow}
                    company={company}
                    onSubmit={handleSaveCompanyInformation}
                />
            )
        } else if (openedWindow === 'newCard') {
            return (
                <StripeProvider apiKey="pk_test_12345">
                                <Elements>
                        <AddCard
                            onClose={handleCloseWindow}
                            onSubmit={handleAddNewCard}
                        />
                    </Elements>
                </StripeProvider>
            )
        }
    }

    return (
        <div className="user-cabinet billing-page">
            <Navigation/>

            <AccountBilling
                onOpenWindow={handleOpenWindow}
            />

            <CompanyDetails
                company={company}
                onOpenWindow={handleOpenWindow}
            />

            <BillingHistory/>

            <Drawer
                placement="right"
                className='account-drawer'
                closable={false}
                onClose={handleCloseWindow}
                visible={openedWindow}
            >
                {renderDrawer()}
            </Drawer>
        </div>
    );
};

export default Billing;
