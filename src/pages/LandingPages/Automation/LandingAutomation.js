import React, {useEffect, useState} from "react";
import $ from 'jquery';

import './LandingAutomation.less';
import DocumentMeta from 'react-document-meta';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {stepsImages} from "../../../assets/img/landing-automation/steps";
import {Checkbox, Input, Modal, Radio, Rate, Select} from "antd";
import amazonSpnWhiteLogo from '../../../assets/img/amazon-spn-logo-white.png';
import exampleSoftImage from '../../../assets/img/landing-automation/example-soft.png';
import exampleAmazonImage from '../../../assets/img/landing-automation/example-amazon-screen.png';
import whiteWhale from '../../../assets/img/landing-automation/white-whale.png';
import pwStructureImage from '../../../assets/img/landing-automation/pw-structure.png';
import pwStructureMobImage from '../../../assets/img/landing-automation/pw-structure-mob.png';
import vitaliiAvatar from '../../../assets/img/landing-automation/vitalii-avatar.png';
import basketImage from '../../../assets/img/landing-automation/basket.png';
import {underHoodImages} from '../../../assets/img/landing-automation/under-hood';
import dataDrivenImage from '../../../assets/img/landing-automation/data-driven-image.png';
import contactFormImage from '../../../assets/img/landing-automation/contact-form-image.png';
import sendProcessingImage from '../../../assets/img/landing-automation/send-processing.svg';
import thankImage from '../../../assets/img/landing-automation/thank-image.png';
import {avatars} from '../../../assets/img/landing-automation/commentAvatars';
import {casesAvatars} from '../../../assets/img/landing-automation/casesAvatar';
import trustpilotLogo from '../../../assets/img/landing-automation/trustpilot-logo.svg';
import {Link} from "react-router-dom";
import {SVG} from "../../../utils/icons";
import CustomSelect from "../../../components/Select/Select";
import {userService} from "../../../services/user.services";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from 'axios';
import Slider from "react-slick";
import {notification} from "../../../components/Notification";
import TreeSelect from "../../../components/TreeSelect/TreeSelect";
import ContactForm from "../components/ContactForm/ContactForm";

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;

const Option = Select.Option;


const stepsSlider = [
    {
        title: `Easy to Master`,
        description: 'User-friendly design that makes easy to navigate your account so you’ll never miss out on what’s important.',
        userName: 'Stan Melrose',
        userMessage: `It was a new company for me... We have started form audit and detailed analysis of our niche. We spent some time to remake and prepare all needed campaigns. After the first 3 weeks, we have launched additional campaigns as SB / SD. <span>We were impressed</span> that our PPC campaigns could <span>work so well</span>. They <span>have improved</span> all our metrics and thanks to software+human control we start focusing on our business.`,
        caseLink: 'https://blog.profitwhales.com/studies/why-amazon-ppc-matters',
        img: stepsImages.slide1
    },
    {
        title: `Data-Driven Bidding <br/> Optimization`,
        description: 'Profit Whales uses proprietary machine learning and algorithm-regulated software. It has already processed over two million real-life Amazon account iterations. And now it is ready to serve your business.',
        userName: 'Alexey Ukhnalev',
        userMessage: `I dreamt about <span> PPC automation in several clicks </span> in an efficient way. In <span>Profit Whales</span> they make it happen. For those who tired of high ACOS, CPC and time spent optimizing AD groups.`,
        caseLink: 'https://blog.profitwhales.com/studies/table-tennis-equipment',
        img: stepsImages.slide2
    },
    {
        title: `Keyword Automation`,
        description: 'Harvesting good keywords for a PPC campaign is a daunting task. Profit Whales Automation takes care of that for you. And it keeps testing new ones for active campaigns to achieve optimal performance.',
        userName: 'Vasily Korobkin, Diving Equipment Brand, CEO',
        userMessage: `Finding a way into the top of page 1 results and directing major demand is <span> an art form of Profit Whales</span>. Our in-house Amazon marketing was adequate, but we needed some external knowledge to break the ice - the guys from Profit Whales are <span>real professionals</span> in regards not only to PPC optimization but also in the field of Amazon itself.`,
        caseLink: 'https://blog.profitwhales.com/studies/zero-to-hero',
        img: stepsImages.slide3
    },
    {
        title: `Interactive Dashboard`,
        description: 'Profit Whales provides a user-friendly dashboard that highlights the most important metrics of your Amazon business, as well as quick, 2-way control tools to stay on top of any situation and stay ahead of competition.',
        userName: 'Lighting Equipment Brand',
        userMessage: `We've decided to use Profit Whales Software because of its <span> user-friendly interface </span> and <span> ready-made full optimization</span>. There wasn’t anything that we have wanted that Profit Whales Team said couldn’t be done with their <span> Automation tool</span>. You indicate your business goal - and <span>the software performs changes by itself</span>.`,
        caseLink: 'https://blog.profitwhales.com/studies/lighting-equipment',
        img: stepsImages.slide4
    },
    {
        title: `Dedicated Account <br/> Manager`,
        description: 'Every customer is assigned a dedicated manager who is experienced in both Amazon Ads optimization and the clockworks of Profit Whales software.',
        userName: 'Ethan Cooper',
        userMessage: `<span>Amazing company</span>. Loved the <span>support</span> from these guys. They correctly built the structure for my advertising companies.<span>I am also impressed</span>  with their software. <span>Very easy to use</span> and you can set a strategy and not worry about the everyday work with advertising.`,
        caseLink: 'https://blog.profitwhales.com/studies/nutritional-supplements',
        img: stepsImages.slide5
    },
];

