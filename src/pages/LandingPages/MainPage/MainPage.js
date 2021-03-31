import React, {useEffect, useState} from "react"
import './MainPage.less'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

import videoBg from '../../../assets/img/landing-mainPage/video-bg.mp4'
import videoBgMob from '../../../assets/img/landing-mainPage/video-bg_mob.mp4'
import {Link} from "react-router-dom"
import {Collapse} from 'antd'
import mapImage from '../../../assets/img/landing-mainPage/map.png'
import blogImage1 from '../../../assets/img/landing-mainPage/blog-1.png'
import blogImage2 from '../../../assets/img/landing-mainPage/blog-2.png'
import blogImage3 from '../../../assets/img/landing-mainPage/blog-3.png'
import blogImage4 from '../../../assets/img/landing-mainPage/blog-4.png'
import $ from 'jquery'

const {Panel} = Collapse

const sliderData = [
    {
        title: 'David Lang',
        text: 'Great product. The automation features saves me a ton of time on PPC. I like the daily changelog so that I can see the updates and keep an eye on the AI.'
    },
    {
        title: 'Steven Gregoire',
        text: 'I signed up as a new customer with Profit Whales, and I am new to selling on Amazon. They have taken the time to share their experience and answer any newbie questions I have. They have taken the fear of selling on Amazon away. Straight forward and clear instructions! I recommend ProfitWhales to anyone selling on Amazon!'
    },
    {
        title: 'Andrew Tomson',
        text: 'This is a great company. The best PPC management ever. I was able to scale my e-commerce with them. Don\'t wait for immediate results. They have a strategy and vision moths ahead.'
    },
    {
        title: 'Irakli',
        text: 'I\'ve decided to use Profit Whales Software because of its user-friendly interface and ready-made full optimization. You indicate your business goal - and the software performs changes by itself. You can\'t even imagine how much time it saves me! I finally can launch new products and forgat about PPC Optimization using these crazy, unfriendly Bulk-files. That’s it. Easy and helpfull'
    },
    {
        title: 'Corina Elena Damian',
        text: 'I only have words of praise and I warmly recommend this software, but especially the person who has guided me and who does not get rid of me until I win £ 100,000 ,, Professional vitals, explains the steps in detail and has a lot of patience ,,,,,, for beginners on Amazon and not only recommend PROFIT WHALES'
    },
    {
        title: 'Mikhail Madaliev',
        text: 'The guys from Profit Whales are real professionals in regards not only to PPC optimization but also in the field of Amazon itself. I had a great free consultation that helped me better to understand the following aspects:\n' +
            'I could felt solid practical experience from their representative Vitaliy and can honehstly say that they do not only intend for their business expansion but at first care about their customers providing valuable support.'
    },
    {
        title: 'Maxim Antonov',
        text: 'Yes, very good company! They helped me a lot with advertising on Amazon and not only with advertising, there are practitioners working there who really know a lot about their business.'
    },
    {
        title: 'Dmitriy Golubovskiy',
        text: 'These guys are doing an amazing job, solved my problem with huge Acos. It took only 2-3 weeks for them to fully optimize all campaigns. I would like to mention separately communication level: wrote even in Sat/Sunday and got answers. Recommend!'
    },
    {
        title: 'Ashot Tamrazyan',
        text: 'Very responsive team! I am really satisfied with how they are working! So highly recommended them.! THX guys'
    },
    {
        title: 'Meet Patel',
        text: 'It was an amazing experience working with Amzbizon, I was really lost in my PPC spending and ACOS, So I took the help of Amzbizon. We started our campaigns on the 21st of November With 48% Acos, With good Keyword targeting and well established and optimized Bulk operation Campaigns, We shoot down to 24.71% in just 12 days, It is a miracle, I wish I could share my Screenshot here. But they have really worked on my ACOS. Thank You so much.'
    },
    {
        title: 'Emil Sirbu',
        text: 'I highly recommend the services of these great guys. As their tool gives incredible results, that\'s obvious. I appreciated the attitude of this team for the client. We had a very humanized experience, where the money wasn\'t the first priority of our collaboration but customer satisfaction! Flexibility and promptness to any of my questions. I highly recommend!'
    },
    {
        title: 'Andrey Kaminskiy',
        text: 'The team behind the agency is doing an amazing job by consulting about how to grow the conversion rate and managing our Amazon Advertising campaigns. Their support team is incredibly responsible all day long. Highly recommend!'
    },
    {
        title: 'Shtefan Vasilenyuk',
        text: 'I am very satisfied with the work of these guys, they are the best of the PPC!'
    },
    {
        title: 'MyNewLands Brand',
        text: 'Working with Profit Whales is pure value. They added me over 3,000 in Ad sales on the next day. I love that Profit Whales focusing on all types of advertising like Sponsored Brands, Sponsored Display, and Sponsored Products. Highly recommended for those who are looking to double or even triple their business with Amazon Advertising.'
    },
]

