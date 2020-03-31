import React, {Fragment, useEffect, useState} from 'react';
import logoDark from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import logoWhite from '../../../../assets/img/ProfitWhales-logo-white.svg';
import {Link} from "react-router-dom";

import './Header.less';
import {history} from "../../../../utils/history";
import {SVG} from "../../../../utils/icons";


const Header = ({type = 'light'}) => {
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

    const authorized = localStorage.getItem('token');


    return (
        <header className={`not-found-page__header ${type}`} id={'header'}>
            <div className="container">
                <div>
                    <Link to='/'>
                        <img src={type === 'dark' ? logoWhite : logoDark} alt="Profit Whales" className='logo'/>
                    </Link>

                    <button className='burger-menu-button' onClick={() => switchMenu(!openedMenu)}>
                        <div/>
                        <div/>
                        <div/>
                    </button>

                    <nav className={`header-menu ${openedMenu ? 'open' : ''}`}>
                        <ul className="">
                            <li>
                                <Link to={'/about-us'}>About us</Link>
                            </li>
                            <li className="has-child"><a href="#">Services <SVG id='menu-arrow'/></a>
                                <ul className="sub-menu">
                                    <li><Link to='/'>PPC Optimization</Link></li>
                                    <li><Link to='/scanner'>PPC Scanner</Link></li>
                                    <li className="soon"><a href='#'>Zero To Hero</a></li>
                                    <li className="soon"><a href='#'>Analytics</a></li>
                                </ul>
                            </li>
                            <li><Link to={'/pricing'}>Pricing</Link></li>
                            <li><Link to={'/affiliates'}>Affiliate Program</Link></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><Link to="/contact-us">Contact us</Link></li>
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
