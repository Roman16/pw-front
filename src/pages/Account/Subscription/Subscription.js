import React, {useState} from 'react';
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

const Subscription = () => {
    const dispatch = useDispatch();
    const [openedReactivateWindow, openReactivateWindow] = useState(false);
    const [openedAccountWindow, openAccountWindow] = useState(false);
    const [selectedPlan, selectPlan] = useState();
    const {subscriptions} = useSelector(state => ({
        subscriptions: state.user.subscriptions
    }));

    function handleOpenAccountWindow(plan) {
        openAccountWindow(true);
        selectPlan(plan)
    }

    function handleOpenReactivateWindow(plan) {
        openReactivateWindow(true);
        selectPlan(plan)
    }

    async function handleSubscribe({plan_id, productKey}) {
        try {
            await userService.subscribe({
                subscription_plan_id: plan_id,
                subscriptionId: productKey,
                marketplace_id: 'ATVPDKIKX0DER'
            });

            dispatch(userActions.getPersonalUserInfo());
        } catch (e) {
            console.log(e);
        }
    }

    async function handleReactivateSubscription() {
        try {
            await userService.reactivateSubscription({
                subscription_plan_id: selectedPlan.plan_id,
                subscriptionId: selectedPlan.productKey,
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
                subscription_plan_id: selectedPlan.plan_id,
                subscriptionId: selectedPlan.productKey,
            });

            dispatch(userActions.getPersonalUserInfo());
            selectPlan(null);
            openAccountWindow(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="user-cabinet">
            <Navigation/>

            {subscriptions.length > 0 && subscriptionProducts.map((product) => (
                <SubscriptionPlan
                    key={product.id}
                    onOpenAccountWindow={handleOpenAccountWindow}
                    onOpenReactivateWindow={handleOpenReactivateWindow}
                    product={{...subscriptions[product.id], ...product}}
                    onSubscribe={handleSubscribe}
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
