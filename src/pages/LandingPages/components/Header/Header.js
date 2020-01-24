import React, {Fragment, useEffect, useState} from 'react';
import logo from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import {Icon} from "antd";
import {Link} from "react-router-dom";

import './Header.less';

const authorized = localStorage.getItem('token');

const Header = () => {
    const [openedMenu, switchMenu] = useState(false);

    useEffect(() => {
        document.querySelector('.header-menu').addEventListener('click', () => {
            switchMenu(false);
        });
    }, []);

    useEffect(() => {
        if (openedMenu) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [openedMenu]);


    return (
        <header className='not-found-page__header' id={'header'}>
            <div className="container">
                <div>
                    <Link to='/automation'>
                        <img src={logo} alt="Profit Whales" className='logo'/>
                    </Link>

                    <button className='burger-menu-button' onClick={() => switchMenu(!openedMenu)}>
                        <div/>
                        <div/>
                        <div/>
                    </button>

                    <nav className={`header-menu ${openedMenu ? 'open' : ''}`}>
                        <ul className="">
                            <li className="has-child">
                                <a>Company</a>
                                <ul className="sub-menu">
                                    <li><a href="https://profitwhales.com/about-us">About us</a></li>
                                </ul>
                            </li>
                            <li className="has-child"><a href="#">Products</a>
                                <ul className="sub-menu">
                                    <li><a href='https://profitwhales.com/scanner'>PPC Scanner</a></li>
                                    <li><Link to='/automation'>PPC Automate</Link></li>
                                </ul>
                            </li>
                            <li className="has-child"><a>Services</a>
                                <ul className="sub-menu">
                                    <li><a href="https://profitwhales.com/expert-service">Expert Service</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="https://profitwhales.com/pricing">Pricing</a></li>
                            <li><a href="https://profitwhales.com/blog">Blog</a></li>
                            <li className="has-child">
                                <a href="#">Help</a>
                                <ul className="sub-menu">
                                    <li><a href="https://profitwhales.com/contact-us">Contact us</a></li>
                                    <li><a href="https://profit-whales.kayako.com">Help Center</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='nav-buttons'>
                    {!authorized ?
                        <Fragment>
                            <Link to='/login' className='login-btn'>LOG IN</Link>
                            <Link to='/registration' className='register-btn'>TRY IT FOR FREE</Link>
                        </Fragment>
                        :
                        <Link to='/ppc/optimization' className='register-btn'>SIGN IN</Link>
                    }

                </div>
            </div>
        </header>
    )
}

export default Header;