const MainPage = () => {
    const [activeSlide, setActiveSlide] = useState(0),
        [visibleMapDetails, setVisibleMapDetails] = useState(false)

    const goToNextSlide = () => {
        const slides = document.querySelectorAll('.slider > ul > li')

        let index = activeSlide + 1

        if (activeSlide === slides.length - 1) {
            slides[slides.length - 1].style.transform = 'translateX(-150px)'
            slides[0].style.transform = 'translateX(150px)'
        } else {
            slides.forEach((item, i) => {
                if (i < index) item.style.transform = 'translateX(-150px)'
                else item.style.transform = 'translateX(150px)'
            })
        }

        setTimeout(() => {
            setActiveSlide(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
        }, 100)
    }

    const goToPrevSlide = () => {
        const slides = document.querySelectorAll('.slider > ul > li')

        let index = activeSlide - 1

        if (activeSlide === 0) {
            slides[slides.length - 1].style.transform = 'translateX(-150px)'
            slides[0].style.transform = 'translateX(150px)'

        } else {
            slides.forEach((item, i) => {
                if (i <= index) item.style.transform = 'translateX(-150px)'
                else item.style.transform = 'translateX(150px)'
            })
        }

        setTimeout(() => {
            setActiveSlide(prevState => prevState === 0 ? slides.length - 1 : prevState - 1)
        }, 100)
    }


    const onScroll = () => {
        const scroll = document.documentElement.scrollTop,
            $header = document.querySelector('.header-block')

        if (scroll > 200) {
            $header.classList.remove("transparent")
        } else {
            $header.classList.add("transparent")
        }
    }

    const mouseenterListener = () => {
        const $header = document.querySelector('.header-block')

        $header.classList.remove("transparent")
    }

    const mouseleaveListener = () => {
        const $header = document.querySelector('.header-block')

        const scroll = window.pageYOffset

        if (scroll < 200) {
            $header.classList.add("transparent")
        }
    }

    useEffect(() => {
        const $header = document.querySelector('.header-block')

        if($(window).width() < 800) {
            $header.classList.remove("transparent")
        } else {
            window.addEventListener('scroll', onScroll)
            $header.addEventListener("mouseenter", mouseenterListener, false)
            $header.addEventListener("mouseleave", mouseleaveListener, false)
        }

        return (() => {
            window.removeEventListener('scroll', onScroll)
            $header.removeEventListener("mouseenter", mouseenterListener, false)
            $header.removeEventListener("mouseleave", mouseleaveListener, false)
        })
    }, [])

    $(window).on('resize', function () {
        $('.header-block').removeClass('transparent', $(window).width() < 800);
    });

    return (<div className="landing-page main-page">
        <Header
            className={'transparent'}
        />

        <section className="pre-header">
            <video
                className="block-video-container desk"
                autoPlay={true}
                controls={false}
                loop={true}
                muted={true}
            >
                <source src={videoBg} type="video/mp4"/>
            </video>

            <video
                className="block-video-container mob"
                autoPlay={true}
                controls={false}
                loop={true}
                muted={true}
                playsinline
            >
                <source src={videoBgMob} type="video/mp4"/>
            </video>

            <div className="container">
                <h2>
                    <span>Turn Ad Spend</span> into Ad Investment
                </h2>

                <p>
                    to Accelerate your Amazon Business Growth
                </p>

                <Link to={'/contact-us'} className={'btn green'}>
                    contact us
                </Link>
            </div>
        </section>

        <section className="services">
            <div className="container">
                <div className="col">
                    <h2>
                        Our services
                    </h2>

                    <p>
                        Enchange your performance with innovative performance <br/>
                        approach that accelerates businesses and helps brands to <br/>
                        become Whales in their Ocean
                    </p>
                </div>

                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    accordion
                    className="col services-list"
                >
                    <Panel header="Identify your option" key="1">
                        <p>
                            Define the perfect path to accelerate your business:
                        </p>

                        <ul>
                            <li><Link
                                target={'_blank'}
                                to={'/identify-option/profits'}
                            >
                                Accelerate Profits
                            </Link></li>
                            <li><Link
                                target={'_blank'}
                                to={'/identify-option/marketplace_potential'}
                            >
                                Accelerate your Marketplace Potential
                            </Link></li>
                            <li><Link
                                target={'_blank'}
                                to={'/identify-option/total_sales_growth'}
                            >
                                Accelerate Total Sales Growth
                            </Link>
                            </li>
                            <li><Link
                                target={'_blank'}
                                to={'/identify-option/brand_awareness'}
                            >
                                Accelerate Brand Awareness
                            </Link></li>
                        </ul>

                        <Link to={'/identify-option'} className="btn default">
                            read more
                        </Link>
                    </Panel>
                    <Panel header="Enlighten your future" key="2">
                        <p>
                            Boost your business activity by unique knolwedge and deep diving into the e-commerce
                            sphere
                        </p>

                        <Link to={'/enlighten-future'} className="btn default">
                            read more
                        </Link>
                    </Panel>
                    <Panel header="Redefine your approach" key="3">
                        <p>
                            Introduce innovations into your business activities by the improvement of processes
                            and advertisement focus
                        </p>

                        <Link to={'/redefine-approach'} className="btn default">
                            read more
                        </Link>
                    </Panel>
                </Collapse>
            </div>
        </section>

        <section className={'statistic'}>
            <div className="container">
                <h2>
                    <span>The numbers</span> speak for themselves
                </h2>

                <ul>
                    <li>
                        <div className="value">150M+</div>
                        <p>Revenue Managed</p>
                    </li>
                    <li>
                        <div className="value">10M+</div>
                        <p>Monthly Bid Changes</p>
                    </li>
                    <li>
                        <div className="value">5M+</div>
                        <p>Units Ordered</p>
                    </li>
                    <li>
                        <div className="value">43%</div>
                        <p>Average Sales Boost</p>
                    </li>
                    <li>
                        <div className="value">1000+</div>
                        <p>Unique SKU Managed</p>
                    </li>
                </ul>
            </div>
        </section>

        <section className="clients">
            <div className="container">
                <h2>
                    Our clients <span>around the world</span>
                </h2>

                <p>
                    Profit Whales collaborates with companies from differnt regions, markets, niches to assist
                    businesses to grow, achieve the most couragious goals, and win the market
                </p>

                <div className="map">
                    <img src={mapImage} alt=""/>

                    <div className={`row ${visibleMapDetails ? 'visible' : ''}`}>
                        <div className="col">
                            <ul>
                                <li className={'title'}>North America</li>
                                <li>Canada</li>
                                <li>Mexico</li>
                                <li>Mexico</li>
                            </ul>

                            <ul>
                                <li className={'title'}>South America</li>
                                <li>Argentina</li>
                                <li>Brasil</li>
                            </ul>

                            <ul>
                                <li className={'title'}>Asia</li>
                                <li>Azerbaijan</li>
                                <li>China</li>
                                <li>India</li>
                                <li>Kazakhstan</li>
                                <li>Saudi Arabia</li>
                                <li>Singapore</li>
                                <li>UAE</li>
                            </ul>

                            <ul>
                                <li className={'title'}>Australia</li>
                                <li>Australia</li>
                            </ul>
                        </div>

                        <div className="col">
                            <ul>
                                <li className={'title'}>europe</li>
                                <li>Austria</li>
                                <li>Belarus</li>
                                <li>Estonia</li>
                                <li>Finland</li>
                                <li>France</li>
                                <li>Germany</li>
                                <li>Lithuania</li>
                                <li>Romania</li>
                                <li>Russia</li>
                                <li>Spain</li>
                                <li>Ukraine</li>
                                <li>United Kingdom</li>
                            </ul>

                            <ul>
                                <li className={'title'}>africa</li>
                                <li>Algeria</li>
                                <li>Egypt</li>
                                <li>Equatorial Guinea</li>
                                <li>Morocco</li>
                                <li>South Africa</li>
                            </ul>
                        </div>
                    </div>

                    <button className={`btn white mob ${visibleMapDetails ? 'open' : ''}`} onClick={() => setVisibleMapDetails(prevState => !prevState)}>
                       {!visibleMapDetails ?  'show more' : 'show less'}
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="14">
                                <rect width="14" height="10" transform="matrix(0 1 1 0 0 0)" fill="#C4C4C4"/>
                            </mask>
                            <g mask="url(#mask0)">
                                <path d="M1 9.25012L5 13.0001M5 13.0001L9 9.25012M5 13.0001L5 1.00012" stroke="#6D6DF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <section className="insights">
            <div className="container">
                <div className="col">
                    <h2>Insights</h2>

                    <p>
                        We share our insights and innovations <br/>
                        to inspire development
                    </p>
                </div>

                <div className="col">
                    <p>
                        Our team uses Big Data and AI to dive deep into the sphere and niche and develop high quality
                        researches and cases to contribute to the industry development as well as growth
                    </p>

                    <ul>
                        <li>
                            blog
                        </li>
                        <li>
                            Case Studies
                        </li>
                        <li>
                            news
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section className={'comments'}>
            <div className="container">
                <h2>
                    In the words of our clients
                </h2>

                <div className="slider">
                    <ul>
                        {sliderData.map((item, index) => <li className={activeSlide === index && 'active'}>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                        </li>)}
                    </ul>

                    <div className="navigation">
                        <button className={'btn icon prev'} onClick={goToPrevSlide}>
                            <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18"
                                      height="12">
                                    <rect width="16.8" height="12" transform="matrix(-1 0 0 1 17 0)" fill="#C4C4C4"/>
                                </mask>
                                <g mask="url(#mask0)">
                                    <path
                                        d="M5.89981 1.19995L1.39981 5.99995M1.39981 5.99995L5.89981 10.8M1.39981 5.99995L15.7998 5.99995"
                                        stroke="#6D6DF6" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </button>

                        <button className={'btn icon next'} onClick={goToNextSlide}>
                            <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                                      height="12">
                                    <rect width="16.8" height="12" fill="#C4C4C4"/>
                                </mask>
                                <g mask="url(#mask0)">
                                    <path
                                        d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"
                                        stroke="#6D6DF6" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section className={'blog-posts'}>
            <div className="container">
                <h2>
                    Take a <span>Deep Dive</span>
                </h2>

                <p>
                    Big Data, market researches, niches' analysis, real business cases' discussion, interviews, many
                    guides and tips would help to understand industry better as well as to enhance your brand
                    development
                </p>

                <div className="last-posts last-blog">
                    <div className="row">
                        <div className="post">
                            <div className="image">
                                <img src={blogImage1} alt=""/>
                            </div>

                            <div className="col">
                                <label htmlFor="">blog</label>
                                <h4>
                                    What is Amazon ACoS? What is MACoS?
                                </h4>
                                <p>
                                    MACoS — understanding effective PPC beyond ACoS To explain why Profit Whales
                                    believes that MACoS is a better...
                                </p>
                            </div>
                        </div>

                        <div className="post">
                            <div className="image">
                                <img src={blogImage2} alt=""/>
                            </div>

                            <div className="col">
                                <label htmlFor="">blog</label>
                                <h4>
                                    How to run Private Label and get reviews on Amazon?
                                </h4>
                                <p>
                                    Customers can make or break your business. How to get reviews on...
                                </p>
                            </div>
                        </div>
                    </div>

                    <a href="">
                      <span className={'desk'}>See more articles</span>
                      <span className={'mob'}> more articles</span>

                        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                                  height="12">
                                <rect width="16.8" height="12" fill="#C4C4C4"/>
                            </mask>
                            <g mask="url(#mask0)">
                                <path
                                    d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"
                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </a>
                </div>

                <div className="last-posts last-studies">
                    <div className="row">
                        <div className="post">
                            <div className="image">
                                <img src={blogImage3} alt=""/>
                            </div>

                            <div className="col">
                                <label htmlFor="">CASE STUDY</label>
                                <h4>
                                    How to (sucessfully) deal with competition in Diving Equipment market
                                </h4>
                                <p>
                                    Learn how Profit Whales made the Total Sales to increase by 3 times
                                </p>
                            </div>
                        </div>

                        <div className="post">
                            <div className="image">
                                <img src={blogImage4} alt=""/>
                            </div>

                            <div className="col">
                                <label htmlFor="">CASE STUDY</label>
                                <h4>
                                    Why Amazon PPC Matters: Home Decor Brand Case-Study
                                </h4>
                                <p>
                                    Learn how PW structured ad campaings can change entire brand capacity
                                </p>
                            </div>
                        </div>
                    </div>

                    <a href="">
                        <span className={'desk'}>See more case studies</span>
                        <span className={'mob'}> more case studies</span>

                        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                                  height="12">
                                <rect width="16.8" height="12" fill="#C4C4C4"/>
                            </mask>
                            <g mask="url(#mask0)">
                                <path
                                    d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"
                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <Footer/>
    </div>)
}

export default MainPage