const commentsList = [
    {
        name: 'David Lang',
        rate: 5,
        comment: '“Great product. The automation features saves me a ton of time on PPC. I like the daily changelog so that I can see the updates and keep an eye on the AI.“'
    },
    {
        name: 'Steven Gregoire',
        rate: 5,
        comment: '“I signed up as a new customer with Profit Whales, and I am new to selling on Amazon. They have taken the time to share their experience and answer any newbie questions I have. They have taken the fear of selling on Amazon away. Straight forward and clear instructions! I recommend ProfitWhales to anyone selling on Amazon!“'
    },
    {
        name: 'Andrew Tomson',
        rate: 5,
        comment: '“This is a great company. The best PPC management ever. I was able to scale my e-commerce with them. Don\'t wait for immediate results. They have a strategy and vision moths ahead.“'

    },
    {
        name: 'Irakli',
        rate: 5,
        comment: '“I\'ve decided to use Profit Whales Software because of its user-friendly interface and ready-made full optimization. You indicate your business goal - and the software performs changes by itself. You can\'t even imagine how much time it saves me! I finally can launch new products and forgat about PPC Optimization using these crazy, unfriendly Bulk-files. That’s it. Easy and helpfull“'
    },
    {
        name: 'Mikhail Madaliev',
        rate: 5,
        comment: '“The guys from Profit Whales are real professionals in regards not only to PPC optimization but also in the field of Amazon itself. I had a great free consultation that helped me better to understand the following aspects: I could felt solid practical experience from their representative Vitaliy and can honehstly say that they do not only intend for their business expansion but at first care about their customers providing valuable support.“'
    },
    {
        name: 'Maxim Antonov',
        rate: 5,
        comment: '“Yes, very good company! They helped me a lot with advertising on Amazon and not only with advertising, there are practitioners working there who really know a lot about their business.“'
    },
    {
        name: 'Dmitriy Golubovskiy',
        rate: 5,
        comment: '“These guys are doing an amazing job, solved my problem with huge Acos. It took only 2-3 weeks for them to fully optimize all campaigns. I would like to mention separately communication level: wrote even in Sat/Sunday and got answers. Recommend!“'
    },
    {
        name: 'Ashot Tamrazyan',
        rate: 5,
        comment: '“Very responsive team! I am really satisfied with how they are working! So highly recommended them.! THX guys“'
    },
    {
        name: 'Corina Elena Damian',
        rate: 5,
        comment: '“I only have words of praise and I warmly recommend this software, but especially the person who has guided me and who does not get rid of me until I win £ 100,000 ,, Professional vitals, explains the steps in detail and has a lot of patience ,,,,,, for beginners on Amazon and not only recommend PROFIT WHALES“'
    },
    {
        name: 'Meet Patel',
        rate: 5,
        comment: '“It was an amazing experience working with Amzbizon, I was really lost in my PPC spending and ACOS, So I took the help of Amzbizon. We started our campaigns on the 21st of November With 48% Acos, With good Keyword targeting and well established and optimized Bulk operation Campaigns, We shoot down to 24.71% in just 12 days, It is a miracle, I wish I could share my Screenshot here. But they have really worked on my ACOS. Thank You so much.“'
    },
    {
        name: 'Emil Sirbu',
        rate: 5,
        comment: '“I highly recommend the services of these great guys. As their tool gives incredible results, that\'s obvious. I appreciated the attitude of this team for the client. We had a very humanized experience, where the money wasn\'t the first priority of our collaboration but customer satisfaction! Flexibility and promptness to any of my questions. I highly recommend!“'
    },
    {
        name: 'Andrey Kaminskiy',
        rate: 5,
        comment: '“The team behind the agency is doing an amazing job by consulting about how to grow the conversion rate and managing our Amazon Advertising campaigns. Their support team is incredibly responsible all day long. Highly recommend!“'
    },
    {
        name: 'Shtefan Vasilenyuk',
        rate: 5,
        comment: '“I am very satisfied with the work of these guys, they are the best of the PPC!“'
    },
    {
        name: 'MyNewLands Brand',
        rate: 5,
        comment: '“Working with Profit Whales is pure value. They added me over 3,000 in Ad sales on the next day. I love that Profit Whales focusing on all types of advertising like Sponsored Brands, Sponsored Display, and Sponsored Products. Highly recommended for those who are looking to double or even triple their business with Amazon Advertising.“'
    },
];


