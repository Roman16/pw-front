import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from "@fortawesome/free-solid-svg-icons"
import $ from 'jquery';
import ionRangeSlider from 'ion-rangeslider';

import './LandingAutomation.less';

import {history} from "../../../utils/history";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {casesImages} from "../../../assets/img/landing-automation/cases";
import {stepsImages} from "../../../assets/img/landing-automation/steps";
import {avatars} from "../../../assets/img/landing-automation/avatars/avatars";
import {underHoodImages} from "../../../assets/img/landing-automation/under-hood";
import JeffInPlane from '../../../assets/img/landing-automation/Illustration.png';
import JeffDaily from '../../../assets/img/landing-automation/jeff-daily.svg';
import amazonApp from '../../../assets/img/landing-automation/amazon-app-store.svg';
import dashIcon from '../../../assets/img/landing-automation/dash.svg';
import listIcon from '../../../assets/img/landing-automation/yes_green.svg'
import confidenceLevelImage from '../../../assets/img/landing-automation/confidence-level.svg';
import awsImage from '../../../assets/img/landing-automation/aws.svg';
import appStoreImage from '../../../assets/img/landing-automation/app-store.svg';
import blogPostImage from '../../../assets/img/landing-automation/blog-post.png';
import supportImage from '../../../assets/img/landing-automation/Vitalik-help.png';
import emojiImage from '../../../assets/img/landing-automation/emoji.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Modal} from "antd";
import favicon from '../../../assets/img/icons/favicon.ico';
import {Link} from "react-router-dom";


const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;
const pixelRatio = window.devicePixelRatio;

let swipeTimeoutId = null;


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

