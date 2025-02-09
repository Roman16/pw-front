import React, {useState, useEffect} from "react";
import {Drawer} from 'antd';

import './Billing.less';
import './Windows/Window.less';
import AccountBilling from "./AccountBilling";
import CompanyDetails from "./CompanyDetails";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import UpdateCompanyInformationWindow from "./Windows/UpdateCompanyInformationWindow";
import ConfirmPaymentWindow from './Windows/ConfirmPaymentWindow';
import UpdateCard from "./Windows/UpdateCard";
import {Elements, StripeProvider} from "react-stripe-elements";
import {userService} from "../../../services/user.services";
import {useSelector, useDispatch} from "react-redux";
import {userActions} from "../../../actions/user.actions";

const defaultPaginationParams = {
    page: 1,
    pageSize: 10,
    totalSize: 0
};

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

const Billing = () => {
    const dispatch = useDispatch();
    const [openedWindow, openWindow] = useState(null),
        [selectedCard, selectCard] = useState({}),
        [visibleConfirmPaymentWindow, openConfirmWindow] = useState(false),
        [userSecretKey, setKey] = useState(),
        [newCard, changeCardType] = useState(true),
        [paginationParams, changePagination] = useState(defaultPaginationParams),
        [paymentHistory, updateHistoryList] = useState([]),
        [paymentCards, updatePayment] = useState({}),
        [processing, setProcessing] = useState(false),
        [historyFetching, setHistoryFetching] = useState(false);

    const {subscriptions} = useSelector(state => ({
        subscriptions: Object.keys(state.user.subscriptions).map(item => state.user.subscriptions[item])
    }));

    function handleOpenWindow(window, card) {
        openWindow(window);
        card ? changeCardType(false) : changeCardType(true);
        openConfirmWindow(false)
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

    async function handleUpdatePaymentMethod(card) {
        setProcessing(true);

        if (card.id) {
            const res = await userService.updatePaymentMethod(card);
            updatePayment(res);
        } else {
            const res = await userService.addPaymentMethod(card);
            updatePayment(res);
            selectCard(res[0]);
        }
        openWindow(null);
        setProcessing(false);
    }

    async function getPaymentHistory() {
        setHistoryFetching(true);

        try {
            const historyData = await userService.fetchBillingHistory(paginationParams);
            updateHistoryList(historyData.result);

            changePagination({
                ...paginationParams,
                totalSize: historyData.totalSize
            })
        } catch (e) {
            console.log(e);
        }

        setHistoryFetching(false);
    }

    async function handleRemoveCard(card) {
        await userService.deletePaymentMethod(card.id)
            .then(() => {
                getPaymentMethodList();
            })
    }

    async function handleSetDefaultCard(card) {
        await userService.setDefaultPaymentMethod(card.id);
        updatePayment(paymentCards.map(item => item.id === card.id ? {
                ...item,
                default: true
            }
            :
            {
                ...item,
                default: false
            }));
    }

    function handleUpdateCompanyInformation(company) {
        setProcessing(true);

        userService.updateCompanyInformation(selectedCard.id, company)
            .then(() => {
                selectCard({
                    ...selectedCard,
                    metadata: company
                });

                updatePayment(paymentCards.map(item => (item.id === selectedCard.id) ? {
                        ...item,
                        metadata: company
                    }
                    :
                    item))
            });
        openWindow(null);
        setProcessing(false);
    }

    async function handlePaginationChange(params) {
        changePagination({...paginationParams, ...params});
    }

    function handleUpdateInformation() {
        dispatch(userActions.getPersonalUserInfo());
        getPaymentMethodList();
        getPaymentHistory();
        openConfirmWindow(false);
    }

    function renderDrawer() {
        if (openedWindow === 'company') {
            return (
                <UpdateCompanyInformationWindow
                    onClose={handleCloseWindow}
                    company={selectedCard.metadata}
                    onSubmit={handleUpdateCompanyInformation}
                    processing={processing}
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
                            processing={processing}
                        />
                    </Elements>
                </StripeProvider>
            )
        }
    }

    useEffect(() => {
        getPaymentMethodList();

        if (subscriptions[0]) {
            if (subscriptions[0].incomplete_payment.has_incomplete_payment) {
                setKey(subscriptions[0].incomplete_payment.payment_intent_id);
                openConfirmWindow(true);
            } else if (subscriptions[0].pending_payment && subscriptions[0].pending_payment.has_pending_payment) {
                setKey(subscriptions[0].pending_payment.payment_intent_id);
                openConfirmWindow(true);
            }
        }
    }, []);

    useEffect(() => {
        getPaymentHistory();
    }, [paginationParams.page, paginationParams.pageSize]);

    return (
        <div className="user-cabinet billing-page">
            <AccountBilling
                onOpenWindow={handleOpenWindow}
                handleConfirmDeleteCard={handleRemoveCard}
                onSetDefaultCard={handleSetDefaultCard}
                paymentCards={paymentCards}
                onSelectCard={selectCard}
                defaultSelectedCard={selectedCard}
            />

            <CompanyDetails
                paymentCards={paymentCards}
                company={selectedCard && selectedCard.metadata}
                onOpenWindow={handleOpenWindow}
            />

            {/*<BillingHistory*/}
            {/*    historyList={paymentHistory}*/}
            {/*    paginationParams={paginationParams}*/}
            {/*    handlePaginationChange={handlePaginationChange}*/}
            {/*    processing={historyFetching}*/}
            {/*/>*/}

            <Drawer
                placement="right"
                className='account-drawer'
                closable={false}
                onClose={handleCloseWindow}
                visible={!!openedWindow}
            >
                {renderDrawer()}
            </Drawer>

            <ModalWindow
                visible={visibleConfirmPaymentWindow}
                handleCancel={() => openConfirmWindow(false)}
                footer={null}
                mask={true}
                className={'confirm-payment-window'}
            >
                <StripeProvider apiKey={stripeKey}>
                    <Elements>
                        <ConfirmPaymentWindow
                            userSecretKey={userSecretKey}
                            onClose={() => openConfirmWindow(false)}
                            onUpdateInformation={handleUpdateInformation}
                            paymentCards={paymentCards}
                            onOpenAddCardWindow={handleOpenWindow}
                        />
                    </Elements>
                </StripeProvider>
            </ModalWindow>
        </div>
    );
};

export default Billing;
