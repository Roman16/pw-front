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
import {subscriptionProducts} from "../../../constans/subscription.products.name"
import {notification} from "../../../components/Notification"
import CardInformation from "../BillingInformation/CardInformation"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"

const cancelCoupon = process.env.REACT_APP_SUBSCRIPTION_COUPON

let subscribeDetails

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

    const {mwsConnected, ppcConnected, stripeId, user} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        stripeId: state.user.user.stripe_id,
        user: state.user,
    }))

    function handleOpenAccountWindow(plan) {
        openAccountWindow(true)
        selectPlan(plan)
    }

    function handleOpenReactivateWindow(plan) {
        openReactivateWindow(true)
        selectPlan(plan)
    }

    const addNewCardHandler = async (card) => {
        setAddCardProcessing(true)

        try {
            await userService.addPaymentMethod({stripe_token: card.stripe_token})

            handleSubscribe(subscribeDetails, true)
        } catch (e) {
            console.log(e)
        }
    }

    function fetchSubscriptions() {
        switchFetching(true)

        userService.getSubscription()
            .then(res => {
                switchFetching(false)

                setSubscriptions(Object.keys(res).map(productId => ({
                    productId,
                    ...res[productId]
                })))
            })
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

    async function handleSubscribe({plan_id, productId, coupon}, force = false) {
        changeButton(true)

        subscribeDetails = {plan_id, productId, coupon}

        if ((cardsList && cardsList.length) || force) {
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

                subscribeDetails = undefined
            } catch (e) {
                changeButton(false)
            }
        } else {
            changeButton(false)
            setVisibleAddPaymentWindow(true)
        }

        setAddCardProcessing(false)
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


    const startFreeTrialHandler = async () => {
        changeButton(true)

        try {
            await userService.startFreeTrial()

            fetchSubscriptions()
        } catch (e) {
            console.log(e)
        }

        changeButton(false)
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

    return (
        <div className="user-cabinet">
            {subscriptionProducts.map((product) => (
                <SubscriptionPlan
                    key={product.key}
                    product={{...subscriptions[0], ...product}}
                    fetching={fetching}
                    disableButton={disableButton}
                    stripeId={stripeId}

                    onStartTrial={startFreeTrialHandler}
                    getCouponStatus={getCouponStatus}
                    applyCoupon={applyCoupon}
                    onSubscribe={handleSubscribe}
                    reloadData={handleUpdateSubscriptionStatus}
                    onOpenAccountWindow={handleOpenAccountWindow}
                    onOpenReactivateWindow={handleOpenReactivateWindow}

                />
            ))}

            <Modal
                className="cancel-account reactivate-account"
                placement="right"
                closable
                onClose={() => openAccountWindow(false)}
                onCancel={() => openAccountWindow(false)}
                visible={openedAccountWindow}
                footer={false}
            >
                <CancelAccountWindow
                    onCancelSubscription={handleCancelSubscription}
                    onKeepSubscription={keepSubscriptionHandler}
                    disableReactivateButtons={disableReactivateButtons}
                    product={subscriptions[0] && subscriptions[0]}
                />
            </Modal>

            <Modal
                className="reactivate-account"
                closable
                centered
                onClose={() => openAccountWindow(false)}
                onCancel={() => openReactivateWindow(false)}
                footer={false}
                visible={openedReactivateWindow}
            >
                <Reactivate
                    onOk={handleReactivateSubscription}
                    onCancel={() => openReactivateWindow(false)}
                    disableReactivateButtons={disableReactivateButtons}
                    date={selectedPlan && selectedPlan.grace_period.on_grace_period_until}
                />
            </Modal>

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
        </div>
    )
}

export default Subscription
