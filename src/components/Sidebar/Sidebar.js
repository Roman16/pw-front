import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {Icon} from "antd";
import shortid from "shortid";
import {regionsMenu, ppcAutomateMenu} from "./menu";
import {getClassNames} from "../../utils";
import {userActions} from "../../actions/user.actions";
import logo from "../../assets/img/ProfitWhales-logo-white.svg";
import "./Sidebar.less";
import {history} from "../../utils/history";
import {SVG} from "../../utils/icons";
import '../../style/variables.less';
import InformationTooltip from "../Tooltip/Tooltip";

const production = process.env.REACT_APP_ENV === "production";
const devicePixelRatio = window.devicePixelRatio;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true),
        [automate, setAutomate] = useState(true),
        [regions] = useState(regionsMenu),
        dispatch = useDispatch(),
        {user, notFirstEntry, bootstrapInProgress} = useSelector(state => ({
            user: state.user,
            notFirstEntry: state.user.notFirstEntry,
            bootstrapInProgress: state.user.notifications && state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
        }));


    const toggleCollapsed = () => {
        setCollapsed((prevState) => !prevState);
    };

    const className = getClassNames(collapsed ? "open" : "closed");

    const activeCountry = regions.map(region =>
        region.countries.find(country => country.active)
    )[0];

    const handleLogout = () => {
        dispatch(userActions.logOut());
    };

    const toggleSubMenu = () => setAutomate(prevState => !prevState);

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo());
        window.innerWidth < 1132 ? setCollapsed(false) : setCollapsed(true);

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
                        <SVG id='us-flag'/>
                        <h5>{activeCountry.name}</h5>
                    </div>

                    {user.default_accounts && user.default_accounts.amazon_mws && user.default_accounts.amazon_mws.seller_id
                        ? <div className="country-active__description">
                            {user.default_accounts.amazon_mws.seller_id}
                        </div>
                        : ""}
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
                                    <SVG id='zth-icon'/>
                                </div>

                                <span className="top-span">
                                        Zero to Hero
                                    <span className="soon">soon</span>
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
                        {/*        </span>*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}

                        <li className="top-nav-item ppc-automate-link">
                            <div onClick={toggleSubMenu}>
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

                            <ul className={`automate-list`}>
                                {ppcAutomateMenu.map(item => (
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

                            {!collapsed && (
                                <div className={`collapsed-automate`}>
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
                                                    {item.new && <span className="new-fiches">new</span>}
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
                            <SVG id='facebook-icon-white'/>
                        </div>

                        <span className="bottom-span">Join us on Facebook</span>
                    </a>
                </div>

                <div className="refer-link">
                    <Link to={'/affiliates'} target="_blank">
                        <div className="icon">
                            <SVG id='refer-icon'/>
                        </div>

                        {devicePixelRatio === 2 ? <span className="bottom-span">Refer sellers! <br/> Get Cash</span>
                            :
                            <span className="bottom-span">Refer sellers! Get Cash</span>}
                    </Link>
                </div>

                <nav className="bottom-nav">
                    <ul className="bottom-nav-list">
                        <li className={`bottom-nav-item ${bootstrapInProgress && 'disabled-link'} `}>
                            <a
                                href={bootstrapInProgress ? '#' : "/ppc/optimization?product_tour_id=108046"}
                            >
                                <div className="link-icon">
                                    <SVG id='how-it-works'/>
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
                                    <SVG id='account'/>
                                </div>

                                <span className="bottom-span">
                                    Account
                                    {/*<InformationTooltip type={'warning'} description={'test test test test test test test test  test test test test test test test test test '}/>*/}
                                </span>
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
                                    <SVG id='help-center'/>
                                </div>

                                <span className="bottom-span">Help Center</span>
                            </a>
                        </li>

                        <li className="bottom-nav-item" onClick={handleLogout}>
                            <button type="button">
                                <div className="link-icon">
                                    <SVG id='log-out'/>
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
