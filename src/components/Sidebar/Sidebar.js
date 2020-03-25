import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {Icon} from "antd";
import shortid from "shortid";
import referIcon from '../../assets/img/icons/sidebar-icons/refer-icon.svg';
import facebookIcon from '../../assets/img/icons/sidebar-icons/facebook-icon-white.svg';
import zthIcon from '../../assets/img/icons/sidebar-icons/zth-icon.svg';
import logOutIcon from '../../assets/img/icons/sidebar-icons/log-out.svg';
import helpCenterIcon from '../../assets/img/icons/sidebar-icons/help-center.svg';
import ppcIcon from '../../assets/img/icons/sidebar-icons/ppc-automate-icon.svg';
import userDefaultAvatar from '../../assets/img/icons/sidebar-icons/account.svg';
import howItWorksIcon from '../../assets/img/icons/sidebar-icons/how-it-works.svg';
import {regionsMenu, ppcAutomateMenu} from "./menu";
import {getClassNames} from "../../utils";
import {userActions} from "../../actions/user.actions";
import logo from "../../assets/img/ProfitWhales-logo-white.svg";
import soon from "../../assets/img/soon-label.svg";
import newLabel from "../../assets/img/new-label.svg";
import "./Sidebar.less";
import {history} from "../../utils/history";

