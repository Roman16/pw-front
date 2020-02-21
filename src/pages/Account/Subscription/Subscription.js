import React, {useEffect, useState} from 'react';
import {Drawer, Modal} from 'antd';

import Navigation from '../Navigation/Navigation';
import SubscriptionPlan from './SubscriptionPlan';
import CancelAccountWindow from './DrawerWindows/CancelAccountWindow';
import Reactivate from './DrawerWindows/Reactivate';
import './Subscription.less';
import './DrawerWindows/CancelAccountWindow.less';
import './DrawerWindows/Reactivate.less';
import {useSelector, useDispatch} from "react-redux";
import {userService} from "../../../services/user.services";
import {userActions} from "../../../actions/user.actions";
import {subscriptionProducts} from "../../../constans/subscription.products.name";
import {notification} from "../../../components/Notification";


const Subscription = () => {
    let interval = null;
    const dispatch = useDispatch();
    const [openedReactivateWindow, openReactivateWindow] = useState(false);
    const [openedAccountWindow, openAccountWindow] = useState(false);
    const [selectedPlan, selectPlan] = useState();
    const [subscriptions, setSubscriptions] = useState({});
    const [fetching, switchFetching] = useState(false);

    const {mwsConnected, ppcConnected, stripeId} = useSelector(state => ({
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        stripeId: state.user.user.stripe_id
    }));

    function handleOpenAccountWindow(plan) {
        openAccountWindow(true);
        selectPlan(plan)
    }

    function handleOpenReactivateWindow(plan) {
        openReactivateWindow(true);
        selectPlan(plan)
    }

    function fetchSubscriptions() {
        switchFetching(true);

        userService.getSubscription()
            .then(res => {
                switchFetching(false);

                setSubscriptions({...res})
            })
    }

    function applyCoupon(productId, coupon, planId) {
        if (coupon) {
            userService.applyCoupon(productId, planId, coupon)
                .then((res) => {
                    setSubscriptions({...res})
                })
        }
    }

    function getCouponStatus(coupon) {
        userService.getCouponStatus(coupon)
            .then((res) => {
                setSubscriptions({...res})
            })
    }

    async function handleSubscribe({planId, productId, coupon}) {
        try {
            if (coupon) {
                await userService.subscribe({
                    subscription_plan_id: planId,
                    subscription_id: productId,
                    marketplace_id: 'ATVPDKIKX0DER',
                    coupon_code: coupon
                });
            } else {
                await userService.subscribe({
                    subscription_plan_id: planId,
                    subscription_id: productId,
                    marketplace_id: 'ATVPDKIKX0DER',
                });
            }

            notification.success({title: 'We are processing your payment right now. You’ll receive a confirmation by email.'});

            dispatch(userActions.getPersonalUserInfo());
            fetchSubscriptions();
        } catch (e) {
            console.log(e);
        }
    }

    async function handleReactivateSubscription() {
        try {
            await userService.reactivateSubscription({
                subscription_plan_id: selectedPlan.planId,
                subscription_id: selectedPlan.productId,
            });

            dispatch(userActions.getPersonalUserInfo());
            fetchSubscriptions();
            selectPlan(null);
            openReactivateWindow(false);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleCancelSubscription() {
        try {
            await userService.cancelSubscription({
                subscription_plan_id: selectedPlan.planId,
                subscription_id: selectedPlan.productId,
            });

            dispatch(userActions.getPersonalUserInfo());
            fetchSubscriptions();
            selectPlan(null);
            openAccountWindow(false);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleUpdateSubscriptionStatus() {
        if (subscriptions[subscriptionProducts[0].productId]) {
            if (subscriptions[subscriptionProducts[0].productId].next_charge_value !== null || subscriptions[subscriptionProducts[0].productId].flat_amount !== null || subscriptions[subscriptionProducts[0].productId].quantity !== null) {
                clearInterval(interval);
                return
            }
        }

        if (ppcConnected || mwsConnected) {
            await userService.updateSubscriptionStatus();
            dispatch(userActions.getPersonalUserInfo());
        }
    }

    useEffect(() => {
        fetchSubscriptions();

        if (ppcConnected || mwsConnected) {
            userService.updateSubscriptionStatus();
        }

        interval = setInterval(handleUpdateSubscriptionStatus, 1000 * 60);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="user-cabinet">
            <Navigation/>

            {subscriptionProducts.map((product) => (
                <SubscriptionPlan
                    key={product.productId}
                    onOpenAccountWindow={handleOpenAccountWindow}
                    onOpenReactivateWindow={handleOpenReactivateWindow}
                    product={{...subscriptions[product.productId], ...product}}
                    onSubscribe={handleSubscribe}
                    reloadData={handleUpdateSubscriptionStatus}
                    stripeId={stripeId}
                    applyCoupon={applyCoupon}
                    getCouponStatus={getCouponStatus}
                    fetching={fetching}
                />
            ))}

            <Drawer
                className="cancel-account"
                placement="right"
                closable
                onClose={() => openAccountWindow(false)}
                visible={openedAccountWindow}
            >
                <CancelAccountWindow
                    onCancel={handleCancelSubscription}
                    onClose={() => openAccountWindow(false)}
                />
            </Drawer>

            <Modal
                className="reactivate-account"
                closable
                centered
                okText="Reactivate my account"
                onOk={handleReactivateSubscription}
                cancelText="Cancel"
                onCancel={() => openReactivateWindow(false)}
                visible={openedReactivateWindow}
            >
                <Reactivate
                    date={selectedPlan && selectedPlan.grace_period.on_grace_period_until}
                />
            </Modal>
        </div>
    );
};

export default Subscription;
