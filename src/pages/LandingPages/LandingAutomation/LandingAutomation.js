import React, {Fragment, useEffect, useState} from "react";
import './LandingAutomation.less';

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {history} from "../../../utils/history";
import JeffInPlane from '../../../assets/img/landing-automation/not-in-ads.svg';
import JeffDaily from '../../../assets/img/landing-automation/jeff-daily.svg';
import amazonApp from '../../../assets/img/landing-automation/amazon-app-store.svg';
import dots from '../../../assets/img/landing-automation/dots.svg';
import step1 from '../../../assets/img/landing-automation/step-1.svg';
import step2 from '../../../assets/img/landing-automation/step-2.svg';
import step3 from '../../../assets/img/landing-automation/step-3.svg';
import step4 from '../../../assets/img/landing-automation/step-4.svg';
import leftIcon from '../../../assets/img/landing-automation/left-icon.svg';
import rightIcon from '../../../assets/img/landing-automation/right-icon.svg';
import dashIcon from '../../../assets/img/landing-automation/dash.svg';

import listIcon from '../../../assets/img/landing-automation/yes_green.svg'
import jeffChart from '../../../assets/img/landing-automation/jeffChart.svg'

import case1 from '../../../assets/img/landing-automation/case-1.svg';
import case2 from '../../../assets/img/landing-automation/case-2.svg';
import case3 from '../../../assets/img/landing-automation/case-3.svg';
import case4 from '../../../assets/img/landing-automation/case-4.svg';
import case5_1 from '../../../assets/img/landing-automation/case-5(1).svg';
import case5_2 from '../../../assets/img/landing-automation/case-5(2).svg';
import {avatars} from "../../../assets/img/landing-automation/avatars/avatars";
import {underHoodImages} from "../../../assets/img/landing-automation/under-hood";

import $ from 'jquery';
import ionRangeSlider from 'ion-rangeslider'
import './SurveyPopup';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SurveyPopup from "./SurveyPopup";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faTwitter, faLinkedinIn} from "@fortawesome/free-brands-svg-icons"


const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;

const stepsSlider = [
    {
        title: `Connect Seller <br/> Central Account`,
        description: 'Profit Whales allows you to instantly connect Amazon Seller Central to automate your Amazon Advertising work and find productivity super powers.',
        img: step1
    },
    {
        title: `Choose <br/> Your Goal`,
        description: 'Inside the software, you\'ll find four business goals. You have to choose one of them and start optimization. Naturally, for each of them, we use a unique algorithm to achieve efficient results.',
        img: step2
    },
    {
        title: `Monitor <br/> The Changes`,
        description: 'You have to make yourself comfortable, sit, and enjoy changes that software would do. You see, for what you pay, it soothes, right?',
        img: step3
    },
    {
        title: `Access <br/> A Lot More Data`,
        description: 'We obsessed with data, so we developed a dashboard and day-parting tool so you can see your business metrics at a glance and make more profitable decisions.',
        img: step4
    },
];

