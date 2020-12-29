import React, {useEffect, useState} from "react"
import StartFreeTrialWindow from "./StartFreeTrialWindow"
import SubscriptionNotificationWindow from "./SubscriptionNotificationWindow"
import LoadingAmazonAccount from "./LoadingAmazonAccountWindow"
import ReportsChangesCountWindow from "./ReportsChangesCountWindow"
import {useSelector} from "react-redux"
import SmallSpend from "./SmallSpend"

const PWWindows = ({pathname}) => {
    const [visibleWindow, setVisibleWindow] = useState(null)

    const {user, productList, subscribedProduct} = useSelector(state => ({
        user: state.user,
        subscribedProduct: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]],
        productList: state.products.productList || [],
    }))

    const closeWindowHandler = () => {
        setVisibleWindow(null)
    }

    useEffect(() => {
        if (user.notifications.account_bootstrap.bootstrap_in_progress || (!subscribedProduct.has_access && subscribedProduct.has_pending_payment_tx)) {
            setVisibleWindow('loadingAmazon')
        }
            // else if (!subscribedProduct.eligible_for_subscription) {
            //     setVisibleWindow('smallSpend')
        // }
        else if (user.user.free_trial_available) {
            setVisibleWindow('freeTrial')
        } else if (!user.user.free_trial_available && !subscribedProduct.has_access && !subscribedProduct.has_pending_payment_tx) {
            setVisibleWindow('expiredSubscription')
        } else if (user.notifications.ppc_optimization.count_from_last_login > 0 && subscribedProduct.has_access) {
            setVisibleWindow('newReportsCount')
        } else {
            setVisibleWindow(null)
        }
    }, [user])

    return (
        <>
            {(pathname.includes('/ppc/') || pathname.includes('/zero-to-hero') || pathname.includes('/analytics')) &&
            <LoadingAmazonAccount
                visible={visibleWindow === 'loadingAmazon'}
                lastName={user.user.last_name}
                firstName={user.user.name}
                productList={productList}
            />}

            {(pathname.includes('/ppc/') || pathname.includes('/analytics')) && <SubscriptionNotificationWindow
                visible={visibleWindow === 'expiredSubscription'}
                onClose={closeWindowHandler}
            />}

            {(pathname.includes('/ppc/') || pathname.includes('/analytics')) && <StartFreeTrialWindow
                visible={visibleWindow === 'freeTrial'}
                onClose={closeWindowHandler}
            />}

            {/*{pathname.includes('/ppc/') && <SmallSpend*/}
            {/*    visible={visibleWindow === 'smallSpend'}*/}
            {/*/>}*/}

            <ReportsChangesCountWindow
                visible={visibleWindow === 'newReportsCount'}
                onClose={closeWindowHandler}
                changesCount={user.notifications.ppc_optimization.count_from_last_login}
            />
        </>
    )
}

export default PWWindows
