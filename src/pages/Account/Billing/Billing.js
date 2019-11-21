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


const history = [
    {
        'invoice_number': '134334',
        'card_number': '4334',
        'card_type': 'master',
        'date_issued': '2019-03-04T17:24:58.828Z',
        'description': 'lorem',
        'amount_due': '39',
        'status': 'Paid',
    },
    {
        'invoice_number': '134334',
        'card_number': '4334',
        'card_type': 'visa',
        'date_issued': '2019-03-04T17:24:58.828Z',
        'description': 'lorem',
        'amount_due': '39',
        'status': 'Paid',
    },
];

const billing = {
    cards: [
        {
            number: '4444',
            type: 'visa',
            defaultCard: true
        },
        {
            number: '1111',
            type: 'master',
            defaultCard: false

        },
        {
            number: '5555',
            type: 'visa',
            defaultCard: false

        },
        {
            number: '3333',
            type: 'visa',
            defaultCard: false

        },
        {
            number: '2222',
            type: 'visa',
            defaultCard: false

        },
    ]
};

const defaultPaginationParams = {
    page: 1,
    totalSize: 10
};

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

const Billing = () => {
    const [openedWindow, openWindow] = useState(null),
        [selectedCard, selectCard] = useState({}),
        [paginationParams, changePagination] = useState({defaultPaginationParams}),
        [companyInformation, updateCompany] = useState({}),
        [billingHistory, updateHistoryList] = useState({}),
        [billingInformation, updateBulling] = useState({});

    function handleOpenWindow(window, card) {
        openWindow(window);
        card ? selectCard(card) : selectCard(null)
    }

    function handleCloseWindow() {
        openWindow(null)
    }

    async function getAllInformation() {
        const [companyData, billingData, historyData] = await Promise.all([
            userService.fetchCompanyInformation(),
            userService.fetchBillingInformation(),
            userService.fetchBillingHistory(paginationParams),
        ]);
        updateCompany(company);
        updateBulling(billing);
        updateHistoryList(history);
        // changePagination({totalSize: 0})
    }

    async function handleUpdatePaymentMethod(card) {
        if (card.id) {
            await userService.updatePaymentMethod(card);
        } else {
            await userService.addPaymentMethod(card);
        }
        openWindow(null);
    }

    async function handleRemoveCard(card) {
        await userService.deletePaymentMethod(card.id);
    }

    function handleUpdateCompanyInformation(company) {
        userService.updateCompanyInformation(company)
            .then(res => {
                updateCompany(company)
            });
        updateCompany(company);
        openWindow(null);
    }

    async function handlePaginationChange(page) {
        const res = await userService.fetchBillingHistory({...paginationParams, page});
        changePagination({...paginationParams, page});
        updateHistoryList(res);
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
                            card={selectedCard}
                        />
                    </Elements>
                </StripeProvider>
            )
        }
    }

    useEffect(() => {
        getAllInformation();
    }, []);

    return (
        <div className="user-cabinet billing-page">
            <Navigation/>

            <AccountBilling
                onOpenWindow={handleOpenWindow}
                handleConfirmDeleteCard={handleRemoveCard}
                billingInformation={billingInformation}
            />

            <CompanyDetails
                company={companyInformation}
                onOpenWindow={handleOpenWindow}
            />

            <BillingHistory
                historyList={billingHistory}
                paginationParams={paginationParams}
                handlePaginationChange={handlePaginationChange}
            />

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