const meta = {
    title: 'Profit Whales Amazon PPC Software | Accelerate your Brand',
    description: 'Smart Automated Amazon Advertising Software for Brands to Kick-Start Amazon PPC Optimization with Programmatic Algorithms, Big Data & Data Science',
    meta: {
        charset: 'utf-8',
    }
};

const LandingAutomation = () => {
    const [visibleVideoWindow, switchWindow] = useState(false),
        [blogPosts, setBlogPosts] = useState([]),
        [activeSlide, setActiveSlide] = useState(0),
        [activeComment, setActiveComment] = useState(0);


    const scrollToTop = () => {
        $("html, body").animate({scrollTop: 0}, "slow");
    };

    const getLastBlogPosts = async () => {
        try {
            let posts = [];

            const getImage = async (url) => {
                const res = await axios.get(url);
                return res.data.guid.rendered;
            };

            const {data} = await userService.getBlogPosts();

            posts = data;

            posts = await Promise.all(posts.map(async (post) => {
                const image = await getImage(post._links['wp:featuredmedia'][0].href);
                return {
                    ...post,
                    image: image
                };
            }));


            setBlogPosts(posts);
        } catch (e) {
            console.log(e);
        }
    };

    //---------------------------------------
    //---------------------------------------

    useEffect(() => {
        getLastBlogPosts();

        //----------------------------------------------------------------------
        //----------------------------------------------------------------------
        $(window).scroll(function () {
            const scroll = $(window).scrollTop(),
                documentHeight = $(document).height(),
                windowHeight = $(window).height();

            if (scroll >= 400) {
                $(".scroll-to-top").addClass("visible");
            } else {
                $(".scroll-to-top").removeClass("visible");
            }

            if (scroll === documentHeight - windowHeight) {
                $(".scroll-to-top").addClass("focus");
            } else {
                $(".scroll-to-top").removeClass("focus");
            }
        });
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------

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


    return (
        <div className="landing-automation  landing-page">
            <DocumentMeta {...meta} />

            <Header/>

            <section className='first-section'>
                <img src={whiteWhale} alt="" className={'whale'}/>

                <div className='container'>
                    <h2 className={'desc'}>
                        Turn Ad Spend into Ad Investment to Accelerate <br/> your <span>Amazon Business Growth</span>.
                        <br/> Powered by Big Data & Data Science
                    </h2>

                    <h2 className={'mob'}>
                        <span>Accelerate your Amazon Business</span> with the help
                    </h2>


                    <a href={'#form'} className={'btn'}>
                        Let’s talk
                    </a>

                    <img src={amazonSpnWhiteLogo} alt="" className={'spn-logo'}/>

                    <img src={exampleSoftImage} alt="" className={'example-soft-image'}/>

                    <div className="row">
                        <div className="demo">
                            <Link to={'/book-a-demo'} className={''} target={'_blank'}>
                                <span>REQUEST</span>

                                <div className="icon">
                                    DEMO
                                </div>
                            </Link>
                        </div>

                        {/*<div>*/}
                        {/*    <div className="video-btn" onClick={() => switchWindow(true)}>*/}
                        {/*        <div className="pulse">*/}
                        {/*            <SVG id={'play-icon'}/>*/}

                        {/*            <div/>*/}
                        {/*        </div>*/}

                        {/*        <span>watch video</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="start">
                            <Link to={'/registration'}>
                                <div className="icon">
                                    start
                                </div>

                                <span>14-DAY TRIAL</span>
                            </Link>
                        </div>

                    </div>

                </div>
            </section>

            <section className={'top-amazon-platforms'}>
                <div className="container">
                    {/*<h2>*/}
                    {/*    Trusted by <span>TOP</span> brands on Amazon platform*/}
                    {/*</h2>*/}

                    {/*<div className="partner-logos">*/}
                    {/*    <img src={amazonLogo} alt=""/>*/}
                    {/*    <img src={amazonLogo} alt=""/>*/}
                    {/*    <img src={amazonLogo} alt=""/>*/}
                    {/*</div>*/}

                    <h2>
                        <span>Smart Bid</span> for every Ad position
                    </h2>

                    <p>
                        Stay ahead of the competition with our smart bidding technology that is based on 16+ metrics
                    </p>

                    <img src={exampleAmazonImage} alt="" className={'amazon-example'}/>

                    <h2>
                        <span> The customers will see you everywhere</span> <br/>
                        Programmatic Algorithms + Managed Service
                    </h2>

                    <img src={pwStructureImage} alt="" className={'pw-structure desc'}/>
                </div>

                <img src={pwStructureMobImage} alt="" className={'pw-structure mob'}/>
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

                        <a href={'#form'} className={'btn'}>
                            Let’s talk
                        </a>
                    </div>

                    <img src={vitaliiAvatar} alt=""/>
                </div>
            </section>

            <section className='achievements'>
                <div className="lines-w">
                    {[0, 1, 2].map(() => <div/>)}
                </div>

                <div className="lines-h">
                    {[0, 1, 2, 3].map(() => <div/>)}
                </div>

                <div className="container">
                    <div className={'total-revenue'}>
                        <div className="description">Total Amazon <br/> Revenue <br/> Optimized</div>
                        <div className="value">$240M</div>
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
            </section>

            <section className={'best-software'}>
                <div className="container">
                    <h2>
                        <span>The #1</span> Amazon Advertising software for <br/> your business
                    </h2>

                    <p className={'section-description'}>
                        Profit Whales is the platform that has everything you need to optimize your Amazon Business.
                    </p>


                    <div className="pw-slider desc">
                        <div className="dots">
                            {stepsSlider.map((item, index) => <div
                                className={`${activeSlide === index && 'active'}`}
                                onClick={() => setActiveSlide(index)}
                            />)}
                        </div>

                        <div className="list">
                            {stepsSlider.map((item, index) => (
                                <div
                                    onClick={() => setActiveSlide(index)}
                                    className={`${activeSlide === index && 'active'}`}
                                >
                                    <h4 dangerouslySetInnerHTML={{__html: item.title}}/>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>

                        <a href={'https://youtu.be/Xm9uKq9-7b0'} className={'demo-link'} target={'_blank'}>
                            <div className={'icon'}>
                                <SVG id={'play-icon'}/>
                            </div>

                            Watch product demo
                        </a>

                        <div className="image">
                            <img src={stepsSlider[activeSlide].img} alt=""/>
                        </div>

                        <div className="user-message">
                            <div className="avatar">
                                <img
                                    src={casesAvatars[activeSlide === 2 ? 'VasilyKorobkin' : stepsSlider[activeSlide].userName.replace(/ /g, "")]}
                                    alt=""/>
                            </div>

                            <div className="col">
                                <h5>{stepsSlider[activeSlide].userName}</h5>
                                <p dangerouslySetInnerHTML={{__html: stepsSlider[activeSlide].userMessage}}/>
                            </div>

                            <a href={stepsSlider[activeSlide].caseLink} className={'btn default'} target={'_blank'}>
                                Check My Case
                            </a>
                        </div>
                    </div>

                    <div className={'mob'}>
                        <Slider
                            dots={true}
                            infinite={true}
                            focusOnSelect={true}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            {stepsSlider.map((item, index) => (
                                <div className={'slider-item'}>
                                    <div className="image">
                                        <img src={item.img} alt=""/>
                                    </div>

                                    <div className="description">
                                        <h4 dangerouslySetInnerHTML={{__html: item.title}}/>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>

                        <a href={'https://youtu.be/Xm9uKq9-7b0'} className={'demo-link'} target={'_blank'}>
                            <div className={'icon'}>
                                <SVG id={'play-icon'}/>
                            </div>

                            Watch product demo
                        </a>
                    </div>
                </div>
            </section>

            <section className={'empower-business'}>
                <div className="container">
                    <h4>
                        Accelerate you <br/> Amazon Business
                    </h4>

                    <img src={basketImage} alt=""/>

                    <p>
                        Free Audit of your Amazon Ad Spend, see how you can get higher ROAS on your Ad Investments
                    </p>

                    <Link to={'/demo-call'} href={'#form'} className={'btn'}>
                        Get a free audit
                    </Link>
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

                                <a
                                    href={'https://intercom.help/profitwhales/en/articles/4164171-introduction-zero-to-hero-amazon-ppc-campaigns-creator'}
                                    target={'_blank'}>
                                    Learn more about Zero to Hero
                                    <SVG id={'right-row'}/>
                                </a>

                                <Link to={'/audit'} target={'_blank'} className={'btn default'}>BOOK A DEMO</Link>
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

                                <a
                                    href={'https://intercom.help/profitwhales/en/articles/4162147-zero-to-hero-zth-campaigns-structure'}
                                    target={'_blank'}>
                                    Learn more about structure
                                    <SVG id={'right-row'}/>
                                </a>
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

                                <a
                                    href={'https://intercom.help/profitwhales/en/articles/3766517-the-basics-of-profit-whales-algorithms'}
                                    target={'_blank'}>
                                    Learn more about algorithms
                                    <SVG id={'right-row'}/>
                                </a>
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

                                <a
                                    href={'https://intercom.help/profitwhales/en/articles/3763635-profit-whales-dashboard-navigation'}
                                    target={'_blank'}>
                                    Learn more about Dashboard
                                    <SVG id={'right-row'}/>
                                </a>
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

                                <a
                                    href={'https://intercom.help/profitwhales/en/articles/3815260-day-parting-tool'}
                                    target={'_blank'}>
                                    Learn more about Dayparting
                                    <SVG id={'right-row'}/>
                                </a>
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

                                <a href="#form" className={'btn default'}>Let’s talk</a>
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

            {/*<section className={'user-comments'}>*/}
            {/*    <div className="container">*/}
            {/*        <h2><span>Trusted</span> the world over</h2>*/}

            {/*        <div className="users">*/}
            {/*            <Slider*/}
            {/*                dots={false}*/}
            {/*                infinite={true}*/}
            {/*                focusOnSelect={true}*/}
            {/*                speed={500}*/}
            {/*                slidesToShow={3}*/}
            {/*                slidesToScroll={1}*/}
            {/*                afterChange={(index) => {*/}
            {/*                    setActiveComment(index)*/}
            {/*                }}*/}
            {/*                responsive={[*/}
            {/*                    {*/}
            {/*                        breakpoint: 800,*/}
            {/*                        settings: {*/}
            {/*                            slidesToShow: 2,*/}
            {/*                        }*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        breakpoint: 600,*/}
            {/*                        settings: {*/}
            {/*                            slidesToShow: 1,*/}
            {/*                            slidesToScroll: 1,*/}
            {/*                        }*/}
            {/*                    }*/}
            {/*                ]}*/}

            {/*            >*/}
            {/*                {commentsList.map((item, index) => (*/}
            {/*                    <div className="user">*/}
            {/*                        <div className="avatar">*/}
            {/*                            {index === 2 ?*/}
            {/*                                <SVG id='account'/>*/}
            {/*                                :*/}
            {/*                                <img src={avatars[item.name.replace(/ /g, "")]} alt=""/>*/}
            {/*                            }*/}
            {/*                        </div>*/}

            {/*                        <h4 className={index === activeComment && 'active-user'}>{item.name}</h4>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </Slider>*/}

            {/*            <div className="slider desc">*/}
            {/*                <div className="bar"/>*/}
            {/*            </div>*/}
            {/*            <div className="slider mob">*/}
            {/*                <div className="bar" style={{marginLeft: `${7.14 * activeComment}%`}}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="comment">*/}
            {/*            <div className="row">*/}
            {/*                <p className="comment-text">*/}
            {/*                    {commentsList[activeComment].comment}*/}
            {/*                </p>*/}

            {/*                <div className="stars">*/}
            {/*                    <Rate disabled value={commentsList[activeComment].rate}/>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <a href={'#form'} className={'btn default'}>*/}
            {/*                contact us*/}
            {/*            </a>*/}
            {/*        </div>*/}

            {/*        <div className="trustpilot-block">*/}
            {/*            <h3>*/}
            {/*                Don’t take our word for it*/}
            {/*            </h3>*/}

            {/*            <p>*/}
            {/*                Check our customer reviews on Trustpilot!*/}
            {/*            </p>*/}

            {/*            <a href="https://www.trustpilot.com/review/profitwhales.com" target={'_blank'}*/}
            {/*               className={'btn'}>*/}
            {/*                <img src={trustpilotLogo} alt=""/>*/}

            {/*                Trustpilot*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className={'new-blog-posts'}>
                <div className="container">
                    <h2>What’s new at our <span>BLOG</span></h2>

                    <div className="posts desc">
                        <div className="post">
                            <div className="image">
                                <img
                                    src={'https://blog.profitwhales.com/wp-content/uploads/2020/08/Actionable-Amazon-PPC-Checklist.png'}
                                    alt=""/>
                            </div>

                            <h4>Actionable Amazon PPC Checklist For Amazon Sellers</h4>

                            <a href='https://blog.profitwhales.com/amazon-ppc-checklist' className={'btn default'}
                               target={'_blank'}>
                                learn more
                            </a>
                        </div>

                        <div className="post">
                            <div className="image">
                                <img
                                    src={'https://blog.profitwhales.com/wp-content/uploads/2020/08/amazon-keyword-generator.png'}
                                    alt=""/>
                            </div>

                            <h4>Zero to Hero Release: create ready-to-go Amazon PPC campaigns</h4>

                            <a href='https://blog.profitwhales.com/amazon-ppc-campaign-structure'
                               className={'btn default'} target={'_blank'}>
                                learn more
                            </a>
                        </div>

                        <div className="post">
                            <div className="image">
                                <img src={'https://blog.profitwhales.com/wp-content/uploads/2020/07/acos-vs-macos.png'}
                                     alt=""/>
                            </div>

                            <h4>What is Amazon ACoS? What is MACoS?</h4>

                            <a href='https://blog.profitwhales.com/amazon-acos' className={'btn default'}
                               target={'_blank'}>
                                learn more
                            </a>
                        </div>

                    </div>

                    <div className="posts mob">
                        <Slider
                            dots={true}
                            infinite={true}
                            arrows={false}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}

                        >
                            <div className="post">
                                <div className="image">
                                    <img
                                        src={'https://blog.profitwhales.com/wp-content/uploads/2020/08/Actionable-Amazon-PPC-Checklist.png'}
                                        alt=""/>
                                </div>

                                <h4>Actionable Amazon PPC Checklist For Amazon Sellers</h4>

                                <a href='https://blog.profitwhales.com/amazon-ppc-checklist' className={'btn default'}
                                   target={'_blank'}>
                                    learn more
                                </a>
                            </div>

                            <div className="post">
                                <div className="image">
                                    <img
                                        src={'https://blog.profitwhales.com/wp-content/uploads/2020/08/amazon-keyword-generator.png'}
                                        alt=""/>
                                </div>

                                <h4>Zero to Hero Release: create ready-to-go Amazon PPC campaigns</h4>

                                <a href='https://blog.profitwhales.com/amazon-ppc-campaign-structure'
                                   className={'btn default'} target={'_blank'}>
                                    learn more
                                </a>
                            </div>

                            <div className="post">
                                <div className="image">
                                    <img src={'https://blog.profitwhales.com/wp-content/uploads/2020/07/acos-vs-macos.png'}
                                         alt=""/>
                                </div>

                                <h4>What is Amazon ACoS? What is MACoS?</h4>

                                <a href='https://blog.profitwhales.com/amazon-acos' className={'btn default'}
                                   target={'_blank'}>
                                    learn more
                                </a>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

            <ContactForm/>

            <button className={'scroll-to-top'} onClick={scrollToTop}>
                <svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.41421 13.5858C0.633166 14.3668 0.633165 15.6332 1.41421 16.4142L3.27329 18.2733C4.05433 19.0543 5.32066 19.0543 6.10171 18.2733L13.5858 10.7892C14.3668 10.0082 15.6332 10.0082 16.4142 10.7892L23.8983 18.2733C24.6793 19.0543 25.9457 19.0543 26.7267 18.2733L28.5858 16.4142C29.3668 15.6332 29.3668 14.3668 28.5858 13.5858L16.4142 1.41421C15.6332 0.633166 14.3668 0.633165 13.5858 1.41421L1.41421 13.5858Z"
                        fill="white"/>
                </svg>
            </button>

            <Footer/>

            <Modal
                className={'video-modal-window'}
                wrapClassName={'video-modal-window-wrap'}
                visible={visibleVideoWindow}
                onCancel={() => switchWindow(false)}
                footer={false}
                destroyOnClose={true}
            >
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/m608kntHUzU" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </Modal>

        </div>
    )
};


export default LandingAutomation;
