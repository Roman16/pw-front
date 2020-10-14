import React, {useEffect} from "react"
import './ContactUs.less'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

import supportTeamImage from '../../../assets/img/landing-contact-us/support-team.png'
import casesImage from '../../../assets/img/landing-contact-us/cases-image.svg'
import mapImage from '../../../assets/img/landing-contact-us/location-map.svg'
import amazonSpnWhiteLogo from '../../../assets/img/amazon-spn-logo-white.png'
import trustpilotLogo from '../../../assets/img/landing-contact-us/trustpilot-logo.svg'
import amazonAdvertisingLogo from '../../../assets/img/logo/amazon-advertising-white.png'
import starsIcon from '../../../assets/img/landing-contact-us/stars.svg'
import {SVG} from "../../../utils/icons"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebookSquare, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons"
import PreFooter from "./PreFooter"

const ContactUs = (props) => {
    const showIntercom = () => {
        window.Intercom('show')
    }

    useEffect(() => {
        if (props.match.params.status === 'chat') {
            showIntercom()
        }
    }, [])


    return (
        <div className="landing-contact-us  landing-page">
            <Header/>

            <section className={'pre-header'}>
                <div className="container">
                    <h2>We’d love <span>to hear</span> from you</h2>
                    <p>
                        Whether you have a question about features, trials, pricing, demo, or anything else, our
                        team is
                        <br/>
                        ready to answer all your questions
                    </p>

                    <img src={supportTeamImage} alt="" className={'support-team'}/>

                    <p>
                        We are an official partner on the Amazon Service Provider <br/> Network and with Amazon Advertising.
                    </p>

                    <div className="logos">
                        <img src={amazonSpnWhiteLogo} alt="" className={'spn-logo'}/>

                        <img src={amazonAdvertisingLogo} alt="" className={'advertising-logo'}/>
                    </div>
                </div>
            </section>


            <section className={'topic-list'}>
                <div className="container">
                    <div className="location">
                        <ul>
                            <li><i><SVG id={'clock'}/></i> 10:00 - 10:00 EST</li>
                            <li><i><SVG id={'email'}/></i> official@profitwhales.com</li>
                            <li><i><SVG id={'location'}/></i> Yevhena Konovaltsia St, <br/> 32G, Kyiv, 02000</li>
                        </ul>

                        <img src={mapImage} alt=""/>

                        <a href="https://goo.gl/maps/1uc4tbaxkyLESaeB9" target={'_blank'}>
                            Look at Google Map
                            <SVG id={'right-row'}/>
                        </a>
                    </div>

                    <div className="topics">
                        <h3>
                            Please <span>select a topic below</span> <br/> related to your inquiry.
                        </h3>

                        <Link to={'/help-support'}>
                            <h4>
                                Help & Support
                            </h4>
                            <p>
                                Looking for support? Get in touch! Always humans, never bots.
                            </p>
                            <i><SVG id={'right-icon'}/></i>
                        </Link>

                        <Link to={'/book-a-demo'}>
                            <h4>
                                Book a Demo
                            </h4>
                            <p>
                                I do what I love. Profit Whales does the rest.
                            </p>
                            <i><SVG id={'right-icon'}/></i>
                        </Link>

                        <Link to={'/audit'}>
                            <h4>
                                Advertising Audit
                            </h4>
                            <p>
                                Let's work together to create game-changing experiences
                            </p>
                            <i><SVG id={'right-icon'}/></i>
                        </Link>

                        <Link to={'/partners'}>
                            <h4>
                                Become a Partner
                            </h4>
                            <p>
                                Earn up to 25% commission on referrals and unlock exclusive partner benefits.
                            </p>
                            <i><SVG id={'right-icon'}/></i>
                        </Link>
                    </div>

                    <div className="social">
                        <a href="https://www.facebook.com/profitwhales/" className="i-fb" target="_blank"
                           title="Facebook">
                            <FontAwesomeIcon icon={faFacebookSquare}/>
                        </a>
                        <a href="https://www.linkedin.com/company/profitwhales/" className="i-in"
                           target="_blank"
                           title="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                        <a href="https://www.youtube.com/channel/UCtUreqMG_C_P8Ymqa-LJ2Yg" className="you"
                           target="_blank"
                           title="Youtube">
                            <FontAwesomeIcon icon={faYoutube}/>
                        </a>
                    </div>
                </div>
            </section>

            <section className={'trustpilot-section'}>
                <div className="container">
                    <a
                        href="https://www.trustpilot.com/review/profitwhales.com"
                        target={'_blank'}
                    >
                        <img src={trustpilotLogo} alt="" className={'logo'}/>
                    </a>

                    <img src={starsIcon} alt=""/>

                    <p>
                        Our customers rate us as <b>excellent</b>.
                        <a
                            href="https://www.trustpilot.com/review/profitwhales.com"
                            target={'_blank'}
                        >
                            Check out our reviews
                        </a>
                    </p>
                </div>
            </section>

            <section className={'cases-section'}>
                <div className="container">
                    <div className="col">
                        <h2>
                            Check <span>Cases</span>
                        </h2>

                        <p>
                            Read why the most forward-thinking brands <br/> trust Profit Whales
                        </p>

                        <a
                            className={'btn default'}
                            href={'https://blog.profitwhales.com/case-studies/'}
                            target={'_blank'}
                        >
                            see more cases
                        </a>
                    </div>

                    <div className="image">
                        <a
                            href={'https://blog.profitwhales.com/case-studies/'}
                            target={'_blank'}
                        >
                            <img src={casesImage} alt=""/>
                        </a>
                    </div>
                </div>
            </section>

            <PreFooter/>

            <Footer/>
        </div>
    )
}

export default ContactUs
