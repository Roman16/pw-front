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
            (pathname.includes('/ppc-audit') && importStatus.ppc_audit && !importStatus.ppc_audit.required_parts_ready) ||
            (pathname.includes('/ppc') && !importStatus.ppc_automate.required_parts_ready) ||
            (pathname.includes('/ppc/product-settings') && !importStatus.products_info.required_parts_ready) ||
            (pathname.includes('/zero-to-hero') && !importStatus.zth.required_parts_ready)) {
            setVisibleWindow('loadingAmazon')
        } else if (mobileCheck()) {
            setVisibleWindow('onlyDesktop')
        } else if (subscribedProduct && !subscribedProduct.eligible_for_subscription && !user.user.is_agency_client) {
            setVisibleWindow('smallSpend')
        } else if (user.user.free_trial_available) {
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
                visible={visibleWindow === 'expiredSubscription'}
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
