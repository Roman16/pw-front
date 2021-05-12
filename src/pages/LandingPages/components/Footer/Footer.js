import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import spnLogo from '../../../../assets/img/logo/amazon-spn-logo-dark.png'
import advertisingLogo from '../../../../assets/img/logo/amazon-advertising-logo-dark-2.png'
import {email, LoginLink, LogoLink, phone} from "../Header/Header"
import './Footer.less'
import $ from "jquery"

const Footer = () => (
    <footer className='landing-page__footer'>
        <ScrollToTop/>

        <div className="container">
            <div className="row">
                <LogoLink/>

                <LoginLink/>
            </div>

            <p className={'description'}>
                Amazon Business Accelerator powered by the synergy of human and AI decisions
            </p>

            <button className={'btn default login-link mob'}>
                <i>
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.77778" cy="9.55561" r="1.77778" fill="white"/>
                        <circle cx="7.99995" cy="3.33295" r="1.77778" fill="white"/>
                        <circle cx="12.8886" cy="7.77778" r="1.77778" fill="white"/>
                        <circle cx="18.2221" cy="2.44428" r="1.77778" fill="white"/>
                        <path d="M1.77783 9.77767L8.00005 3.33322L12.6667 7.99989L18.2223 2.44434" stroke="white"
                              stroke-width="1.5"/>
                    </svg>
                </i>
                Log in
            </button>

            <div className="menu">
                <div className="col">
                    <h4>OUR DNA</h4>

                    <ul>
                        <li><Link to={'/our-whale'}>Our Whale</Link></li>
                        {/*<li><Link to={'/'}>Culture</Link></li>*/}
                        <li><Link to={'/care-we-do'}>Care we do</Link></li>
                        <li><Link to={'/recognition'}>Recognition</Link></li>
                    </ul>
                </div>

                <div className="col">
                    <h4>Services</h4>
                    <ul>
                        <li><Link to={'/enlighten-future'}>Enlighten your future</Link></li>
                        <li><Link to={'/identify-option'}>Identify your option</Link></li>
                        <li><Link to={'/redefine-approach'}>Redefine your approach</Link></li>
                    </ul>

                </div>

                {/*<div className="col">*/}
                {/*    <h4>what we do</h4>*/}

                {/*    <ul>*/}
                {/*        <li><Link to={'/'}>Capabilities</Link></li>*/}
                {/*        <li><Link to={'/'}>Education</Link></li>*/}
                {/*        <li><Link to={'/'}>PW Labs</Link></li>*/}
                {/*        <li><Link to={'/'}>Growing whales</Link></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}


                {/*<div className="col">*/}
                {/*    <h4>Our Insights</h4>*/}

                {/*    <ul>*/}
                {/*        <li><Link to={'/'}>Insights</Link></li>*/}
                {/*        <li><Link to={'/'}>News</Link></li>*/}
                {/*        <li><a href={'https://blog.profitwhales.com/'} target={'_blank'}>Blog</a></li>*/}
                {/*        <li><Link to={'/'}>Podcast</Link></li>*/}
                {/*        <li><Link to={'/'}>Encourage your knowledge</Link></li>*/}
                {/*        <li><Link to={'/'}>We on social media</Link></li>*/}
                {/*        <li><Link to={'/'}>What others tell about us</Link></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div className="col">
                    <h4><Link to={'/contact-us'}>Contact</Link></h4>

                    <div className={'group'}>
                        <label htmlFor="">Email</label>
                        <a href={`mailto:${email}`} className="email">
                            {email}
                        </a>
                    </div>

                    <div className={'group'}>
                        <label htmlFor="">Phone</label>

                        <a href={`tel:${phone}`} className="phone">
                            {phone}
                        </a>
                    </div>

                    <div className={'group'}>
                        <label htmlFor="">Address</label>
                        <a href="https://goo.gl/maps/c5iFucpi8GkcfEAK9" target={'_blank'}>
                            15805 Biscayne blvd. 201 <br/> Aventure, FL 33160
                        </a>
                    </div>

                    <div className={'group'}>
                        <label htmlFor="">Hours</label>
                        <span>10:00 - 10:00 EST</span>
                    </div>


                    <SocialLinks/>
                </div>
            </div>

            <div className="row">
                <div className="terms">
                    <p>Profit Whales © 2021 All Right Reserved</p>

                    <Link to={'/terms-and-conditions'}>Terms & Conditions</Link>
                    <Link to={'/policy'}>Privacy Policy</Link>
                </div>


                <div className="logo">
                    <img src={advertisingLogo} alt="" className={'amazon-advertising-logo'}/>

                    <img src={spnLogo} alt="" className={'amazon-spn-logo'}/>
                </div>

            </div>
        </div>
    </footer>
)


export const SocialLinks = () => <ul className="social-icons">
    <li>
        <a href="https://www.facebook.com/profitwhales" className="i-fb" target="_blank"
           title="Facebook">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z"
                />
            </svg>
        </a>
    </li>
    <li>
        <a href="https://www.linkedin.com/company/profitwhales/" className="i-in"
           target="_blank"
           title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.0292 18H0.297328V5.98232H4.0292V18ZM2.16125 4.343C0.967923 4.343 0 3.35458 0 2.16125C8.54135e-09 1.58805 0.227703 1.03833 0.633017 0.633017C1.03833 0.227703 1.58805 0 2.16125 0C2.73445 0 3.28418 0.227703 3.68949 0.633017C4.0948 1.03833 4.32251 1.58805 4.32251 2.16125C4.32251 3.35458 3.35418 4.343 2.16125 4.343ZM17.9964 18H14.2726V12.1499C14.2726 10.7556 14.2444 8.96766 12.3323 8.96766C10.392 8.96766 10.0947 10.4824 10.0947 12.0494V18H6.36684V5.98232H9.94603V7.62164H9.99826C10.4965 6.67743 11.7135 5.68097 13.5292 5.68097C17.3061 5.68097 18.0004 8.16808 18.0004 11.3985V18H17.9964Z"
                />
            </svg>
        </a>
    </li>
    <li>
        <a href="https://www.instagram.com/profitwhales/?hl=ru" className="i-tw" target="_blank"
           title="Instagram">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.00402 4.38503C6.44951 4.38503 4.38904 6.4455 4.38904 9C4.38904 11.5545 6.44951 13.615 9.00402 13.615C11.5585 13.615 13.619 11.5545 13.619 9C13.619 6.4455 11.5585 4.38503 9.00402 4.38503ZM9.00402 12.0003C7.35323 12.0003 6.00368 10.6548 6.00368 9C6.00368 7.3452 7.34921 5.99967 9.00402 5.99967C10.6588 5.99967 12.0044 7.3452 12.0044 9C12.0044 10.6548 10.6548 12.0003 9.00402 12.0003ZM14.8842 4.19625C14.8842 4.79471 14.4022 5.27268 13.8078 5.27268C13.2093 5.27268 12.7313 4.79069 12.7313 4.19625C12.7313 3.60181 13.2133 3.11983 13.8078 3.11983C14.4022 3.11983 14.8842 3.60181 14.8842 4.19625ZM17.9408 5.28874C17.8725 3.84681 17.5431 2.56956 16.4868 1.51724C15.4345 0.464911 14.1572 0.135557 12.7153 0.0632601C11.2292 -0.0210867 6.77485 -0.0210867 5.28874 0.0632601C3.85083 0.131541 2.57358 0.460895 1.51724 1.51322C0.460895 2.56555 0.135557 3.8428 0.0632601 5.28473C-0.0210867 6.77084 -0.0210867 11.2251 0.0632601 12.7113C0.131541 14.1532 0.460895 15.4304 1.51724 16.4828C2.57358 17.5351 3.84681 17.8644 5.28874 17.9367C6.77485 18.0211 11.2292 18.0211 12.7153 17.9367C14.1572 17.8685 15.4345 17.5391 16.4868 16.4828C17.5391 15.4304 17.8685 14.1532 17.9408 12.7113C18.0251 11.2251 18.0251 6.77485 17.9408 5.28874ZM16.0209 14.3058C15.7076 15.093 15.1011 15.6995 14.3098 16.0168C13.125 16.4868 10.3134 16.3783 9.00402 16.3783C7.69463 16.3783 4.87906 16.4828 3.6982 16.0168C2.91097 15.7036 2.30447 15.0971 1.98717 14.3058C1.51724 13.1209 1.62568 10.3094 1.62568 9C1.62568 7.69062 1.52125 4.87504 1.98717 3.69419C2.30046 2.90695 2.90695 2.30046 3.6982 1.98315C4.88307 1.51322 7.69463 1.62167 9.00402 1.62167C10.3134 1.62167 13.129 1.51724 14.3098 1.98315C15.0971 2.29644 15.7036 2.90293 16.0209 3.69419C16.4908 4.87906 16.3823 7.69062 16.3823 9C16.3823 10.3094 16.4908 13.125 16.0209 14.3058Z"
                />
            </svg>
        </a>
    </li>
    <li>
        <a href="https://www.youtube.com/channel/UCtUreqMG_C_P8Ymqa-LJ2Yg" className="you"
           target="_blank"
           title="Youtube">
            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.0758 2.16645C17.8634 1.31369 17.2379 0.642079 16.4436 0.414159C15.0039 0 9.23077 0 9.23077 0C9.23077 0 3.45771 0 2.01797 0.414159C1.22367 0.642115 0.598095 1.31369 0.385772 2.16645C0 3.71214 0 6.93707 0 6.93707C0 6.93707 0 10.162 0.385772 11.7077C0.598095 12.5604 1.22367 13.2041 2.01797 13.432C3.45771 13.8462 9.23077 13.8462 9.23077 13.8462C9.23077 13.8462 15.0038 13.8462 16.4436 13.432C17.2379 13.2041 17.8634 12.5604 18.0758 11.7077C18.4615 10.162 18.4615 6.93707 18.4615 6.93707C18.4615 6.93707 18.4615 3.71214 18.0758 2.16645ZM7.34264 9.86506V4.00907L12.1678 6.93714L7.34264 9.86506Z"
                />
            </svg>
        </a>
    </li>
</ul>

const ScrollToTop = () => {
    const scrollToTop = () => {
        $("html, body").animate({scrollTop: 0}, "slow")
    }

    useEffect(() => {
        $(window).scroll(function () {
            const scroll = $(window).scrollTop(),
                documentHeight = $(document).height(),
                windowHeight = $(window).height()

            if (scroll >= 400) {
                $(".scroll-to-top").addClass("visible")
            } else {
                $(".scroll-to-top").removeClass("visible")
            }

            if (scroll === documentHeight - windowHeight) {
                $(".scroll-to-top").addClass("active-btn")
            } else {
                $(".scroll-to-top").removeClass("active-btn")
            }
        })
    }, [])


    return (<button className="btn white scroll-to-top" onClick={scrollToTop}/>)
}


export default Footer