const ourCases = [
    {
        title: 'One year with Profit Whales',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: casesImages.case1,
        firstColumn: [
            {
                metric: 'Total Sales',
                value: '$1,786,513'
            },
            {
                metric: 'PPC Sales',
                value: '$68,407'
            },
            {
                metric: 'Profit',
                value: '$469,016'
            },
        ],
        secondColumn: [
            {
                metric: 'Total Sales',
                value: '$4,834,354'
            },
            {
                metric: 'PPC Sales',
                value: '$1,022,292'
            },
            {
                metric: 'Profit',
                value: '$1,097,849'
            },
        ]
    },
    {
        title: '2 months Profit Whales results',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: casesImages.case4,
        firstColumn: [
            {
                metric: 'CPC',
                value: '2.89'
            },
            {
                metric: 'ACOS',
                value: '38.12%'
            },
            {
                metric: 'PPC Sales',
                value: '$142,496'
            },
        ],
        secondColumn: [
            {
                metric: 'CPC',
                value: '2.11'
            },
            {
                metric: 'ACOS',
                value: '24.44%'
            },
            {
                metric: 'PPC Sales',
                value: '$361,740'
            },
        ]
    },
    {
        title: 'One year with Profit Whales results',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: casesImages.case3,
        firstColumn: [
            {
                metric: 'Orders',
                value: '13,997'
            },
            {
                metric: 'Total Sales',
                value: '$395,667'
            },
            {
                metric: 'PPC Sales',
                value: '$255,110'
            },
        ],
        secondColumn: [
            {
                metric: 'Orders',
                value: '47,884'
            },
            {
                metric: 'Total Sales',
                value: '$1,434,221'
            },
            {
                metric: 'PPC Sales',
                value: '$872,692'
            },
        ]
    },
    {
        title: '3 months Profit Whales results',
        firstColumnTitle: '12 months without Profit Whales',
        secondColumnTitle: '3 months with Profit Whales',
        img: casesImages.case5_1,
        firstColumn: [
            {
                metric: 'ACOS',
                value: '55,31%'
            },
            {
                metric: 'PPC orders',
                value: '2,771'
            },
            {
                metric: 'PPC Sales',
                value: '$54,228'
            },
        ],
        secondColumn: [
            {
                metric: 'ACOS',
                value: '26,6%'
            },
            {
                metric: 'PPC orders',
                value: '11,192'
            },
            {
                metric: 'PPC Sales',
                value: '$197,993'
            },
        ]
    },
    {
        title: 'One year with Profit Whales results',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: casesImages.case2,
        firstColumn: [
            {
                metric: 'Orders',
                value: '113,620'
            },
            {
                metric: 'Total Sales',
                value: '$3,044,884'
            },
            {
                metric: 'PPC Sales',
                value: '$1,378,785'
            },
        ],
        secondColumn: [
            {
                metric: 'Orders',
                value: '239,643'
            },
            {
                metric: 'Total Sales',
                value: '$6,761,369'
            },
            {
                metric: 'PPC Sales',
                value: '$3,814,759'
            },
        ]
    },
    {
        title: '3 months Profit Whales results',
        firstColumnTitle: 'For 12 months',
        secondColumnTitle: 'For 3 months',
        img: casesImages.case5_2,
        firstColumn: [
            {
                metric: 'ACOS',
                value: '55,31%'
            },
            {
                metric: 'PPC orders',
                value: '2,771'
            },
            {
                metric: 'PPC Sales',
                value: '$54,228'
            },
        ],
        secondColumn: [
            {
                metric: 'ACOS',
                value: '26,6%'
            },
            {
                metric: 'PPC orders',
                value: '11,192'
            },
            {
                metric: 'PPC Sales',
                value: '$197,993'
            },
        ]
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
                $('.slider-container .slider .irs .irs-bar').html('$ 35');
            },
            onChange: function (data) {
                let value = data.from_value,
                    result = 0,
                    sumElement = $('.result-sum'),
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
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------

        const s = document.createElement('script'),
            mailchimpScript = document.createElement('script');

        s.type = 'text/javascript';
        mailchimpScript.type = 'text/javascript';

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

        mailchimpScript.innerHTML = `window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us20.list-manage.com","uuid":"ded622a105926b256014e2410","lid":"74874aa336","uniqueMethods":true}) })`;

        document.head.appendChild(s);
        document.head.appendChild(mailchimpScript);

        return () => {
            document.querySelector('html').classList.remove('not-retina');
            document.querySelector('body').classList.add('hide-mc-modal');

            document.head.removeChild(s);
            document.head.removeChild(mailchimpScript);

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
        document.getElementById('cases-slider').addEventListener('touchstart', handleTouchStart, false);
        document.getElementById('cases-slider').addEventListener('touchmove', (e) => handleTouchMove(e, 'case'), false);
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
        <div className="landing-automation">
            <Header/>

            <section className='first-section'>
                <div className='container'>
                    <div className='content'>
                        <div className='image-block'>
                            <img src={JeffInPlane} alt=""/>
                        </div>

                        <div className="sponsored">
                            <span><div/>Sponsored Products</span>
                            <span><div/>US Marketplace</span>
                        </div>

                        <h1>Engage in Amazon <br/> business <span>not in ads</span></h1>

                        <div className='description'>
                            Imagine that software could save you a ton of time and money while increasing return on your
                            Amazon ad spending. With the help of our data-driven algorithms and PPC automation software,
                            it's more than possible.
                        </div>

                        <div className="col">
                            <div className='advantages'>
                                <span><div/>Cancel anytime</span>
                                <span><div/>14-day Free Trial</span>
                                <span><div/>No credit card required</span>
                            </div>

                            <div className="actions">
                                <button className='btn default' onClick={goToRegistrationPage}>
                                    START FREE
                                </button>

                                <span>Or <Link to={'/demo-call'} target={'_blank'}>Book a Demo</Link></span>

                                <img src={amazonApp} alt=""
                                     onClick={() => window.open('https://sellercentral.amazon.com/apps/store/dp/amzn1.sellerapps.app.c5bc0b50-69b9-4976-9e4c-6d30258fedb9')}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="video-btn">
                    Why Profit Whales?
                    <div className="pulse" onClick={() => switchWindow(true)}>
                        <div/>
                        <FontAwesomeIcon icon={faPlay}/>
                    </div>
                </div>
            </section>

            <section className='daily-routine-jeff'>
                <div className='container'>
                    <div className="image-block">
                        <img src={JeffDaily} alt=""/>
                    </div>

                    <div className="content">
                        <div className="title">
                            This is Jeff. He has a successful Amazon FBA business. But,
                        </div>

                        <div className="description">
                            every day, he is dealing with a lot of routine tasks regarding
                            Amazon PPC instead of launching new products and improving existing ones.
                        </div>

                        <div className='list'>
                            <div>
                                He spends up to 40 hours per week on Amazon PPC.
                            </div>

                            <div>
                                He is wasting a ton of money on bleeding keywords and losing money from the ones he
                                isn’t bidding on.
                            </div>

                            <div>
                                Jeff is always looking into unfriendly Amazon Advertising Reports.
                            </div>

                            <div>
                                He is dealing with industry PPC “experts” and losing a lot of business opportunities
                                while his competitors are stealing the market share.
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            <section className='steps'>
                <div className='container'>
                    <h2>How can we help?</h2>

                    <div className="row">
                        <Slider
                            dots={false}
                            infinite={true}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            <div>
                                <img src={stepsImages.slide1} alt=""/>
                            </div>
                            <div>
                                <img src={stepsImages.slide2} alt=""/>
                            </div>
                            <div>
                                <img src={stepsImages.slide3} alt=""/>
                            </div>
                            <div>
                                <img src={stepsImages.slide4} alt=""/>
                            </div>
                            <div>
                                <img src={stepsImages.slide5} alt=""/>
                            </div>
                        </Slider>

                        <div className="content">
                            <h3>Strategy based algorithm</h3>
                            <p>
                                We designed five business and advertising goals that you can choose. Every strategy will
                                adjust the algorithm to reach your desired results. You can change the goals as your
                                business situation changes. Just select the right strategy and press START. That’s all
                                you need to automate your whole PPC management.
                            </p>
                        </div>

                    </div>

                    <div className="row">
                        <div className="content">
                            <h3>See the changes it performs</h3>
                            <p>
                                You have to make yourself comfortable, sit, and enjoy changes that the software
                                performed. We created the reporting tool that shows you everything that was made by the
                                algorithm and why it did it. You see, for what you pay, it’s soothing, right?
                            </p>
                        </div>

                        <div className="image">
                            <img src={stepsImages.seeChangesImage} alt=""/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="image">
                            <img src={stepsImages.moreDataImage} alt=""/>
                        </div>

                        <div className="content">
                            <h3>Access a lot more data</h3>
                            <p>
                                We’re obsessed with data, and we guess you too, so we developed a dashboard, so you can
                                see your business metrics at a glance and make more profitable decisions. Twenty-one
                                metrics will help you understand your business from a different perspective.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="content">
                            <h3>Day-parting</h3>
                            <p>
                                Day-parting tool will allow you to see what time of the day your campaigns is out of
                                budget, what hours drives most of the daily sales so that you can set up days and hours
                                for your PPC campaigns. ”70% of the sales happened from 7 am to 8 pm” Let’s test it!
                            </p>
                        </div>

                        <div className="image">
                            <img src={stepsImages.dayPartingImage} alt=""/>
                        </div>
                    </div>

                    <div className="col">
                        <button className="btn default" onClick={goToRegistrationPage}>start free trial</button>
                        <p>Or <Link to={'/demo-call'} target={'_blank'}>Book a Demo</Link> No credit card <br/> required. 60-second sign up.</p>
                    </div>

                </div>
            </section>

            <section className='achievements'>
                <div className="container">
                    <div>
                        <div className="value">$2,5M</div>
                        <div className="description">Total Amazon Ad Spend Managed</div>
                    </div>
                    <div>
                        <div className="value">14%</div>
                        <div className="description">Average Decrease <br/> in ACoS</div>
                    </div>
                    <div>
                        <div className="value">$40M</div>
                        <div className="description">Total Amazon Revenue Optimized</div>
                    </div>
                    <div>
                        <div className="value">19%</div>
                        <div className="description">Average Increase in <br/>Revenue</div>
                    </div>
                    <div>
                        <div className="value">25%</div>
                        <div className="description">Higher CTR</div>
                    </div>
                </div>
            </section>

            <section className='our-cases'>
                <div className="container">
                    <h2>Our Cases</h2>

                    <div className='slider' id='cases-slider'>
                        <div className="row">
                            <div className="prev" onClick={() => prevSlide('case')}><FontAwesomeIcon icon={faPlay}/>
                            </div>

                            <div className="image-block">
                                {ourCases.map((item, index) => (
                                    <img
                                        src={item.img}
                                        onClick={() => selectImage(item.img)}
                                        alt=""
                                        style={{display: currentCaseSlide === index ? 'block' : 'none'}}
                                    />
                                ))}

                                {(currentCaseSlide === 3 || currentCaseSlide === 5) &&
                                <div className='change-chart'
                                     onClick={() => currentCaseSlide === 3 ? setCaseSlide(5) : setCaseSlide(3)}>
                                    Change chart
                                </div>
                                }
                            </div>

                            <div className="next" onClick={() => nextSlide('case')}><FontAwesomeIcon icon={faPlay}/>
                            </div>
                        </div>

                        <div className='navigation'>
                            {[0, 1, 2].map((item, index) => (
                                <div
                                    onClick={() => goToSlide(index, 'case')}
                                    className={currentCaseSlide === index ? 'active-dot' : ''}
                                />
                            ))}

                            <div
                                onClick={() => goToSlide(3, 'case')}
                                className={currentCaseSlide === 3 || currentCaseSlide === 5 ? 'active-dot' : ''}
                            />

                            <div
                                onClick={() => goToSlide(4, 'case')}
                                className={currentCaseSlide === 4 ? 'active-dot' : ''}
                            />
                        </div>
                    </div>

                    <div className="content">
                        <h3>{ourCases[currentCaseSlide].title}</h3>

                        <div className="row">
                            <div className="col">
                                <h4>{ourCases[currentCaseSlide].firstColumnTitle}</h4>

                                {ourCases[currentCaseSlide].firstColumn.map(item => (
                                    <div key={item.value}>
                                        <span className='metric-name'>{item.metric}:</span>
                                        <span className='metric-value'>{item.value}</span>
                                    </div>
                                ))}

                            </div>

                            <div className='line'/>

                            <div className="col">
                                <h4>{ourCases[currentCaseSlide].secondColumnTitle}</h4>

                                {ourCases[currentCaseSlide].secondColumn.map(item => (
                                    <div key={item.value}>
                                        <span className='metric-name'>{item.metric}:</span>
                                        <span className='metric-value'>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className='btn default' onClick={goToRegistrationPage}>
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            <section className='comments'>
                <div className="container">
                    <h2>What Our Customers Say</h2>

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

            <section className='under-hood'>
                <div className="container">
                    <h2>What’s under the hood?</h2>

                    <div className="list">
                        <div>
                            <div className="col">
                                <div className="image"><img src={underHoodImages.icon1} alt=""/></div>
                                <div className='title'>Product Targetings Optimization</div>
                            </div>
                            <div className="description">
                                Price aware algorithm optimizes your product attribute targeting (ASIN’s, categories)
                                based on your target ACoS. It also makes bid adjustments based on your historical data
                                to reach the best results possible.
                            </div>
                        </div>

                        <div>
                            <div className='col'>
                                <div className="image"><img src={underHoodImages.icon2} alt=""/></div>
                                <div className='title'>Negative Keywords Adding</div>
                            </div>
                            <div className="description">
                                Adding not relevant customer search terms that have unhealthy ACoS, or too many clicks
                                and lack of sales, as negative keywords in the Auto and Broad campaigns to ensure you
                                invest your money in the best keywords for your product.
                            </div>
                        </div>

                        <div>
                            <div className='col'>
                                <div className="image"><img src={underHoodImages.icon3} alt=""/></div>
                                <div className='title'>Keywords Optimization</div>
                            </div>
                            <div className="description">
                                The algorithm optimizes your keywords based on your product profitability and
                                conversion rate and makes bid adjustments to get the best Ad position for your product.
                            </div>
                        </div>

                        <div>
                            <div className='col'>
                                <div className="image"><img src={underHoodImages.icon4} alt=""/></div>
                                <div className='title'>Negative Pat Creation</div>
                            </div>
                            <div className="description">
                                User search terms, which are ASINs that either has large ACoS, or a large number of
                                clicks and lack of sales are added as negative ASIN PATs to ensure your product is
                                showing only on competitors pages that convert into sales.
                            </div>
                        </div>

                        <div>
                            <div className='col'>
                                <div className="image"><img src={underHoodImages.icon5} alt=""/></div>
                                <div className='title'>Mining New Product Targetings</div>
                            </div>
                            <div className="description">
                                The algorithm will search through your advertising reports to find profitable and
                                relevant ASIN's and add them to your PPC campaign so you can steal traffic from your
                                competitors.
                            </div>
                        </div>

                        <div>
                            <div className='col'>
                                <div className="image"><img src={underHoodImages.icon6} alt=""/></div>
                                <div className='title'>Adding New Keywords</div>
                            </div>
                            <div className="description">
                                Adding potential and already valid user search terms as new keywords to PPC campaigns.
                                The quality of the keywords is determined based on your Target ACoS, conversion rate,
                                number of sales, and other essential metrics.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='pricing'>
                <div className="container">
                    <h2>Our Pricing</h2>

                    <div className='price-drawer price-list'>
                        <div className="row">
                            <div className="col">
                                <h2>What’s your monthly Amazon <br/> Advertising Spend?</h2>

                                <div className="range-slider slider-container">
                                    <div className="slider">
                                        <input className="js-range-slider" type="text"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="sum">
                                    <span className="result-sum">$ 35</span>
                                    <span className='description'>
                                       Estimated price per month based on your 30-day Amazon ad spending
                                    </span>

                                    <a href="https://profitwhales.com/pricing">
                                        How is this calculated?
                                    </a>
                                </div>

                                <button className='btn green-btn' onClick={goToRegistrationPage}>
                                    Free Trial
                                </button>
                            </div>
                        </div>

                        <div className="list">
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Efficient Budget Management
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                You'll get Money Making System
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                You'll Save a Lot of Time
                            </div>

                            <div>
                                <img src={listIcon} alt="yes"/>
                                Business Goal Aware Optimization
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Keywords Optimization
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Dashboard View
                            </div>

                            <div>
                                <img src={listIcon} alt="yes"/>
                                Unlimited Products & Campaigns
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Data-Driven Bid Optimization
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Expert Chat Support
                            </div>
                        </div>

                        <button className='btn white' onClick={goToPricingPage}>
                            Learn more
                        </button>
                    </div>
                </div>
            </section>

            <section className='secure'>
                <div className="container">
                    <h2><span>Safe</span> and secure</h2>
                    <p>
                        Want to try Profit Whales but worried about the risk of a program
                        <br/>
                        handling your PPC management? Don’t worry. <br/> Profit Whales and
                        Amazon have safeguards in place to ensure <br/> every decision we make
                        is not risky for your account.
                    </p>

                    <div className="list">
                        <div className="item">
                            <div className="image">
                                <img src={confidenceLevelImage} alt=""/>
                            </div>
                            <h4>Confidence Level</h4>
                            <p>
                                This is an algorithm that makes sure that the decision that our optimization makes is
                                right by at least 90%. We will not reveal all the cards about how we calculate this, but
                                we can assure you that the algorithm does not make deliberately wrong decisions.
                            </p>
                        </div>
                        <div className="item">
                            <div className="image">
                                <img src={appStoreImage} alt=""/>
                            </div>
                            <h4>Amazon Appstore</h4>
                            <p>
                                Profit Whales is an official Amazon FBA Appstore participant. Amazon takes the
                                information security of its sellers very seriously, and we have complied with its
                                policy, so you can be sure your data is saved and not shared.
                            </p>
                        </div>
                        <div className="item">
                            <div className="image">
                                <img src={awsImage} alt=""/>
                            </div>
                            <h4>Amazon Partner</h4>
                            <p>
                                As an official Amazon Web Services partner, Profit Whales is hosted on Amazon servers
                                and infrastructure, ensuring we can respond to any Amazon Advertising changes as fast as
                                possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/*<section className='blog-posts'>*/}
            {/*    <div className="container">*/}
            {/*        <h2>Stay up-to-date with the latest Amazon expert content</h2>*/}

            {/*        <p>*/}
            {/*            We are one the mission to provide Amazon Sellers with the most <br/>*/}
            {/*            useful and actionable content possible. Check it out.*/}
            {/*        </p>*/}


            {/*        <div className="posts">*/}
            {/*            <div className="item">*/}
            {/*                <div className="image"><img src={blogPostImage} alt=""/></div>*/}
            {/*                <h4>text text</h4>*/}
            {/*                <span className="date">Apr 4, 2020</span>*/}
            {/*            </div>*/}
            {/*            <div className="item">*/}
            {/*                <div className="image"><img src={blogPostImage} alt=""/></div>*/}
            {/*                <h4>text text</h4>*/}
            {/*                <span className="date">Apr 4, 2020</span>*/}
            {/*            </div>*/}
            {/*            <div className="item">*/}
            {/*                <div className="image"><img src={blogPostImage} alt=""/></div>*/}
            {/*                <h4>text text</h4>*/}
            {/*                <span className="date">Apr 4, 2020</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

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
                    <button onClick={() => history.push('/registration')}>START 14-DAY FREE TRIAL TODAY</button>
                    <ul>
                        <li>No credit card required</li>
                        <li>Cancel anytime</li>
                    </ul>
                </div>
            </section>

            <div className="scroll-top" onClick={() => $('html, body').animate({scrollTop: 0}, 'slow')}/>

            {selectedImage && <div className="modal-image">
                <span className="close" onClick={() => selectImage(null)}>&times;</span>

                <img src={selectedImage} alt=""/>
            </div>}

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