const production = process.env.REACT_APP_ENV === "production";
const devicePixelRatio = window.devicePixelRatio;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true),
        [automate, setAutomate] = useState(true),
        [regions] = useState(regionsMenu),
        // [display, setDisplay] = useState("none"),
        dispatch = useDispatch(),
        {user, notFirstEntry, bootstrapInProgress} = useSelector(state => ({
            user: state.user,
            notFirstEntry: state.user.notFirstEntry,
            bootstrapInProgress: state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
        }));


    const toggleCollapsed = () => {
        setCollapsed(!collapsed);

        collapsed
            ? setAutomate(!collapsed)
            : setTimeout(() => setAutomate(!collapsed), 500);
    };

    const className = getClassNames(collapsed ? "open" : "closed");

    const activeCountry = regions.map(region =>
        region.countries.find(country => country.active)
    )[0];

    const handleLogout = () => {
        dispatch(userActions.logOut());
    };

    const toggleAutomate = () => setAutomate(!automate);

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo());
        window.innerWidth < 800 ? setCollapsed(false) : setCollapsed(true);

        document.querySelector('body').classList.add('visible-intercom');

        return (() => {
            document.querySelector('body').classList.remove('visible-intercom')
        })
    }, []);


    // useEffect(() => {
    //     window.innerWidth < 800 ? setCollapsed(false) : setCollapsed(true);
    // }, [width]);

    if (!notFirstEntry) {
        history.push('/login');
        return ('');
    }

    return (
        <div
            className={`sidebar ${className}`}
        >
            <div className="sidebar-header">
                <Icon className="sidebar-icon" type="menu" onClick={toggleCollapsed}/>

                <Link to="/" className="sidebar-logo">
                    <img className="logo" src={logo} alt="logo"/>
                </Link>
            </div>

            <div className="sidebar-menu">
                <div className="country-active">
                    <div className="country-active__title">
                        <img
                            src={`/assets/img/${activeCountry.flag}`}
                            alt="active-country-flag"
                        />
                        <h5>{activeCountry.name}</h5>
                    </div>

                    <div className="country-active__description">
                        {user.default_accounts
                            ? user.default_accounts.amazon_mws && user.default_accounts.amazon_mws.seller_id
                            : ""}
                    </div>
                </div>

                <nav className="top-nav">
                    <ul className="top-nav-list">
                        <li className="top-nav-item disabled-link">
                            <NavLink
                                className="top-nav-link"
                                activeClassName="top-nav-link-active"
                                exact
                                to="/"
                                disabled
                            >
                                <div className="link-icon">
                                    <img src={zthIcon} alt=""/>
                                </div>
                                <span className="top-span">
                                        Zero to Hero
                                        <img className="soon" src={soon} alt="soon"/>
                                    </span>
                            </NavLink>
                        </li>

                        {/*<li className="top-nav-item">*/}
                        {/*    <NavLink*/}
                        {/*        className="top-nav-link"*/}
                        {/*        activeClassName="top-nav-link-active"*/}
                        {/*        exact*/}
                        {/*        to="/"*/}
                        {/*        disabled*/}
                        {/*    >*/}
                        {/*        <ItemIcon icon="analytics"/>*/}
                        {/*        <span className="top-span">*/}
                        {/*            Analytics*/}
                        {/*            <img className="soon" src={soon} alt="soon"/>*/}
                        {/*        </span>*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}

                        <li className="top-nav-item ppc-automate-link">
                            <div onClick={toggleAutomate}>
                                <NavLink
                                    className="top-nav-link"
                                    activeClassName="top-nav-link-active"
                                    to="/ppc"
                                    replace
                                    disabled
                                >
                                    <div className="link-icon">
                                        <img src={ppcIcon} alt=""/>
                                    </div>

                                    <span className="top-span">PPC Automate</span>
                                </NavLink>
                            </div>

                            {collapsed && (
                                <ul
                                    className={`automate-list ${automate ? "open" : "closed"}`}
                                >
                                    {ppcAutomateMenu.map(item => (
                                        <li className="automate-item" key={shortid.generate()}>
                                            <NavLink
                                                className="automate-link"
                                                activeClassName="automate-link-active"
                                                data-intercom-target={`${item.link}-link`}
                                                exact
                                                to={item.soon && (production && user.user.id !== 714) ?
                                                    '/'
                                                    :
                                                    item.link === 'optimization' && bootstrapInProgress ? '/ppc/optimization/loading' : `/ppc/${item.link}`}
                                                onClick={e => {
                                                    if (item.soon && (production && user.user.id !== 714)) e.preventDefault()
                                                }}
                                            >
                                                {item.title}
                                                {item.new && <img className="new-fiches" src={newLabel}/>}
                                                {item.soon && <img className="soon" src={soon}/>}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {!collapsed && (
                                <div
                                    className={`collapsed-automate`}
                                    // style={{ display: `${display}` }}
                                >
                                    <ul className="collapsed-automate-list">
                                        {ppcAutomateMenu.map(item => (
                                            <li
                                                className="automate-item"
                                                key={shortid.generate()}
                                                // onClick={displayNone}
                                            >
                                                <NavLink
                                                    className="automate-link"
                                                    activeClassName="automate-link-active"
                                                    data-intercom-target={`${item.link}-link`}
                                                    exact
                                                    to={(item.soon && (production && user.user.id !== 714)) ? '/' : `/ppc/${item.link}`}
                                                    onClick={e => {
                                                        if (item.soon && (production && user.user.id !== 714)) e.preventDefault()
                                                    }}
                                                >
                                                    {item.title}
                                                    {item.soon && <img className="soon" src={soon} alt="soon"/>}
                                                    {item.new && <img className="new-fiches" src={newLabel}/>}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>

                <div className="facebook-link">
                    <a href='https://www.facebook.com/groups/profitwhales.software/' target="_blank">
                        <div className="icon">
                            <img src={facebookIcon} alt=""/>
                        </div>

                        <span className="bottom-span">Join us on Facebook</span>
                    </a>
                </div>

                <div className="refer-link">
                    <Link to={'/affiliates'} target="_blank">
                        <div className="icon">
                            <img src={referIcon} alt=""/>
                        </div>

                        {devicePixelRatio === 2 ? <span className="bottom-span">Refer sellers! <br/> Get Cash</span>
                            :
                            <span className="bottom-span">Refer sellers! Get Cash</span>}
                    </Link>
                </div>

                <nav className="bottom-nav">
                    <ul className="bottom-nav-list">
                        <li className="bottom-nav-item">
                            <a
                                href="/ppc/optimization?product_tour_id=108046"
                            >
                                <div className="link-icon">
                                    <img src={howItWorksIcon} alt=""/>
                                </div>

                                <span className="bottom-span">How it works?</span>
                            </a>
                        </li>

                        <li className="bottom-nav-item">
                            <NavLink
                                className="automate-link"
                                activeClassName="automate-link-active"
                                exact
                                to={`/account-settings`}
                            >
                                <div className="link-icon">
                                    <img src={userDefaultAvatar} alt=""/>
                                </div>

                                <span className="bottom-span">Account</span>
                            </NavLink>
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
                            <a
                                href="https://intercom.help/profitwhales/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="link-icon">
                                    <img src={helpCenterIcon} alt=""/>
                                </div>

                                <span className="bottom-span">Help Center</span>
                            </a>
                        </li>

                        <li className="bottom-nav-item" onClick={handleLogout}>
                            <button type="button">
                                <div className="link-icon">
                                    <img src={logOutIcon} alt=""/>
                                </div>

                                <span className="bottom-span">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default React.memo(Sidebar);
