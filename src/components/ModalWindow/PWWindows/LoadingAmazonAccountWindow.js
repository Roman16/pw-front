import React, {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import ModalWindow from "../ModalWindow"
import {userActions} from "../../../actions/user.actions"
import {productsActions} from "../../../actions/products.actions"
import {userService} from "../../../services/user.services"
import {Link} from "react-router-dom"
import {round} from "../../../utils/round"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"

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
    // {
    //     key: 'products_info',
    //     title: 'Products Info',
    //     link: '/ppc/product-settings'
    // },
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
        title: 'AMS SP Conversions',
        key: 'amazon_marketing_stream_sp_conversion_setup'
    },
    {
        title: 'AMS SP Traffic',
        key: 'amazon_marketing_stream_sp_traffic_setup'
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

    const marketplaceName = activeAmazonMarketplace?.marketplace_id ? marketplaceIdValues[activeAmazonMarketplace.marketplace_id].countryName : ''

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
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <rect opacity="0.04" x="-4" y="29.406" width="43.0895" height="42.2509" rx="13"
                          transform="rotate(-50.8297 -4 29.406)" fill="#353A3E"/>
                    <rect opacity="0.04" x="49.0146" y="70.8857" width="20.4753" height="20.0768" rx="7"
                          transform="rotate(-110.518 49.0146 70.8857)" fill="#353A3E"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M9.97866 9C7.45339 9 5.40625 11.0471 5.40625 13.5724V55.4276C5.40625 57.9529 7.45339 60 9.97866 60L20.8816 60H46.3314C48.5866 60 50.5051 58.3556 50.85 56.1269L56.2933 20.9545C56.7222 18.1835 54.5787 15.6828 51.7747 15.6828H20.8821V13.5724C20.8821 11.0471 18.835 9 16.3097 9H9.97866Z"
                          fill="#FF5256"/>
                    <path
                        d="M17.1152 25.3048C17.1152 23.9451 18.2175 22.8428 19.5773 22.8428H51.0817C52.4415 22.8428 53.5438 23.9451 53.5438 25.3048V42.9664C53.5438 44.3262 52.4415 45.4285 51.0817 45.4285H19.5773C18.2175 45.4285 17.1152 44.3262 17.1152 42.9664V25.3048Z"
                        fill="white"/>
                    <path
                        d="M13.053 29.5057C13.6291 27.5654 15.4123 26.2346 17.4364 26.2346H58.897C61.9545 26.2346 64.1505 29.1774 63.2804 32.1083L55.9711 56.729C55.3951 58.6694 53.6118 60.0001 51.5878 60.0001H10.1271C7.06967 60.0001 4.87362 57.0574 5.74376 54.1264L13.053 29.5057Z"
                        fill="#FF787C"/>
                    <path
                        d="M29.9749 34.7834L29.9749 40.9536L27.6644 40.9536C27.4502 40.9533 27.2399 41.0128 27.0573 41.1257C26.8747 41.2386 26.7269 41.4005 26.6305 41.593C26.55 41.7555 26.5085 41.9347 26.5092 42.1162C26.5092 42.3678 26.5903 42.6125 26.7402 42.8137L33.6717 52.1489C33.8898 52.4416 34.2323 52.614 34.5959 52.614C34.9595 52.614 35.3019 52.4416 35.5201 52.1489L42.4575 42.8137C42.6304 42.5817 42.7108 42.293 42.6831 42.0045C42.6555 41.7158 42.5216 41.448 42.3078 41.2536C42.0939 41.0591 41.8157 40.9522 41.5275 40.9537L39.217 40.9537L39.217 34.7834C39.217 34.4751 39.0953 34.1794 38.8787 33.9613C38.6619 33.7433 38.3681 33.6208 38.0617 33.6208L31.1303 33.6208C30.8239 33.6208 30.5301 33.7433 30.3134 33.9613C30.0967 34.1794 29.9749 34.4751 29.9749 34.7834Z"
                        fill="white"/>
                </g>
            </svg>

            <h2>Welcome {firstName} {lastName}!</h2>

            <p>
                We’re currently retrieving Amazon data for your {marketplaceName} marketplace. <br/>
                It only needs to be completed once and may take up to 24 hours. <br/>
                See the table below for import progress and start using features whenever they’re ready!
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

                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.5L4.5 5L1 1.5" stroke="#353A3E" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className="col status">
                            <ToolStatus
                                importDetails={importStatus[item.key]}
                            />
                        </div>
                        <div className="col action">
                            {importStatus[item.key]?.required_parts_ready ?
                                <Link to={item.link} className={'btn default'}>Start Using</Link> : '-'}
                        </div>
                    </div>

                    <div className={`details ${activeTool === index ? 'active' : ''}`}>
                        {importTypes.map(i => (
                            importStatus[item.key]?.required_parts_details[i.key] && <div className="row ">
                                <div className="col">{i.title}</div>
                                <div className="col status">
                                    {importStatus[item.key].required_parts_details[i.key]?.part_ready ?
                                        <><span className={'done'}>Done</span> <DoneIcon/></> :
                                        <>
                                            <span>In Progress ({round(importStatus[item.key]?.required_parts_details[i.key].ready_types_count / importStatus[item.key].required_parts_details[i.key].total_types_count * 100, 0)}%)</span>
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
    if (importDetails?.required_parts_ready) {
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
