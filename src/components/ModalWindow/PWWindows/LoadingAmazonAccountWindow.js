import React, {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import ModalWindow from "../ModalWindow"
import {userActions} from "../../../actions/user.actions"
import {productsActions} from "../../../actions/products.actions"
import {userService} from "../../../services/user.services"
import {Link} from "react-router-dom"
import {round} from "../../../utils/round"

let intervalId = null

const serviceTitle = {
    ppc_automate: 'PPC Automation',
    ppc_audit: 'PPC Audit',
    zth: 'Zero to Hero',
    analytics: 'Analytics',
    dayparting: 'Dayparting',

    products_info: 'PPC Automation',
    subscription: 'Subscription',
}

const tools = [
    {
        key: 'ppc_audit',
        title: 'PPC Audit',
        link: '/ppc-audit'
    },
    {
        key: 'zth',
        title: 'Zero to Hero',
        link: '/zero-to-hero/campaign'
    },
    {
        key: 'analytics',
        title: 'Analytics',
        link: '/analytics/products/regular'
    },
    {
        key: 'ppc_automate',
        title: 'PPC Automation',
        link: '/ppc/automation'
    },
    {
        key: 'dayparting',
        title: 'Dayparting',
        link: '/ppc/dayparting'
    },
    {
        key: 'products_info',
        title: 'Products Info',
        link: '/ppc/product-settings'
    },
    {
        key: 'subscription',
        title: 'Subscriptions',
        link: '/account/subscriptions'
    },


]

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
    {
        title: 'Profiles',
        key: 'profiles'
    },
    {
        title: 'Portfolios',
        key: 'portfolios'
    },
]

const LoadingAmazonAccount = ({visible, pathname, importStatus, firstName, lastName, productList, container = false}) => {
    const [activeTool, setActiveTool] = useState()

    const dispatch = useDispatch()
    const prevVisibleRef = useRef()
    const activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace)

    const checkStatus = async () => {
        try {
            const importStatus = await userService.checkImportStatus(activeAmazonMarketplace.id)
            dispatch(userActions.updateUser({importStatus: importStatus.result}))
        } catch (e) {

        }
    }

    const onChangeActiveTool = (index) => {
        setActiveTool(prevState => prevState === index ? undefined : index)
    }

    useEffect(() => {
        if (prevVisibleRef.current && !visible) document.location.reload()

        prevVisibleRef.current = visible

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

                clearInterval(intervalId)
            }
        }, 10000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [visible])

    return (
        <ModalWindow
            className={'amazon-loading-window'}
            wrapClassName="import-status-window-wrap"
            visible={visible}
            okText={'Check it now'}
            container={!container}
            getContainer={container}
            maskStyle={container && {
                width: '100%',
                right: 'inherit',
                left: 'inherit',
                top: '0',
                zIndex: '11'
            }}
        >
            <h1>📂</h1>

            <h2>Welcome {firstName} {lastName}!</h2>

            <p>
                We are currently syncing data from your Amazon Account with our system. This may take up to 24 hours. To
                access next data imports must be completed:
            </p>

            <div className="table">
                <div className="row header">
                    <div className="col">Feature</div>
                    <div className="col">Status</div>
                    <div className="col">Action</div>
                </div>

                {tools.map((item, index) => <>
                    <div className={'row'}>
                        <div className={`col name ${activeTool === index ? 'active' : ''}`}
                             onClick={() => onChangeActiveTool(index)}>
                            {item.title}
                            {!importStatus[item.key].required_parts_ready &&
                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.5L4.5 5L1 1.5" stroke="#353A3E" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>}
                        </div>
                        <div className="col status">
                            <ToolStatus
                                importDetails={importStatus[item.key]}
                            />
                        </div>
                        <div className="col action">
                            {importStatus[item.key].required_parts_ready ?
                                <Link to={item.link} className={'btn default'}>Start Using</Link> : '-'}
                        </div>
                    </div>

                    <div className={`details ${activeTool === index ? 'active' : ''}`}>
                        {importTypes.map(i => (
                            importStatus[item.key].required_parts_details[i.key] && <div className="row ">
                                <div className="col">{i.title}</div>
                                <div className="col status">
                                    {importStatus[item.key].required_parts_details[i.key].part_ready ?
                                        <><span className={'done'}>Done</span> <DoneIcon/></> :
                                        <>
                                            <span>In Progress ({importStatus[item.key].required_parts_details[i.key].ready_types_count / importStatus[item.key].required_parts_details[i.key].total_types_count * 100}%)</span>
                                            <ProgressIcon/></>}
                                </div>
                                <div className="col"/>
                            </div>))}
                    </div>
                </>)}
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

const ToolStatus = ({importDetails}) => {
    if (importDetails.required_parts_ready) {
        return <span className={'ready'}>Ready</span>
    } else {
        const percent = round((100 / Object.values(importDetails.required_parts_details).length) * Object.values(importDetails.required_parts_details).reduce((prevValue, item) => item.part_ready ? prevValue + 1 : prevValue, 0), 0)

        return (<>
            <div className="status-bar">
                <div style={{width: `${percent}%`}}/>
            </div>
            {percent} %</>)
    }

}

export default LoadingAmazonAccount
