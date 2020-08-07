import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from "@fortawesome/free-solid-svg-icons"
import $ from 'jquery';
import ionRangeSlider from 'ion-rangeslider';

import './LandingAutomation.less';

import {history} from "../../../utils/history";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {stepsImages} from "../../../assets/img/landing-automation/steps";
import {avatars} from "../../../assets/img/landing-automation/avatars/avatars";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Checkbox, Input, Modal, Select} from "antd";
import amazonSpnWhiteLogo from '../../../assets/img/amazon-spn-logo-white.png';
import amazonLogo from '../../../assets/img/amazon.png';
import exampleSoftImage from '../../../assets/img/landing-automation/example-soft.png';
import exampleAmazonImage from '../../../assets/img/landing-automation/example-amazon-screen.png';
import whiteWhale from '../../../assets/img/landing-automation/white-whale.svg';
import pwStructureImage from '../../../assets/img/landing-automation/pw-structure.png';
import vitaliiAvatar from '../../../assets/img/landing-automation/vitalii-avatar.png';
import basketImage from '../../../assets/img/landing-automation/basket.png';
import {underHoodImages} from '../../../assets/img/landing-automation/under-hood';
import dataDrivenImage from '../../../assets/img/landing-automation/data-driven-image.png';
import contactFormImage from '../../../assets/img/landing-automation/contact-form-image.png';

import {Link} from "react-router-dom";
import OurCases from "../components/OurCases/OurCases";
import Comments from "../components/Comments/Comments";
import {SVG} from "../../../utils/icons";
import CustomSelect from "../../../components/Select/Select";


const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;
const pixelRatio = window.devicePixelRatio;

let swipeTimeoutId = null;

const Option = Select.Option;


const stepsSlider = [
    {
        title: `Connect Seller <br/> Central Account`,
        description: 'Profit Whales allows you to instantly connect Amazon Seller Central to automate your Amazon Advertising work and find productivity super powers.',
        img: stepsImages.step1
    },
    {
        title: `Choose <br/> Your Goal`,
        description: 'Inside the software, you\'ll find four business goals. You have to choose one of them and start optimization. Naturally, for each of them, we use a unique algorithm to achieve efficient results.',
        img: stepsImages.step2
    },
    {
        title: `Monitor <br/> The Changes`,
        description: 'You have to make yourself comfortable, sit, and enjoy changes that the software would do. You see, for what you pay, it’s soothing, right?',
        img: stepsImages.step3
    },
    {
        title: `Access <br/> A Lot More Data`,
        description: 'We’re obsessed with data, so we developed a dashboard and day-parting tool, so you can see your business metrics at a glance and make more profitable decisions.',
        img: stepsImages.step4
    },
];


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

