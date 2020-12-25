import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookSquare, faLinkedin, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"

import logo from '../../../../assets/img/logo/pw-agensy-dark.svg'
import spnLogo from '../../../../assets/img/logo/amazon-spn-logo-dark.png'
import advertisingLogo from '../../../../assets/img/logo/amazon-advertising-logo-dark.png'

import './Footer.less'

const Footer = () => (
    <footer className='not-found-page__footer'>
        <div className="container">
            <div className="row">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>

                <div className="actions">
                    <Link to={'/login'} className={'login-link'}>
                        LOG IN
                    </Link>

                    <Link
                        to={'/audit'}
                        className={'btn default'}
                        target={'_blank'}
                    >
                        GET A FREE AUDIT
                    </Link>
                </div>
            </div>

            <p className={'description'}>
                Amazon Advertising Agency powered by technology with the mission to build long-term relationships with
                Sellers and Brands on Amazon Marketplace.
            </p>

            <div className="menu">
                <div className="col">
                    <h4>Products</h4>

                    <ul>
                        <li><Link to={'/'}>PPC Optimization</Link></li>
                        <li><Link to={'/zero-to-hero-info'}>Zero To Hero</Link></li>
                    </ul>
                </div>

                <div className="col">
                    {/*<h4><Link to={'/pricing'}>Pricing</Link></h4>*/}
                </div>

                <div className="col">
                    <h4>Learn</h4>

                    <ul>
                        <li><a href="https://blog.profitwhales.com" target="_blank">BLOG</a></li>

                        <li>
                            <a href="https://blog.profitwhales.com/case-studies/" target="_blank">
                                Case Studies
                            </a>
                        </li>

                        <li>
                            <a href="https://blog.profitwhales.com/podcasts/" target="_blank">
                                Podcast
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col">
                    {/*<h4><Link to={'/videos'}>How it works</Link></h4>*/}
                </div>

                <div className="col">


                    <ul>
                        <li><Link to={'/help-support'}>Help & Support</Link></li>
                        <li><Link to={'/book-a-demo'}>Book a Demo</Link></li>
                        <li><Link to={'/audit'}>Advertising Audit</Link></li>
                        <li><Link to={'/partners'}>Become a Partner</Link></li>
                        <li>
                            <a className={'email'}
                               href="mailto: official@profitwhales.com">official@profitwhales.com</a>
                        </li>
                        <li><a href={'https://goo.gl/maps/c5iFucpi8GkcfEAK9'} target={'_blank'} className="location">
                            15805 BISCAYNE BLVD. 201 AVENTURA, FL 33160
                        </a></li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <label>Profit Whales © 2020 All Right Reserved</label>

                <img src={advertisingLogo} alt="" className={'amazon-advertising-logo'}/>

                <img src={spnLogo} alt="" className={'amazon-spn-logo'}/>

                <ul className="social-icons">
                    <li>
                        <a href="https://twitter.com/ProfitWhales" className="i-tw" target="_blank"
                           title="Twitter">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profitwhales/" className="i-fb" target="_blank"
                           title="Facebook">
                            <FontAwesomeIcon icon={faFacebookSquare}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/profitwhales/" className="i-in"
                           target="_blank"
                           title="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/UCtUreqMG_C_P8Ymqa-LJ2Yg" className="you"
                           target="_blank"
                           title="Youtube">
                            <FontAwesomeIcon icon={faYoutube}/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
)

export default Footer
