import React, {useEffect, useState} from 'react'
import {Link, NavLink} from "react-router-dom"
import './Header.less'
import SmartBar from "./SmartBar"
import {history} from "../../../../utils/history"
import _ from 'lodash'


const menu = [
    {
        title: 'Our DNA',
        subMenu: [
            {
                title: 'Our Whale',
                link: '/our-whale',
            },
            {
                title: 'Care we do',
                link: '/care-we-do',
            },
            {
                title: 'Recognition',
                link: '/recognition',
            }
        ]
    },
    {
        title: 'Services',
        subMenu: [
            {
                title: 'Enlighten your future',
                link: '/enlighten-future',
            },
            {
                title: 'Identify your Option',
                link: '/identify-option',
            },
            {
                title: 'Redefine your approach',
                link: '/redefine-approach',
            },
        ]
    },
    {
        title: 'Why Profit Whales?',
        subMenu: [
            {
                title: 'PPC Automate',
                link: '/',
            },
            {
                title: 'Zero To Hero',
                link: 'zero-to-hero-info',
            }
        ]
    },
    {
        title: 'Our Insights',
        subMenu: [
            {
                title: 'Blog',
                outsideLink: 'https://blog.profitwhales.com/',
            },
            {
                title: 'Case Studies',
                outsideLink: 'https://blog.profitwhales.com/case-studies/',
            },
            {
                title: 'Podcast',
                outsideLink: 'https://blog.profitwhales.com/podcasts/',
            },
            {
                title: 'Help Center',
                outsideLink: 'https://intercom.help/profitwhales/en',
            }
        ]
    },
    {
        title: 'Contact Us',
        link: 'contact-us'
    }
]

export const email = 'official@profitwhales.com',
    phone = '+18143519477'

const Header = ({type = 'light', page, className}) => {
    const [visibleMenu, setVisibleMenu] = useState(false),
        [selectedMenuIndex, setSelectedMenuItem] = useState()


    useEffect(() => {
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.defer = true
        s.innerHTML = `var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
var _site_hash_code = "43b949f1ad6de536aff7518bc996a99f";
var _suid = 8534;`
        document.head.appendChild(s)
//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------
        const s2 = document.createElement('script')
        s2.type = 'text/javascript'
        s2.innerHTML = `(function (d,s,i) {
var j = d.createElement('script');
j.async = true;
j.id = 'notifia';
j.src = 'https://static.notifia.io/widget.js';
j.setAttribute('initialize',i);
d.head.appendChild(j);
})( document, 'script', 'm6fFjWybVUe61');`
        document.head.appendChild(s2)

        return () => {
            document.head.removeChild(s)
            document.head.removeChild(s2)
        }

    }, [])

    return (
        <>
            <div className={`header-block ${className}`}>
                <SmartBar
                    email={email}
                    phone={phone}
                />

                <header className={`landing-page__header desc ${type}`} id={'header'}>
                    <div className="container">
                        <LogoLink/>

                        <ul className={`header-menu ${visibleMenu ? 'open' : ''}`}>
                            {menu.map((item, index) => (<>
                                <li className={selectedMenuIndex === index && 'selected'}>
                                    {item.subMenu ? <Link
                                            to={item.link || '#'}
                                            onClick={() => setSelectedMenuItem(index)}
                                            className={(item.subMenu && _.find(item.subMenu, {link: history.location.pathname})) ? 'active' : ''}
                                        >
                                            {item.title} <span className="arrow"><span/><span/></span>
                                        </Link>
                                        :
                                        <NavLink
                                            to={item.link || '#'}
                                            onClick={() => setSelectedMenuItem(index)}
                                        >
                                            {item.title}
                                        </NavLink>
                                    }

                                    {item.subMenu &&
                                    <div className={`sub-menu ${selectedMenuIndex === index ? 'open' : ''}`}>
                                        {item.subMenu.map(subItem => subItem.outsideLink ?
                                            <a target={'_blank'} href={subItem.outsideLink}>{subItem.title}</a>
                                            :
                                            <NavLink exact to={subItem.link}>
                                                {subItem.title}
                                            </NavLink>)}
                                    </div>}
                                </li>
                            </>))}

                            <LoginLink/>
                        </ul>

                        <a href={`mailto:${email}`} className={'email-link'}>
                            <svg width="21" height="18" viewBox="0 0 21 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M1 0C0.447715 0 0 0.447716 0 1V2.13502C0 2.53156 0.234305 2.89064 0.597261 3.05034L9.69438 7.05307C10.2076 7.2789 10.7921 7.2789 11.3053 7.05307L20.4027 3.05021C20.7657 2.89051 21 2.53144 21 2.1349V1C21 0.447715 20.5523 0 20 0H1ZM21 6.50498C21 5.78292 20.2582 5.29886 19.5973 5.58966L12.1108 8.8837C11.0843 9.33535 9.91539 9.33535 8.88891 8.8837L1.40274 5.58979C0.741832 5.29899 0 5.78305 0 6.5051V17C0 17.5523 0.447715 18 1 18H20C20.5523 18 21 17.5523 21 17V6.50498Z"
                                      fill="#6D6DF6"/>
                            </svg>
                        </a>

                        <button
                            className={`burger ${visibleMenu ? 'open' : ''}`}
                            onClick={() => setVisibleMenu(prevState => !prevState)}
                        >
                            <div/>
                        </button>
                    </div>
                </header>
            </div>
        </>
    )
}

