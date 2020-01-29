import React, {Fragment, useEffect, useState} from 'react';
import logoDark from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import logoWhite from '../../../../assets/img/ProfitWhales-logo-white.svg';
import {Link} from "react-router-dom";

import './Header.less';
import {history} from "../../../../utils/history";

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
                    <Link to='/'>
                        <img src={logoDark} alt="Profit Whales" className='logo dark'/>
                        <img src={logoWhite} alt="Profit Whales" className='logo white'/>
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
                                    <li><Link to='/'>PPC Automate</Link></li>
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
                            <div onClick={() => history.push('/login')} className='login-btn'>LOG IN</div>
                            <div onClick={() => history.push('/registration')} className='register-btn'>TRY IT FOR
                                FREE
                            </div>
                        </Fragment>
                        :
                        <div onClick={() => history.push('/ppc/optimization')} className='register-btn'>SIGN IN</div>
                    }

                </div>
            </div>
        </header>
    )
}

export default Header;