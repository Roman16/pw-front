import React, {useState, useEffect} from "react";
import {Drawer} from 'antd';

import './Billing.less';
import './DrawerWindows/Window.less';
import Navigation from "../Navigation/Navigation";
import AccountBilling from "./AccountBilling";
import CompanyDetails from "./CompanyDetails";
import BillingHistory from "./BillingHistory";

import UpdateCompanyInformationWindow from "./DrawerWindows/UpdateCompanyInformationWindow";
import UpdateCard from "./DrawerWindows/UpdateCard";
import {Elements, StripeProvider} from "react-stripe-elements";
import {userService} from "../../../services/user.services";

const company = {
    name: 'Fidget Spinners International',
    city: 'Miami',
    zip: '90210',
    address1: '8800 Rumble Street',
    address2: 'Apt 1#',
    country: 'US',
    state: 'LA'
};

const billing = {
    cards: [
        {
            number: '4444',
        },
        {
            number: '1111',
        },
    ]
};

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

const Billing = () => {
    const [openedWindow, openWindow] = useState(null),
        [companyInformation, updateCompany] = useState({}),
        [billingInformation, updateBulling] = useState({});

    function handleOpenWindow(window) {
        openWindow(window)
    }

    function handleCloseWindow() {
        openWindow(null)
    }

    async function getInformation() {
        const [companyData, billingData] = await Promise.all([
            userService.fetchCompanyInformation(),
            userService.fetchBillingInformation()
        ]);
        updateCompany(company);
        updateBulling(billing);
    }

    function handleUpdateCompanyInformation(company) {
        console.log(company);
        openWindow(null);
    }

    function handleUpdatePaymentMethod(card) {
        console.log(card);
        userService.updatePaymentMethod(card);
        openWindow(null);
    }

    function renderDrawer() {
        if (openedWindow === 'company') {
            return (
                <UpdateCompanyInformationWindow
                    onClose={handleCloseWindow}
                    company={companyInformation}
                    onSubmit={handleUpdateCompanyInformation}
                />
            )
        } else if (openedWindow === 'updateCard') {
            return (
                <StripeProvider apiKey={stripeKey}>
                    <Elements>
                        <UpdateCard
                            onClose={handleCloseWindow}
                            onSubmit={handleUpdatePaymentMethod}
                        />
                    </Elements>
                </StripeProvider>
            )
        }
    }

    useEffect(() => {
        getInformation();

        const script = document.createElement('script');

        script.src = "https://js.stripe.com/v3/";

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        }
    }, []);

    return (
        <div className="user-cabinet billing-page">
            <Navigation/>

            <AccountBilling
                onOpenWindow={handleOpenWindow}
                billingInformation={billingInformation}
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
                visible={openedWindow ? true : false}
            >
                {renderDrawer()}
            </Drawer>
        </div>
    );
};

export default Billing;