export const LoginLink = () => <Link to={'/login'} className={'login-link'}>
    <i>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="20">
                <ellipse cx="9" cy="10" rx="9" ry="10" fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0)">
                <circle cx="9" cy="4" r="4" />
                <ellipse cx="9" cy="34.5" rx="14" ry="24.5" />
            </g>
        </svg>
    </i>
    Login
</Link>

export const LogoLink = () =>
    <NavLink to='/' className={'logo-link'}>
        <svg width="160" height="64" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
                <path
                    d="M22.1297 2.37048e-07C17.7525 -0.000642327 13.4734 1.30508 9.83353 3.75202C6.19371 6.19896 3.3567 9.67721 1.6813 13.7469C0.00590097 17.8165 -0.432628 22.2948 0.421176 26.6153C1.27498 30.9358 3.38276 34.9044 6.47795 38.0193C9.57314 41.1342 13.5167 43.2554 17.8099 44.1146C22.1031 44.9738 26.553 44.5325 30.5969 42.8464C34.6409 41.1604 38.0971 38.3053 40.5286 34.6424C42.9601 30.9794 44.2576 26.673 44.2569 22.2679C44.2561 16.3624 41.9245 10.6989 37.7751 6.52308C33.6256 2.34722 27.998 0.000861671 22.1297 2.37048e-07ZM22.0749 33.207C19.9359 33.207 17.8449 32.5686 16.0664 31.3727C14.2878 30.1768 12.9017 28.477 12.0831 26.4882C11.2645 24.4995 11.0504 22.3111 11.4677 20.1998C11.885 18.0886 12.915 16.1493 14.4275 14.6272C15.94 13.105 17.8671 12.0684 19.965 11.6485C22.0629 11.2285 24.2374 11.4441 26.2136 12.2678C28.1898 13.0916 29.8788 14.4866 31.0672 16.2764C32.2556 18.0663 32.8899 20.1705 32.8899 22.3232C32.8899 25.2097 31.7504 27.9781 29.7222 30.0192C27.694 32.0603 24.9432 33.207 22.0749 33.207Z"
                    />
                <path
                    d="M12.0523 44.5129V52.0276C12.0527 53.6 11.7453 55.157 11.1476 56.6097C10.5499 58.0624 9.67358 59.3824 8.5688 60.4942C7.46403 61.606 6.1524 62.4879 4.70886 63.0894C3.26532 63.6909 1.71815 64.0003 0.155762 63.9998V32.5732C2.57805 37.8545 6.79778 42.0896 12.0523 44.5129Z"
                    />
                <path
                    d="M39.772 19.2043C40.5011 18.9097 41.2818 18.7661 42.0674 18.7819V21.8229C41.7058 21.7937 41.4604 21.7807 41.3345 21.7807C40.933 21.7574 40.5309 21.8156 40.1521 21.9518C39.7733 22.088 39.4256 22.2994 39.1296 22.5734C38.6001 23.0997 38.3322 23.8924 38.3322 24.9483V30.3123H35.0586V18.9411H38.1804V20.4389C38.5853 19.8852 39.1368 19.4573 39.772 19.2043Z"
                    />
                <path
                    d="M46.0831 29.7305C45.1678 29.257 44.4012 28.5372 43.8684 27.6512C43.3479 26.7309 43.0742 25.6903 43.0742 24.6314C43.0742 23.5725 43.3479 22.5318 43.8684 21.6115C44.4002 20.7247 45.1672 20.0047 46.0831 19.5322C47.0771 19.0385 48.1707 18.7817 49.2791 18.7817C50.3876 18.7817 51.4812 19.0385 52.4752 19.5322C53.3862 20.0069 54.1483 20.7267 54.6769 21.6115C55.1996 22.531 55.4745 23.572 55.4745 24.6314C55.4745 25.6907 55.1996 26.7317 54.6769 27.6512C54.1474 28.5352 53.3855 29.2548 52.4752 29.7305C51.4812 30.2242 50.3876 30.481 49.2791 30.481C48.1707 30.481 47.0771 30.2242 46.0831 29.7305ZM51.3517 26.9234C51.8741 26.2752 52.1592 25.466 52.1592 24.6314C52.1592 23.7967 51.8741 22.9875 51.3517 22.3393C51.086 22.0582 50.7643 21.8369 50.4077 21.6896C50.0511 21.5424 49.6676 21.4726 49.2824 21.4848C48.8962 21.4735 48.5121 21.5437 48.1546 21.6909C47.797 21.838 47.4741 22.0589 47.2065 22.3393C46.6784 22.9849 46.3896 23.7951 46.3896 24.6314C46.3896 25.4676 46.6784 26.2778 47.2065 26.9234C47.4741 27.2038 47.797 27.4247 48.1546 27.5718C48.5121 27.719 48.8962 27.7892 49.2824 27.7779C49.6676 27.7901 50.0511 27.7203 50.4077 27.5731C50.7643 27.4258 51.086 27.2045 51.3517 26.9234Z"
                    />
                <path
                    d="M61.2451 19.2045H64.1507V21.7386H61.3388V30.3125H58.0555V21.7386H56.3154V19.2045H58.0555V18.6977C58.0555 17.3981 58.4375 16.3704 59.2016 15.6145C59.9656 14.8586 61.0418 14.4784 62.4299 14.4741C62.9005 14.4713 63.3698 14.5248 63.8278 14.6333C64.2182 14.7179 64.5908 14.8707 64.9287 15.0849L64.0667 17.4728C63.6791 17.2033 63.2174 17.0625 62.7463 17.07C61.752 17.07 61.2548 17.619 61.2548 18.7172L61.2451 19.2045ZM67.6244 16.8393C67.4463 16.6716 67.3043 16.4688 67.2073 16.2436C67.1102 16.0184 67.0601 15.7755 67.0601 15.53C67.0601 15.2845 67.1102 15.0417 67.2073 14.8164C67.3043 14.5912 67.4463 14.3885 67.6244 14.2207C68.0273 13.8593 68.554 13.6694 69.0933 13.6911C69.629 13.6668 70.154 13.8479 70.5622 14.198C70.7442 14.3537 70.8895 14.5481 70.9878 14.7672C71.086 14.9864 71.1347 15.2247 71.1304 15.465C71.137 15.72 71.0897 15.9734 70.9918 16.2086C70.8938 16.4439 70.7474 16.6555 70.5622 16.8296C70.1621 17.1964 69.634 17.3891 69.0933 17.3656C68.5544 17.3883 68.0278 17.1996 67.6244 16.8393ZM67.4565 18.9511H70.7301V30.3222H67.4565V18.9511Z"
                    />
                <path
                    d="M81.0565 29.763C80.7005 30.0192 80.2979 30.2025 79.8717 30.3023C79.3879 30.4221 78.8913 30.4821 78.3931 30.481C77.0501 30.481 76.0117 30.1355 75.2778 29.4446C74.5438 28.7537 74.1758 27.74 74.1737 26.4036V21.7382H72.4336V19.2041H74.1737V16.436H77.4472V19.2041H80.2591V21.7382H77.4472V26.3614C77.4214 26.7659 77.5535 27.1645 77.8152 27.4725C77.9516 27.6073 78.1147 27.7116 78.2938 27.7788C78.4729 27.8459 78.664 27.8744 78.8548 27.8624C79.3298 27.8766 79.7955 27.7277 80.1751 27.44L81.0565 29.763Z"
                    />
                <path
                    d="M103.95 15.5298L98.9975 30.3123H97.3607L93.0605 17.7033L88.7345 30.3123H87.1203L82.168 15.5298H83.7628L88.0016 28.2427L92.3858 15.5298H93.8353L98.1581 28.3044L102.458 15.5298H103.95Z"
                    />
                <path
                    d="M115.711 20.3351C116.531 21.1452 116.94 22.3235 116.938 23.8699V30.3125H115.449V24.0194C115.449 22.8671 115.162 21.9867 114.587 21.378C114.016 20.7737 113.196 20.4716 112.134 20.4716C111.616 20.4442 111.097 20.5246 110.611 20.708C110.125 20.8914 109.682 21.1736 109.309 21.5372C108.618 22.2476 108.273 23.2299 108.273 24.484V30.3125H106.781V14.6431H108.273V21.1409C108.681 20.4913 109.263 19.971 109.952 19.6399C110.718 19.2772 111.558 19.0971 112.405 19.1135C113.789 19.1179 114.891 19.5251 115.711 20.3351Z"
                    />
                <path
                    d="M128.162 20.2084C128.931 20.9318 129.315 22.0051 129.315 23.4281V30.3125H127.888V28.5808C127.539 29.1693 127.025 29.6398 126.409 29.9323C125.684 30.2721 124.891 30.4378 124.091 30.4164C122.858 30.4164 121.879 30.1208 121.153 29.5295C120.818 29.2485 120.547 28.8981 120.359 28.5021C120.171 28.1061 120.07 27.6739 120.063 27.235C120.056 26.7961 120.143 26.3609 120.318 25.959C120.494 25.5571 120.753 25.198 121.079 24.9063C121.757 24.328 122.833 24.0389 124.308 24.0389H127.826V23.3631C127.826 22.4079 127.558 21.6802 127.029 21.1798C126.5 20.6795 125.718 20.4293 124.698 20.4293C124.012 20.4274 123.33 20.545 122.684 20.777C122.075 20.9933 121.513 21.3241 121.028 21.7516L120.356 20.6048C120.95 20.1073 121.634 19.7309 122.371 19.4969C123.17 19.2342 124.006 19.1026 124.847 19.107C126.287 19.1157 127.392 19.4828 128.162 20.2084ZM126.483 28.6555C127.096 28.2522 127.566 27.6643 127.826 26.9759V25.1532H124.372C122.482 25.1532 121.539 25.8149 121.541 27.1383C121.529 27.4342 121.59 27.7284 121.718 27.9951C121.846 28.2619 122.037 28.4931 122.274 28.6685C122.88 29.0756 123.602 29.2718 124.33 29.2273C125.088 29.249 125.835 29.0505 126.483 28.6555Z"
                    />
                <path d="M133.368 14.6431H134.856V30.3125H133.368V14.6431Z" />
                <path
                    d="M148.622 25.2215H139.389C139.412 25.7537 139.54 26.276 139.768 26.7571C139.995 27.2382 140.316 27.6684 140.712 28.022C141.549 28.7471 142.627 29.1277 143.731 29.0877C144.38 29.0952 145.024 28.9691 145.623 28.7173C146.194 28.4719 146.703 28.0999 147.111 27.6289L147.95 28.6036C147.457 29.1983 146.826 29.6623 146.113 29.9551C145.241 30.3016 144.305 30.4573 143.369 30.4119C142.432 30.3665 141.515 30.1211 140.68 29.6919C139.824 29.2255 139.114 28.5265 138.633 27.6744C138.134 26.783 137.881 25.7734 137.9 24.7504C137.882 23.7315 138.123 22.7249 138.601 21.8264C139.05 20.9905 139.72 20.2965 140.538 19.8218C141.381 19.351 142.329 19.104 143.293 19.104C144.258 19.104 145.206 19.351 146.049 19.8218C146.856 20.2965 147.516 20.987 147.957 21.8166C148.43 22.7166 148.667 23.7228 148.648 24.7406L148.622 25.2215ZM140.615 21.4333C139.886 22.1352 139.447 23.0895 139.389 24.1039H147.214C147.156 23.0895 146.717 22.1352 145.987 21.4333C145.247 20.7717 144.292 20.4063 143.301 20.4063C142.311 20.4063 141.356 20.7717 140.615 21.4333Z"
                   />
                <path
                    d="M152.077 30.0265C151.38 29.8307 150.727 29.4996 150.156 29.0518L150.828 27.8692C151.352 28.269 151.942 28.5725 152.571 28.7659C153.275 28.9994 154.012 29.1168 154.753 29.1136C155.761 29.1136 156.506 28.9576 156.987 28.6392C157.216 28.5006 157.403 28.3031 157.53 28.0673C157.657 27.8314 157.72 27.5656 157.711 27.2974C157.722 27.1153 157.693 26.9329 157.624 26.764C157.555 26.5951 157.449 26.4442 157.314 26.3228C157.019 26.0777 156.676 25.9002 156.306 25.8029C155.775 25.6566 155.236 25.5405 154.692 25.4553C153.963 25.3264 153.241 25.1539 152.532 24.9387C151.997 24.7672 151.516 24.4568 151.138 24.0388C150.728 23.5517 150.521 22.9244 150.56 22.2876C150.555 21.843 150.657 21.4038 150.858 21.0077C151.059 20.6116 151.352 20.2704 151.712 20.0134C152.483 19.4221 153.554 19.1265 154.925 19.1265C155.647 19.1272 156.367 19.2233 157.065 19.4124C157.689 19.5629 158.285 19.8153 158.828 20.1596L158.182 21.365C157.223 20.7154 156.087 20.3827 154.931 20.413C153.978 20.413 153.261 20.582 152.781 20.9199C152.557 21.0607 152.372 21.2571 152.245 21.4904C152.118 21.7236 152.052 21.9859 152.055 22.2519C152.047 22.4406 152.079 22.6287 152.15 22.8035C152.221 22.9784 152.328 23.136 152.465 23.2656C152.756 23.5281 153.104 23.7193 153.481 23.8244C154.034 23.9774 154.595 24.1011 155.16 24.1947C155.876 24.3236 156.584 24.4928 157.281 24.7016C157.803 24.8646 158.273 25.1626 158.644 25.5658C159.043 26.0338 159.247 26.6393 159.212 27.2552C159.223 27.7123 159.118 28.1647 158.906 28.5695C158.695 28.9743 158.385 29.3181 158.004 29.5684C157.199 30.1402 156.084 30.425 154.657 30.4229C153.782 30.4252 152.912 30.2915 152.077 30.0265Z"
                    />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="159.2" height="64" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    </NavLink>

export default Header