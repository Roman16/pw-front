import React, {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, NavLink} from "react-router-dom"
import {mainMenu} from "./menu"
import {getClassNames} from "../../utils"
import logo from "../../assets/img/logo/pw-logo-white.svg"
import "./Sidebar.less"
import {SVG} from "../../utils/icons"
import '../../style/variables.less'
import {history} from "../../utils/history"
import CurrentMarketplace from "./ConnectedRegions/CurrentMarketplace"
import moment from 'moment'
import * as Sentry from "@sentry/browser"
import AvailableMarketplaces from "./ConnectedRegions/ConnectedRegions"
import {userActions} from "../../actions/user.actions"
import $ from 'jquery'
import {userTypeEnums} from "../../constans/userTypeEnums"

const production = process.env.REACT_APP_ENV === "production"
const DEMO = process.env.REACT_APP_ENV === "demo"
const devicePixelRatio = window.devicePixelRatio

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false),
        [isAdmin, setAdminStatus] = useState(false),
        [isAgencyUser, setAgencyUser] = useState(false),
        [visibleMarketplacesWindow, setVisibleMarketplacesWindow] = useState(false),
        [subMenuState, setSubMenuState] = useState({
            zth: false,
            ppc: false,
            notifications: false
        })

    const wrapperRef = useRef(null)

    const parentLink = useRef(null)

    const dispatch = useDispatch()

    const user = useSelector(state => state.user),
        amazonRegionAccounts = useSelector(state => state.user.amazonRegionAccounts),
        activeRegion = useSelector(state => state.user.activeAmazonRegion),
        activeMarketplace = useSelector(state => state.user.activeAmazonMarketplace)

    const className = getClassNames(collapsed ? "open" : "closed")

    const isAdvancedUser = user.userDetails.user_type === userTypeEnums.ADVANCED_CLIENT,
        isAdminUser = user.userDetails.user_type === userTypeEnums.ADMIN || localStorage.getItem('adminToken')

    const toggleSubMenu = (menu) => {
        setSubMenuState({
            ...subMenuState,
            [menu]: !subMenuState[menu]
        })
    }
    const toggleCollapsed = () => {
        setCollapsed((prevState) => !prevState)

        setSubMenuState({
            zth: false,
            ppc: false,
            notifications: false
        })
    }


    const toggleMarketplacesWindow = () => {
        setVisibleMarketplacesWindow(prevState => !prevState)

        if (!visibleMarketplacesWindow) {
            var obj = $('.current-marketplace')
            var offset = obj.offset()
            var new_top = offset.top

            $('.available-marketplaces').css('top', new_top + 'px')
        }
    }

    const setMarketplaceHandler = (data) => {
        history.push('/home')
        dispatch(userActions.setActiveRegion(data))
        window.location.reload()
    }


    useEffect(() => {
        if (user.userDetails.user_type === userTypeEnums.ADMIN) setAdminStatus(true)
        else setAdminStatus(false)

        if (user.userDetails.user_type === userTypeEnums.AGENCY_CLIENT) setAgencyUser(true)
        else setAgencyUser(false)


        Sentry.configureScope(function (scope) {
            scope.setUser({
                id: user.userDetails.id,
                email: user.userDetails.email,
            })
        })
    }, [user])

    useEffect(() => {
        if (window.screen.width < 850) setTimeout(() => setCollapsed(false), 100)
    }, [history.location])


    useEffect(() => {
        //IntercomProvider dont work with impersonate-->
        window.Intercom("boot", {
            app_id: process.env.REACT_APP_INTERCOM_ID,
            name: user.userDetails.name,
            alignment: 'left',
            horizontal_padding: devicePixelRatio === 2 ? 64 : 82,
            hide_default_launcher: true,
            vertical_padding: 0,
            custom_launcher_selector: '#intercom-chat-launcher',
            email: user.userDetails.email,
            user_id: user.userDetails.id,
            created_at: moment(user.userDetails.created_at).unix(),
            user_hash: user.userDetails.intercom_user_hash,
        })

        return (() => {
            window.Intercom('shutdown')
        })
    }, [])

    useEffect(() => {
        if (collapsed) {
            window.Intercom("update", {
                app_id: process.env.REACT_APP_INTERCOM_ID,
                horizontal_padding: devicePixelRatio === 2 ? 175 : 230
            })
        } else {
            window.Intercom("update", {
                app_id: process.env.REACT_APP_INTERCOM_ID,
                horizontal_padding: devicePixelRatio === 2 ? 64 : 82
            })
        }
    }, [collapsed])

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && !document.querySelector('.sidebar .current-marketplace')?.contains(event.target)) {
                setVisibleMarketplacesWindow(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [wrapperRef])


    useEffect(() => {
        $('.nav-item.has-child').hover(function () {
                const popup_div = $(this).find(".sub-menu")

                const obj = $(this)
                const offset = obj.offset()

                const new_top = offset.top + 45

                popup_div.css('top', new_top + 'px')
            }
        )
    }, [])

    const sidebarScrollHandler = () => {
        $('.sub-menu').hide()
        setVisibleMarketplacesWindow(false)
    }


    return (
        <>
            <div className={`sidebar ${className}`} onScroll={sidebarScrollHandler}>
                <div className="sidebar-header">
                    <div className="burger" onClick={toggleCollapsed}>
                        <div/>
                        <div/>
                        <div/>
                    </div>

                    <Link to="/home" className="sidebar-logo">
                        <img className="logo" src={logo} alt="logo"/>
                    </Link>
                </div>

                <CurrentMarketplace
                    onToggle={toggleMarketplacesWindow}
                    active={visibleMarketplacesWindow}
                    activeMarketplace={activeMarketplace}
                    activeRegion={activeRegion}
                />

                <nav className="top-nav">
                    <h3>SERVICES</h3>

                    <ul className="top-nav-list">
                        {mainMenu
                            .filter(i => isAdmin ? i : isAgencyUser ? i.key !== 'zth' : i)
                            .filter(i => (isAdminUser) ? i : i.key !== 'rules')
                            .filter(i => (isAdmin || isAgencyUser) ? i : i.key !== 'report')
                            .filter(i => DEMO ? i.key !== 'scanner' : i)
                            .map(item => {
                                return (
                                    <li className={`nav-item ${subMenuState[item.key] ? 'opened' : 'closed'} ${item.subMenu ? 'has-child' : ''}`}
                                        ref={parentLink}>
                                        <NavLink
                                            className={`menu-link ${item.subMenu ? 'has-child' : ''}`}
                                            activeClassName="active"
                                            to={item.subMenu ? `/${item.link}/${item.subMenu[0].link}` : `/${item.link}`}
                                            onClick={(e) => {
                                                if (item.subMenu && collapsed) {
                                                    e.preventDefault()
                                                    e.stopPropagation()

                                                    toggleSubMenu(item.key)
                                                }
                                            }}
                                        >
                                            <div className="link-icon"><SVG id={item.icon}/></div>

                                            <label>{item.title}</label>

                                            {item.subMenu && <i><SVG id={'has-sub-menu'}/></i>}
                                        </NavLink>

                                        {item.subMenu &&
                                        <ul className={`sub-menu ${subMenuState[item.key] ? 'opened' : 'closed'}`}>
                                            <h4>{item.title}</h4>

                                            {item.subMenu && item.subMenu
                                                .map(subItem => (
                                                    <li className="automate-item">
                                                        <NavLink
                                                            className="sub-menu-link"
                                                            activeClassName="active"
                                                            exact
                                                            to={`/${item.link}/${subItem.link}`}
                                                        >
                                                            {subItem.title}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                        </ul>}
                                    </li>
                                )
                            })}
                    </ul>
                </nav>

                <SocialLinks/>

                <IntercomChat/>

                <nav className="bottom-nav">
                    <ul className="bottom-nav-list">
                        <li className="bottom-nav-item">
                            <NavLink
                                className="menu-link"
                                activeClassName="active"
                                to={`/account`}
                            >
                                <div className="link-icon">
                                    <SVG id='account'/>
                                </div>

                                <label>
                                    Account
                                </label>
                            </NavLink>
                        </li>

                        {/*<li className="bottom-nav-item">*/}
                        {/*    <a*/}
                        {/*        className="menu-link"*/}
                        {/*        href={'https://intercom.help/sponsoreds/en/'}*/}
                        {/*        target={'_blank'}*/}
                        {/*    >*/}
                        {/*        <div className="link-icon">*/}
                        {/*            <SVG id='help-center'/>*/}
                        {/*        </div>*/}

                        {/*        <label>*/}
                        {/*            Help Center*/}
                        {/*        </label>*/}
                        {/*    </a>*/}
                        {/*</li>*/}

                        {isAdminUser ?
                            <li className="bottom-nav-item">
                                <Link
                                    className="menu-link"
                                    activeClassName="active"
                                    to={localStorage.getItem('adminToken') ? '/admin-panel/impersonate' : '/admin-panel/general'}
                                >
                                    <div className="link-icon">
                                        <SVG id='admin-panel-icon'/>
                                    </div>

                                    <label>Admin Panel</label>
                                </Link>
                            </li> : isAdvancedUser ?
                                <li className="bottom-nav-item">
                                    <Link
                                        className="menu-link"
                                        activeClassName="active"
                                        to={'/advanced/zth'}
                                    >
                                        <div className="link-icon">
                                            <SVG id='admin-panel-icon'/>
                                        </div>

                                        <label>Advanced tools</label>
                                    </Link>
                                </li> : ''}

                        <li className="bottom-nav-item log-out-item">
                            <Link
                                className="menu-link"
                                activeClassName="active"
                                to={'/login/logout'}
                            >
                                <div className="link-icon">
                                    <SVG id='log-out'/>
                                </div>

                                <label>Log Out</label>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <AvailableMarketplaces
                popupRef={wrapperRef}
                visible={visibleMarketplacesWindow}
                collapsed={collapsed}
                regions={amazonRegionAccounts}
                activeRegion={activeRegion}
                activeMarketplace={activeMarketplace}

                onSet={setMarketplaceHandler}
                onChangeVisibleStatus={setVisibleMarketplacesWindow}
            />
        </>
    )
}


export const SocialLinks = () => <div className="social-links">
    <h3>OUR Social Media</h3>

    <ul>
        <li><a
            href="https://www.facebook.com/profitwhales"
            target="_blank"
            title="Facebook"
        >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z"
                />
            </svg>
        </a></li>

        <li><a
            href="https://www.linkedin.com/company/profitwhales/"
            target="_blank"
            title="LinkedIn"
        >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.09414 15.4286H0.895472V5.1277H4.09414V15.4286ZM2.49309 3.72257C1.47025 3.72257 0.640625 2.87536 0.640625 1.8525C0.640625 1.36119 0.835794 0.889997 1.1832 0.542585C1.5306 0.195174 2.00178 0 2.49309 0C2.98439 0 3.45557 0.195174 3.80297 0.542585C4.15038 0.889997 4.34555 1.36119 4.34555 1.8525C4.34555 2.87536 3.51557 3.72257 2.49309 3.72257ZM16.0658 15.4286H12.874V10.4142C12.874 9.21912 12.8499 7.68656 11.2109 7.68656C9.54787 7.68656 9.29302 8.98493 9.29302 10.3281V15.4286H6.09779V5.1277H9.1656V6.53284H9.21037C9.63741 5.72351 10.6806 4.86941 12.2368 4.86941C15.4741 4.86941 16.0692 7.00121 16.0692 9.77015V15.4286H16.0658Z"
                />
            </svg>
        </a></li>

        <li><a
            href="https://www.instagram.com/profit.whales/"
            target="_blank"
            title="Instagram"
        >
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.07335 4.38503C6.51885 4.38503 4.45838 6.4455 4.45838 9C4.45838 11.5545 6.51885 13.615 9.07335 13.615C11.6279 13.615 13.6883 11.5545 13.6883 9C13.6883 6.4455 11.6279 4.38503 9.07335 4.38503ZM9.07335 12.0003C7.42257 12.0003 6.07302 10.6548 6.07302 9C6.07302 7.3452 7.41855 5.99967 9.07335 5.99967C10.7282 5.99967 12.0737 7.3452 12.0737 9C12.0737 10.6548 10.7241 12.0003 9.07335 12.0003ZM14.9535 4.19625C14.9535 4.79471 14.4715 5.27268 13.8771 5.27268C13.2786 5.27268 12.8007 4.79069 12.8007 4.19625C12.8007 3.60181 13.2827 3.11983 13.8771 3.11983C14.4715 3.11983 14.9535 3.60181 14.9535 4.19625ZM18.0101 5.28874C17.9418 3.84681 17.6125 2.56956 16.5561 1.51724C15.5038 0.464911 14.2265 0.135557 12.7846 0.0632601C11.2985 -0.0210867 6.84419 -0.0210867 5.35808 0.0632601C3.92017 0.131541 2.64292 0.460895 1.58657 1.51322C0.530231 2.56555 0.204893 3.8428 0.132596 5.28473C0.0482492 6.77084 0.0482492 11.2251 0.132596 12.7113C0.200877 14.1532 0.530231 15.4304 1.58657 16.4828C2.64292 17.5351 3.91615 17.8644 5.35808 17.9367C6.84419 18.0211 11.2985 18.0211 12.7846 17.9367C14.2265 17.8685 15.5038 17.5391 16.5561 16.4828C17.6084 15.4304 17.9378 14.1532 18.0101 12.7113C18.0944 11.2251 18.0944 6.77485 18.0101 5.28874ZM16.0902 14.3058C15.7769 15.093 15.1704 15.6995 14.3792 16.0168C13.1943 16.4868 10.3827 16.3783 9.07335 16.3783C7.76397 16.3783 4.94839 16.4828 3.76754 16.0168C2.9803 15.7036 2.37381 15.0971 2.05651 14.3058C1.58657 13.1209 1.69502 10.3094 1.69502 9C1.69502 7.69062 1.59059 4.87504 2.05651 3.69419C2.36979 2.90695 2.97629 2.30046 3.76754 1.98315C4.95241 1.51322 7.76397 1.62167 9.07335 1.62167C10.3827 1.62167 13.1983 1.51724 14.3792 1.98315C15.1664 2.29644 15.7729 2.90293 16.0902 3.69419C16.5601 4.87906 16.4517 7.69062 16.4517 9C16.4517 10.3094 16.5601 13.125 16.0902 14.3058Z"
                />
            </svg>
        </a></li>
    </ul>
</div>


const IntercomChat = () => <div className="intercom-chat-launcher" id={'intercom-chat-launcher'}>
    <div className="link-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M20 2C20 0.895431 19.1046 0 18 0H7C5.89543 0 5 0.895431 5 2V4H11C13.2091 4 15 5.79086 15 8V14.2254C16.6733 15.0707 18.0285 15.7297 18.4974 15.8952C19.6896 16.3158 19.9877 15.3693 19.9877 14.8435V10.2234C19.9958 10.1501 20 10.0755 20 10V2Z"
            />
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0 8C0 6.89543 0.895431 6 2 6H11C12.1046 6 13 6.89543 13 8V16.0714C13 17.176 12.1046 18.0714 11 18.0714H5.15215C3.36361 18.9887 1.86776 19.7297 1.38462 19.9017C0.276923 20.2961 0 19.4087 0 18.9158V16.0714V14V8ZM4 12.5714C4 13.1237 3.55228 13.5714 3 13.5714C2.44772 13.5714 2 13.1237 2 12.5714C2 12.0191 2.44772 11.5714 3 11.5714C3.55228 11.5714 4 12.0191 4 12.5714ZM6.57143 13.5714C7.12371 13.5714 7.57143 13.1237 7.57143 12.5714C7.57143 12.0191 7.12371 11.5714 6.57143 11.5714C6.01914 11.5714 5.57143 12.0191 5.57143 12.5714C5.57143 13.1237 6.01914 13.5714 6.57143 13.5714ZM11 12.5714C11 13.1237 10.5523 13.5714 10 13.5714C9.44771 13.5714 9 13.1237 9 12.5714C9 12.0191 9.44771 11.5714 10 11.5714C10.5523 11.5714 11 12.0191 11 12.5714Z"
            />
        </svg>
    </div>

    <label htmlFor="">Talk to us</label>
</div>

export default React.memo(Sidebar)
