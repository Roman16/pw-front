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

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;

const Subscription = () => {
    let interval = null;
    const dispatch = useDispatch();
    const [openedReactivateWindow, openReactivateWindow] = useState(false);
    const [openedAccountWindow, openAccountWindow] = useState(false);
    const [selectedPlan, selectPlan] = useState();
    const {subscriptions, mwsConnected, ppcConnected, stripeId} = useSelector(state => ({
        subscriptions: state.user.subscriptions,
        mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
        ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        stripeId: state.user.user.stripe_id
    }));

    const subscriptionProduct = subscriptions[subscriptionProducts[0].productId];

    const existingScript = document.getElementById('tapfiliate');
    const tapfiliateScript = document.createElement('script');

    if (!existingScript) {
        tapfiliateScript.src = 'https://script.tapfiliate.com/tapfiliate.js';
        tapfiliateScript.id = 'tapfiliate';
        document.head.appendChild(tapfiliateScript);
    }

    useEffect(() => {
        return (() => {
            document.head.removeChild(tapfiliateScript)
        })
    }, []);

    function handleOpenAccountWindow(plan) {
        openAccountWindow(true);
        selectPlan(plan)
    }

    function handleOpenReactivateWindow(plan) {
        openReactivateWindow(true);
        selectPlan(plan)
    }

    async function handleSubscribe({planId, productId}) {
        try {
            await userService.subscribe({
                subscription_plan_id: planId,
                subscriptionId: productId,
                marketplace_id: 'ATVPDKIKX0DER'
            });

            notification.success({title: 'We are processing your payment right now. You’ll receive a confirmation by email.'});


            (function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){
                (t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');

            window.tap('create', tapfiliateKey, { integration: "stripe" });
            window.tap('trial', stripeId);

            dispatch(userActions.getPersonalUserInfo());
        } catch (e) {
            console.log(e);
        }
    }

    async function handleReactivateSubscription() {
        try {
            await userService.reactivateSubscription({
                subscription_plan_id: selectedPlan.planId,
                subscriptionId: selectedPlan.productId,
            });

            dispatch(userActions.getPersonalUserInfo());
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
                subscriptionId: selectedPlan.productId,
            });

            dispatch(userActions.getPersonalUserInfo());
            selectPlan(null);
            openAccountWindow(false);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleUpdateSubscriptionStatus() {
        if (subscriptionProduct) {
            if (subscriptionProduct.next_charge_value !== null || subscriptionProduct.flat_amount !== null || subscriptionProduct.quantity !== null) {
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
        dispatch(userActions.getPersonalUserInfo());
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
