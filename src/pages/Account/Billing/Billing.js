import React, {useState, useEffect} from "react";
import {Drawer} from 'antd';

import './Billing.less';
import './DrawerWindows/Window.less';
import Navigation from "../Navigation/Navigation";
import AccountBilling from "./AccountBilling";
import CompanyDetails from "./CompanyDetails";
import BillingHistory from "./BillingHistory";

import UpdateCompanyInformationWindow from "./DrawerWindows/UpdateCompanyInformationWindow";
import AddCard from "./DrawerWindows/AddCard";
import UpdateCard from "./DrawerWindows/UpdateCard";
import {Elements, StripeProvider} from "react-stripe-elements";
import {userService} from "../../../services/user.services";

const company = {
    name: 'Fidget Spinners International',
    city: 'Miami',
    zip: '90210',
    address1: '8800 Rumble Street',
    address2: 'Apt 1#',
    country: 'US'
};

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

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

    function handleUpdatePaymentMethod(token) {
        console.log(token);
        userService.updatePaymentMethod({token});
        openWindow(null);
    }

    // useEffect(() => {
    //     const script = document.createElement('script');
    //
    //     script.src = "https://js.stripe.com/v3/";
    //
    //     document.head.appendChild(script);
    //
    //     return () => {
    //         document.head.removeChild(script);
    //     }
    // }, []);

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
                <StripeProvider apiKey={stripeKey}>
                    <Elements>
                        <AddCard
                            onClose={handleCloseWindow}
                            onSubmit={handleUpdatePaymentMethod}
                        />
                    </Elements>
                </StripeProvider>
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