const ourCases = [
    {
        title: 'One year with Profit Whales',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: case1,
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
        title: 'One year with Profit Whales results',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: case2,
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
        title: 'One year with Profit Whales results',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: case3,
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
        title: 'One year with Profit Whales results',
        firstColumnTitle: 'Before',
        secondColumnTitle: 'After',
        img: case4,
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
        title: '3 months Profit Whales results',
        firstColumnTitle: '12 months without Profit Whales',
        secondColumnTitle: '3 months with Profit Whales',
        img: case5_1,
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
        title: '3 months Profit Whales results',
        firstColumnTitle: 'For 12 months',
        secondColumnTitle: 'For 3 months',
        img: case5_2,
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

const rangeValues = [
    0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000, 3500, 4500, 5000,
    6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
    22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000,
    55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000
];

const commentsList = [
    {
        name: 'Claire Williamson',
        comment: 'ProfitWhales\' software is notably robust, and their analysts have helped us both maximize profitability and truly understand the incremental value of our Amazon Ads. They are a valued partner and we really appreciate the flexibility of their software and service model.',
        avatar: avatars.ClaireWilliamson
    },
    {
        name: 'Eduardo Mckinney',
        comment: 'I remember vividly telling Teikametrics that we were averaging 2,000 orders per week and that my goal is to double that number. As of today, we are averaging 4,500 orders per week. We couldn’t be happier that we partnered with Teikametrics and what the effects of their team and system have had for our success!',
        avatar: avatars.EduardoMckinney
    },
    {
        name: 'Philip Cooper',
        comment: 'ProfitWhales\' software is notably robust, and their analysts have helped us both maximize profitability and truly understand the incremental value of our Amazon Ads. se ex mollit do enim irure aliqua amet. Nisi irure excepteur magna',
        avatar: avatars.PhilipCooper
    },
    {
        name: 'Savannah Hawkins',
        comment: 'Proident incididunt Lorem et culpa enim ea quis in. Incididunt aute ea esse ex mollit do enim irure aliqua amet. Nisi irure excepteur magna dolore aliqua est do tempor.',
        avatar: avatars.SavannahHawkins
    },
    {
        name: 'Arlene Murphy',
        comment: 'Id aliquip laboris fugiat aute officia elit dolor cupidatat quis nisi officia ea. Minim proident occaecat adipisicing cupidatat officia ex velit. Sint officia elit culpa laboris eu occaecat reprehenderit qui eu.',
        avatar: avatars.ArleneMurphy
    },
    {
        name: 'Jennie Fisher',
        comment: 'ProfitWhales\' software is notably robust, and their analysts have helped us both maximize profitability and truly understand the incremental value of our Amazon Ads. They are a valued partner and we really appreciate the flexibility of their software and service model.',
        avatar: avatars.JennieFisher
    },
    {
        name: 'Marjorie Bell',
        comment: 'Dolor magna ea excepteur aliquip nulla laborum fugiat duis. Laboris proident aliquip do consequat cillum deserunt. Excepteur laborum nulla id pariatur esse laboris et.',
        avatar: avatars.MarjorieBell
    },
    {
        name: 'Cameron Miles',
        comment: 'Esse exercitation ipsum consectetur in aute aute non pariatur laborum Lorem culpa. Fugiat aute cillum exercitation eiusmod id sit enim sint. Proident Lorem magna dolor magna aliqua pariatur fugiat aliquip adipisicing mollit sunt amet sint pariatur.',
        avatar: avatars.CameronMiles
    },

];

const LandingAutomation = () => {
    const [currentStepSlide, setStepSlide] = useState(0),
        [currentCaseSlide, setCaseSlide] = useState(0),
        [currentCommentSlide, setCommentSlide] = useState(0),
        [visibleWindow, switchWindow] = useState(false),
        [rangeSliderValue, setValue] = useState(20000);


    //step navigation
    function prevStepSlide() {
        if (currentStepSlide === 0) {
            setStepSlide(3)
        } else {
            setStepSlide(currentStepSlide - 1)
        }
    }

    function nextStepSlide() {
        if (currentStepSlide === 3) {
            setStepSlide(0)
        } else {
            setStepSlide(currentStepSlide + 1)
        }
    }

    //-----------------------------------

    //case navigation
    function prevCaseSlide() {
        if (currentCaseSlide === 0) {
            setCaseSlide(4)
        } else {
            setCaseSlide(currentCaseSlide - 1)
        }
    }

    function nextCaseSlide() {
        if (currentCaseSlide === 4 || currentCaseSlide === 5) {
            setCaseSlide(0)
        } else {
            setCaseSlide(currentCaseSlide + 1)
        }
    }

    function goToCaseSlide(index) {
        setCaseSlide(index)
    }

    //---------------------------------------

    //comment navigation
    function prevCommentSlide() {
        if (currentCommentSlide === 0) {
            setCommentSlide(4)
        } else {
            setCommentSlide(currentCommentSlide - 1)
        }
    }

    function nextCommentSlide() {
        if (currentCommentSlide === 4) {
            setCommentSlide(0)
        } else {
            setCommentSlide(currentCommentSlide + 1)
        }
    }

    function goToCommentSlide(index) {
        setCommentSlide(index)
    }

    //---------------------------------------

    function goToRegistrationPage() {
        history.push('/registration')
    }

    function keepOnPage(e) {
        const message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
        e.returnValue = message;
        switchWindow(true);
        return message;
    }

    useEffect(() => {
        (function (t, a, p) {
            t.TapfiliateObject = a;
            t[a] = t[a] || function () {
                (t[a].q = t[a].q || []).push(arguments)
            }
        })(window, 'tap');

        window.tap('create', tapfiliateKey, {integration: "javascript"});
        window.tap('detect');


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
            prefix: "$ ",
            max_postfix: "+",
            postfix: "  / month",
            onStart: function () {
                $('.slider-container .slider .irs .irs-bar').html('$35');
            },
            onChange: function (data) {
                var value = data.from_value,
                    result = 0,
                    sumElement = $('.result-sum'),
                    barLabel = $('.slider-container .slider .irs .irs-bar');


                if (value <= 1000) {
                    sumElement.text('$35');
                    barLabel.html('$35');
                } else {
                    if (value >= 50000) {
                        result = ((2 / 100) * value) + 500;
                        barLabel.html('$500 + 2% <small>ad spend</small>');
                    } else if (value >= 20000) {
                        result = ((3 / 100) * value) + 300;
                        barLabel.html('$300 + 3% <small>ad spend</small>');
                    } else {
                        result = ((4 / 100) * value) + 100;
                        barLabel.html('$100 + 4% <small>ad spend</small>');
                    }

                    sumElement.text('$ ' + result);
                }
            }
        });

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = `  !function (f, b, e, v, n, t, s) {
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
            document.head.removeChild(s);
        }
    }, []);


    return (
        <div className="landing-automation">
            <Header/>

            <section className='first-section'>
                <div className='container'>
                    <div className='content'>
                        <h1>Engage in Amazon <br/> business <span>not in ads</span></h1>

                        <div className='description'>
                            Imagine the software could save you a ton of time and money while
                            increasing return on your Amazon ad spends. With the help of our data-driven algorithms and
                            PPC automation software, it's more than possible.
                        </div>

                        <div className='advantages'>
                            <span>Cancel anytime</span>
                            <div/>
                            <span>14 Days Free Trial</span>
                            <div/>
                            <span>No credit card required</span>
                        </div>

                        <div className="actions">
                            <button className='btn default' onClick={goToRegistrationPage}>
                                START FREE
                            </button>

                            <img src={amazonApp} alt=""/>
                        </div>
                    </div>

                    <div className='image-block'>
                        <img src={JeffInPlane} alt=""/>
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
                            Amazon PPC instead of launching new products and improve existing ones.
                        </div>

                        <div className='list'>
                            <div>
                                He spends up to 40 hours per week on Amazon PPC.
                            </div>

                            <div>
                                He is waisting ton of money on bleeding keywords, and losing money from keywords, he
                                isn’t bidding on.
                            </div>

                            <div>
                                Jeff is always looking in unfriendly Amazon Advertising Reports.
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
                    <h2>N steps to Solve It</h2>

                    <div className='all-steps'>
                        <div className={currentStepSlide === 0 ? 'active' : ''}>
                            <div/>
                            <span>Connect Seller Central Account</span>
                        </div>
                        <img src={dots} alt=""/>
                        <div className={currentStepSlide === 1 ? 'active' : ''}>
                            <div/>
                            <span>Choose Your Goal</span>
                        </div>
                        <img src={dots} alt=""/>
                        <div className={currentStepSlide === 2 ? 'active' : ''}>
                            <div/>
                            <span>Monitor the changes</span>
                        </div>
                        <img src={dots} alt=""/>
                        <div className={currentStepSlide === 3 ? 'active' : ''}>
                            <div/>
                            <span>Access a lot more data</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="content">
                            <div className="title">
                                0{currentStepSlide + 1}
                                <span className='dash'>
                                    <img src={dashIcon} alt=""/>
                                </span>
                                <span dangerouslySetInnerHTML={{__html: stepsSlider[currentStepSlide].title}}/>
                            </div>

                            <div className="description">
                                {stepsSlider[currentStepSlide].description}
                            </div>

                            <button className='btn default' onClick={goToRegistrationPage}>
                                Get Started
                            </button>
                        </div>

                        <div className="slider">
                            <div className="prev" onClick={prevStepSlide}><img src={leftIcon} alt=""/></div>
                            <div className="image-block" style={{marginTop: currentStepSlide === 3 ? '20px' : 0}}>
                                <img src={stepsSlider[currentStepSlide].img} alt=""/>
                            </div>
                            <div className="next" onClick={nextStepSlide}><img src={rightIcon} alt=""/></div>
                        </div>
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
                        <div className="description">Average Decrease in Acos</div>
                    </div>
                    <div>
                        <div className="value">$40M</div>
                        <div className="description">Total Amazon Revenue Optimized</div>
                    </div>
                    <div>
                        <div className="value">19%</div>
                        <div className="description">Average Increase in Revenue</div>
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

                    <div className='slider'>
                        <div className="image-block">
                            <img src={ourCases[currentCaseSlide].img} alt=""/>

                            {(currentCaseSlide === 4 || currentCaseSlide === 5) &&
                            <div className='change-chart'
                                 onClick={() => currentCaseSlide === 4 ? setCaseSlide(5) : setCaseSlide(4)}>
                                Change chart
                            </div>
                            }
                        </div>

                        <div className="prev" onClick={prevCaseSlide}><img src={leftIcon} alt=""/></div>
                        <div className="next" onClick={nextCaseSlide}><img src={rightIcon} alt=""/></div>

                        <div className='navigation'>
                            {[0, 1, 2, 3].map((item, index) => (
                                <div
                                    onClick={() => goToCaseSlide(index)}
                                    className={currentCaseSlide === index ? 'active-dot' : ''}
                                />
                            ))}

                            <div
                                onClick={() => goToCaseSlide(4)}
                                className={currentCaseSlide === 4 || currentCaseSlide === 5 ? 'active-dot' : ''}
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
                <h2>What our customers <br/> are saying</h2>

                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={60}
                    totalSlides={commentsList.length}
                    visibleSlides={4}
                    infinite={true}
                    touchEnabled={false}
                    dragEnabled={false}
                    currentSlide={currentCommentSlide}
                >

                    <Slider>
                        {commentsList.map((item, index) => (
                            <Slide index={index}>
                                <div className="slide-item">
                                    <div className="row">
                                        <img src={item.avatar} alt=""/>

                                        <div className="name">
                                            <div>{item.name}</div>
                                            <span>@Claire</span>
                                        </div>

                                    </div>

                                    <div className='comment'>{item.comment}</div>
                                </div>
                            </Slide>
                        ))}
                    </Slider>

                    <ButtonBack onClick={prevCommentSlide}><img src={leftIcon} alt=""/></ButtonBack>
                    <ButtonNext onClick={nextCommentSlide}><img src={rightIcon} alt=""/></ButtonNext>
                </CarouselProvider>

                <div className='navigation'>
                    {[0, 1, 2, 3, 4].map((item, index) => (
                        <div
                            onClick={() => goToCommentSlide(index)}
                            className={currentCommentSlide === index ? 'active-dot' : ''}
                        />
                    ))}
                </div>

            </section>

            <section className='under-hood'>
                <div className="container">
                    <h2>What’s under the hood?</h2>

                    <div className="list">
                        <div>
                            <div className="image"><img src={underHoodImages.icon1} alt=""/></div>
                            <div className='title'>Product Targetings Optimization</div>
                            <div className="description">
                                Price aware algorithm optimizing your product attribute targetings(ASIN’s, categories)
                                based on your Target ACoS and make bid adjustments based on your historical data to
                                reach the best results possible.
                            </div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon2} alt=""/></div>
                            <div className='title'>Negative Keywords Adding</div>
                            <div className="description">
                                Adding not relevant customer search terms that have unhealthy ACoS, or too many clicks
                                and lack of sales, as negative keywords in the Auto and Broad campaigns to ensure you
                                invest your money in the best keywords for your product.
                            </div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon3} alt=""/></div>
                            <div className='title'>Keywords Optimization</div>
                            <div className="description">
                                The algorithm optimizing your keywords based on your product profitability and
                                conversion rate and make bid adjustment to get the best Ad position for your product.
                            </div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon4} alt=""/></div>
                            <div className='title'>Negative Pat Creation</div>
                            <div className="description">
                                User search terms, which are ASINs that either has large ACoS, or a large number of
                                clicks and lack of sales and added as negative ASIN PATs to ensure your product is
                                showing only on competitors pages that convert into a sales.
                            </div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon5} alt=""/></div>
                            <div className='title'>Mining New Product Targetings</div>
                            <div className="description">
                                The algorithm will search through your advertising reports to find profitable and
                                relevant ASIN's and add them to your PPC campaign so you can steal traffic from your
                                competitors.
                            </div>
                        </div>

                        <div>
                            <div className="image"><img src={underHoodImages.icon6} alt=""/></div>
                            <div className='title'>Adding New Keywords</div>
                            <div className="description">
                                Adding potential and already valid user search terms as a new keyword to PPC campaigns.
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
                                    <span className="result-sum">$35</span>
                                    <span className='description'>
                                        Estimated Price per / Month by your 30 Day Ad Spend
                                    </span>
                                </div>

                                <button className='btn default' onClick={goToRegistrationPage}>
                                    Free Trial
                                </button>
                            </div>
                        </div>

                        <div className="row list">
                            <div>
                                <img src={listIcon} alt="yes"/>
                                300-700 Relevant Keywords
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                300-700 Relevant Keywords
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                300-700 Relevant Keywords
                            </div>

                            <div>
                                <img src={listIcon} alt="yes"/>
                                8 Structured Campaigns
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                8 Structured Campaigns
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                8 Structured Campaigns
                            </div>

                            <div>
                                <img src={listIcon} alt="yes"/>
                                Premium Support
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Premium Support
                            </div>
                            <div>
                                <img src={listIcon} alt="yes"/>
                                Premium Support
                            </div>
                        </div>

                        <button className='btn white' onClick={goToRegistrationPage}>
                            Learn more
                        </button>
                    </div>
                </div>
            </section>

            <section className='last-section'>
                <div className="container">
                    <h2>Go for Profit, be a Whale</h2>

                    <img src={jeffChart} alt=""/>

                    <button className='btn default' onClick={goToRegistrationPage}>
                        Try It For Free
                    </button>
                </div>
            </section>

            <SurveyPopup/>

            <div className="scroll-top" onClick={() => $('html, body').animate({scrollTop: 0}, 'slow')}/>

            <div className="social-links">

                <a className="i-tw" href="https://twitter.com/ProfitWhales" target="_blank"
                   title="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>
                <a className="i-fb" href="https://www.facebook.com/profitwhales" target="_blank"
                   title="Facebook"><FontAwesomeIcon icon={faFacebookF}/></a>
                <a className="i-in" href="https://www.linkedin.com/company/profitwhales" target="_blank"
                   title="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn}/></a>
            </div>

            <Footer/>
        </div>
    )
};

export default LandingAutomation;