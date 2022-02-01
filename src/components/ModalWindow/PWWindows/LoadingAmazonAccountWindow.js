import React, {useEffect, useRef, useState} from "react"
import {useDispatch} from "react-redux"
import ModalWindow from "../ModalWindow"
import {userActions} from "../../../actions/user.actions"
import {productsActions} from "../../../actions/products.actions"
import {userService} from "../../../services/user.services"

let intervalId = null

const serviceTitle = {
    optimization: 'PPC Automation',
    dayparting: 'Dayparting',
    analytics: 'Analytics',
    productSettings: 'PPC Automation',
    zth: 'Zero to Hero',
    scanner: 'PPC Audit',
}

const importTypes = [
    {
        title: 'Products Data',
        key: 'products'
    },
    {
        title: 'Product Fees Data',
        key: 'products_fees'
    },
    {
        title: 'Orders Data',
        key: 'orders'
    },
    {
        title: 'Order Returns Data',
        key: 'returns'
    },
    {
        title: 'SB Advertising',
        key: 'sb'
    },
    {
        title: 'SD Advertising',
        key: 'sd'
    },
    {
        title: 'SP Advertising',
        key: 'sp'
    },
]

const LoadingAmazonAccount = ({visible, pathname, importStatus, firstName, lastName, productList}) => {
    const [currentService, setCurrentService] = useState('')
    const dispatch = useDispatch()
    const prevVisibleRef = useRef();

    let requiredParts = {}

    if (currentService === 'optimization') requiredParts = importStatus.ppc_automate.required_parts_details
    if (currentService === 'dayparting') requiredParts = importStatus.dayparting.required_parts_details
    if (currentService === 'analytics') requiredParts = importStatus.analytics.required_parts_details
    // if (currentService === 'productSettings') requiredParts = importStatus.products_info.required_parts_details
    if (currentService === 'productSettings') requiredParts = importStatus.ppc_automate.required_parts_details
    if (currentService === 'zth') requiredParts = importStatus.zth.required_parts_details
    if (currentService === 'scanner') requiredParts = importStatus.ppc_audit ? importStatus.ppc_audit.required_parts_details : false

    const checkStatus = async () => {
        try {
            const importStatus = await userService.checkImportStatus()
            dispatch(userActions.updateUser({importStatus: importStatus.result}))
        } catch (e) {

        }
    }

    useEffect(() => {
        if (prevVisibleRef.current && !visible) document.location.reload()

        prevVisibleRef.current = visible;

        visible && checkStatus()

        intervalId = setInterval(() => {
            if (visible) {
                checkStatus()
            } else {
                if (!productList && productList.length <= 0) {
                    dispatch(productsActions.fetchProducts({
                        size: 10,
                        page: 1,
                        searchStr: '',
                        onlyOptimization: false,
                        selectedAll: false,
                        onlyHasNew: false
                    }))
                }

                userService.getUserInfo()
                    .then(user => dispatch(userActions.setInformation(user)))

                clearInterval(intervalId)
            }
        }, 10000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [visible])

    useEffect(() => {
        window.addEventListener("storage", (e) => {
            if (e.key === 'importStatus') checkStatus()
        })
    }, [])

    useEffect(() => {
        if (pathname.includes('/ppc/automation') || pathname.includes('/ppc/report')) setCurrentService('optimization')
        else if (pathname.includes('/ppc/dayparting')) setCurrentService('dayparting')
        else if (pathname.includes('/ppc/product-settings')) setCurrentService('productSettings')
        else if (pathname.includes('/analytics')) setCurrentService('analytics')
        else if (pathname.includes('/zero-to-hero')) setCurrentService('zth')
        else if (pathname.includes('/ppc-audit')) setCurrentService('scanner')
    }, [pathname])

    return (
        <ModalWindow
            className={'amazon-loading-window'}
            visible={visible}
            okText={'Check it now'}
            container={true}
        >
            <h2>Welcome {firstName} {lastName}!</h2>

            <p>
                We are currently syncing data from your Amazon Account with our system. This may take up to 24 hours. To
                access {serviceTitle[currentService]} next data imports must be completed:
            </p>

            <div className="table">
                <div className="row header">
                    <div className="col">Import type</div>
                    <div className="col">Status</div>
                </div>

                {requiredParts && importTypes.map(i => (
                    requiredParts[i.key] && <div className="row ">
                        <div className="col">{i.title}</div>
                        <div className="col">
                            {requiredParts[i.key].part_ready ?
                                <><span>Done</span> <DoneIcon/></> :
                                <><span>In Progress...</span> <ProgressIcon/></>}
                        </div>
                    </div>))}
            </div>
        </ModalWindow>
    )
}


const DoneIcon = () => <i>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#7FD3A1"/>
        <path d="M5 8.55556L7.33333 11L11.5 6" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
    </svg>
</i>

const ProgressIcon = () => <i>
    <div className="loader"/>
</i>

export default LoadingAmazonAccount
