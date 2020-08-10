import React, {Fragment, useEffect, useState} from "react";
import $ from 'jquery';

import './LandingAutomation.less';

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {stepsImages} from "../../../assets/img/landing-automation/steps";
import {Checkbox, Input, Modal, Radio, Rate, Select, Spin} from "antd";
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
import {avatars} from '../../../assets/img/landing-automation/avatars/avatars'
import trustpilotLogo from '../../../assets/img/landing-automation/Trustpilot-logo.png';
import {Link} from "react-router-dom";
import {SVG} from "../../../utils/icons";
import CustomSelect from "../../../components/Select/Select";
import {userService} from "../../../services/user.services";

import axios from 'axios';
import InputCurrency from "../../../components/Inputs/InputCurrency";

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;

const Option = Select.Option;

const advertisingStrategyVariations = [
    {
        label: 'ACoS Targeting',
        value: 'acos_targeting',
        icon: 'acos-targeting',
        fill: 'EC7F5C',
        sales: 3,
        acos: 1
    },
    {
        label: 'Overall Profit Growth',
        value: 'overall_profit_growth',
        icon: 'overall-profit-growth',
        fill: '6D6DF6',
        sales: 4,
        acos: 3
    },
    {
        label: 'PPC Profit Growth',
        value: 'ppc_profit_growth',
        icon: 'ppc-profit-growth',
        fill: '83FED0',
        sales: 4,
        acos: 2

    },
    {
        label: 'Product Launch',
        value: 'product_launch',
        icon: 'product-launch',
        fill: 'F0B849',
        sales: 3,
        acos: 5

    },
    {
        label: 'New Keywords Ranking',
        value: 'new_keywords_ranking',
        icon: 'new-keywords-ranking',
        fill: '5BEBF3',
        sales: 3,
        acos: 4

    },
    {
        label: 'Get Best Seller Tag',
        value: 'get_best_seller_tag',
        icon: 'get-best-seller-tag',
        fill: 'EC7F5C',
        sales: 5,
        acos: 5

    },
    {
        label: 'Defend Best Seller Tag',
        value: 'defend_best_seller_tag',
        icon: 'defend-best-seller-tag',
        fill: '6D6DF6',
        sales: 5,
        acos: 5
    },
    {
        label: 'Low Inventory HPLS',
        value: 'low_inventory_hpls',
        icon: 'low-inventory-hpls',
        fill: '83FED0',
        sales: 2,
        acos: 1

    },
]


