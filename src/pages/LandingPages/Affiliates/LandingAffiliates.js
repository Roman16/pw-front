import React, {useEffect, useState} from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import './LandingAffiliates.less';
import illustrationImg from '../../../assets/img/illustration.svg'
import benefitsImg from '../../../assets/img/benefits-icon.svg'
import performersImg from '../../../assets/img/performers-icon.svg'
import supportImg from '../../../assets/img/support-icon.svg'
import greenLine from '../../../assets/img/green-line.svg';
import contactUsImage from '../../../assets/img/landing-affiliate/undraw_contact_us.png';
import checkedIcon from '../../../assets/img/icons/mark.svg';
import registrImage from '../../../assets/img/landing-affiliate/register-step.png';
import getLinkImage from '../../../assets/img/landing-affiliate/get-link-step.svg';
import shareLinkImage from '../../../assets/img/landing-affiliate/share-link-step.png';

import step1Image from '../../../assets/img/landing-affiliate/step-1.svg';
import step2Image from '../../../assets/img/landing-affiliate/step-2.svg';
import step3Image from '../../../assets/img/landing-affiliate/step-3.svg';

import arrowImage from '../../../assets/img/landing-affiliate/right-arrow.svg';
import {userService} from "../../../services/user.services";
import {notification} from "../../../components/Notification";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY,
    tapfiliateRegistrationPage = 'https://profitwhales.tapfiliate.com/programs/subscription-link/signup/',
    contactUsLink = 'https://profitwhales.com/contact-us';

