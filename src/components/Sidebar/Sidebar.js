import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {Icon, Popover} from 'antd';

import RegionsMenu from './RegionsMenu';
import {regionsMenu, ppcAutomateMenu} from './menu';
import {getClassNames} from '../../utils';
import {userActions} from '../../actions/user.actions';
import './Sidebar.less';

import logo from '../../assets/img/logo.svg';
import ItemIcon from "./ItemIcon";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


const Sidebar = () => {
    const [width, height] = useWindowSize();
    const [collapsed, setCollapsed] = useState(false),
        [regions] = useState(regionsMenu),
        dispatch = useDispatch(),
        {user} = useSelector(state => ({
            user: state.user
        })),

        toggleCollapsed = () => setCollapsed(!collapsed),
        className = getClassNames('Sidebar', {SidebarOpen: !collapsed}),
        activeLink = global.location.pathname,
        activeLinkArr = global.location.pathname.split('/'),
        activeCountry = regions.map(region =>
            region.countries.find(country => country.active)
        )[0];

    const setActiveCountry = country => {
        console.log(country);
    };

    const handleLogout = () => {
      dispatch(userActions.logOut())
    };

    useEffect(() => {
        width < 800 ? setCollapsed(true) : setCollapsed(false);
        dispatch(userActions.getAuthorizedUserInfo());
    }, [dispatch, width]);

    window.captchaStyle.innerHTML = `.grecaptcha-badge { display: none !important}`;

    return (
        <div className={className}>

            <div className="sidebar-header">
                <Icon className="sidebar-icon" type="menu" onClick={toggleCollapsed}/>
                {!collapsed && (
                    <Link to="/" className="sidebar-logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                )}
            </div>

            <div className="sidebar-menu">
                <div>
                    {/*<Popover*/}
                    {/*  placement="rightTop"*/}
                    {/*  overlayClassName="RegionsList"*/}
                    {/*  content={*/}
                    {/*    <RegionsMenu*/}
                    {/*      regions={regions}*/}
                    {/*      setActiveCountry={setActiveCountry}*/}
                    {/*      user={user}*/}
                    {/*    />*/}
                    {/*  }*/}
                    {/*  trigger="click"*/}
                    {/*>*/}
                    <div className="country-active">
                        <div className="country-active__title">
                            <img
                                src={`/assets/img/${activeCountry.flag}`}
                                alt="active-country-flag"
                            />
                            <h5>{activeCountry.name}</h5>
                        </div>
                        <div className="country-active__description">
                            {user.default_accounts.amazon_mws.seller_id}
                        </div>
                    </div>
                    {/*</Popover>*/}

                    <nav className='top-navigation'>
                        <ul>
                            <li>
                                <NavLink to='/' disabled>
                                    <ItemIcon icon='zeroToHero'/>
                                    Zero to Hero
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/' disabled>
                                    <ItemIcon icon='analytics'/>
                                    Analytics
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/ppc'>
                                    <ItemIcon icon='ppcAutomate'/>
                                    PPC Automate
                                </NavLink>

                                <ul>
                                  {ppcAutomateMenu.map(item => (
                                      <NavLink to={`/ppc${item.link}`}>
                                        {item.title}
                                      </NavLink>
                                  ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>

                <nav className='bottom-navigation'>
                    <ul>
                        <li onClick={() => window.open('/account/settings', '_self')}>
                            <a href="#">{user.user.avatar ? (
                                <img className="avatar" src={user.user.avatar} alt="avatar" width="40"/>
                            ) : (
                                <ItemIcon icon="account"/>
                            )}
                                Account
                            </a>
                        </li>

                        <li>
                            <a href="https://profit-whales.kayako.com"
                               target="_blank"
                            >
                                <ItemIcon icon='helpCenter'/>
                                <span>Help Center</span>
                            </a>
                        </li>

                        <li onClick={handleLogout}>
                            <a href="#">
                                <ItemIcon icon={'logOut'}/>
                                <span>Log Out</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
