import React, {Fragment} from 'react';
import logo from '../../../assets/img/logo-blue.svg';

import {Link} from "react-router-dom";

import './Header.less';

const authorized = localStorage.getItem('token');

const Header = () => (
    <header className='not-found-page__header'>
        <div className="container">
            <div>
                <img src={logo} alt="Profit Whales"/>

                <nav>
                    <ul className="">
                        <li className="has-child">
                            <a>Company</a>
                            <ul className="sub-menu">
                                <li><a href="https://profitwhales.com/about-us">About us</a></li>
                            </ul>
                        </li>
                        <li className="has-child"><a href="#">Products</a>
                            <ul className="sub-menu">
                                <li><a href="https://profitwhales.com/scanner">PPC Scanner</a></li>
                                <li><a href="https://profitwhales.com/automation">PPC Automate</a></li>
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
                        <Link to='/registration' className='register-btn'>GET STARTED</Link>
                    </Fragment>
                    :
                    <Link to='/ppc/optimization' className='register-btn'>BACK TO SITE</Link>
                }

            </div>
        </div>
    </header>
);

export default Header;