const LandingAffiliates = () => {
    const existingScript = document.getElementById('tapfiliate');
    const tapfiliateScript = document.createElement('script');
    const [formValue, setForm] = useState({
        first_name: '',
        email: '',
        comment: ''
    });

    if (!existingScript) {
        tapfiliateScript.src = 'https://script.tapfiliate.com/tapfiliate.js';
        tapfiliateScript.id = 'tapfiliate';
        document.head.appendChild(tapfiliateScript);
    }


    async function submitFormHandler(e) {
        e.preventDefault();

        try {
            await userService.sendContacts(formValue);
            notification.success({title: 'Successful'});
            setForm({
                first_name: '',
                email: '',
                comment: ''
            })
        } catch (e) {
            console.log(e);
        }
    }

    function inputChangeHandler({target: {value, name}}) {
        setForm({
            ...formValue,
            [name]: value
        })
    }


    useEffect(() => {
        document.querySelector('html').classList.add('not-retina');

        return (() => {
            document.querySelector('html').classList.remove('not-retina');
            document.head.removeChild(tapfiliateScript);
        })
    }, []);

    (function (t, a, p) {
        t.TapfiliateObject = a;
        t[a] = t[a] || function () {
            (t[a].q = t[a].q || []).push(arguments)
        }
    })(window, 'tap');

    window.tap('create', tapfiliateKey, {integration: "javascript"});
    window.tap('detect');

    return (
        <div className='landing-affiliates'>
            <Header/>

            <section className='program-block'>
                <div className="container">
                    <div className="description">
                        <h2>Make Money with <br/>
                            Profit Whales Affiliate <br/>
                            Program
                        </h2>

                        <span>
                        Partner up with us to create a new income <br/>
                        stream for you. Press the button below.
                    </span>

                        <button className='btn green-btn' onClick={() => window.open(tapfiliateRegistrationPage)}>
                            become an affiliate
                        </button>
                    </div>

                    <div className="image-block">
                        <img src={illustrationImg} alt=""/>
                    </div>
                </div>
            </section>

            <section className='affiliate-program'>
                <div className="container">
                    <h3>
                        Affiliate Program with Profit Whales
                        <img src={greenLine} alt=""/>
                    </h3>


                    <div className="affiliate-steps">
                        <div>
                            <div className="image">
                                <img src={registrImage} alt=""/>
                            </div>
                            <h3>1. Register</h3>
                            <p>Apply now to get paid for each <br/> successful referral you are making.</p>
                        </div>
                        <div>
                            <div className="image">
                                <img src={getLinkImage} alt=""/>
                            </div>
                            <h3>2. Get your personal link</h3>
                            <p>Once you’ve registered, you’ll get your own, unique link to give to your followers.</p>
                        </div>
                        <div>
                            <div className="image">
                                <img src={shareLinkImage} alt=""/>
                            </div>
                            <h3>3. Share your link</h3>
                            <p>Share your link with your subscribers <br/> and followers to get commissions</p>
                        </div>
                    </div>

                    <div className="steps">
                        <div className="row images">
                            <div className="image">
                                <img src={step1Image} alt=""/>

                                <p>You invited Jack who also deals <br/> with Amazon PPC with our referral <br/> link.
                                </p>
                            </div>
                            <div className="arrow-img">
                                <img src={arrowImage} alt=""/>
                            </div>
                            <div className="image">
                                <img src={step2Image} alt=""/>

                                <p>Jack pays for monthly management <br/> with our software $280 as a fee and <br/> $28
                                    is
                                    yours.</p>
                            </div>
                            <div className="arrow-img">
                                <img src={arrowImage} alt=""/>
                            </div>
                            <div className="image">
                                <img src={step3Image} alt=""/>

                                <p>More referrals - more <br/> profit.</p>
                            </div>
                        </div>
                    </div>

                    <div className="profit">
                        {/*<div className="col">*/}
                        {/*    <h3 className='value'>*/}
                        {/*        $25*/}
                        {/*    </h3>*/}
                        {/*    <p>Per referral that jups from Free Trial to <br/> paid subscription plan.</p>*/}
                        {/*</div>*/}

                        <div className="col">
                            <h3 className='value'>
                                10%
                            </h3>
                            <p>Monthly lifetime <br/> commission</p>
                        </div>

                    </div>
                </div>
            </section>


            <section className='amazon-influencer'>
                <div className="container">
                    <h2>Are You an Amazon Influencer?</h2>

                    <span>If you expect to generate more than 50 referrals, please reach out to us directly</span>

                    <button className='btn green-btn' onClick={() => window.open('https://direct.lc.chat/11745246/2')}>
                        contact us
                    </button>
                </div>
            </section>

            <section className='profitwhales-programs'>
                <div className="container">
                    {/*<h3>What Is The ProfitWhales Affiliate Program?</h3>*/}
                    {/*<img src={greenLine} alt=""/>*/}
                    <span>
                        We provide you with high-quality promotional assets like banners, sidebars, social media graphics <br/> and videos. So you everything to refer your visitors & drive sales!
                    </span>

                    <div className="programs">
                        <div>
                            <img src={benefitsImg} alt=""/>

                            <h4>Benefits</h4>

                            <div className='custom-list'>
                                <div><img src={checkedIcon} alt=""/>High conversion rates (20–30%)</div>
                                <div><img src={checkedIcon} alt=""/>10% Lifetime Commissions</div>
                                <div><img src={checkedIcon} alt=""/>Real-Time Statistics And Reporting</div>
                                <div><img src={checkedIcon} alt=""/>Perks for super-affiliates and influencers</div>
                            </div>
                        </div>

                        <div>
                            <img src={performersImg} alt=""/>

                            <h4>Perks for Top Performers</h4>

                            <div className='custom-list'>
                                <div><img src={checkedIcon} alt=""/>Exclusive discounts</div>
                                <div><img src={checkedIcon} alt=""/>Increased payouts</div>
                                <div><img src={checkedIcon} alt=""/>Premium Support</div>
                            </div>
                        </div>

                        <div>
                            <img src={supportImg} alt=""/>

                            <h4>Support</h4>

                            <div className='custom-list'>
                                <div><img src={checkedIcon} alt=""/>We'll help you get the word out</div>
                                <div><img src={checkedIcon} alt=""/>Expert Support</div>
                                <div><img src={checkedIcon} alt=""/>Receive a dedicated referral link</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*<section className='commission-details'>*/}
            {/*    <div className="container">*/}
            {/*        <h3>Commission Details</h3>*/}
            {/*        <img src={greenLine} alt="" className='green-line'/>*/}

            {/*        <div className='commissions'>*/}
            {/*            <div className='free'>*/}
            {/*                <img src={commissionFreeIcon} alt=""/>*/}
            {/*                <div className='description'>*/}
            {/*                    <h4>Your Payout for</h4>*/}
            {/*                    <span> Per referral that jups from Free Trial to paid subscription plan.</span>*/}
            {/*                </div>*/}

            {/*                <div className="commission-value">*/}
            {/*                    $25*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className='have-commissions'>*/}
            {/*                <img src={commissionHaveFeeIcon} alt=""/>*/}
            {/*                <div className='description'>*/}
            {/*                    <h4>Your Payout for</h4>*/}
            {/*                    <span>Monthly lifetime <br/> commission</span>*/}
            {/*                </div>*/}

            {/*                <div className="commission-value">*/}
            {/*                    10%*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className='how-it-work'>*/}
            {/*            <div className="image">*/}
            {/*                <img src={howItWorksImage} alt=""/>*/}
            {/*            </div>*/}

            {/*            <div className='description'>*/}
            {/*                <h4>How it works?</h4>*/}

            {/*                <div className='custom-list'>*/}
            {/*                    <div className="list-item">*/}
            {/*                        <img src={greenPoint} alt="" className="list-point"/>*/}
            {/*                        <h5>Register</h5>*/}
            {/*                        <span>*/}
            {/*                            <span className='green-underline'>Apply now <img src={shortGreenLine}*/}
            {/*                                                                             alt=""/></span>*/}
            {/*                             to get paid for each successful referral you are making.*/}
            {/*                        </span>*/}
            {/*                    </div>*/}

            {/*                    <div className="list-item">*/}
            {/*                        <img src={greenPoint} alt="" className="list-point"/>*/}
            {/*                        <h5>Get your personal link</h5>*/}
            {/*                        <span>Once you’ve registered, you’ll get your own, unique link to give to your followers.</span>*/}
            {/*                    </div>*/}

            {/*                    <div className="list-item">*/}
            {/*                        <img src={greenPoint} alt="" className="list-point"/>*/}
            {/*                        <h5>Share your link</h5>*/}
            {/*                        <span>Share your link with your subscribers and followers to get commissions for each new Amazon Seller that signs up for any ProfitWhales paid or free subscription plan.</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <button className='btn green-btn' onClick={() => window.open(tapfiliateRegistrationPage)}>*/}
            {/*                    apply now*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className='contact-us'>
                <div className="container">
                    <div className="image">
                        <img src={contactUsImage} alt=""/>
                    </div>

                    <div className='have-question'>
                        <h2>Contact us</h2>

                        <h3>Have Questions?</h3>

                        <img src={greenLine} alt="" className='green-line'/>

                        <form onSubmit={submitFormHandler}>
                            <h4>Fill the form:</h4>

                            <div className="row">
                                <div className="input-group">
                                    <label htmlFor="">Name</label>
                                    <input
                                        type="text"
                                        name={'first_name'}
                                        value={formValue.first_name}
                                        onChange={inputChangeHandler}
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="">E-mail</label>
                                    <input
                                        type="email"
                                        name={'email'}
                                        value={formValue.email}
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group question-block">
                                    <label htmlFor="">Your question</label>
                                    <textarea
                                        name={'comment'}
                                        onChange={inputChangeHandler}
                                        value={formValue.comment}
                                    />
                                    <span>We treat your contact information according to our policy</span>
                                </div>
                            </div>

                            <button className="btn green-btn">
                                send
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default LandingAffiliates;
