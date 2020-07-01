import React, {useEffect, useState} from "react";
import StartFreeTrialWindow from "./StartFreeTrialWindow";
import SubscriptionNotificationWindow from "./SubscriptionNotificationWindow";
import LoadingAmazonAccount from "./LoadingAmazonAccountWindow";
import ReportsChangesCountWindow from "./ReportsChangesCountWindow";
import {useSelector} from "react-redux";

const PWWindows = ({pathname}) => {
    const [visibleWindow, setVisibleWindow] = useState(null);

    const {user, productList, subscribedProduct} = useSelector(state => ({
        user: state.user,
        subscribedProduct: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]],
        productList: state.products.productList || [],
    }));

    const closeWindowHandler = () => {
        setVisibleWindow(null)
    };

    useEffect(() => {
        if (user.notifications.account_bootstrap.bootstrap_in_progress) {
            setVisibleWindow('loadingAmazon');
        } else if(!subscribedProduct.has_access || (subscribedProduct.pending_payment && subscribedProduct.pending_payment.has_pending_payment)) {
            setVisibleWindow('expiredSubscription');
        } else if(false) {
            setVisibleWindow('freeTrial');
        } else if (user.notifications.ppc_optimization.count_from_last_login > 0 && subscribedProduct.has_access) {
            setVisibleWindow('newReportsCount');
        } else {
            setVisibleWindow(null);
        }
    }, [user]);

    return (
        <>
            {(pathname.includes('/ppc/') || pathname.includes('/zero-to-hero')) && <LoadingAmazonAccount
                visible={visibleWindow === 'loadingAmazon'}
                lastName={user.user.last_name}
                firstName={user.user.name}
                productList={productList}
            />}

            {pathname.includes('/ppc/') && <SubscriptionNotificationWindow
                visible={visibleWindow === 'expiredSubscription'}
                onClose={closeWindowHandler}
            />}

            {pathname.includes('/ppc/') && <StartFreeTrialWindow
                visible={visibleWindow === 'freeTrial'}
                onClose={closeWindowHandler}
            />}

            <ReportsChangesCountWindow
                visible={visibleWindow === 'newReportsCount'}
                onClose={closeWindowHandler}
                changesCount={user.notifications.ppc_optimization.count_from_last_login}
            />
        </>
    )
};

export default PWWindows;