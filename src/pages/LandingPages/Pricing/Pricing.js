import React, {useEffect} from 'react';
import './Pricing.less'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import zthImage from '../../../assets/img/landing-pricing/zth.png';
import ppcImage from '../../../assets/img/landing-pricing/ppc.svg';
import analyticImage from '../../../assets/img/landing-pricing/analytic.svg';
import peopleImage from '../../../assets/img/landing-pricing/people-icon.svg';
import yesGreenIcon from '../../../assets/img/landing-pricing/yes_green.svg';
import {history} from "../../../utils/history";
import $ from "jquery";
import ionRangeSlider from 'ion-rangeslider';
import {avatars} from "../../../assets/img/landing-automation/avatars/avatars";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import emojiImage from "../../../assets/img/landing-automation/emoji.png";
import supportImage from "../../../assets/img/landing-automation/Vitalik-help.png";


const commentsList = [
    {
        name: 'Corina Elena Damian',
        comment: 'I only have words of praise and I warmly recommend this software, but especially the person who has guided me and who does not get rid of me until I win £100,000. Professional vitals, explains the steps in detail and has a lot of patience! For beginners on Amazon and not only recommend PROFIT WHALES!',
        avatar: avatars.CorinaElenaDamian
    },
    {
        name: 'Meet Patel',
        comment: 'It was an amazing experience working with Amzbizon, I was really lost in my PPC spending and ACOS, So I took the help of Amzbizon. We started our campaigns on the 21st of November With 48% Acos, With good Keyword targeting and well established and optimized Bulk operation Campaigns, We shoot down to 24.71% in just 12 days, It is a miracle, I wish I could share my Screenshot here. But they have really worked on my ACOS. Thank You so much.',
        avatar: avatars.MeetPatel
    },
    {
        name: 'Maxim Antonov',
        comment: 'Yes, very good company! They helped me a lot with advertising on Amazon and not only with advertising, there are practitioners working there who really know a lot about their business.',
        avatar: avatars.MaximAntonov
    },
    {
        name: 'Emil Sirbu',
        comment: 'I highly recommend the services of these great guys. As their tool gives incredible results, that\'s obvious. I appreciated the attitude of this team for the client. We had a very humanized experience, where the money wasn\'t the first priority of our collaboration but customer satisfaction! Flexibility and promptness to any of my questions. I highly recommend!',
        avatar: avatars.EmilSirbu
    },
    {
        name: 'Dmitriy Golubovskiy',
        comment: 'These guys are doing an amazing job, solved my problem with huge Acos. It took only 2-3 weeks for them to fully optimize all campaigns. I would like to mention separately communication level: wrote even in Sat/Sunday and got answers. Recommend!',
        avatar: avatars.DmitriyGolubovskiy
    },
    {
        name: 'Andrey Kaminskiy',
        comment: 'The team behind the agency is doing an amazing job by consulting about how to grow the conversion rate and managing our Amazon Advertising campaigns. Their support team is incredibly responsible all day long. Highly recommend!',
        avatar: avatars.AndreyKaminskiy
    },
    {
        name: 'Jennie Fisher',
        comment: 'ProfitWhales\' software is notably robust, and their analysts have helped us both maximize profitability and truly understand the incremental value of our Amazon Ads. They are a valued partner and we really appreciate the flexibility of their software and service model.',
        avatar: avatars.JennieFisher
    },
    {
        name: 'Daniel Jennings',
        comment: 'I really enjoy Profit Whales\' user interface, the massive amounts of data and the differentoptimization strategies.I\'ve noticed that the software makes extremely dialed in bidding decisions that convert very well. I\'m really working on creating a successful PPC strategy to template the other 3 products!',
        avatar: avatars.DanielJennings
    },
];