const stepsSlider = [
    {
        title: `Easy to Master`,
        description: 'User-friendly design that makes easy to navigate your account so you’ll never miss out on what’s important.',
        userName: 'Stan Melrose',
        userMessage: 'It was a new company for me... We have started form audit and detailed analysis of our niche. We spent some time to remake and prepare all needed campaigns. After the first 3 weeks, we have launched additional campaigns as SB / SD. We were impressed that our PPC campaigns could work so well. They have improved all our metrics and thanks to software+human control we start focusing on our business.',
        userAvatar: avatars.AndreyKaminskiy,
        caseLink: '',
        img: stepsImages.slide1
    },
    {
        title: `Data-Driven Bidding <br/> Optimization`,
        description: 'Profit Whales uses proprietary machine learning and algorithm-regulated software. It has already processed over two million real-life Amazon account iterations. And now it is ready to serve your business.',
        userName: 'Alexey Ukhnalev',
        userMessage: 'I dreamt about PPC automation in several clicks in an efficient way. In Profit Whales they make it happen. For those who tired of high ACOS, CPC and time spent optimizing AD groups.',
        userAvatar: avatars.AndreyKaminskiy,
        caseLink: '',
        img: stepsImages.slide2
    },
    {
        title: `Keyword Automation`,
        description: 'Harvesting good keywords for a PPC campaign is a daunting task. Profit Whales Automation takes care of that for you. And it keeps testing new ones for active campaigns to achieve optimal performance.',
        userName: 'Vasily Korobkin, Divelux, CEO',
        userMessage: 'Finding a way into the top of page 1 results and directing major demand is an art form of Profit Whales. Our in-house Amazon marketing was adequate, but we needed some external knowledge to break the ice - the guys from Profit Whales are real professionals in regards not only to PPC optimization but also in the field of Amazon itself.',
        userAvatar: avatars.AndreyKaminskiy,
        caseLink: '',
        img: stepsImages.slide3
    },
    {
        title: `Interactive Dashboard`,
        description: 'Profit Whales provides a user-friendly dashboard that highlights the most important metrics of your Amazon business, as well as quick, 2-way control tools to stay on top of any situation and stay ahead of competition.',
        userName: 'Lighting Equipment Brand',
        userMessage: 'We\'ve decided to use Profit Whales Software because of its user-friendly interface and ready-made full optimization. There wasn’t anything that we have wanted that Profit Whales Team said couldn’t be done with their Automation tool. You indicate your business goal - and the software performs changes by itself.',
        userAvatar: avatars.AndreyKaminskiy,
        caseLink: '',
        img: stepsImages.slide4
    },
    {
        title: `Dedicated Account <br/> Manager`,
        description: 'Every customer is assigned a dedicated manager who is experienced in both Amazon Ads optimization and the clockworks of Profit Whales software.',
        userName: 'Ethan Cooper',
        userMessage: 'Amazing company. Loved the support from these guys. They correctly built the structure for my advertising companies. I am also impressed with their software. Very easy to use and you can set a strategy and not worry about the everyday work with advertising.',
        userAvatar: avatars.AndreyKaminskiy,
        caseLink: '',
        img: stepsImages.slide5
    },
];

const commentsList = [
    {
        name: 'Corina Elena Damian',
        avatar: avatars.AndreyKaminskiy,
        position: 'Corina Elena Damian',
        rate: 5,
        comment: '“ I only have words of praise and I warmly recommend this software, but especially the person who has guided me and who does not get rid of me until I win £100,000. Professional vitals, explains the steps in detail and has a lot of patience! For beginners on Amazon and not only recommend PROFIT WHALES! “'
    },
    {
        name: 'Corina Elena Damian',
        avatar: avatars.AndreyKaminskiy,
        position: 'Corina Elena Damian',
        rate: 4,
        comment: '“ I only have words of praise and I warmly recommend this software, but especially the person who has guided me and who does not get rid of me until I win £100,000. Professional vitals, explains the steps in detail and has a lot of patience! For beginners on Amazon and not only recommend PROFIT WHALES! “'
    },
    {
        name: 'Corina Elena Damian',
        avatar: avatars.AndreyKaminskiy,
        position: 'Corina Elena Damian',
        rate: 3,
        comment: '“ I only have words of praise and I warmly recommend this software, but especially the person who has guided me and who does not get rid of me until I win £100,000. Professional vitals, explains the steps in detail and has a lot of patience! For beginners on Amazon and not only recommend PROFIT WHALES! “'
    },
];


