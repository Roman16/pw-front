import React, {Fragment, useEffect, useState} from 'react';
import logoDark from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import logoWhite from '../../../../assets/img/ProfitWhales-logo-white.svg';
import {Link} from "react-router-dom";
import './Header.less';
import {history} from "../../../../utils/history";
import {SVG} from "../../../../utils/icons";


const Header = ({type = 'light', page}) => {
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

    const authorized = !!localStorage.getItem('token');

    return (
        <>
            {page !== 'zth' && <div className="new-zth">
                <span>NEW!</span> We launched Zero to Hero tool to create 100% ready-to-use Amazon PPC Campaigns.

                <button className={'btn white'}>
                    <Link to={'zero-to-hero-info'}>
                        Learn More
                    </Link>
                </button>
            </div>}

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
                                <li className="has-child"><a href="#">Products <SVG id='menu-arrow'/></a>
                                    <ul className="sub-menu">
                                        <li><Link to='/'>PPC Automate</Link></li>
                                        {/*<li><Link to='/scanner'>PPC Scanner</Link></li>*/}
                                        <li><Link to={'/zero-to-hero-info'}>Zero To Hero</Link></li>
                                        <li className="soon"><a href='#'>Analytics</a></li>
                                    </ul>
                                </li>
                                <li><Link to={'/pricing'}>Pricing</Link></li>
                                <li><Link to="/contact-us">Contact us</Link></li>
                                <li className="has-child"><a href="#">Resources <SVG id='menu-arrow'/></a>
                                    <ul className="sub-menu">
                                        <li><a href="/blog">Blog</a></li>
                                        <li><a href='https://intercom.help/profitwhales/en' target={'_blank'}>Help Center</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><Link to="/videos">How it works</Link></li>
                            </ul>
                        </nav>
                    </div>

                    <div className='nav-buttons'>
                        {!authorized ?
                            <Fragment>
                                <div onClick={() => history.push('/login')} className='login-link'>LOG IN</div>
                                <button
                                    onClick={() => history.push('/registration')}
                                    className='btn green-btn register-btn'
                                >
                                    {page === 'zth' ? 'Try it Now' : 'TRY IT FOR FREE'}
                                </button>
                            </Fragment>
                            :
                            <button
                                onClick={() => history.push('/ppc/optimization')}
                                className='btn green-btn login-btn'
                            >
                                SIGN IN
                            </button>
                        }

                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
