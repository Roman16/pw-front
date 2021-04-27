import React, {useEffect, useState} from "react"
import './MainPage.less'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

import {Link} from "react-router-dom"
import {Collapse} from 'antd'
import mapImage from '../../../assets/img/landing-mainPage/map.png'
import blogImage1 from '../../../assets/img/landing-mainPage/blog-1.png'
import blogImage2 from '../../../assets/img/landing-mainPage/blog-2.png'
import blogImage3 from '../../../assets/img/landing-mainPage/blog-3.png'
import blogImage4 from '../../../assets/img/landing-mainPage/blog-4.png'
import $ from 'jquery'
import {useSwipeEffect} from "../../../utils/hooks/useSwipeEffect"

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
        [activeServicesSlide, setActiveServicesSlide] = useState(0),
        [visibleMapDetails, setVisibleMapDetails] = useState(false)

    const goToNextSlide = (identifier) => {
        const slides = document.querySelectorAll(`.${identifier} .slider > ul > li`)

        let index = (identifier === 'services' ? activeServicesSlide : activeSlide) + 1
        const currentSlide = identifier === 'services' ? activeServicesSlide : activeSlide

        if (currentSlide === slides.length - 1) {
            slides[slides.length - 1].style.transform = 'translateX(-150px)'
            slides[0].style.transform = 'translateX(150px)'
        } else {
            slides.forEach((item, i) => {
                if (i < index) item.style.transform = 'translateX(-150px)'
                else item.style.transform = 'translateX(150px)'
            })
        }

        setTimeout(() => {
            if (identifier === 'services') setActiveServicesSlide(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
            else setActiveSlide(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
        }, 100)
    }

    const goToPrevSlide = (identifier) => {
        const slides = document.querySelectorAll(`.${identifier} .slider > ul > li`)

        let index = (identifier === 'services' ? activeServicesSlide : activeSlide) - 1
        const currentSlide = identifier === 'services' ? activeServicesSlide : activeSlide

        if (currentSlide === 0) {
            slides[slides.length - 1].style.transform = 'translateX(-150px)'
            slides[0].style.transform = 'translateX(150px)'

        } else {
            slides.forEach((item, i) => {
                if (i <= index) item.style.transform = 'translateX(-150px)'
                else item.style.transform = 'translateX(150px)'
            })
        }

        setTimeout(() => {
            if (identifier === 'services') setActiveServicesSlide(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
            else setActiveSlide(prevState => prevState === slides.length - 1 ? 0 : prevState + 1)
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

        if ($(window).width() < 800) {
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
        $('.header-block').removeClass('transparent', $(window).width() < 800)
    })

    const [touchStart, swipeHandler] = useSwipeEffect(() => goToPrevSlide('services'), () => goToNextSlide('services'))


    return (<div className="landing-page main-page">
        <Header
            className={'transparent'}
        />

        <section className="pre-header">
            <div className="container">
                <h2>
                    <span>Turn Ad Spend</span> into Ad Investment
                </h2>

                <p>
                    to Accelerate your Amazon Business Growth
                </p>

                <div className="buttons">
                    <Link to={'/get-audit'} className={'btn green'}>
                        get an audit
                    </Link>

                    <Link to={'/contact-us'} className={'btn green border'}>
                        contact us
                    </Link>
                </div>
            </div>
        </section>

        <section className="services">
            <div className="container">
                <h2>
                    Our services
                </h2>

                <p>
                    Enchange your performance with innovative performance approach that accelerates <br/>
                    businesses and helps brands to become Whales in their Ocean
                </p>

                <div className="slider">
                    <ul onTouchMove={swipeHandler} onTouchStart={touchStart}>
                        <li className={activeServicesSlide === 0 && 'active'}>
                            <div className="header">
                                <i>
                                    <svg width="60" height="48" viewBox="0 0 60 48" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask00" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                              width="60" height="48">
                                            <rect width="60" height="48" fill="#C4C4C4"/>
                                        </mask>
                                        <g mask="url(#mask00)">
                                            <path
                                                d="M25.2881 12.4002C25.2881 11.2956 26.1835 10.4001 27.2881 10.4001H32.3548C33.4593 10.4001 34.3548 11.2956 34.3548 12.4001V44.1335C34.3548 45.238 33.4593 46.1335 32.3548 46.1335H27.2881C26.1835 46.1335 25.2881 45.2381 25.2881 44.1335V12.4002Z"
                                                fill="#E8F1FF"/>
                                            <path
                                                d="M35.4199 25.2001C35.4199 24.0955 36.3154 23.2001 37.4199 23.2001H42.4866C43.5912 23.2001 44.4866 24.0955 44.4866 25.2001V41.0236C44.4866 41.8526 43.9752 42.5956 43.2009 42.8917L38.1342 44.8289C36.8248 45.3296 35.4199 44.3627 35.4199 42.9608V25.2001Z"
                                                fill="#E8F1FF"/>
                                            <path
                                                d="M15.1543 18.2668C15.1543 17.1623 16.0497 16.2668 17.1543 16.2668H22.221C23.3255 16.2668 24.221 17.1623 24.221 18.2668V42.9609C24.221 44.3628 22.8161 45.3297 21.5067 44.829L16.44 42.8918C15.6657 42.5957 15.1543 41.8527 15.1543 41.0237V18.2668Z"
                                                fill="#E8F1FF"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M5.99642 21.0667H4.8191C4.4342 21.0667 4.19364 21.4834 4.38609 21.8167L6.98417 26.3167C7.17662 26.6501 7.65774 26.6501 7.85019 26.3167L10.4483 21.8167C10.6407 21.4834 10.4002 21.0667 10.0153 21.0667H8.68563C10.115 10.6726 19.032 2.66667 29.819 2.66667C35.4948 2.66667 40.6516 4.88176 44.4748 8.49767C45.0098 9.00366 45.8507 9.03592 46.3889 8.53333C46.9271 8.03075 46.9585 7.18406 46.427 6.67443C42.1167 2.54177 36.2638 0 29.819 0C17.5571 0 7.44301 9.19551 5.99642 21.0667ZM52.0322 19.4667C51.3106 19.6132 50.611 19.1454 50.4194 18.4344C50.1885 17.5777 49.9056 16.7424 49.5743 15.932C49.2956 15.2503 49.5685 14.4543 50.2313 14.1333C50.894 13.8124 51.6952 14.0882 51.9786 14.7678C52.4006 15.7796 52.7554 16.8265 53.0373 17.9028C53.2239 18.6152 52.7539 19.3202 52.0322 19.4667ZM29.819 45.3333C40.5597 45.3333 49.4465 37.3958 50.9335 27.0667H49.6173C49.2324 27.0667 48.9918 26.6501 49.1843 26.3167L51.7823 21.8167C51.9748 21.4834 52.4559 21.4834 52.6484 21.8167L55.2464 26.3167C55.4389 26.6501 55.1983 27.0667 54.8134 27.0667H53.6249C52.119 38.8733 42.0348 48 29.819 48C21.0079 48 13.3079 43.2516 9.13482 36.1794C8.7606 35.5452 9.01965 34.7383 9.6737 34.4C10.3277 34.0617 11.1287 34.3202 11.5073 34.9518C15.2364 41.1731 22.0428 45.3333 29.819 45.3333Z"
                                                  fill="#DAE4F6"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M53.6992 5.66753C54.1037 6.0435 54.1269 6.67624 53.7509 7.08079L41.6072 20.1475C41.418 20.351 41.1526 20.4667 40.8747 20.4667H33.4037L22.4893 30.3416C22.3055 30.5079 22.0664 30.6 21.8184 30.6H5.55176C4.99947 30.6 4.55176 30.1523 4.55176 29.6C4.55176 29.0477 4.99947 28.6 5.55176 28.6H21.4332L32.3475 18.7252C32.5314 18.5588 32.7705 18.4667 33.0184 18.4667H40.4389L52.2859 5.71926C52.6619 5.31471 53.2946 5.29155 53.6992 5.66753Z"
                                                  fill="#DAE4F6"/>
                                            <path
                                                d="M54.5441 5.41937C54.6438 5.04759 54.3036 4.70738 53.9318 4.807L48.9127 6.15187C48.5409 6.25149 48.4164 6.71622 48.6885 6.98838L52.3628 10.6626C52.6349 10.9348 53.0997 10.8103 53.1993 10.4385L54.5441 5.41937Z"
                                                fill="#DAE4F6"/>
                                        </g>
                                    </svg>
                                </i>

                                <h3>
                                    Accelerate <span>Profits</span>
                                </h3>
                            </div>

                            <ul>
                                <li>Efficient budget allocation to prevent cannibalization</li>
                                <li>AI bids optimization for ROAS maximization</li>
                                <li>High focus on Video and Sponsored Display Campaigns to take over the competitors</li>
                                <li>Deep keywords/targets research to find hidden opportunities</li>
                                <li>Custom Analytics</li>
                            </ul>

                            <Link to={'/identify-option/profits'} className={'btn default'}>learn more</Link>
                        </li>

                        <li className={activeServicesSlide === 1 && 'active'}>
                            <div className="header">
                                <i>
                                    <svg width="60" height="48" viewBox="0 0 60 48" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask01" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                              width="60" height="48">
                                            <rect width="60" height="48" fill="#C4C4C4"/>
                                        </mask>
                                        <g mask="url(#mask01)">
                                            <path
                                                d="M46.0079 22.6596V41.7786C46.0079 43.0431 44.9963 44.0547 43.7318 44.0547H16.9246C15.6601 44.0547 14.6485 43.0431 14.6485 41.7786V22.7101C14.1427 22.8113 13.6875 22.8113 13.1817 22.8113C12.3725 22.8113 11.5632 22.7101 10.7539 22.5078V41.8292C10.7539 45.2686 13.5358 47.9999 16.9246 47.9999H43.7318C47.1206 47.9999 49.9025 45.218 49.9025 41.8292V22.5078C49.1438 22.7101 48.3345 22.8113 47.5252 22.8113C47.0194 22.8113 46.5137 22.7607 46.0079 22.6596Z"
                                                fill="#E8F1FF"/>
                                            <path
                                                d="M27.1399 22.5585C26.533 22.255 25.7743 22.4573 25.4708 23.0643L22.6889 28.0717H21.2727C20.2611 28.0717 19.553 28.9821 19.7553 29.9431L21.7279 39.3509C21.8796 40.059 22.5372 40.6154 23.2453 40.6154H37.5087C38.2674 40.6154 38.8744 40.1096 39.0261 39.3509L40.9481 29.9431C41.1505 28.9821 40.3918 28.0717 39.4308 28.0717H38.0145L35.2326 23.0643C34.9292 22.4573 34.1705 22.255 33.5635 22.5585C32.9566 22.862 32.7543 23.6207 33.0577 24.2276L35.1821 28.0717H25.4708L27.5951 24.2276C27.9492 23.6207 27.6963 22.862 27.1399 22.5585ZM33.9682 31.9663C33.9682 31.4099 34.4234 30.9041 35.0303 30.9041C35.5867 30.9041 36.0925 31.3593 36.0925 31.9663V36.7208C36.0925 37.2771 35.6373 37.7829 35.0303 37.7829C34.474 37.7829 33.9682 37.3277 33.9682 36.7208V31.9663ZM29.2643 31.9663C29.2643 31.4099 29.7195 30.9041 30.3264 30.9041C30.8828 30.9041 31.3886 31.3593 31.3886 31.9663V36.7208C31.3886 37.2771 30.9334 37.7829 30.3264 37.7829C29.7701 37.7829 29.2643 37.3277 29.2643 36.7208V31.9663ZM25.6731 30.9041C26.2295 30.9041 26.7353 31.3593 26.7353 31.9663V36.7208C26.7353 37.2771 26.2801 37.7829 25.6731 37.7829C25.1167 37.7829 24.6109 37.3277 24.6109 36.7208V31.9663C24.6109 31.4099 25.0662 30.9041 25.6731 30.9041Z"
                                                fill="#DAE4F6"/>
                                            <path
                                                d="M52.6836 11.3298L50.0535 4.85564L49.75 3.18651C49.3959 1.31507 47.7774 0 45.906 0H14.7995C12.9281 0 11.259 1.36565 10.9555 3.18651L10.6014 4.85564L7.97129 11.3298C7.41492 12.746 7.31376 14.314 7.87013 15.6797C8.72998 17.8546 10.8543 19.2202 13.1304 19.2202C14.7995 19.2202 16.3169 18.5121 17.3791 17.2982C18.4413 18.5121 19.9586 19.2202 21.5772 19.2202H21.8807C23.4992 19.2202 24.966 18.5121 25.9776 17.4499C27.0398 18.6133 28.5572 19.2202 30.1251 19.2202H30.5298C32.0977 19.2202 33.6151 18.5627 34.6773 17.3994C35.6889 18.5121 37.1557 19.2202 38.7742 19.2202H39.0777C40.6963 19.2202 42.2136 18.5121 43.2758 17.2982C44.338 18.4615 45.8554 19.2202 47.5245 19.2202C49.8006 19.2202 51.8743 17.8546 52.7848 15.6797C53.3412 14.314 53.24 12.746 52.6836 11.3298Z"
                                                fill="#E8F1FF"/>
                                        </g>
                                    </svg>
                                </i>

                                <h3>
                                    Accelerate your <br/> <span>Marketplace Potential</span>
                                </h3>
                            </div>

                            <ul>
                                <li>High utilization of SP/SBV/SD campaigns</li>
                                <li>Incremental increase in traffic</li>
                                <li>Niche monopolization</li>
                                <li>Focus on getting and defending Best Sellers Tags</li>
                                <li>Business Analytics</li>
                            </ul>

                            <Link to={'/identify-option/marketplace_potential'} className={'btn default'}>learn more</Link>
                        </li>

                        <li className={activeServicesSlide === 2 && 'active'}>
                            <div className="header">
                                <i>
                                    <svg width="60" height="48" viewBox="0 0 60 48" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask02" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                              width="60" height="48">
                                            <rect width="60" height="48" fill="#C4C4C4"/>
                                        </mask>
                                        <g mask="url(#mask02)">
                                            <path
                                                d="M15.677 47.2502H8.75223C8.33792 47.2502 8.04199 46.9542 8.04199 46.5399V33.6374C8.04199 33.2231 8.33792 32.9271 8.75223 32.9271H15.677C16.0913 32.9271 16.3872 33.2231 16.3872 33.6374V46.5399C16.3872 46.9542 16.0321 47.2502 15.677 47.2502Z"
                                                fill="#DAE4F6"/>
                                            <path
                                                d="M28.1633 47.2498H21.2386C20.8243 47.2498 20.5283 46.9539 20.5283 46.5396V28.7245C20.5283 28.3102 20.8243 28.0143 21.2386 28.0143H28.1633C28.5776 28.0143 28.8736 28.3102 28.8736 28.7245V46.5396C28.8736 46.9539 28.5776 47.2498 28.1633 47.2498Z"
                                                fill="#DAE4F6"/>
                                            <path
                                                d="M40.0614 47.25H33.0774C32.6631 47.25 32.3672 46.954 32.3672 46.5397V23.2204C32.3672 22.8061 32.6631 22.5101 33.0774 22.5101H40.0022C40.4165 22.5101 40.7124 22.8061 40.7124 23.2204V46.5989C40.7124 46.954 40.4165 47.25 40.0614 47.25Z"
                                                fill="#DAE4F6"/>
                                            <path
                                                d="M52.2551 47.2502H45.3303C44.916 47.2502 44.6201 46.9543 44.6201 46.5399V17.5387C44.6201 17.1244 44.916 16.8285 45.3303 16.8285H52.2551C52.6694 16.8285 52.9654 17.1244 52.9654 17.5387V46.5399C52.9654 46.9543 52.6694 47.2502 52.2551 47.2502Z"
                                                fill="#DAE4F6"/>
                                            <path
                                                d="M50.3599 0.0786062V10.0219C50.3599 10.7321 49.4721 11.0872 48.9986 10.6137L46.5128 8.06874C46.276 7.832 45.9209 7.832 45.7433 8.06874C33.4918 20.6754 15.9727 22.8061 8.33767 23.1612C8.04174 23.1612 7.80499 22.9837 7.74581 22.6877L7.50906 21.6816C7.44988 21.3264 7.68662 21.0305 8.04174 20.9713C8.69279 20.9121 9.28465 20.853 9.9357 20.7346C11.1786 20.557 12.3623 20.3795 13.5461 20.1427C14.9665 19.8468 16.387 19.5509 17.7483 19.1366C19.3463 18.7222 20.8851 18.1896 22.3648 17.5977C24.022 17.0059 25.6792 16.2364 27.2181 15.467C28.9345 14.6384 30.5325 13.6914 32.1305 12.6261C33.7877 11.5015 35.3858 10.3178 36.8654 8.95653C38.4634 7.53606 39.9431 5.99722 41.3044 4.3992C41.5411 4.10327 41.837 3.80734 41.6595 3.39303C41.5411 3.0971 41.3044 2.91954 41.1268 2.74198C40.9493 2.56443 40.7125 2.32768 40.535 2.15012C40.1798 1.79501 39.8247 1.43989 39.4104 1.02559C39.292 0.907213 39.1145 0.729654 38.9961 0.611282C38.4634 0.0786065 38.8777 -0.75 39.588 -0.75H49.4721C50.0047 -0.75 50.3599 -0.394883 50.3599 0.0786062Z"
                                                fill="#E8F1FF"/>
                                        </g>
                                    </svg>
                                </i>

                                <h3>
                                    Accelerate <span>Total <br/> Sales Growth</span>
                                </h3>
                            </div>

                            <ul>
                                <li>Incremental growth of every AD type</li>
                                <li>Getting and keeping Best Sellers</li>
                                <li>Ranking new keywords with Amazon Advertising</li>
                                <li>Data-driven product launches</li>
                                <li>DSP campaigns management</li>
                                <li>Deep Analytics</li>
                            </ul>

                            <Link to={'/identify-option/total_sales_growth'} className={'btn default'}>learn more</Link>
                        </li>

                        <li className={activeServicesSlide === 3 && 'active'}>
                            <div className="header">
                                <i>
                                    <svg width="60" height="48" viewBox="0 0 60 48" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask03" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                              width="60"
                                              height="48">
                                            <rect width="60" height="48" fill="#C4C4C4"/>
                                        </mask>
                                        <g mask="url(#mask03)">
                                            <path
                                                d="M29.9993 10.3953V1.5M29.9993 1.5L25.29 6.2093M29.9993 1.5L34.7086 6.2093"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M29.9984 37.6047V46.5M29.9984 46.5L25.2891 41.7907M29.9984 46.5L34.7077 41.7907"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path d="M16.3953 24H7.5M7.5 24L12.2093 28.7094M7.5 24L12.2093 19.2907"
                                                  stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                  stroke-linejoin="round"/>
                                            <path
                                                d="M43.6047 24.0002H52.5M52.5 24.0002L47.7907 28.7095M52.5 24.0002L47.7907 19.2909"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M20.2576 14.4018L13.9677 8.11179M13.9677 8.11179L13.9677 14.7718M13.9677 8.11179L20.6276 8.11179"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M39.5 33.6414L45.7899 39.9314M45.7899 39.9314L39.13 39.9314M45.7899 39.9314L45.7899 33.2714"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M39.4982 14.4015L45.7882 8.11155M45.7882 8.11155L45.7882 14.7715M45.7882 8.11155L39.1282 8.11155"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M20.2588 33.6414L13.9688 39.9314M13.9688 39.9314L20.6288 39.9314M13.9688 39.9314L13.9688 33.2714"
                                                stroke="#E8F1FF" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M40.3131 23.548C40.3131 23.548 35.9457 18.3716 29.9999 18.3716C24.0544 18.3716 19.6866 23.548 19.6866 23.548C19.4378 23.8429 19.4378 24.3257 19.6866 24.6209C19.6866 24.6206 24.0544 29.797 29.9999 29.797C35.9454 29.797 40.3127 24.6206 40.3127 24.6206C40.562 24.3257 40.562 23.8429 40.3131 23.548ZM29.9999 28.482C27.5713 28.482 25.6022 26.5133 25.6022 24.0843C25.6022 21.6553 27.5713 19.6866 29.9999 19.6866C32.4285 19.6866 34.3976 21.6557 34.3976 24.0843C34.3976 26.5129 32.4288 28.482 29.9999 28.482Z"
                                                fill="#DAE4F6"/>
                                            <path
                                                d="M29.9993 28.482C27.5707 28.482 25.6016 26.5132 25.6016 24.0842C25.6016 21.6553 27.5707 19.6865 29.9993 19.6865C32.4279 19.6865 34.397 21.6556 34.397 24.0842C34.397 26.5129 32.4283 28.482 29.9993 28.482Z"
                                                fill="#F3F7FD"/>
                                            <path
                                                d="M32.0735 23.1642C31.5569 23.1642 31.1377 22.7454 31.1377 22.2284C31.1377 22.0934 31.1666 21.9649 31.2181 21.8492C30.856 21.6514 30.4408 21.5389 29.9995 21.5389C28.5938 21.5389 27.4541 22.6786 27.4541 24.0843C27.4541 25.49 28.5938 26.63 29.9995 26.63C31.4052 26.63 32.5448 25.4904 32.5448 24.0847C32.5448 23.7437 32.4774 23.4184 32.3556 23.121C32.2667 23.1489 32.1717 23.1642 32.0735 23.1642Z"
                                                fill="#E8F1FF"/>
                                        </g>
                                    </svg>
                                </i>

                                <h3>
                                    Accelerate <span>Brand <br/> Awareness</span>
                                </h3>
                            </div>

                            <ul>
                                <li>Wide SP/SBV/SD campaigns</li>
                                <li>Brand Defend campaigns strategy</li>
                                <li>Niche monopolization</li>
                                <li>Multichannel control and boosting</li>
                                <li>Data driven campaigns boost</li>
                                <li>Custom analysis and research</li>
                            </ul>

                            <Link to={'/identify-option/brand_awareness'} className={'btn default'}>learn more</Link>
                        </li>
                    </ul>

                    <div className="dots">
                        {[0, 1, 2, 3].map(i => <div className={activeServicesSlide === i && 'active'}
                                                    onClick={() => setActiveServicesSlide(i)}/>)}
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <Link to={'/enlighten-future'}>
                            Enlighten your future

                            <svg width="34" height="24" viewBox="0 0 34 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask011" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="34"
                                      height="24">
                                    <rect width="33.6" height="24" fill="#C4C4C4"/>
                                </mask>
                                <g mask="url(#mask011)">
                                    <path d="M22.1994 2.40003L31.1994 12M31.1994 12L22.1994 21.6M31.1994 12L2.39941 12"
                                          stroke="#6D6DF6" stroke-width="3" stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </Link>

                        <p>
                            Boost your business activity by unique knolwedge and <br/>
                            deep diving into the e-commerce sphere
                        </p>

                        <Link to={'/enlighten-future'} className={'btn default'}>learn more</Link>
                    </div>

                    <div className="col">
                        <Link to={'/redefine-approach'}>
                            Redefine your approach

                            <svg width="34" height="24" viewBox="0 0 34 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask011" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="34"
                                      height="24">
                                    <rect width="33.6" height="24" fill="#C4C4C4"/>
                                </mask>
                                <g mask="url(#mask011)">
                                    <path d="M22.1994 2.40003L31.1994 12M31.1994 12L22.1994 21.6M31.1994 12L2.39941 12"
                                          stroke="#6D6DF6" stroke-width="3" stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </Link>

                        <p>
                            Introduce innovations into your business activities by the <br/>
                            improvement of processes and advertisement focus
                        </p>

                        <Link to={'/redefine-approach'} className={'btn default'}>learn more</Link>
                    </div>
                </div>
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
                                <li>USA</li>
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

                    <button className={`btn white mob ${visibleMapDetails ? 'open' : ''}`}
                            onClick={() => setVisibleMapDetails(prevState => !prevState)}>
                        {!visibleMapDetails ? 'show more' : 'show less'}
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="10"
                                  height="14">
                                <rect width="14" height="10" transform="matrix(0 1 1 0 0 0)" fill="#C4C4C4"/>
                            </mask>
                            <g mask="url(#mask0)">
                                <path d="M1 9.25012L5 13.0001M5 13.0001L9 9.25012M5 13.0001L5 1.00012" stroke="#6D6DF6"
                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                        <button className={'btn icon prev'} onClick={() => goToPrevSlide('comments')}>
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

                        <button className={'btn icon next'} onClick={() => goToNextSlide('comments')}>
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

                    {/*<a href="">*/}
                    {/*  <span className={'desk'}>See more articles</span>*/}
                    {/*  <span className={'mob'}> more articles</span>*/}

                    {/*    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"*/}
                    {/*              height="12">*/}
                    {/*            <rect width="16.8" height="12" fill="#C4C4C4"/>*/}
                    {/*        </mask>*/}
                    {/*        <g mask="url(#mask0)">*/}
                    {/*            <path*/}
                    {/*                d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"*/}
                    {/*                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*/}
                    {/*        </g>*/}
                    {/*    </svg>*/}
                    {/*</a>*/}
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

                    {/*<a href="">*/}
                    {/*    <span className={'desk'}>See more case studies</span>*/}
                    {/*    <span className={'mob'}> more case studies</span>*/}

                    {/*    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"*/}
                    {/*              height="12">*/}
                    {/*            <rect width="16.8" height="12" fill="#C4C4C4"/>*/}
                    {/*        </mask>*/}
                    {/*        <g mask="url(#mask0)">*/}
                    {/*            <path*/}
                    {/*                d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"*/}
                    {/*                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*/}
                    {/*        </g>*/}
                    {/*    </svg>*/}
                    {/*</a>*/}
                </div>
            </div>
        </section>

        <Footer/>
    </div>)
}

export default MainPage