import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {Icon, Avatar} from "antd";
import shortid from "shortid";
import referIcon from '../../assets/img/icons/refer-icon.svg';
import facebookIcon from '../../assets/img/icons/facebook-icon-white.svg';
import {regionsMenu, ppcAutomateMenu} from "./menu";
import {getClassNames} from "../../utils";
import {userActions} from "../../actions/user.actions";
import ItemIcon from "../ItemIcon/ItemIcon";
import logo from "../../assets/img/ProfitWhales-logo-white.svg";
import soon from "../../assets/img/soon-label.svg";
import newLabel from "../../assets/img/new-label.svg";
import "./Sidebar.less";
import {history} from "../../utils/history";

const domainName =
    window.location.hostname === "localhost"
        ? "https://front1.profitwhales.com"
        : "";


const production = process.env.REACT_APP_ENV === "production";
const devicePixelRatio = window.devicePixelRatio;

function useWindowSize() {
    const isClient = typeof window === "object";

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

const Sidebar = () => {
    const {width, height} = useWindowSize(),
        [collapsed, setCollapsed] = useState(true),
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

        return(() => {
            document.querySelector('body').classList.remove('visible-intercom')
        })
    }, []);


    useEffect(() => {
        window.innerWidth < 800 ? setCollapsed(false) : setCollapsed(true);
    }, [width]);


    if (!notFirstEntry) {
        history.push('/login');
        // localStorage.removeItem('token');
        return ('');
    }


    return (
        <div
            className={`sidebar ${className}`}
            // style={{ height: `${height}px` }}
        >
            <div className="sidebar-header">
                <Icon className="sidebar-icon" type="menu" onClick={toggleCollapsed}/>
                <Link to="/" className="sidebar-logo">
                    <img className="logo" src={logo} alt="logo"/>
                </Link>
            </div>

            <div className="sidebar-menu">
                <div className="country-nav">
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
                            <li className="top-nav-item">
                                <NavLink
                                    className="top-nav-link"
                                    activeClassName="top-nav-link-active"
                                    exact
                                    to="/"
                                    disabled
                                >
                                    <ItemIcon icon="zeroToHero"/>
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
                                    <span onClick={toggleAutomate}>
                                      <NavLink
                                          className="top-nav-link disabled-link"
                                          activeClassName="top-nav-link-active"
                                          to="/ppc"
                                          replace
                                      >
                                            <ItemIcon icon="ppcAutomate"/>
                                            <span className="top-span">PPC Automate</span>
                                      </NavLink>
                                    </span>

                                {collapsed && (
                                    <ul
                                        className={`automate-list ${automate ? "open" : "closed"}`}
                                    >
                                        {ppcAutomateMenu.map(item => (
                                            <li className="automate-item" key={shortid.generate()}>
                                                <NavLink
                                                    className="automate-link"
                                                    activeClassName="automate-link-active"
                                                    {...item.link === '/product-settings' && {"data-intercom-target": "settings-link"}}
                                                    {...item.link === '/optimization' && {"data-intercom-target": "optimization-link"}}
                                                    {...item.link === '/dashboard' && {"data-intercom-target": "dashboard-link"}}
                                                    exact
                                                    to={item.soon && (production && user.user.id !== 714) ?
                                                        '/'
                                                        :
                                                        item.link === '/optimization' && bootstrapInProgress ? '/ppc/optimization/loading' : `/ppc${item.link}`}
                                                    onClick={e => {
                                                        if (item.soon && (production && user.user.id !== 714)) e.preventDefault()
                                                    }}
                                                >
                                                    {item.title}
                                                    {item.new && <img className="new-fiches" src={newLabel} />}
                                                    {item.soon && <img className="soon" src={soon} />}
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
                                                        {...item.link === '/product-settings' && {"data-intercom-target": "settings-link"}}
                                                        {...item.link === '/optimization' && {"data-intercom-target": "optimization-link"}}
                                                        {...item.link === '/dashboard' && {"data-intercom-target": "dashboard-link"}}
                                                        exact
                                                        to={(item.soon && (production && user.user.id !== 714)) ? '/' : `/ppc${item.link}`}
                                                        onClick={e => {
                                                            if (item.soon && (production && user.user.id !== 714)) e.preventDefault()
                                                        }}
                                                    >
                                                        {item.title}
                                                        {item.soon && <img className="soon" src={soon} alt="soon"/>}
                                                        {item.new && <img className="new-fiches" src={newLabel} />}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

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
                            <NavLink
                                className="automate-link"
                                activeClassName="automate-link-active"
                                exact
                                to={`/account-settings`}
                            >
                                {user.user.avatar ? (
                                    <i className="anticon">
                                        <Avatar
                                            className="avatar"
                                            src={domainName + user.user.avatar}
                                        />
                                    </i>
                                ) : (
                                    <ItemIcon icon="account"/>
                                )}

                                <span className="bottom-span">Account</span>
                            </NavLink>
                        </li>

                        <li className="bottom-nav-item">
                            <a
                                href="https://intercom.help/profitwhales/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ItemIcon icon="helpCenter"/>
                                <span className="bottom-span">Help Center</span>
                            </a>
                        </li>

                        <li className="bottom-nav-item" onClick={handleLogout}>
                            <button type="button">
                                <ItemIcon icon={"logOut"}/>
                                <span className="bottom-span">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
