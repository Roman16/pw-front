import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'

import SubscriptionPlan from './SubscriptionPlan'
import CancelAccountWindow from './DrawerWindows/CancelAccountWindow'
import Reactivate from './DrawerWindows/Reactivate'
import './Subscription.less'
import './DrawerWindows/Reactivate.less'
import {useSelector, useDispatch} from "react-redux"
import {userService} from "../../../services/user.services"
import {userActions} from "../../../actions/user.actions"
import {notification} from "../../../components/Notification"
import CardInformation from "../BillingInformation/CardInformation"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import {Elements, StripeProvider} from "react-stripe-elements"
import ConfirmPaymentWindow from "../Billing/Windows/ConfirmPaymentWindow"
import ConfirmSubscribeWindow from "./DrawerWindows/ConfirmSubscribeWindow"
import _ from 'lodash'
import SmallSpend from "../../../components/ModalWindow/PWWindows/SmallSpend"

const cancelCoupon = process.env.REACT_APP_SUBSCRIPTION_COUPON

let subscribeDetails

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'


let afterSmallSpendAction

const Subscription = () => {
    let interval = null
    const dispatch = useDispatch()
    const [openedReactivateWindow, openReactivateWindow] = useState(false)
    const [openedAccountWindow, openAccountWindow] = useState(false)
    const [selectedPlan, selectPlan] = useState()
    const [subscriptions, setSubscriptions] = useState([])
    const [fetching, switchFetching] = useState(false)
    const [cardsList, setCardsList] = useState(null)
    const [disableButton, changeButton] = useState(false)
    const [disableReactivateButtons, setDisableReactivateButtons] = useState(false)
    const [visibleAddPaymentWindow, setVisibleAddPaymentWindow] = useState(false)
    const [addCardProcessing, setAddCardProcessing] = useState(false)
    const [visibleSmallSpendWindow, setVisibleSmallSpendWindow] = useState(false)

    const [visibleConfirmPaymentWindow, openConfirmWindow] = useState(false),
        [userSecretKey, setKey] = useState(),
        [visibleConfirmSubscribeWindow, setVisibleConfirmSubscribeWindow] = useState(false)

    const {mwsConnected, ppcConnected, stripeId, user, subscribedProduct} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        stripeId: state.user.user.stripe_id,
        user: state.user,
        subscribedProduct: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]],
    }))

    function handleOpenAccountWindow(plan) {
        openAccountWindow(true)
        selectPlan(plan)
    }

    function handleOpenReactivateWindow(plan, force = false) {
        if (!subscribedProduct.eligible_for_subscription && !force) {
            afterSmallSpendAction = 'reactivate'
            setVisibleSmallSpendWindow(true)
        } else {
            openReactivateWindow(true)
            selectPlan(plan)
        }
    }

    const addNewCardHandler = async (card) => {
        setAddCardProcessing(true)

        try {
            await userService.addPaymentMethod({stripe_token: card.stripe_token})

            handleSubscribe(subscribeDetails, false, true)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchSubscriptions = async () => {
        switchFetching(true)

        try {
            const res = await userService.getSubscription()

            setSubscriptions(Object.keys(res).map(productId => ({
                productId,
                ...res[productId]
            })))

        } catch (e) {
            console.log(e)
        }

        switchFetching(false)
    }

    function applyCoupon(productId, planId, coupon) {
        if (coupon) {
            userService.applyCoupon(productId, planId, coupon)
                .then((res) => {
                    setSubscriptions(Object.keys(res).map(productId => ({
                        productId,
                        ...res[productId]
                    })))
                })
        } else {
            notification.error({title: 'Enter coupon first'})
        }
    }

    function getCouponStatus(coupon) {
        userService.getCouponStatus(coupon)
            .then((res) => {
                setSubscriptions(Object.keys(res).map(productId => ({
                    productId,
                    ...res[productId]
                })))
            })
    }

    const cancelConfirmSubscribeHandler = () => {
        setVisibleConfirmSubscribeWindow(false)
        changeButton(false)
        subscribeDetails = undefined
    }

    async function handleSubscribe({plan_id, productId, coupon}, force = false, withCard = false) {
        changeButton(true)

        subscribeDetails = {plan_id, productId, coupon}

        if (!subscribedProduct.eligible_for_subscription && !force) {
            afterSmallSpendAction = 'subscribe'
            setVisibleSmallSpendWindow(true)
        } else if (cardsList.length === 0 && !withCard) {
            changeButton(false)
            setVisibleAddPaymentWindow(true)
        } else if (!force) {
            setVisibleConfirmSubscribeWindow(true)
        } else {
            try {
                if (coupon) {
                    await userService.subscribe({
                        subscription_plan_id: plan_id,
                        subscription_id: productId,
                        marketplace_id: 'ATVPDKIKX0DER',
                        coupon_code: coupon
                    })
                } else {
                    await userService.subscribe({
                        subscription_plan_id: plan_id,
                        subscription_id: productId,
                        marketplace_id: 'ATVPDKIKX0DER',
                    })
                }

                notification.success({title: 'We are processing your payment right now. You’ll receive a confirmation by email.'})
                changeButton(false)
                setVisibleAddPaymentWindow(false)
                dispatch(userActions.getPersonalUserInfo())
                fetchSubscriptions()

                setVisibleConfirmSubscribeWindow(false)

                subscribeDetails = undefined
            } catch (e) {
                changeButton(false)
            }
        }

        changeButton(false)
        setAddCardProcessing(false)
    }

    function handleUpdateInformation() {
        setTimeout(() => {
            dispatch(userActions.getPersonalUserInfo())
            fetchSubscriptions()
            openConfirmWindow(false)
        }, 2000)
    }

    async function handleReactivateSubscription() {
        setDisableReactivateButtons(true)

        try {
            await userService.reactivateSubscription({
                subscription_plan_id: selectedPlan.plan_id,
                subscription_id: selectedPlan.productId,
            })

            dispatch(userActions.getPersonalUserInfo())
            fetchSubscriptions()
            selectPlan(null)
            openReactivateWindow(false)
        } catch (e) {
            console.log(e)
        }
        setTimeout(() => {
            setDisableReactivateButtons(false)
        }, 500)
    }

    async function handleCancelSubscription() {
        setDisableReactivateButtons(true)

        try {
            await userService.cancelSubscription({
                subscription_plan_id: selectedPlan.plan_id,
                subscription_id: selectedPlan.productId,
            })

            dispatch(userActions.getPersonalUserInfo())
            fetchSubscriptions()
            selectPlan(null)
            openAccountWindow(false)
        } catch (e) {
            console.log(e)
        }

        setTimeout(() => {
            setDisableReactivateButtons(false)
        }, 500)
    }

    async function keepSubscriptionHandler() {
        setDisableReactivateButtons(true)

        const {productId, plan_id} = subscriptions[0]

        try {
            await userService.applyCoupon(productId, plan_id, cancelCoupon)

            dispatch(userActions.getPersonalUserInfo())
            fetchSubscriptions()

            openAccountWindow(false)
        } catch (e) {
            console.log(e)
        }

        setDisableReactivateButtons(false)
    }

    async function handleUpdateSubscriptionStatus() {
        if (subscriptions[0]) {
            if (subscriptions[0].next_charge_value !== null || subscriptions[0].flat_amount !== null || subscriptions[0].quantity !== null) {
                clearInterval(interval)
                return
            }
        }

        if ((ppcConnected || mwsConnected) && (user.user.is_agency_client || user.user.id === 714)) {
            await userService.updateSubscriptionStatus()
            dispatch(userActions.getPersonalUserInfo())
        }
    }

    const startFreeTrialHandler = async ({force = false}) => {
        changeButton(true)

        if (!subscribedProduct.eligible_for_subscription && !force) {
            afterSmallSpendAction = 'freeTrial'
            setVisibleSmallSpendWindow(true)
        } else {
            try {
                await userService.startFreeTrial()

                fetchSubscriptions()
                dispatch(userActions.getPersonalUserInfo())
            } catch (e) {
                console.log(e)
            }
        }

        changeButton(false)
    }

    const confirmSmallSpendWindow = () => {
        if (afterSmallSpendAction === 'freeTrial') startFreeTrialHandler({force: true})
        if (afterSmallSpendAction === 'subscribe') handleSubscribe(subscribeDetails, true)
        if (afterSmallSpendAction === 'reactivate') handleOpenReactivateWindow(selectedPlan, true)
    }

    const cancelSmallSpendWindow = () => {
        changeButton(false)
        setVisibleSmallSpendWindow(false)
    }

    useEffect(() => {
        fetchSubscriptions()

        if (ppcConnected || mwsConnected) userService.updateSubscriptionStatus()

        userService.fetchBillingInformation()
            .then(res => {
                setCardsList(res)
            })

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        if (subscriptions[0]) {
            if (subscriptions[0].incomplete_payment.has_incomplete_payment) {
                setKey(subscriptions[0].incomplete_payment.payment_intent_id)
                openConfirmWindow(true)
            } else if (subscriptions[0].pending_payment && subscriptions[0].pending_payment.has_pending_payment) {
                setKey(subscriptions[0].pending_payment.payment_intent_id)
                openConfirmWindow(true)
            }
        }

    }, [subscriptions])

    return (
        <div className="user-cabinet">
            {/*{subscriptionProducts.map((product) => (*/}
            {/*    <SubscriptionPlan*/}
            {/*        key={product.key}*/}
            {/*        product={{...subscriptions[0], ...product}}*/}
            {/*        fetching={fetching}*/}
            {/*        disableButton={disableButton}*/}
            {/*        stripeId={stripeId}*/}
            {/*        subscribedProduct={subscribedProduct}*/}

            {/*        onStartTrial={startFreeTrialHandler}*/}
            {/*        getCouponStatus={getCouponStatus}*/}
            {/*        applyCoupon={applyCoupon}*/}
            {/*        onSubscribe={handleSubscribe}*/}
            {/*        reloadData={handleUpdateSubscriptionStatus}*/}
            {/*        onOpenAccountWindow={handleOpenAccountWindow}*/}
            {/*        onOpenReactivateWindow={handleOpenReactivateWindow}*/}

            {/*    />*/}
            {/*))}*/}

            <ModalWindow
                className="cancel-account reactivate-account"
                onClose={() => openAccountWindow(false)}
                handleCancel={() => openAccountWindow(false)}
                visible={openedAccountWindow}
                footer={false}
            >
                <CancelAccountWindow
                    onCancelSubscription={handleCancelSubscription}
                    onKeepSubscription={keepSubscriptionHandler}
                    disableReactivateButtons={disableReactivateButtons}
                    product={subscriptions[0] && subscriptions[0]}
                />
            </ModalWindow>

            <ModalWindow
                className="reactivate-account"
                onClose={() => openAccountWindow(false)}
                handleCancel={() => openReactivateWindow(false)}
                footer={false}
                visible={openedReactivateWindow}
            >
                <Reactivate
                    onOk={handleReactivateSubscription}
                    onCancel={() => openReactivateWindow(false)}
                    disableReactivateButtons={disableReactivateButtons}
                    date={selectedPlan && selectedPlan.grace_period.on_grace_period_until}
                />
            </ModalWindow>

            <ModalWindow
                className="add-payment-method-window"
                handleCancel={() => setVisibleAddPaymentWindow(false)}
                footer={false}
                visible={visibleAddPaymentWindow}
            >
                <CardInformation
                    card={{
                        name: '',
                        line1: '',
                        city: '',
                        postal_code: '',
                        country: undefined
                    }}
                    isNewCard={true}
                    updateProcessing={addCardProcessing}
                    deleteProcessing={false}
                    requiredForSubscribe={true}

                    onAddCard={addNewCardHandler}
                />
            </ModalWindow>

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
                            paymentCards={cardsList}
                        />
                    </Elements>
                </StripeProvider>
            </ModalWindow>

            <ConfirmSubscribeWindow
                visible={visibleConfirmSubscribeWindow}
                defaultCard={_.find(cardsList, {default: true})}
                product={{...subscriptions[0]}}
                submitProcessing={disableButton}

                onSubmit={() => handleSubscribe(subscribeDetails, true, true)}
                onCancel={cancelConfirmSubscribeHandler}
            />

            <SmallSpend
                visible={visibleSmallSpendWindow}
                onCancel={cancelSmallSpendWindow}
                onSubmit={confirmSmallSpendWindow}
                btnText={afterSmallSpendAction === 'freeTrial' ? 'Start Free Trial' : afterSmallSpendAction === 'reactivate' ? 'Reactivate' : 'Subscribe'}
            />
        </div>
    )
}

export default Subscription
