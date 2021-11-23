import React, {useEffect, useState} from "react"
import StartFreeTrialWindow from "./StartFreeTrialWindow"
import SubscriptionNotificationWindow from "./SubscriptionNotificationWindow"
import LoadingAmazonAccount from "./LoadingAmazonAccountWindow"
import ReportsChangesCountWindow from "./ReportsChangesCountWindow"
import {useSelector} from "react-redux"
import OnlyDesktopWindow from "./OnlyDesktopWindow"
import {mobileCheck} from "../../../utils/mobileCheck"
import SmallSpend from "./SmallSpend"

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
            (pathname.includes('/ppc/dayparting') && !importStatus.dayparting.required_parts_ready) ||
            ((pathname.includes('/ppc/automation') || pathname.includes('/ppc/report')) && !importStatus.ppc_automate.required_parts_ready) ||
            (pathname.includes('/ppc/product-settings') && !importStatus.products_info.required_parts_ready) ||
            (pathname.includes('/zero-to-hero') && !importStatus.zth.required_parts_ready)) {
            setVisibleWindow('loadingAmazon')
        } else if (mobileCheck()) {
            setVisibleWindow('onlyDesktop')
        } else if (subscribedProduct && !subscribedProduct.eligible_for_subscription) {
            setVisibleWindow('smallSpend')
        } else if (user.user.free_trial_available || (user.user.free_trial_available === false && subscribedProduct && subscribedProduct.stripe_status == null)) {
            setVisibleWindow('freeTrial')
        } else if (!user.user.free_trial_available && !subscribedProduct.has_access) {
            setVisibleWindow('expiredSubscription')
        } else if (user.notifications.ppc_optimization.count_from_last_login > 0 && subscribedProduct.has_access) {
            setVisibleWindow('newReportsCount')
        } else {
            setVisibleWindow(null)
        }
    }, [user, pathname, importStatus])

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
                startProcessing={user.user.free_trial_available === false && subscribedProduct && subscribedProduct.stripe_status == null}
            />}

            {(!pathname.includes('/account') &&
                !pathname.includes('/admin-panel') &&
                !pathname.includes('/home') &&
                !pathname.includes('/welcome') &&
                !pathname.includes('/connect-amazon-account') &&
                !pathname.includes('/connect-ppc-account') &&
                !pathname.includes('/connect-mws-account')) &&
            <OnlyDesktopWindow
                visible={visibleWindow === 'onlyDesktop'}
            />}

            {pathname.includes('/ppc/') && <SmallSpend
                visible={visibleWindow === 'smallSpend'}
            />}

            <ReportsChangesCountWindow
                visible={visibleWindow === 'newReportsCount'}
                onClose={closeWindowHandler}
                changesCount={user.notifications.ppc_optimization.count_from_last_login}
            />
        </>
    )
}

export default PWWindows
