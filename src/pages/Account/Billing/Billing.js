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
        [newCard, changeCardType] = useState(true),
        [paginationParams, changePagination] = useState({defaultPaginationParams}),
        [companyInformation, updateCompany] = useState({}),
        [paymentHistory, updateHistoryList] = useState([]),
        [paymentCards, updatePayment] = useState({});

    function handleOpenWindow(window, card) {
        openWindow(window);
        card ? changeCardType(false) : changeCardType(true)
    }

    function handleCloseWindow() {
        openWindow(null)
    }

    async function getPaymentMethodList() {
        try {
            const res = await userService.fetchBillingInformation();
            updatePayment(res);
            selectCard(res[0])
        } catch (e) {
            console.log(e);
        }
    }

    async function getCompanyInformation() {
        if (selectedCard.id) {
            try {
                const companyData = await userService.fetchCompanyInformation(selectedCard.id);
                updateCompany(companyData);
            } catch (e) {
                console.log(e);
            }
        }
    }

    async function getPaymentHistory() {
        if (selectedCard.id) {
            try {
                const historyData = await userService.fetchBillingHistory(selectedCard.id, paginationParams);
                // updateHistoryList(historyData);
            } catch (e) {
                console.log(e);
            }
        }
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

    async function handleSetDefaultCard(card) {
        await userService.setDefaultPaymentMethod(card.id);
    }

    function handleUpdateCompanyInformation(company) {
        userService.updateCompanyInformation(selectedCard.id, company)
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
                            card={!newCard && selectedCard}
                        />
                    </Elements>
                </StripeProvider>
            )
        }
    }

    useEffect(() => {
        getPaymentMethodList();
    }, []);

    useEffect(() => {
        getCompanyInformation();
        getPaymentHistory();
    }, [selectedCard]);

    useEffect(() => {
        getPaymentHistory();
    }, [paginationParams]);

    return (
        <div className="user-cabinet billing-page">
            <Navigation/>

            <AccountBilling
                onOpenWindow={handleOpenWindow}
                handleConfirmDeleteCard={handleRemoveCard}
                onSetDefaultCard={handleSetDefaultCard}
                paymentCards={paymentCards}
                onSelectCard={selectCard}
                defaultSelectedCard={selectedCard}
            />

            <CompanyDetails
                company={companyInformation}
                onOpenWindow={handleOpenWindow}
            />

            <BillingHistory
                historyList={paymentHistory}
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
