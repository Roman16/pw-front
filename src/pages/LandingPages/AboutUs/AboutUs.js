import React, {useState} from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import './AboutUs.less'
import $ from 'jquery';

import greenLine from "../../../assets/img/landing-about/title-line.svg";

import ourStoryImage1 from "../../../assets/img/landing-about/our_story_img_1.jpg"
import ourStoryImage2 from "../../../assets/img/landing-about/our_story_img_2.jpg"
import ourStoryImage3 from "../../../assets/img/landing-about/our_story_img_3.jpg"
import ourStoryImage4 from "../../../assets/img/landing-about/our_story_img_4.jpg"

import brainImage from "../../../assets/img/landing-about/brain.svg";
import clockImage from "../../../assets/img/landing-about/clock.svg";
import handImage from "../../../assets/img/landing-about/hand.svg";

import missionImage1 from "../../../assets/img/landing-about/mission_img_1.jpg";
import missionImage2 from "../../../assets/img/landing-about/mission_img_2.jpg";
import missionImage3 from "../../../assets/img/landing-about/mission_img_3.jpg";
import missionImage4 from "../../../assets/img/landing-about/mission_img_4.jpg";

import teamImage1 from "../../../assets/img/landing-about/team_1.png";
import teamImage2 from "../../../assets/img/landing-about/team_2.png";
import teamImage3 from "../../../assets/img/landing-about/team_3.png";
import teamImage4 from "../../../assets/img/landing-about/team_4.png";
import teamImage5 from "../../../assets/img/landing-about/team_5.png";
import teamImage6 from "../../../assets/img/landing-about/team_6.png";
import teamImage7 from "../../../assets/img/landing-about/team_7.png";
import teamImage8 from "../../../assets/img/landing-about/team_8.png";
import teamImage9 from "../../../assets/img/landing-about/team_9.jpg";

import flagImage from "../../../assets/img/landing-about/ua_flag.svg";
import officeImage from "../../../assets/img/landing-about/office_image.jpg";
import {userService} from "../../../services/user.services";
import {notification} from "../../../components/Notification";