const numberMask = (value, n, x) => {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return (+value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,').replace('.00', '');
};

const LandingAutomation = () => {
    const [currentStepSlide, setStepSlide] = useState(0),
        [currentCaseSlide, setCaseSlide] = useState(0),
        [currentCommentSlide, setCommentSlide] = useState(0),
        [selectedImage, selectImage] = useState(null),
        [visibleVideoWindow, switchWindow] = useState(false);

    function nextSlide(type) {
        clearTimeout(swipeTimeoutId);
        swipeTimeoutId = setTimeout(() => {
            if (type === 'step') {
                if (currentStepSlide === 3) {
                    setStepSlide(0)
                } else {
                    setStepSlide(currentStepSlide + 1)
                }
            } else if (type === 'case') {
                if (currentCaseSlide === 4) {
                    setCaseSlide(0)
                } else if (currentCaseSlide === 5) {
                    setCaseSlide(4)
                } else {
                    setCaseSlide(currentCaseSlide + 1)
                }
            } else if (type === 'comment') {
                Slider.slickNext();
            }
        }, 10)
    }

    function prevSlide(type) {
        clearTimeout(swipeTimeoutId);
        swipeTimeoutId = setTimeout(() => {
            if (type === 'step') {
                if (currentStepSlide === 0) {
                    setStepSlide(3)
                } else {
                    setStepSlide(currentStepSlide - 1)
                }
            } else if (type === 'case') {
                if (currentCaseSlide === 0) {
                    setCaseSlide(4)
                } else if (currentCaseSlide === 5) {
                    setCaseSlide(2)
                } else {
                    setCaseSlide(currentCaseSlide - 1)
                }
            }
        }, 10)
    }

    function goToSlide(slide, type) {
        if (type === 'step') {
            setStepSlide(slide)
        } else if (type === 'case') {
            setCaseSlide(slide)
        }
    }

    //---------------------------------------
    //---------------------------------------

    function goToRegistrationPage() {
        history.push('/registration')
    }

    function goToPricingPage() {
        window.open('/pricing')
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
        (function (t, a, p) {
            t.TapfiliateObject = a;
            t[a] = t[a] || function () {
                (t[a].q = t[a].q || []).push(arguments)
            }
        })(window, 'tap');

        window.tap('create', tapfiliateKey, {integration: "javascript"});
        // window.tap('click', {referral_code: ''});
        window.tap('detect');

        //----------------------------------------------------------------------
        document.querySelector('html').classList.add('not-retina');
        document.querySelector('body').classList.remove('hide-mc-modal');

        //----------------------------------------------------------------------
        //----------------------------------------------------------------------
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
                $('.slider-container .slider .irs .irs-bar').html('$ 69');
                setTimeout(() => {
                    $('.irs-single').html('< $ 1,000 / month');
                }, 1)
            },
            onChange: function (data) {
                let value = data.from_value,
                    result = 0,
                    sumElement = $('.result-sum'),
                    barLabel = $('.slider-container .slider .irs .irs-bar'),
                    barTooltip = $('.slider-container .slider .irs .irs-single');


                if (value <= 1000) {
                    sumElement.text('$ 69');
                    barLabel.html('$ 69');
                    barTooltip.html('< $ 1,000 / month');
                } else {
                    barTooltip.html(`$ ${numberMask(value, 2)} / month`);

                    if (value >= 50000) {
                        result = ((2 / 100) * value) + 500;
                        barLabel.html('$500 + 2% <small>ad spend</small>');
                    } else if (value >= 20000) {
                        result = ((2.5 / 100) * value) + 200;
                        barLabel.html('$200 + 2,5% <small>ad spend</small>');
                    } else {
                        result = ((3 / 100) * value) + 100;
                        barLabel.html('$100 + 3% <small>ad spend</small>');
                    }

                    sumElement.text('$ ' + numberMask(result));
                }
            }
        });
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------

        const s = document.createElement('script');

        s.type = 'text/javascript';

        s.async = true;
        s.innerHTML = `!function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2628499780566506');
    fbq('track', 'PageView');`;


        document.head.appendChild(s);

        return () => {
            document.querySelector('html').classList.remove('not-retina');
            document.querySelector('body').classList.add('hide-mc-modal');

            document.head.removeChild(s);
        }
    }, []);

    useEffect(() => {

        const dots = document.querySelectorAll('.all-steps i');

        dots.forEach((item, index) => {
            if (index < currentStepSlide) {
                dots[index].classList.add('loaded')
            } else {
                dots[index].classList.remove('loaded')
            }
        });
    }, [currentStepSlide]);

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt, type) {
        if (!xDown || !yDown) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                nextSlide(type);
            } else {
                prevSlide(type);
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }

    useEffect(() => {
        // document.getElementById('cases-slider').addEventListener('touchstart', handleTouchStart, false);
        // document.getElementById('cases-slider').addEventListener('touchmove', (e) => handleTouchMove(e, 'case'), false);
    }, [currentCaseSlide]);
    //
    // useEffect(() => {
    //     document.getElementById('steps-slider').addEventListener('touchstart', handleTouchStart, false);
    //     document.getElementById('steps-slider').addEventListener('touchmove', (e) => handleTouchMove(e, 'step'), false);
    // }, [currentStepSlide]);

    useEffect(() => {
        if (selectedImage && (window.innerHeight > window.innerWidth)) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [selectedImage, window.innerHeight]);


    return (
        <div className="landing-automation  landing-page">
            <Header/>

            <section className='first-section'>
                <img src={whiteWhale} alt="" className={'whale'}/>

                <div className='container'>
                    <h2>
                        Accelerate your <span>Amazon Business</span> with the help <br/>
                        of advanced decision-making technologies using <br/>
                        <span>Big Data & Data Science</span>
                    </h2>

                    <button className={'btn'}>
                        Let’s talk
                    </button>

                    <img src={amazonSpnWhiteLogo} alt="" className={'spn-logo'}/>

                    <img src={exampleSoftImage} alt="" className={'example-soft-image'}/>

                    <div className="row">
                        <Link to={'/demo'} className={'demo'}>
                            Talk with us

                            <div className="icon">
                                DEMO
                            </div>
                        </Link>

                        <div className="video-btn" onClick={() => switchWindow(true)}>
                            <div className="pulse">
                                <SVG id={'play-icon'}/>
                            </div>

                            watch video
                        </div>
                    </div>
                </div>

            </section>

            <section className={'top-amazon-platforms'}>
                <div className="container">
                    <h2>
                        Trusted by <span>TOP</span> brands on Amazon platform
                    </h2>

                    <div className="partner-logos">
                        <img src={amazonLogo} alt=""/>
                        <img src={amazonLogo} alt=""/>
                        <img src={amazonLogo} alt=""/>
                    </div>

                    <h2>
                        <span>Smart Bid</span> for every Ad position
                    </h2>

                    <p>
                        Stay ahead of the competition with our smart bidding technology that is based on 16+ metrics
                    </p>

                    <img src={exampleAmazonImage} alt="" className={'amazon-example'}/>

                    <h2>
                        <span> All Amazon Ad types in one place</span> <br/>
                        Programmatic Algorithms + Managed Service
                    </h2>

                    <img src={pwStructureImage} alt="" className={'pw-structure'}/>
                </div>
            </section>

            <section className={'custom-strategies'}>
                <div className="container">
                    <div className="col">
                        <h3>
                            Custom strategies tailor-made for <br/>
                            your <span>Amazon Business</span>
                        </h3>

                        <p>
                            At Profit Whales, we understand the needs of our clients very clearly. Whatever the goals
                            are, we will create a custom advertising strategy aligned with the overall brand strategy to
                            achieve the highest profitability with maximum efficiency.
                        </p>

                        <button className={'btn'}>
                            Let’s talk
                        </button>
                    </div>

                    <img src={vitaliiAvatar} alt=""/>
                </div>
            </section>

            <section className='achievements'>
                <div className="container">
                    <div className={'total-revenue'}>
                        <div className="description">Total Amazon <br/> Revenue <br/> Optimized</div>
                        <div className="value">$120M</div>
                    </div>
                    <div className={'total-ad-spend'}>
                        <div className="description">Total Amazon <br/> Ad Spend <br/> Managed</div>
                        <div className="value">$16M</div>
                    </div>
                    <div className={'average-decrease'}>
                        <div className="description">Average <br/> Decrease <br/> in Acos</div>
                        <div className="value">34%</div>
                    </div>
                    <div className={'higher-ctr'}>
                        <div className="description">Higher <br/> CTR</div>
                        <div className="value">32%</div>
                    </div>
                    <div className={'average-increase'}>
                        <div className="description">Average <br/> Increase in <br/> Revenue</div>
                        <div className="value">27%</div>
                    </div>
                </div>

                <div className="lines-w">
                    {[0, 1, 2].map(() => <div/>)}
                </div>

                <div className="lines-h">
                    {[0, 1, 2, 3].map(() => <div/>)}
                </div>
            </section>

            <section className={'best-software'}>
                <div className="container">
                    <h2>
                        <span>The #1</span> Amazon Advertising software for <br/> your business
                    </h2>

                    <p className={'section-description'}>
                        Profit Whales is the platform that has everything you need to optimize your Amazon Business.
                    </p>
                </div>
            </section>

            <section className={'empower-business'}>
                <div className="container">
                    <h4>
                        Empower you <br/> Amazon Business
                    </h4>

                    <img src={basketImage} alt=""/>

                    <p>
                        Smart Automated Advertising Solution
                    </p>

                    <button className={'btn'}>
                        TALK WITH US
                    </button>
                </div>
            </section>


            <section className='under-hood'>
                <div className="container">
                    <div className="list">
                        <div>
                            <div className="description">
                                <h3>
                                    <span>  Create ready-to-go <br/> Amazon PPC campaigns</span> <br/> using Zero to
                                    Hero Tool
                                </h3>

                                <p>
                                    It takes just a few minutes to set up! We’ve made this part easy, intuitive, and for
                                    any level user.
                                </p>

                                <p>

                                    Zero to Hero is excellent at quickly gathering lots of relevant
                                    keywords and target ASINs that will start driving sales right away. No need for a
                                    warm-up period (normally associated with manually creating new PPC campaigns).
                                </p>

                                <p>
                                    Zero to Hero takes a few minutes to do its work. Come back shortly after and check
                                    on
                                    your Seller Central Campaigns Manager to see the new campaigns already up and
                                    running!
                                </p>
                            </div>

                            <div className="image"><img src={underHoodImages.icon1} alt=""/></div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon2} alt=""/></div>

                            <div className="description">
                                <h3>
                                    <span> Patented Profit Whales <br/> PPC campaign structure </span> <br/> For Every
                                    Ad Instrument
                                </h3>

                                <p>
                                    Amazon Advertising Campaigns are more than a set of folders that house your
                                    targeting keywords, negatives, bids, and ASIN’s. They are a sharp tool to not only
                                    keep your different approaches and advertising techniques separate, but also to
                                    advertise in a controlled and accountable manner.
                                </p>

                                <p>
                                    A unique Ad Campaign structure is
                                    used for Sponsored Product, Display, and Brand campaigns. Profit Whales offers its
                                    unique, time-proven PPC Campaign structure. This structure leverages both our PPC
                                    management experience and successful tests on dozens of big brands on Amazon.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="description">
                                <h3>
                                    <span>Goal-driven algorithms</span>
                                </h3>

                                <p>
                                    Profit Whales Automated PPC Optimization Tool is smart software. And to start
                                    working correctly, it requires a strategy to pursue.
                                </p>

                                <p>
                                    Pick one that suits your Amazon
                                    business goals best! Automation software utilizes a ton of data to gauge the
                                    performance of PPC campaigns. It conducts its daily optimization following the
                                    selected strategy.
                                </p>
                            </div>

                            <div className="image"><img src={underHoodImages.icon3} alt=""/></div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon4} alt=""/></div>

                            <div className="description">
                                <h3><span>Algorithmic bid <br/> optimization</span></h3>

                                <p>
                                    Keyword level optimization is based on profitability, organic and PPC position, and
                                    other factors.
                                </p>

                                <p>
                                    Bid optimization is usually a large chunk of a PPC optimization
                                    routine, and it’s all about increasing or decreasing bids based on recent
                                    performance history.
                                </p>

                                <p>
                                    Profit Whales automated optimization ensures that your product
                                    is always positioned at a bid’s “sweet spot.” Our smart bidding algorithm allows it
                                    to arrive there much faster than under manual optimization, giving our experts time
                                    to do the job that machines can’t.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="description">
                                <h3><span>Carefully monitor <br/> product data and <br/> act on it</span></h3>

                                <p>
                                    Unlike PPC managers, the Automation tool is always on standby to act. More so, it
                                    takes into account multiple metrics before making any decisions.
                                </p>

                                <p>
                                    So be it a major
                                    jump in ACoS due to a competitor’s aggressive advertising or a subtle shift in a
                                    number of organic sales due to better BSR — it will not go unnoticed by our
                                    software.
                                </p>

                                <p>
                                    Automation is capable of actively managing PPC campaigns. It can execute
                                    both subtle changes and sharp, protective alterations while running the campaigns.
                                </p>

                                <p>
                                    It delivers changes where they will be most effective for your product sales and
                                    verifies the results 24/7.
                                </p>
                            </div>

                            <div className="image"><img src={underHoodImages.icon5} alt=""/></div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon6} alt=""/></div>

                            <div className="description">
                                <h3><span>Product-level Metrics</span></h3>

                                <p>
                                    Log in to immediately see your individual product or account level profitability
                                    over any given period, changes in advertising effectiveness, etc.
                                </p>

                                <p>
                                    Our interface
                                    allows for the ability to group key metrics from across all advertising boards (for
                                    example, all the keywords from different ad groups) to quickly find the most
                                    significant deviations and take immediate actions to stay on top of any situation.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="description">
                                <h3><span>Track the impact of ads on your organic sales</span></h3>

                                <p>
                                    This is our favorite part! It’s well known across all Amazon Sellers that an
                                    intelligent and well-guided Sponsored Ads Campaigns (be it Sponsored Product,
                                    Display, or Sponsored Brands) is capable of boosting product sales both from Ads
                                    themselves and from organic search.
                                </p>

                                <p>
                                    This happens because Amazon’s search algorithm
                                    values products that show better and consistent sales (regardless of their source).
                                    And of course, our dashboard readily provides the business with up-to-date
                                    information on the total impact the advertising campaigns have on both ad sales —
                                    and organic sales.
                                </p>
                            </div>

                            <div className="image"><img src={underHoodImages.icon7} alt=""/></div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon8} alt=""/></div>

                            <div className="description">
                                <h3><span>Find the best hours for <br/> your Ads</span></h3>

                                <p>
                                    Dayparting is yet another tool that we use. Make sure that your ads will show with
                                    greater accuracy and save your ad’s budget until high-demand hours with the best
                                    CTR.
                                </p>

                                <p>
                                    Our experts also benefit from the insights into when your product's demand
                                    peaks. This better understanding of buyers allows our managers to fine-tune your
                                    product and advertising by gathering information about when and where they'll have
                                    the most impact on your business.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="description">
                                <h3><span>Clear executive reporting <br/> system + Email reports</span></h3>

                                <p>
                                    How is your business doing? How are the sales of your newly launched product? How
                                    much did you spend on advertising?
                                </p>

                                <p>
                                    Our weekly and monthly business executive
                                    advertising reports will keep you up to date with every significant change to your
                                    Seller performance. After working with dozens of businesses across almost all of
                                    Amazon’s categories, we’ve come up with a lean, straight-to-business, and
                                    straightforward report form. You can see this information in your account or get a
                                    copy emailed to you every week and every month.
                                </p>
                            </div>

                            <div className="image"><img src={underHoodImages.icon9} alt=""/></div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon10} alt=""/></div>

                            <div className="description">
                                <h3><span>Programmatic algorithms <br/> + Human Brains</span></h3>

                                <p>
                                    We have it all: neural network, sensitive algorithms, and a dashboard that provides
                                    essential information and tools right under the manager's fingertips. But it's the
                                    human brains behind this setup that makes the difference for our customers.
                                </p>

                                <p>
                                    <b>Customer Support</b><br/>
                                    Our dedicated managers are pros at using our software and other means to
                                    provide businesses with the best Amazon sales possible. They stand vigilant and are
                                    ready to guide, interfere, or override any automated software's decision to ensure
                                    cutting-edge PPC performance for all and every business that entrusts us with their
                                    Amazon advertising. With lots of optimization routines out of the way, they have
                                    more time to focus on key business metrics and manage your PPC faster and more
                                    effectively.
                                </p>

                                <p>
                                    <b>Developer team</b><br/>
                                    Our development team has completed its 31st major update
                                    of Profit Whales software, but we know that there is still room for further
                                    fine-tuning and improvement. Amazon evolves and adapts — and so do we. That is why
                                    all our client businesses can rest assured that we will provide them with the best
                                    PPC performance now, and we will continue to do so in the future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'data-driven-algorithms'}>
                <div className="container">
                    <h2>
                        Data-Driven algorithms that extend our <br/> experts’ possibilities
                    </h2>
                </div>

                <img src={dataDrivenImage} alt=""/>
            </section>

            <Comments/>

            <section className={'new-blog-posts'}>
                <div className="container">
                    <h2>What’s new at our <span>BLOG</span></h2>


                    <div className="posts">
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
            </section>

            <section className={'contact-form'}>
                <div className="container">
                    <img src={contactFormImage} alt=""/>

                    <form action="">
                        <h3>Talk With Our Experts</h3>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <Input type="text" placeholder={'First Name'}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <Input type="text" placeholder={'Last Name'}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <Input type="email" placeholder={'E-mail'}/>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Average Monthly Sales</label>
                                <CustomSelect
                                    placeholder={'Select by'}
                                >
                                    <Option value={'1'}>1</Option>
                                </CustomSelect>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Average Monthly Ad Spend</label>
                                <CustomSelect
                                    placeholder={'Select by'}
                                >
                                    <Option value={'1'}>1</Option>
                                </CustomSelect>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">What AMZ Marketplace do you sell the most</label>
                                <CustomSelect
                                    placeholder={'Select by'}
                                >
                                    <Option value={'1'}>1</Option>
                                </CustomSelect>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">What is your main goal?</label>
                                <CustomSelect
                                    placeholder={'Select by'}
                                >
                                    <Option value={'1'}>1</Option>
                                </CustomSelect>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Enter your Storefront Name</label>
                                <Input type="text" placeholder={'Enter your Storefront Name'}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Enter your main category</label>
                                <Input type="text" placeholder={' Enter your main category'}/>
                            </div>
                        </div>

                        <Checkbox>Yes, I agree to Profit Whales Terms and Conditions & Privacy Policy</Checkbox>

                        <button className={'btn'}>
                            Get Started
                        </button>
                    </form>
                </div>
            </section>

            <Footer/>

            <Modal
                className={'video-modal-window'}
                wrapClassName={'video-modal-window-wrap'}
                visible={visibleVideoWindow}
                onCancel={() => switchWindow(false)}
                footer={false}
                destroyOnClose={true}
            >
                <iframe width="853" height="480" src="https://www.youtube.com/embed/m608kntHUzU?autoplay=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </Modal>

        </div>
    )
};

export default LandingAutomation;