const LandingAutomation = () => {
    const [visibleVideoWindow, switchWindow] = useState(false),
        [contactFormParams, setContactFormParams] = useState({}),
        [blogPosts, setBlogPosts] = useState([]),
        [activeSlide, setActiveSlide] = useState(0),
        [activeComment, setActiveComment] = useState(0);

    const changeContactFormHandler = (name, value) => {
        setContactFormParams({
            ...contactFormParams,
            [name]: value
        })
    };

    const submitFormHandler = (e) => {
        e.preventDefault();

        console.log(contactFormParams);
    };

    const scrollToForm = () => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#form").offset().top
        }, 1000);
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
            <Header/>

            <section className='first-section'>
                <img src={whiteWhale} alt="" className={'whale'}/>

                <div className='container'>
                    <h2>
                        Accelerate your <span>Amazon Business</span> with the help <br/>
                        of advanced decision-making technologies using <br/>
                        <span>Big Data & Data Science</span>
                    </h2>

                    <button className={'btn'} onClick={scrollToForm}>
                        Let’s talk
                    </button>

                    <img src={amazonSpnWhiteLogo} alt="" className={'spn-logo'}/>

                    <img src={exampleSoftImage} alt="" className={'example-soft-image'}/>

                    <div className="row">
                        <Link to={'/demo-call'} className={'demo'} target={'_blank'}>
                            REQUEST

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
                        <span> The customers will see you everywhere</span> <br/>
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

                        <button className={'btn'} onClick={scrollToForm}>
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


                    <div className="slider">
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

                        <Link to={'/demo-call'} className={'demo-link'} target={'_blank'}>

                            <div className={'icon'}>
                                <SVG id={'play-icon'}/>
                            </div>

                            Watch product demo
                        </Link>

                        <div className="image">
                            <img src={stepsSlider[activeSlide].img} alt=""/>
                        </div>

                        <div className="user-message">
                            <div className="avatar">
                                <img src={stepsSlider[activeSlide].userAvatar} alt=""/>
                            </div>

                            <div className="col">
                                <h5>{stepsSlider[activeSlide].userName}</h5>
                                <p>{stepsSlider[activeSlide].userMessage}</p>
                            </div>

                            <Link to={stepsSlider[activeSlide].caseLink} className={'btn default'} target={'_blank'}>
                                Check My Case
                            </Link>
                        </div>
                    </div>
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

                    <button className={'btn'} onClick={scrollToForm}>
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

                                <Link to={'/'} target={'_blank'}>Learn more about Zero to Hero <SVG
                                    id={'right-row'}/></Link>
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

                                <Link to={'/'} target={'_blank'}>Learn more about our structure <SVG id={'right-row'}/></Link>
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

                                <Link to={'/'} target={'_blank'}>Learn more about our algorithms <SVG id={'right-row'}/></Link>
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

                                <Link to={'/'} target={'_blank'}>Learn more about our Dashboard <SVG id={'right-row'}/></Link>
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

                                <Link to={'/'} target={'_blank'}>Learn more about Dayparting <SVG
                                    id={'right-row'}/></Link>
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

            <section className={'user-comments'}>
                <div className="container">
                    <h2><span>Trusted</span> the world over</h2>

                    <div className="users">
                        {commentsList.map((user, index) => (
                            <div className="user" onClick={() => setActiveComment(index)}>
                                <div className="avatar">
                                    <img src={user.avatar} alt=""/>
                                </div>

                                <div className="col">
                                    <h4>{user.name}</h4>
                                    <p>{user.position}</p>
                                </div>
                            </div>
                        ))}

                        <input
                            type="radio"
                            name="slideItem"
                            id={`slide-item-1`}
                            className="slide-toggle"
                            checked={activeComment === 0}
                        />

                        <input
                            type="radio"
                            name="slideItem"
                            id={`slide-item-2`}
                            className="slide-toggle"
                            checked={activeComment === 1}
                        />


                        <input
                            type="radio"
                            name="slideItem"
                            id={`slide-item-3`}
                            className="slide-toggle"
                            checked={activeComment === 2}
                        />

                        <div className="slider">
                            <div className="bar"/>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="row">
                            <p className="comment-text">
                                {commentsList[activeComment].comment}
                            </p>

                            <div className="stars">
                                <Rate disabled value={commentsList[activeComment].rate}/>
                            </div>
                        </div>

                        <button className={'btn default'}>
                            contact us
                        </button>
                    </div>

                    <div className="trustpilot-block">
                        <h3>
                            Don’t take our word for it
                        </h3>

                        <p>
                            Check our customer reviews on Trustpilot!
                        </p>

                        <button className={'btn'}>
                            <a href="" target={'_blank'}>
                                <img src={trustpilotLogo} alt=""/>
                            </a>
                        </button>
                    </div>
                </div>

            </section>

            <section className={'new-blog-posts'}>
                <div className="container">
                    <h2>What’s new at our <span>BLOG</span></h2>

                    <div className="posts">
                        {blogPosts.map(post => (
                            <div className="post">
                                <div className="image">
                                    <img src={post.image} alt=""/>
                                </div>

                                <h4>
                                    {post.title.rendered}
                                </h4>

                                <a href={post.link} className={'btn default'} target={'_blank'}>
                                    learn more
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={'contact-form'} id={'form'}>
                <div className="container">
                    <img src={contactFormImage} alt=""/>

                    <form action="" onSubmit={submitFormHandler}>
                        <h3>Talk With Our Experts</h3>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <Input
                                    type="text"
                                    placeholder={'First Name'}
                                    onChange={({target: {value}}) => changeContactFormHandler('first_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <Input
                                    type="text"
                                    placeholder={'Last Name'}
                                    onChange={({target: {value}}) => changeContactFormHandler('last_name', value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <Input
                                type="email"
                                placeholder={'E-mail'}
                                onChange={({target: {value}}) => changeContactFormHandler('email', value)}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Average Monthly Sales</label>

                                <CustomSelect
                                    placeholder={'Select by'}
                                    onChange={(value) => changeContactFormHandler('monthly_sales', value)}
                                >
                                    <Option value={'below 50k'}>below 50k</Option>
                                    <Option value={'50-200k'}>50-200k</Option>
                                    <Option value={'200k-1m'}>200k-1m</Option>
                                    <Option value={'over 1m'}>over 1m</Option>
                                </CustomSelect>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Average Monthly Ad Spend</label>
                                <CustomSelect
                                    placeholder={'Select by'}
                                    onChange={(value) => changeContactFormHandler('monthly_ad_spend', value)}
                                >
                                    <Option value={'below 10k'}>below 10k</Option>
                                    <Option value={'10-30k'}>10-30k</Option>
                                    <Option value={'30-60k'}>30-60k</Option>
                                    <Option value={'60-100k'}>60-100k</Option>
                                    <Option value={'no ads'}>no ads</Option>
                                </CustomSelect>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Do you have brand registry?</label>

                                <Radio.Group defaultValue={'yes'} onChange={(e) => changeContactFormHandler('brand_registry', e.target.value)}>
                                    <Radio value={'yes'}>
                                        Yes
                                    </Radio>

                                    <Radio value={'no'}>
                                        No
                                    </Radio>
                                </Radio.Group>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">What is your main goal?</label>

                                <CustomSelect
                                    placeholder={'Select by'}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    onChange={(value) => changeContactFormHandler('main_goal', value)}
                                >
                                    {advertisingStrategyVariations.map(item => (
                                        <Option value={item.value}>
                                            <i style={{fill: `#${item.fill}`}}>
                                                <SVG id={item.icon}/>
                                            </i>
                                            {item.label}
                                        </Option>
                                    ))}
                                </CustomSelect>

                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Enter your Storefront Name</label>
                                <Input
                                    type="text"
                                    placeholder={'Enter your Storefront Name'}
                                    onChange={({target: {value}}) => changeContactFormHandler('storefront_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Enter your main category</label>
                                <Input
                                    type="text"
                                    placeholder={' Enter your main category'}
                                    onChange={({target: {value}}) => changeContactFormHandler('main_category', value)}
                                />
                            </div>
                        </div>

                        <Checkbox required>
                            Yes, I agree to Profit Whales <Link to={'/terms-and-conditions'} target={'_blank'}>Terms and
                            Conditions</Link> & <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                        </Checkbox>

                        <button className={'btn'}>
                            Request Demo
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
                        allowFullScreen/>
            </Modal>

        </div>
    )
};

export default LandingAutomation;