const Pricing = () => {

    function goToRegistration() {
        history.push('/registration')
    }

    function SampleNextArrow({onClick}) {
        return (<div className='next' onClick={onClick}><FontAwesomeIcon icon={faPlay}/></div>)
    }

    function SamplePrevArrow({onClick}) {
        return (
            <div className='prev' onClick={onClick}><FontAwesomeIcon icon={faPlay}/></div>
        );
    }

    useEffect(() => {
        $(".js-range-slider").ionRangeSlider({
            min: 0,
            values: [
                0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000, 3500, 4500, 5000,
                6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
                22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000,
                55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000
            ],
            hide_min_max: true,
            from: 10,
            from_min: 10,
            prefix: "< $ ",
            max_postfix: "+",
            postfix: "  / month",
            onStart: function () {
                $('.slider-container .slider .irs .irs-bar').html('$ 35');
            },
            onChange: function (data) {
                let value = data.from_value,
                    result = 0,
                    sumElement = $('#result-sum'),
                    barLabel = $('.slider-container .slider .irs .irs-bar'),
                    barTooltip = $('.slider-container .slider .irs .irs-single');


                if (value <= 1000) {
                    sumElement.text('$ 35');
                    barLabel.html('$ 35');
                    barTooltip.html('< $ 1000 / month');
                } else {
                    barTooltip.html(`$ ${value} / month`);

                    if (value >= 50000) {
                        result = ((1.5 / 100) * value) + 500;
                        barLabel.html('$500 + 1,5% <small>ad spend</small>');
                    } else if (value >= 20000) {
                        result = ((2 / 100) * value) + 250;
                        barLabel.html('$250 + 2% <small>ad spend</small>');
                    } else {
                        result = ((2.5 / 100) * value) + 100;
                        barLabel.html('$100 + 2,5% <small>ad spend</small>');
                    }

                    sumElement.text('$ ' + result);
                }
            }
        });

    }, []);

    return (
        <div className='landing-pricing'>
            <Header/>

            <section className="price-list">
                <div className="box">
                    <div className="block-title">
                        <h2>Flexible prepaid plans based on your monthly Ad Spend</h2>
                        <p>
                            We have a prepaid plan after the free trial and charging you based on your last 30-days ad
                            spend. After that, you have 30 days usage of the software. We grow with the growth of your
                            business.
                        </p>
                    </div>
                    <div className="tabs-container">
                        <ul className="tabs-navigation">
                            <li className="disabled">
                                <a href="#content1">
                                    <span className="img">
                                        <img src={zthImage} alt="zth-logo"/>
                                    </span>
                                    Zero To Hero
                                </a>
                            </li>
                            <li>
                                <a className="active" href="#content2">
                                    <span className="img">
                                        <img src={ppcImage} alt="ppc"/>
                                    </span>
                                    PPC Automation
                                </a>
                            </li>
                            <li className="disabled">
                                <a href="#">
                                    <span className="img">
                                        <img src={analyticImage} alt="analytic"/>
                                    </span>
                                    Analytics
                                </a>
                            </li>
                            <li className="disabled">
                                <a href="#">
                                    <span className="img">
                                        <img src={peopleImage} alt="people-icon"/>
                                    </span>
                                    Agencies Vendors
                                </a>
                            </li>
                        </ul>

                        <div className="tabs-content-wrap">
                            <div className="tabs-content active" id="content2">
                                <div className="slider-container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="title">What&rsquo;s your monthly Amazon Advertising
                                                Spend?
                                            </div>
                                            <div className="slider">
                                                <input className="js-range-slider" type="text"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="sum">
                                                <span id="result-sum">$ 35</span>
                                                <span>Estimated price per month.</span>
                                                <a href="#plans">How is this calculated?</a>
                                                <button className="btn green-btn"
                                                        onClick={() => history.push('/registration')}>
                                                    Free Trial
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <ul>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Efficient Budget Management
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            You'll get Money Making System
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            You'll Save a Lot of Time
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Business Goal Aware Optimization
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Keywords Optimization
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Dashboard View
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Unlimited Products & Campaigns
                                        </li>
                                        <li><img src={yesGreenIcon} alt="yes"/>
                                            Data-Driven Bid Optimization
                                        </li>
                                        <li>
                                            <img src={yesGreenIcon} alt="yes"/>
                                            Expert Chat Support
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pricing-guide">
                <div className="box">
                    <div className="block-title" id={'plans'}>
                        <h2>Our Simple Pricing Guide</h2>
                    </div>
                    <div className="list">
                        <div className="item">
                            <div className="title">Startup</div>
                            <div className="sum">&lt;$1000</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">35$</div>
                            <hr/>
                            <p>Start growing your business with our Starter plan</p>
                            <button className='btn green-btn' onClick={goToRegistration}>start free</button>
                        </div>

                        <div className="item">
                            <div className="title">Grind</div>
                            <div className="sum">$1k - $20k</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">$100 + 2.5% monthly ad spend</div>
                            <hr/>
                            <p>Automatic system of your Amazon advertising for your success as a growing Amazon
                                Seller</p>
                            <button className='btn green-btn' onClick={goToRegistration}>start free</button>
                        </div>

                        <div className="item">
                            <div className="title">Successful Seller</div>
                            <div className="sum">$20k - $50k</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">$250 + 2% monthly ad spend</div>
                            <hr/>
                            <p>Focus on the profitability of your business with our Data-Driven Optimization</p>
                            <button className='btn green-btn' onClick={goToRegistration}>start free</button>
                        </div>

                        <div className="item">
                            <div className="title">Established Brand</div>
                            <div className="sum"> &gt; $50k</div>
                            <div className="sub-sum">in ad spend / per month</div>
                            <div className="price">$500 + 1.5% monthly ad spend</div>
                            <hr/>
                            <p>Maximize your sales &amp; profit with automatic optimization</p>
                            <button className='btn green-btn' onClick={goToRegistration}>start free</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rich-bro">
                <div className="box">
                    <div className="inside">
                        <p>Spending more than <br/> <strong>100k</strong> on ads?</p>
                        <button className="btn default" onClick={() => history.push('/contact-us')}>
                            Contact Us
                        </button>
                    </div>

                    <div className="inside">
                        <p>Interested in <strong>annual plan?</strong></p>
                        <button className="btn default" onClick={() => history.push('/contact-us')}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

            <section className='comments'>
                <div className="container">
                    <h2>What our customers <br/> are saying</h2>

                    <div className="carousel">


                        <Slider
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={4}
                            slidesToScroll={1}
                            nextArrow={<SampleNextArrow/>}
                            prevArrow={<SamplePrevArrow/>}
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 3,
                                    }
                                },
                                {
                                    breakpoint: 740,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                },
                                {
                                    breakpoint: 500,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }
                            ]}
                        >
                            {commentsList.map((item, index) => (
                                <div className="slide-item">
                                    <div className="row">
                                        <img src={item.avatar} alt=""/>

                                        <div className="name">
                                            {item.name}
                                        </div>

                                    </div>

                                    <div className='comment'>{item.comment}</div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section className='support'>
                <div className="container">
                    <div className="col">
                        <h3>Human Support <img src={emojiImage} alt=""/></h3>
                        <p>
                            Our expert team is here to help you
                            <br/>
                            on your journey as Amazon Seller. We
                            <br/>
                            are here to answer your questions
                            <br/>
                            and provide actionable steps that
                            <br/>
                            you can implement in your business.
                        </p>
                        <h4>Don’t take our word for it</h4>

                        <a href="https://www.trustpilot.com/review/profitwhales.com" target={'_blank'}>
                            Check our customer reviews on Trustpilot
                        </a>
                    </div>

                    <img src={supportImage} alt="" className='image'/>
                </div>

                <div className="rectangle"/>
            </section>

            <section className='trial'>
                <div className="container">
                    <h2>What are you waiting for?</h2>
                    <p>Get started wit 14-day free trial and get time saving machine for your business.</p>
                    <button onClick={() => history.push('/registration')}>START 14 DAY FREE TRIAL TODAY</button>
                    <ul>
                        <li>No credit card required</li>
                        <li>Cancel anytime</li>
                    </ul>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default Pricing;
