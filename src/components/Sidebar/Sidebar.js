import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, NavLink} from "react-router-dom"
import {regionsMenu, ppcAutomateMenu} from "./menu"
import {getClassNames} from "../../utils"
import logo from "../../assets/img/ProfitWhales-logo-white.svg"
import "./Sidebar.less"
import {SVG} from "../../utils/icons"
import '../../style/variables.less'
import InformationTooltip from "../Tooltip/Tooltip"
import {history} from "../../utils/history"
import {analyticsActions} from "../../actions/analytics.actions"
import ToggleMarketplace from "./ToggleMarketplace"
import {marketplaceIdValues} from "../../constans/amazonMarketplaceIdValues"

const production = process.env.REACT_APP_ENV === "production"
const devicePixelRatio = window.devicePixelRatio


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false),
        [automate, setAutomate] = useState(true),
        [isAdmin, setAdminStatus] = useState(false),
        [subMenuState, setSubMenuState] = useState({
            zth: false,
            ppc: false,
            notifications: false
        }),
        [regions] = useState(regionsMenu),
        dispatch = useDispatch(),
        {user, bootstrapInProgress} = useSelector(state => ({
            user: state.user,
            notFirstEntry: state.user.notFirstEntry,
            bootstrapInProgress: state.user.notifications && state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
        })),
        accountLinks = user.account_links[0]

    // const activeMarketplace = marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]
    const activeMarketplace = marketplaceIdValues['ATVPDKIKX0DER']

    const toggleCollapsed = () => {
        setCollapsed((prevState) => !prevState)
    }

    const className = getClassNames(collapsed ? "open" : "closed")

    const handleLogout = () => {
        history.push('/login/logout')
    }

    const toggleSubMenu = (menu) => {
        setSubMenuState({
            ...subMenuState,
            [menu]: !subMenuState[menu]
        })
    }

    const setAnalyticState = () => {
        dispatch(analyticsActions.setMainState(undefined))
        dispatch(analyticsActions.setLocation('products'))
    }

    const backToAdmin = () => {
        if (localStorage.getItem('adminToken')) {
            history.push('/admin-panel/impersonate')
        } else {
            history.push('/admin-panel/general')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            setAdminStatus(true)
        } else {
            setAdminStatus(false)
        }
    }, [user])

    return (
        <>
            <div
                className={`sidebar ${className}`}
            >
                <div className="sidebar-header">
                    <i className="sidebar-icon" onClick={toggleCollapsed}>
                        <SVG id={'menu-icon'}/>
                    </i>

                    <Link to="/" className="sidebar-logo">
                        <img className="logo" src={logo} alt="logo"/>
                    </Link>
                </div>

                <div className="sidebar-menu">
                    <ToggleMarketplace
                        user={user}
                    />

                    <nav className="top-nav">
                        <ul className="top-nav-list">
                            {/*<li className="top-nav-item ">*/}
                            {/*    <InformationTooltip*/}
                            {/*        type={'custom'}*/}
                            {/*        description={<ul className="collapsed-automate-list">*/}
                            {/*            <li className="automate-item">*/}
                            {/*                <NavLink*/}
                            {/*                    className={`automate-link ${automate ? 'visible' : 'hidden'}`}*/}
                            {/*                    activeClassName="automate-link-active"*/}
                            {/*                    exact*/}
                            {/*                    to={'/zero-to-hero/campaign'}*/}
                            {/*                >*/}
                            {/*                    Campaigns Setup*/}
                            {/*                </NavLink>*/}
                            {/*            </li>*/}

                            {/*            <li className="automate-item">*/}
                            {/*                <NavLink*/}
                            {/*                    className={`automate-link ${automate ? 'visible' : 'hidden'}`}*/}
                            {/*                    activeClassName="automate-link-active"*/}
                            {/*                    exact*/}
                            {/*                    to={'/zero-to-hero/settings'}*/}
                            {/*                >*/}
                            {/*                    ZTH Status*/}
                            {/*                </NavLink>*/}
                            {/*            </li>*/}
                            {/*        </ul>}*/}
                            {/*        position={'rightTop'}*/}
                            {/*        overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip ppc'}*/}
                            {/*    >*/}
                            {/*        <div onClick={() => toggleSubMenu('zth')} className={'has-child'}>*/}
                            {/*            <NavLink*/}
                            {/*                className="top-nav-link"*/}
                            {/*                activeClassName="top-nav-link-active"*/}
                            {/*                exact*/}
                            {/*                to="/"*/}
                            {/*                disabled*/}
                            {/*            >*/}
                            {/*                <div className="link-icon">*/}
                            {/*                    <SVG id='zth-icon'/>*/}
                            {/*                </div>*/}

                            {/*                <span className="top-span">*/}
                            {/*            Zero to Hero*/}
                            {/*                    /!*<span className="new-fiches">new</span>*!/*/}
                            {/*    </span>*/}
                            {/*            </NavLink>*/}
                            {/*        </div>*/}
                            {/*    </InformationTooltip>*/}

                            {/*    <ul className={`automate-list ${subMenuState.zth ? 'opened' : 'closed'}`}>*/}
                            {/*        <li className="automate-item">*/}
                            {/*            <NavLink*/}
                            {/*                className={`automate-link ${automate ? 'visible' : 'hidden'}`}*/}
                            {/*                activeClassName="automate-link-active"*/}
                            {/*                exact*/}
                            {/*                to={'/zero-to-hero/campaign'}*/}
                            {/*            >*/}
                            {/*                Campaigns Setup*/}
                            {/*            </NavLink>*/}
                            {/*        </li>*/}

                            {/*        <li className="automate-item">*/}
                            {/*            <NavLink*/}
                            {/*                className={`automate-link ${automate ? 'visible' : 'hidden'}`}*/}
                            {/*                activeClassName="automate-link-active"*/}
                            {/*                exact*/}
                            {/*                to={'/zero-to-hero/settings'}*/}
                            {/*            >*/}
                            {/*                ZTH Status*/}
                            {/*            </NavLink>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}

                            {activeMarketplace.countryCode !== 'CA' && <li className="top-nav-item">
                                <InformationTooltip
                                    type={'custom'}
                                    description={<Link onClick={setAnalyticState}
                                                       to={'/analytics/products'}>Analytics</Link>}
                                    position={'right'}
                                    overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip'}
                                >
                                    <NavLink
                                        className="top-nav-link"
                                        activeClassName="top-nav-link-active"
                                        to="/analytics/products"
                                        onClick={setAnalyticState}
                                    >
                                        <div className="link-icon">
                                            <SVG id='analytics-icon-sidebar'/>
                                        </div>

                                        <span className="top-span">
                                            Analytics
                                         </span>
                                    </NavLink>
                                </InformationTooltip>
                            </li>}

                            <li className="top-nav-item ppc-automate-link">
                                <InformationTooltip
                                    type={'custom'}
                                    description={<ul
                                        className={`automate-list ${subMenuState.ppc ? 'opened' : 'closed'}`}>
                                        {ppcAutomateMenu
                                            .filter(menuItem => {
                                                if (activeMarketplace.countryCode === 'CA' && menuItem.link === 'product-settings') return true
                                                else if (activeMarketplace.countryCode === 'US') return true
                                                else return false
                                            })
                                            .map(item => (
                                                <li className="automate-item" key={item.link}>
                                                    <NavLink
                                                        className={`automate-link ${automate ? 'visible' : 'hidden'}`}
                                                        activeClassName="automate-link-active"
                                                        data-intercom-target={`${item.link}-link`}
                                                        exact
                                                        to={item.soon && (production && user.user.id !== 714) ?
                                                            '/'
                                                            :
                                                            item.link === 'optimization' && bootstrapInProgress ? '/ppc/optimization-loading' : `/ppc/${item.link}`}
                                                        onClick={e => {
                                                            if (item.soon && (production && user.user.id !== 714)) e.preventDefault()
                                                        }}
                                                    >
                                                        {item.title}
                                                        {/*{item.new && <img className="new-fiches" src={newLabel}/>}*/}
                                                        {item.new && <span className="new-fiches">new</span>}
                                                    </NavLink>
                                                </li>
                                            ))}
                                    </ul>}
                                    position={'rightTop'}
                                    overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip ppc'}
                                >
                                    <div onClick={() => toggleSubMenu('ppc')}>
                                        <NavLink
                                            className="top-nav-link"
                                            activeClassName="top-nav-link-active"
                                            to="/ppc"
                                            replace
                                            disabled
                                        >
                                            <div className="link-icon">
                                                <SVG id='ppc-automate-icon'/>
                                            </div>

                                            <span className="top-span">PPC Automate</span>
                                        </NavLink>
                                    </div>
                                </InformationTooltip>

                                <ul className={`automate-list ${subMenuState.ppc ? 'opened' : 'closed'}`}>
                                    {ppcAutomateMenu
                                        .filter(menuItem => {
                                            if (activeMarketplace.countryCode === 'CA' && menuItem.link === 'product-settings') return true
                                            else if (activeMarketplace.countryCode === 'US') return true
                                            else return false
                                        })
                                        .map(item => (
                                            <li className="automate-item" key={item.link}>
                                                <NavLink
                                                    className={`automate-link ${automate ? 'visible' : 'hidden'}`}
                                                    activeClassName="automate-link-active"
                                                    data-intercom-target={`${item.link}-link`}
                                                    exact
                                                    to={item.soon && (production && user.user.id !== 714) ?
                                                        '/'
                                                        :
                                                        item.link === 'optimization' && bootstrapInProgress ? '/ppc/optimization-loading' : `/ppc/${item.link}`}
                                                    onClick={e => {
                                                        if (item.soon && (production && user.user.id !== 714)) e.preventDefault()
                                                    }}
                                                >
                                                    {item.title}
                                                    {/*{item.new && <img className="new-fiches" src={newLabel}/>}*/}
                                                    {item.new && <span className="new-fiches">new</span>}
                                                </NavLink>
                                            </li>
                                        ))}
                                </ul>
                            </li>


                            {/*{isAdmin && <li className="top-nav-item ">*/}
                            {/*    <InformationTooltip*/}
                            {/*        type={'custom'}*/}
                            {/*        description={<ul className="collapsed-automate-list">*/}
                            {/*            <li className="automate-item">*/}
                            {/*                <NavLink*/}
                            {/*                    className={`automate-link ${automate ? 'visible' : 'hidden'}`}*/}
                            {/*                    activeClassName="automate-link-active"*/}
                            {/*                    exact*/}
                            {/*                    to={'/notifications/listing-tracking'}*/}
                            {/*                >*/}
                            {/*                    Listing Tracking*/}
                            {/*                </NavLink>*/}
                            {/*            </li>*/}
                            {/*        </ul>}*/}
                            {/*        position={'rightTop'}*/}
                            {/*        overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip ppc'}*/}
                            {/*    >*/}
                            {/*        <div onClick={() => toggleSubMenu('notifications')} className={'has-child'}>*/}
                            {/*            <NavLink*/}
                            {/*                className="top-nav-link"*/}
                            {/*                activeClassName="top-nav-link-active"*/}
                            {/*                to="/notifications"*/}
                            {/*                replace*/}
                            {/*                disabled*/}
                            {/*            >*/}
                            {/*                <div className="link-icon">*/}
                            {/*                    <SVG id='notification-menu-icon'/>*/}
                            {/*                </div>*/}

                            {/*                <span className="top-span">*/}
                            {/*                     Notifications*/}
                            {/*                </span>*/}
                            {/*            </NavLink>*/}
                            {/*        </div>*/}
                            {/*    </InformationTooltip>*/}

                            {/*    <ul className={`automate-list ${subMenuState.notifications ? 'opened' : 'closed'}`}>*/}
                            {/*        <li className="automate-item">*/}
                            {/*            <NavLink*/}
                            {/*                className={`automate-link ${automate ? 'visible' : 'hidden'}`}*/}
                            {/*                activeClassName="automate-link-active"*/}
                            {/*                exact*/}
                            {/*                to={'/notifications/listing-tracking'}*/}
                            {/*            >*/}
                            {/*                Listing Tracking*/}
                            {/*            </NavLink>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*}*/}
                        </ul>
                    </nav>

                    <div className="facebook-link">
                        <InformationTooltip
                            type={'custom'}
                            description={<a href='https://www.facebook.com/groups/profitwhales.software/'
                                            target="_blank">Join
                                us on Facebook</a>}
                            position={'right'}
                            overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip'}
                        >
                            <a href='https://www.facebook.com/groups/profitwhales.software/' target="_blank">
                                <div className="icon">
                                    <SVG id='facebook-icon-white'/>
                                </div>

                                <span className="bottom-span">Join us on Facebook</span>
                            </a>
                        </InformationTooltip>
                    </div>

                    <div className="refer-link">
                        <InformationTooltip
                            type={'custom'}
                            description={<Link to={'/affiliates'} target="_blank">Refer sellers! Get Cash</Link>}
                            position={'right'}
                            overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip'}
                        >
                            <Link to={'/affiliates'} target="_blank">
                                <div className="icon">
                                    <SVG id='refer-icon'/>
                                </div>

                                {devicePixelRatio === 2 ?
                                    <span className="bottom-span">Refer sellers! <br/> Get Cash</span>
                                    :
                                    <span className="bottom-span">Refer sellers! Get Cash</span>}
                            </Link>
                        </InformationTooltip>
                    </div>

                    <nav className="bottom-nav">
                        <ul className="bottom-nav-list">
                            {/*<li className={`bottom-nav-item ${bootstrapInProgress && 'disabled-link'} `}>*/}
                            {/*    <a*/}
                            {/*        href={bootstrapInProgress ? '#' : "/ppc/optimization?product_tour_id=108046"}*/}
                            {/*    >*/}
                            {/*        <div className="link-icon">*/}
                            {/*            <SVG id='how-it-works'/>*/}
                            {/*        </div>*/}

                            {/*        <span className="bottom-span">How it works?</span>*/}
                            {/*    </a>*/}
                            {/*</li>*/}

                            <li className="bottom-nav-item">
                                <InformationTooltip
                                    type={'custom'}
                                    description={<NavLink
                                        className="automate-link"
                                        activeClassName="automate-link-active"
                                        exact
                                        to={`/account/settings`}
                                    >Account</NavLink>}
                                    position={'right'}
                                    overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip'}
                                >
                                    <NavLink
                                        className="automate-link"
                                        activeClassName="automate-link-active"
                                        exact
                                        to={`/account/settings`}
                                    >
                                        <div className="link-icon">
                                            <SVG id='account'/>

                                            {(accountLinks.amazon_mws.status === 'FAILED' ||
                                                accountLinks.amazon_mws.status === 'UNAUTHORIZED' ||
                                                accountLinks.amazon_ppc.status === 'FAILED' ||
                                                accountLinks.amazon_ppc.status === 'UNAUTHORIZED') &&
                                            <i><SVG id={'notification-icon'}/></i>}
                                        </div>

                                        <span className="bottom-span">
                                    Account
                                            {/*<InformationTooltip type={'warning'} description={'test test test test test test test test  test test test test test test test test test '}/>*/}
                                </span>
                                    </NavLink>
                                </InformationTooltip>
                            </li>

                            {/*<li className="bottom-nav-item">*/}
                            {/*    <a*/}
                            {/*        href="#"*/}
                            {/*        onClick={() => window.Intercom('show')}*/}
                            {/*    >*/}
                            {/*        <img src={expertServiceIcon} alt=""/>*/}
                            {/*        <span className="bottom-span">Expert Service</span>*/}
                            {/*    </a>*/}
                            {/*</li>*/}

                            <li className="bottom-nav-item">
                                <InformationTooltip
                                    type={'custom'}
                                    description={<a
                                        href="https://intercom.help/profitwhales/en/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Help Center
                                    </a>}
                                    position={'right'}
                                    overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip'}
                                >
                                    <a
                                        href="https://intercom.help/profitwhales/en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="link-icon">
                                            <SVG id='help-center'/>
                                        </div>

                                        <span className="bottom-span">Help Center</span>
                                    </a>
                                </InformationTooltip>
                            </li>

                            <li className="bottom-nav-item" onClick={handleLogout}>
                                <InformationTooltip
                                    type={'custom'}
                                    description={<button type="button" onClick={handleLogout}>Log Out</button>}
                                    position={'right'}
                                    overlayClassName={collapsed ? 'hide-tooltip' : 'sidebar-link-tooltip'}
                                >
                                    <button type="button" onClick={handleLogout}>
                                        <div className="link-icon">
                                            <SVG id='log-out'/>
                                        </div>

                                        <span className="bottom-span">Log Out</span>
                                    </button>
                                </InformationTooltip>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {(!production || user.user.id === 714 || localStorage.getItem('adminToken')) &&
            <div className="back-to-admin">
                <InformationTooltip
                    type={'custom'}
                    description={<button type="button" onClick={backToAdmin}>Admin panel</button>}
                    position={'right'}
                    overlayClassName={'back-admin-tooltip'}
                    getPopupContainer={() => document.querySelector('.back-to-admin')}
                >
                    <button type="button" onClick={backToAdmin}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#755EE4"/>
                            <path
                                d="M36.6843 35.1671C36.4503 35.2442 36.2525 35.4056 36.1285 35.6207L34.6824 38.1316C34.5587 38.3465 34.5173 38.6 34.566 38.8438C34.6952 39.5455 34.9978 40.2027 35.4455 40.7542V41.0819C35.0361 41.5623 34.7475 42.1357 34.6041 42.7533H15.6694C15.5732 42.7534 15.4782 42.7325 15.3907 42.692C15.3032 42.6515 15.2254 42.5924 15.1625 42.5187C15.0997 42.445 15.0533 42.3584 15.0265 42.2649C14.9997 42.1714 14.9931 42.0731 15.0073 41.9768C15.3577 39.1725 16.575 36.5521 18.4853 34.4901C20.7467 32.2141 23.9766 31.1052 28.0941 31.1783C32.4571 31.1039 35.7974 32.3597 38.0728 34.9288C37.6011 34.9405 37.1335 35.0208 36.6843 35.1671ZM28.0781 28.4372C29.4886 28.4371 30.8675 28.0136 32.0402 27.2204C33.213 26.4271 34.127 25.2996 34.6667 23.9806C35.2064 22.6616 35.3476 21.2102 35.0723 19.8099C34.7971 18.4097 34.1177 17.1235 33.1203 16.114C32.1228 15.1046 30.852 14.4171 29.4686 14.1387C28.0851 13.8602 26.6511 14.0032 25.3479 14.5496C24.0448 15.0959 22.9309 16.0212 22.1473 17.2082C21.3637 18.3953 20.9454 19.7909 20.9454 21.2186C20.9475 23.1326 21.6997 24.9675 23.0369 26.3208C24.3741 27.6741 26.1871 28.4353 28.0781 28.4372Z"
                                fill="white"/>
                            <path
                                d="M46.3964 39.9079L46.274 39.6854L46.0415 39.583C45.9925 39.5614 45.947 39.5236 45.9137 39.4707C45.8803 39.4175 45.8617 39.353 45.8628 39.2856L45.8628 39.2856L45.8629 39.2771L45.8692 37.7801H45.8692L45.8692 37.7764C45.8692 37.7063 45.8891 37.6394 45.9243 37.5842C45.9593 37.5292 46.0069 37.4896 46.0584 37.4666L46.2782 37.3688L46.4 37.1613C46.5281 36.9434 46.6326 36.7122 46.7121 36.4719L46.8154 36.1594L46.6554 35.8718L45.5921 33.9607L45.4318 33.6725L45.111 33.5959C44.862 33.5364 44.6069 33.5075 44.351 33.51L44.1027 33.5123L43.9049 33.6624C43.8568 33.6989 43.802 33.7183 43.7475 33.7214C43.6933 33.7245 43.638 33.7115 43.5878 33.6818C43.5875 33.6816 43.5872 33.6814 43.5869 33.6813L42.3368 32.9281C42.3367 32.928 42.3365 32.9279 42.3364 32.9278C42.286 32.8972 42.2419 32.85 42.2126 32.7891C42.1831 32.7278 42.171 32.6574 42.179 32.587L42.2062 32.3509L42.0923 32.1422C41.9714 31.9205 41.8271 31.7127 41.6617 31.5225L41.4395 31.2669L41.1008 31.2645L38.9658 31.25L38.621 31.2477L38.3947 31.5078C38.228 31.6995 38.082 31.9086 37.9589 32.1315L37.8453 32.3371L37.8693 32.5707C37.8766 32.6415 37.8636 32.712 37.8335 32.7732L38.5066 33.104L37.8335 32.7732C37.804 32.8334 37.7601 32.8802 37.71 32.9108L36.4532 33.6497L36.4526 33.6501C36.402 33.6799 36.3463 33.6927 36.2917 33.6893C36.2371 33.6859 36.1823 33.666 36.1343 33.6291L35.9406 33.4801L35.6964 33.4738C35.4391 33.4672 35.182 33.4931 34.9311 33.5508L34.6093 33.6248L34.4466 33.9122L33.3685 35.816L33.2045 36.1057L33.3093 36.4217C33.3868 36.6553 33.486 36.8811 33.6056 37.0957L33.7269 37.3134L33.9543 37.4151C34.0049 37.4378 34.0516 37.4771 34.0857 37.5316C34.12 37.5864 34.139 37.6527 34.1379 37.7219L34.1379 37.7219L34.1379 37.7298L34.1308 39.2195H34.1308L34.1308 39.2268C34.1312 39.2961 34.1116 39.3621 34.0769 39.4166C34.0424 39.4708 33.9954 39.5097 33.9447 39.532L33.717 39.6322L33.5943 39.8485C33.4711 40.0658 33.3689 40.2946 33.2891 40.5317L33.1834 40.846L33.3447 41.1356L34.4087 43.0468L34.5748 43.345L34.9087 43.4157C35.1521 43.4672 35.4002 43.4921 35.6488 43.4901L35.8948 43.488L36.0917 43.3407C36.14 43.3046 36.1948 43.2855 36.2493 43.2828C36.3037 43.28 36.3593 43.2935 36.4096 43.3239L36.4131 43.326L37.6646 44.0728C37.7145 44.1034 37.7582 44.1504 37.7874 44.2109L38.452 43.8909L37.7874 44.2109C37.8169 44.2722 37.829 44.3426 37.821 44.413L37.7935 44.652L37.9102 44.8624C38.0305 45.0793 38.1709 45.2841 38.3297 45.4739L38.5535 45.7415L38.9024 45.7427L41.0368 45.75L41.3718 45.7511L41.5962 45.5024C41.7689 45.311 41.9187 45.0997 42.0427 44.873L42.1543 44.6688L42.1308 44.4373C42.1236 44.3668 42.1367 44.2966 42.167 44.2359C42.1971 44.1754 42.2419 44.1289 42.2927 44.0991L42.2947 44.0979L43.5481 43.3572C43.5483 43.3571 43.5484 43.357 43.5486 43.3569C43.599 43.3273 43.6546 43.3145 43.709 43.3179C43.7636 43.3214 43.8184 43.3412 43.8664 43.3782L44.0663 43.5319L44.3185 43.5337C44.566 43.5354 44.813 43.5105 45.0553 43.4594L45.3866 43.3897L45.5534 43.0951L46.6315 41.1912L46.7946 40.9032L46.6917 40.5886C46.6146 40.3528 46.5158 40.1249 46.3964 39.9079ZM40.5687 37.4535L40.5695 37.4526C40.8301 37.6102 41.0262 37.872 41.1067 38.1863C41.1876 38.5019 41.1431 38.837 40.9858 39.1161C40.8687 39.3231 40.697 39.486 40.4953 39.5876C40.2937 39.6891 40.0693 39.726 39.8497 39.6953C39.6299 39.6645 39.4209 39.5669 39.2501 39.4112C39.0789 39.2553 38.9537 39.0478 38.8937 38.8133C38.8337 38.5787 38.8426 38.3308 38.9189 38.1019C38.9951 37.8731 39.1342 37.6764 39.3151 37.5344C39.4957 37.3926 39.7102 37.3111 39.9313 37.2971C40.1524 37.283 40.374 37.3366 40.5687 37.4535Z"
                                fill="white" stroke="#755EE4" stroke-width="1.5"/>
                        </svg>
                    </button>
                </InformationTooltip>
            </div>}
        </>
    )
}

export default React.memo(Sidebar)