const AboutUs = () => {
    const [email, setEmail] = useState('');

    async function subscribeHandler(e) {
        e.preventDefault();

        try {
            // await userService.onSubscribe({email});
            // notification.success({title: 'Successful'})
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='landing-about-us'>
            <section className="hero-section">
                <Header/>

                <div className="inner">
                    <div className="box">
                        <div className="title">
                            <h1>Who We Are?</h1>
                            <p>
                                We are here to change the way brands and sellers <br/> growing their business on Amazon.
                            </p>

                            <div className="scroll-down" onClick={() => {
                                $('body, html').animate({scrollTop: $('#our-story').offset().top}, 750);
                            }}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our-story" id="our-story">
                <div className="box">
                    <div className="inner">
                        <div className="text">
                            <div className="block-title">
                                <div className="ttl">our story</div>
                                <h2>What we are doing here?</h2>
                                <img src={greenLine} alt="title-line"/>
                                <p>
                                    Profit Whales is the team of passionate people who wants to deliver growth for our
                                    fellow
                                    clients.
                                    We want you to be a WHALE with our help while sharks will eat all the margins in the
                                    market.
                                </p>
                            </div>
                        </div>
                        <div className="images">
                            <div className="img"><img src={ourStoryImage1} alt=""/></div>
                            <div className="img"><img src={ourStoryImage2} alt=""/></div>
                            <div className="img"><img src={ourStoryImage3} alt=""/></div>
                            <div className="img"><img src={ourStoryImage4} alt=""/></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="box">
                    <div className="block-title">
                        <div className="ttl">Features</div>
                        <h2>Features you’ll receive</h2>
                        <img src={greenLine} alt="title-line"/>
                        <p>We are here to free up your time from managing your Amazon advertising so you can focus
                            on growing your business by launching new products etc.</p>
                    </div>
                    <div className="list">
                        <div className="item" data-appear-block="">
                            <div className="img">
                                <div className="icon"><img src={brainImage} alt="brain"/></div>
                                <div className="title">Data Driven Technology</div>
                                <p>We are using Big Data to create and manage advertising campaigns for our fellow
                                    customers. That&rsquo;s allow us to make</p>
                            </div>
                        </div>
                        <div className="item" data-appear-block="" data-delay="0.2">
                            <div className="img">
                                <div className="icon"><img src={clockImage} alt="clock"/></div>
                                <div className="title">Save Time</div>
                                <p>With the help of our software, you will be able to save hundreds of hours per
                                    month, if not more. Time is money.</p>
                            </div>
                        </div>
                        <div className="item" data-appear-block="" data-delay="0.4">
                            <div className="img">
                                <div className="icon"><img src={handImage} alt="hand"/></div>
                                <div className="title">Make More Money</div>
                                <p>The software is tailored to measure and grow your profit from advertising. With
                                    Profit Whales, we see the increase in ROAS for literally every user.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our-mission">
                <div className="box">
                    <div className="inner">
                        <div className="text">
                            <div className="block-title ta-left">
                                <div className="ttl">our mission</div>
                                <h2>Profit Whales Mission</h2>
                                <img src={greenLine} alt="title-line"/>
                                <p>
                                    Our mission is to create Advertising across all platforms in just 1 Click. Just
                                    imagine
                                    you’ll be able to set up and launch advertising for your business in a few seconds.
                                    So
                                    everyone who has an idea will be able to promote it and scale with advertising
                                    without
                                    any knowledge in programmatic advertising. We are heavily investing in Artificial
                                    Intelligence and Big Data to achieve this goal.
                                </p>
                            </div>
                        </div>
                        <div className="images">
                            <div className="img"><img src={missionImage1} alt=""/></div>
                            <div className="img"><img src={missionImage2} alt=""/></div>
                            <div className="img"><img src={missionImage3} alt=""/></div>
                            <div className="img"><img src={missionImage4} alt=""/></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="crew">
                <div className="box">
                    <div className="block-title">
                        <div className="ttl">Crew</div>
                        <h2>Meet our <br/>leadership team</h2>
                        <img src={greenLine} alt="title-line"/>

                        <p>We are here to help you scale your business and achive your growth goals.</p>
                    </div>
                    <div className="team">
                        <div className="emp">
                            <div className="img"><img src={teamImage1} alt=""/></div>
                            <div className="name">Eugene Havrilov</div>
                            <div className="position">Client Sucess Manager</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage2} alt=""/></div>
                            <div className="name">Ihor Dubovetskyi</div>
                            <div className="position">CMO</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage3} alt=""/></div>
                            <div className="name">Sergio</div>
                            <div className="position">Our lovely designer</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage4} alt=""/></div>
                            <div className="name">Victor Tolok</div>
                            <div className="position">Amazon PPC Specialis</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage5} alt=""/></div>
                            <div className="name">Roman Godz</div>
                            <div className="position">CTO</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage6} alt=""/></div>
                            <div className="name">Sasha Nyezhnyk</div>
                            <div className="position">CPO</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage7} alt=""/></div>
                            <div className="name">Andrew Bulat</div>
                            <div className="position">Lead Node.js Developer</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage8} alt=""/></div>
                            <div className="name">Dmitro Brynza</div>
                            <div className="position">Lead PHP Developer</div>
                        </div>
                        <div className="emp">
                            <div className="img"><img src={teamImage9} alt=""/></div>
                            <div className="name">Mariia Sabitova</div>
                            <div className="position">Art Director</div>
                        </div>
                        <a className="plus" href="#"><span></span>Work With Us</a>
                    </div>
                </div>
            </section>

            {/*<section className="office">*/}
            {/*    <div className="box">*/}
            {/*        <div className="text">*/}
            {/*            <div className="block-title">*/}
            {/*                <h2>Office in Kyiv</h2>*/}
            {/*                <p>Our headquarter office is located in beautiful capital of <br/> Ukraine, Kyiv.</p>*/}
            {/*            </div>*/}
            {/*            <address><img src={flagImage} alt=""/>st. Konovalca 32 G Kyiv, 02000</address>*/}
            {/*        </div>*/}
            {/*        <div className="image"><img src={officeImage} alt=""/></div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className="subscribe">
                <div className="box">
                    <div className="title">
                        <h2>Subscribe</h2>
                        <p>Subscribe to our newsletter to receive up to date information about our services.</p>
                    </div>

                    <form onSubmit={subscribeHandler}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />

                        <button className="btn ripple default">Subscribe</button>
                    </form>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default AboutUs;
