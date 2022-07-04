import React, {useEffect, useState} from "react"
import StartFreeTrialWindow from "./StartFreeTrialWindow"
import SubscriptionNotificationWindow from "./SubscriptionNotificationWindow"
import LoadingAmazonAccount from "./LoadingAmazonAccountWindow"
import ReportsChangesCountWindow from "./ReportsChangesCountWindow"
import {useSelector} from "react-redux"
import OnlyDesktopWindow from "./OnlyDesktopWindow"
import {mobileCheck} from "../../../utils/mobileCheck"
import SmallSpend from "./SmallSpend"

// const importStatus = {
//     "zth": {
//         "required_parts_details": {
//             "products": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             }
//         },
//         "required_parts_ready": true,
//         "optional_parts_details": {"sp": {"total_types_count": 29, "ready_types_count": 29, "part_ready": true}},
//         "optional_parts_ready": true
//     },
//     "ppc_audit": {
//         "required_parts_details": {
//             "products": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             }, "products_fees": {"total_types_count": 1, "ready_types_count": 1, "part_ready": true}
//         },
//         "required_parts_ready": true
//     },
//     "ppc_automate": {
//         "required_parts_details": {
//             "products": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             },
//             "products_fees": {"total_types_count": 1, "ready_types_count": 1, "part_ready": true},
//             "sp": {"total_types_count": 29, "ready_types_count": 29, "part_ready": true},
//             "sd": {"total_types_count": 13, "ready_types_count": 13, "part_ready": true},
//             "sb": {"total_types_count": 16, "ready_types_count": 16, "part_ready": true},
//             "orders": {"total_types_count": 2, "ready_types_count": 2, "part_ready": true},
//             "returns": {"total_types_count": 2, "ready_types_count": 2, "part_ready": true}
//         },
//         "required_parts_ready": true,
//         "optional_parts_details": {
//             "orders": {"total_types_count": 1, "ready_types_count": 1, "part_ready": true},
//             "returns": {"total_types_count": 1, "ready_types_count": 1, "part_ready": true}
//         },
//         "optional_parts_ready": true
//     },
//     "analytics": {
//         "required_parts_details": {
//             "products": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             },
//             "sp": {"total_types_count": 29, "ready_types_count": 29, "part_ready": true},
//             "sd": {"total_types_count": 13, "ready_types_count": 13, "part_ready": true},
//             "sb": {"total_types_count": 16, "ready_types_count": 16, "part_ready": true},
//             "orders": {"total_types_count": 2, "ready_types_count": 2, "part_ready": true},
//             "returns": {"total_types_count": 2, "ready_types_count": 2, "part_ready": true}
//         },
//         "required_parts_ready": false,
//         "optional_parts_details": {
//             "orders": {"total_types_count": 1, "ready_types_count": 1, "part_ready": true},
//             "returns": {"total_types_count": 1, "ready_types_count": 1, "part_ready": true}
//         },
//         "optional_parts_ready": true
//     },
//     "dayparting": {
//         "required_parts_details": {
//             "products": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             },
//             "sp": {"total_types_count": 29, "ready_types_count": 29, "part_ready": true},
//             "sd": {"total_types_count": 13, "ready_types_count": 13, "part_ready": true},
//             "sb": {"total_types_count": 16, "ready_types_count": 16, "part_ready": true},
//             "orders": {"total_types_count": 2, "ready_types_count": 2, "part_ready": true},
//             "returns": {"total_types_count": 2, "ready_types_count": 2, "part_ready": true}
//         }, "required_parts_ready": true
//     },
//     "products_info": {
//         "required_parts_details": {
//             "products": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             }
//         },
//         "required_parts_ready": true,
//         "optional_parts_details": {
//             "products_fees": {
//                 "total_types_count": 1,
//                 "ready_types_count": 1,
//                 "part_ready": true
//             }
//         },
//         "optional_parts_ready": true
//     }
// }

const PWWindows = ({pathname}) => {
    const [visibleWindow, setVisibleWindow] = useState(null),
        [visibleSmallSpendWindow, setVisibleSmallSpendWindow] = useState(true),
        [visibleNewChangesWindow, setVisibleNewChangesWindow] = useState(true)

    const {user, productList, importStatus, access} = useSelector(state => ({
        user: state.user,
        productList: state.products.productList || [],
        importStatus: state.user.importStatus,
        access: state.user.subscription.access,
    }))

    const closeWindowHandler = () => {
        setVisibleWindow(null)
    }

    const closeNewChangesHandler = () => {
        setVisibleWindow(null)
        setVisibleNewChangesWindow(false)
    }

    const closeSmallSpendWindowHandler = () => {
        setVisibleSmallSpendWindow(false)
    }

    useEffect(() => {
        if ((pathname.includes('/analytics') && !importStatus.analytics.required_parts_ready) ||
            (pathname.includes('/ppc/dayparting') && !importStatus.dayparting.required_parts_ready) ||
            (pathname.includes('/ppc-audit') && importStatus.ppc_audit && !importStatus.ppc_audit.required_parts_ready) ||
            (pathname.includes('/ppc/') && !importStatus.ppc_automate.required_parts_ready) ||
            (pathname.includes('/ppc/product-settings') && !importStatus.products_info.required_parts_ready) ||
            (pathname.includes('/zero-to-hero') && !importStatus.zth.required_parts_ready)) {
            setVisibleWindow('loadingAmazon')
        } else if (mobileCheck()) {
            setVisibleWindow('onlyDesktop')
        } else if (user.subscription.trial.can_start_trial && user.subscription.active_subscription_type === null) {
            setVisibleWindow('freeTrial')
        } else if ((!access.analytics && pathname.includes('/analytics')) || (!access.optimization && pathname.includes('/ppc/'))) {
            setVisibleWindow('notAccess')
        } else if (visibleSmallSpendWindow && user.ad_spend < 1000 && !user.user.is_agency_client && (!access.analytics || !access.optimization) && user.subscription.active_subscription_type === null) {
            setVisibleWindow('smallSpend')
        } else if (visibleNewChangesWindow && user.notifications.ppc_optimization.count_from_last_login > 0) {
            setVisibleWindow('newReportsCount')
        } else {
            setVisibleWindow(null)
        }
    }, [user, pathname, importStatus, visibleSmallSpendWindow])

    return (
        <>
            {(pathname.includes('/ppc/') || pathname.includes('/zero-to-hero') || pathname.includes('/analytics') || pathname.includes('/ppc-audit')) &&
            <LoadingAmazonAccount
                pathname={pathname}
                visible={visibleWindow === 'loadingAmazon'}
                importStatus={importStatus}
                lastName={user.user.last_name}
                firstName={user.user.name}
                productList={productList}
            />}

            {(pathname.includes('/ppc/') || pathname.includes('/analytics')) && <SubscriptionNotificationWindow
                visible={visibleWindow === 'notAccess'}
                onClose={closeWindowHandler}
            />}

            {(pathname.includes('/ppc/') || pathname.includes('/analytics')) && <StartFreeTrialWindow
                visible={visibleWindow === 'freeTrial'}
                onClose={closeWindowHandler}
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

            {(pathname.includes('/ppc/') || pathname.includes('/analytics')) && <SmallSpend
                visible={visibleWindow === 'smallSpend'}
                onSubmit={closeSmallSpendWindowHandler}
            />}

            <ReportsChangesCountWindow
                visible={visibleWindow === 'newReportsCount'}
                onClose={closeNewChangesHandler}
                changesCount={user.notifications.ppc_optimization.count_from_last_login}
            />
        </>
    )
}

export default PWWindows
