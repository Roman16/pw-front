import React, {useEffect, useState} from "react"
import StartFreeTrialWindow from "./StartFreeTrialWindow"
import SubscriptionNotificationWindow from "./SubscriptionNotificationWindow"
import LoadingAmazonAccount from "./LoadingAmazonAccountWindow"
import ReportsChangesCountWindow from "./ReportsChangesCountWindow"
import {useSelector} from "react-redux"

const PWWindows = ({pathname}) => {
    const [visibleWindow, setVisibleWindow] = useState(null)

    const {user, productList, subscribedProduct, importStatus} = useSelector(state => ({
        user: state.user,
        subscribedProduct: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]],
        productList: state.products.productList || [],
        importStatus: state.user.importStatus
    }))

    const closeWindowHandler = () => {
        setVisibleWindow(null)
    }

    useEffect(() => {
        if ((pathname.includes('/analytics') && !importStatus.analytics.required_parts_ready) ||
            (pathname.includes('/ppc/') && !importStatus.dayparting.required_parts_ready) ||
            (pathname.includes('/ppc/') && !importStatus.ppc_automate.required_parts_ready) ||
            (pathname.includes('/ppc/') && !importStatus.products_info.required_parts_ready) ||
            (pathname.includes('/zero-to-hero') && !importStatus.zth.required_parts_ready)) {
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
    }, [user, pathname])

    return (
        <>
            {(pathname.includes('/ppc/') || pathname.includes('/zero-to-hero') || pathname.includes('/analytics')) &&
            <LoadingAmazonAccount
                pathname={pathname}
                visible={visibleWindow === 'loadingAmazon'}
                importStatus={importStatus}
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
