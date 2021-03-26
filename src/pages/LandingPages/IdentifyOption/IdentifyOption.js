import React, {useEffect, useState} from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import './IdentifyOption.less'
import {Radio} from 'antd'
import ContactForm from "./ContactForm"
import {Link} from "react-router-dom"
import {SVG} from "../../../utils/icons"

const AccelerateProfitsIcon = () => <svg width="80" height="64" viewBox="0 0 80 64" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
    <mask id="mask011" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="64">
        <rect width="80" height="64" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask011)">
        <path
            d="M33.7148 15.8666C33.7148 14.7621 34.6103 13.8666 35.7148 13.8666H43.8037C44.9083 13.8666 45.8037 14.7621 45.8037 15.8666V59.5111C45.8037 60.6156 44.9083 61.5111 43.8037 61.5111H35.7148C34.6103 61.5111 33.7148 60.6157 33.7148 59.5111V15.8666Z"
            fill="white"/>
        <path
            d="M47.2246 32.9333C47.2246 31.8287 48.12 30.9333 49.2246 30.9333H57.3135C58.4181 30.9333 59.3135 31.8287 59.3135 32.9333V55.1568C59.3135 55.9858 58.8021 56.7288 58.0278 57.0249L49.9389 60.1177C48.6295 60.6184 47.2246 59.6515 47.2246 58.2496V32.9333Z"
            fill="white"/>
        <path
            d="M20.2031 23.6888C20.2031 22.5843 21.0986 21.6888 22.2031 21.6888H30.292C31.3966 21.6888 32.292 22.5843 32.292 23.6888V58.2496C32.292 59.6515 30.8872 60.6184 29.5777 60.1177L21.4889 57.0249C20.7145 56.7288 20.2031 55.9858 20.2031 55.1568V23.6888Z"
            fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7.99495 28.0889H7.00149C6.23169 28.0889 5.75057 28.9222 6.13547 29.5889L9.02222 34.5889C9.40712 35.2556 10.3694 35.2556 10.7543 34.5889L13.641 29.5889C14.0259 28.9222 13.5448 28.0889 12.775 28.0889H11.5806C13.4864 14.2301 25.3758 3.55556 39.7583 3.55556C47.3261 3.55556 54.2018 6.50901 59.2994 11.3302C60.0127 12.0049 61.134 12.0479 61.8516 11.3778C62.5692 10.7077 62.611 9.57875 61.9023 8.89924C56.1553 3.38903 48.3514 0 39.7583 0C23.4092 0 9.92378 12.2606 7.99495 28.0889ZM69.376 25.9556C68.4138 26.1509 67.481 25.5273 67.2255 24.5792C66.9177 23.437 66.5406 22.3232 66.0988 21.2426C65.7272 20.3338 66.091 19.2724 66.9747 18.8444C67.8584 18.4165 68.9266 18.7842 69.3046 19.6904C69.8672 21.0394 70.3402 22.4353 70.7161 23.8704C70.9649 24.8202 70.3382 25.7602 69.376 25.9556ZM39.7583 60.4444C54.0793 60.4444 65.9284 49.8611 67.9111 36.0889H66.7348C65.965 36.0889 65.4839 35.2556 65.8688 34.5889L68.7556 29.5889C69.1405 28.9222 70.1027 28.9222 70.4876 29.5889L73.3744 34.5889C73.7593 35.2556 73.2781 36.0889 72.5083 36.0889H71.4995C69.4918 51.8311 56.0462 64 39.7583 64C28.0102 64 17.7435 57.6688 12.1795 48.2392C11.6805 47.3936 12.0259 46.3178 12.898 45.8667C13.77 45.4156 14.838 45.7603 15.3428 46.6024C20.3149 54.8975 29.3902 60.4444 39.7583 60.4444Z"
              fill="#83FED0"/>
        <path d="M7.40234 39.4667H29.0912L44.0246 25.9555H54.4996L70.6912 8.53333" stroke="#83FED0" stroke-width="3"
              stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M72.5748 7.78345C72.774 7.03988 72.0936 6.35947 71.35 6.55871L65.7733 8.053C65.0297 8.25224 64.7806 9.1817 65.325 9.72603L69.4075 13.8085C69.9518 14.3528 70.8813 14.1038 71.0805 13.3602L72.5748 7.78345Z"
            fill="#83FED0"/>
    </g>
</svg>

const MarketplacePotentialIcon = () => <svg width="80" height="64" viewBox="0 0 80 64" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0222" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="64">
        <rect width="80" height="64" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0222)">
        <path
            d="M61.3432 30.2128V55.7049C61.3432 57.3909 59.9944 58.7397 58.3084 58.7397H22.5655C20.8795 58.7397 19.5307 57.3909 19.5307 55.7049V30.2803C18.8563 30.4151 18.2494 30.4151 17.575 30.4151C16.496 30.4151 15.4169 30.2803 14.3379 30.0105V55.7724C14.3379 60.3582 18.0471 64 22.5655 64H58.3084C62.8268 64 66.536 60.2908 66.536 55.7724V30.0105C65.5244 30.2803 64.4454 30.4151 63.3663 30.4151C62.6919 30.4151 62.0175 30.3477 61.3432 30.2128Z"
            fill="white"/>
        <path
            d="M36.1872 30.078C35.3779 29.6734 34.3663 29.9431 33.9617 30.7524L30.2525 37.4289H28.3642C27.0155 37.4289 26.0713 38.6428 26.3411 39.9241L28.9712 52.4679C29.1735 53.412 30.0502 54.1539 30.9944 54.1539H50.0123C51.0239 54.1539 51.8332 53.4795 52.0355 52.4679L54.5982 39.9241C54.8679 38.6428 53.8563 37.4289 52.575 37.4289H50.6867L46.9775 30.7524C46.5729 29.9431 45.5613 29.6734 44.752 30.078C43.9427 30.4826 43.673 31.4942 44.0776 32.3035L46.9101 37.4289H33.9617L36.7942 32.3035C37.2662 31.4942 36.929 30.4826 36.1872 30.078ZM45.2915 42.6217C45.2915 41.8799 45.8985 41.2055 46.7078 41.2055C47.4496 41.2055 48.124 41.8125 48.124 42.6217V48.961C48.124 49.7029 47.517 50.3773 46.7078 50.3773C45.9659 50.3773 45.2915 49.7703 45.2915 48.961V42.6217ZM39.0197 42.6217C39.0197 41.8799 39.6266 41.2055 40.4359 41.2055C41.1777 41.2055 41.8521 41.8125 41.8521 42.6217V48.961C41.8521 49.7029 41.2452 50.3773 40.4359 50.3773C39.6941 50.3773 39.0197 49.7703 39.0197 48.961V42.6217ZM34.2315 41.2055C34.9733 41.2055 35.6477 41.8125 35.6477 42.6217V48.961C35.6477 49.7029 35.0407 50.3773 34.2315 50.3773C33.4896 50.3773 32.8152 49.7703 32.8152 48.961V42.6217C32.8152 41.8799 33.4222 41.2055 34.2315 41.2055Z"
            fill="#83FED0"/>
        <path
            d="M70.2448 15.1064L66.738 6.47418L66.3333 4.24868C65.8613 1.75342 63.7032 0 61.2079 0H19.7327C17.2374 0 15.0119 1.82086 14.6073 4.24868L14.1352 6.47418L10.6284 15.1064C9.88655 16.9947 9.75168 19.0854 10.4935 20.9062C11.64 23.8061 14.4724 25.627 17.5072 25.627C19.7327 25.627 21.7559 24.6828 23.1721 23.0643C24.5883 24.6828 26.6115 25.627 28.7696 25.627H29.1742C31.3323 25.627 33.288 24.6828 34.6368 23.2666C36.053 24.8177 38.0762 25.627 40.1668 25.627H40.7064C42.797 25.627 44.8202 24.7503 46.2364 23.1992C47.5852 24.6828 49.5409 25.627 51.699 25.627H52.1036C54.2617 25.627 56.2849 24.6828 57.7011 23.0643C59.1173 24.6154 61.1405 25.627 63.366 25.627C66.4008 25.627 69.1658 23.8061 70.3797 20.9062C71.1215 19.0854 70.9867 16.9947 70.2448 15.1064Z"
            fill="white"/>
    </g>
</svg>

const TotalSalesGrowthIcon = () => <svg width="80" height="64" viewBox="0 0 80 64" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0333" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="64">
        <rect width="80" height="64" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0333)">
        <path
            d="M20.9027 63H11.6696C11.1172 63 10.7227 62.6054 10.7227 62.053V44.8496C10.7227 44.2972 11.1172 43.9026 11.6696 43.9026H20.9027C21.4551 43.9026 21.8497 44.2972 21.8497 44.8496V62.053C21.8497 62.6054 21.3762 63 20.9027 63Z"
            fill="#83FED0"/>
        <path
            d="M37.5531 62.9999H28.32C27.7676 62.9999 27.373 62.6054 27.373 62.053V38.2996C27.373 37.7472 27.7676 37.3526 28.32 37.3526H37.5531C38.1055 37.3526 38.5 37.7472 38.5 38.2996V62.053C38.5 62.6054 38.1055 62.9999 37.5531 62.9999Z"
            fill="#83FED0"/>
        <path
            d="M53.4152 63H44.1032C43.5508 63 43.1562 62.6054 43.1562 62.053V30.9605C43.1562 30.4081 43.5508 30.0135 44.1032 30.0135H53.3363C53.8887 30.0135 54.2832 30.4081 54.2832 30.9605V62.1319C54.2832 62.6054 53.8887 63 53.4152 63Z"
            fill="#83FED0"/>
        <path
            d="M69.6722 63H60.4392C59.8868 63 59.4922 62.6054 59.4922 62.053V23.3847C59.4922 22.8323 59.8868 22.4377 60.4392 22.4377H69.6722C70.2246 22.4377 70.6192 22.8323 70.6192 23.3847V62.053C70.6192 62.6054 70.2246 63 69.6722 63Z"
            fill="#83FED0"/>
        <path
            d="M67.1465 0.104808V13.3625C67.1465 14.3095 65.9627 14.783 65.3314 14.1517L62.017 10.7583C61.7013 10.4427 61.2279 10.4427 60.9911 10.7583C44.6557 27.5672 21.2969 30.4081 11.1169 30.8816C10.7223 30.8816 10.4067 30.6449 10.3277 30.2503L10.0121 28.9087C9.93317 28.4353 10.2488 28.0407 10.7223 27.9618C11.5904 27.8829 12.3795 27.8039 13.2476 27.6461C14.9048 27.4094 16.4831 27.1726 18.0614 26.857C19.9554 26.4624 21.8493 26.0678 23.6644 25.5154C25.7951 24.963 27.8469 24.2528 29.8197 23.4636C32.0293 22.6745 34.239 21.6486 36.2907 20.6227C38.5793 19.5179 40.71 18.2552 42.8407 16.8348C45.0503 15.3354 47.181 13.7571 49.1539 11.942C51.2846 10.0481 53.2574 7.9963 55.0725 5.8656C55.3881 5.47102 55.7827 5.07645 55.546 4.52404C55.3882 4.12947 55.0725 3.89272 54.8357 3.65598C54.599 3.41923 54.2833 3.10357 54.0466 2.86683C53.5731 2.39334 53.0996 1.91985 52.5472 1.36745C52.3894 1.20962 52.1526 0.972873 51.9948 0.815043C51.2846 0.104809 51.837 -1 52.784 -1H65.9627C66.673 -1 67.1465 -0.526511 67.1465 0.104808Z"
            fill="white"/>
    </g>
</svg>

const BrandAwarenessIcon = () => <svg width="80" height="64" viewBox="0 0 80 64" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0444" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="64">
        <rect width="80" height="64" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0444)">
        <path d="M39.9998 13.8605V2M39.9998 2L33.7207 8.27907M39.9998 2L46.2788 8.27907" stroke="white" stroke-width="3"
              stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M39.9998 50.1395V62M39.9998 62L33.7207 55.7209M39.9998 62L46.2788 55.7209" stroke="white"
              stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21.8605 32.0001H10M10 32.0001L16.2791 38.2792M10 32.0001L16.2791 25.721" stroke="white"
              stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M58.1395 32.0002H70M70 32.0002L63.7209 38.2793M70 32.0002L63.7209 25.7212" stroke="white"
              stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M27.0121 19.2023L18.6255 10.8157M18.6255 10.8157L18.6255 19.6956M18.6255 10.8157L27.5055 10.8157"
              stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M52.6666 44.8554L61.0533 53.242M61.0533 53.242L52.1733 53.242M61.0533 53.242L61.0533 44.3621"
              stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M52.6656 19.2023L61.0522 10.8157M61.0522 10.8157L61.0522 19.6956M61.0522 10.8157L52.1723 10.8157"
              stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M27.013 44.8554L18.6264 53.242M18.6264 53.242L27.5064 53.242M18.6264 53.242L18.6264 44.3621"
              stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M53.7508 31.3973C53.7508 31.3973 47.9276 24.4954 39.9998 24.4954C32.0725 24.4954 26.2489 31.3973 26.2489 31.3973C25.917 31.7906 25.917 32.4342 26.2489 32.8279C26.2489 32.8274 32.0725 39.7293 39.9998 39.7293C47.9272 39.7293 53.7503 32.8274 53.7503 32.8274C54.0826 32.4342 54.0826 31.7906 53.7508 31.3973ZM39.9998 37.976C36.7617 37.976 34.1362 35.351 34.1362 32.1124C34.1362 28.8737 36.7617 26.2487 39.9998 26.2487C43.238 26.2487 45.8635 28.8742 45.8635 32.1124C45.8635 35.3505 43.2385 37.976 39.9998 37.976Z"
            fill="#83FED0"/>
        <path
            d="M39.9984 37.976C36.7602 37.976 34.1348 35.351 34.1348 32.1123C34.1348 28.8737 36.7602 26.2487 39.9984 26.2487C43.2365 26.2487 45.862 28.8742 45.862 32.1123C45.862 35.3505 43.237 37.976 39.9984 37.976Z"
            fill="#6D6DF6"/>
        <path
            d="M42.7647 30.8856C42.0759 30.8856 41.517 30.3272 41.517 29.6378C41.517 29.4579 41.5555 29.2865 41.6241 29.1323C41.1414 28.8685 40.5877 28.7186 39.9993 28.7186C38.125 28.7186 36.6055 30.2381 36.6055 32.1124C36.6055 33.9866 38.125 35.5067 39.9993 35.5067C41.8735 35.5067 43.3931 33.9871 43.3931 32.1129C43.3931 31.6582 43.3031 31.2245 43.1408 30.828C43.0223 30.8651 42.8956 30.8856 42.7647 30.8856Z"
            fill="white"/>
    </g>
</svg>

const list = [
    {
        title: `<span>Accelerate</span> Profits`,
        options: [
            'Efficient budget allocation to prevent cannibalization',
            'AI bids optimization for ROAS maximization',
            'High focus on Video and Sponsored Display Campaigns to take over the competitors',
            'Deep keywords/targets research to find hidden opportunities',
            'Custom Analytics'
        ],
        values: [
            'This is a perfect solution for seasoned Amazon Sellers that are looking for a proven data-driven Growth System and advanced team that can scale the profits in order to invest in new products to expand the brand and diversify the revenue stream',
            'It covers all types of Amazon Advertising (SP,SD,SB,SBV) to fuel the growth and make sure that we spend every $1 on ADS with the maximum ROAS possible',
            'The strong organic sales growth is #1 goal, the #2 is preventing cannibalization of organic sales by ads sales',
            'Advertising management is just a beginning, with our dedicated team you’ll get a trusted partner for life',
            'Choosing us as your service provider is like buying BTC back in 2010'
        ],
        icon: <AccelerateProfitsIcon/>
    },
    {
        title: `<span>Accelerate your</span> <br> Marketplace Potential`,
        options: [
            'High utilization of SP/SBV/SD campaigns',
            'Incremental increase in traffic',
            'Niche monopolization',
            'Focus on getting and defending Best Sellers Tags',
            'Business Analytics'
        ],
        values: [
            'This is a perfect solution for Brands that value expertise and proactivity so as to find long term growth.',
            'It is closed solution and there is no need to build an in-house Advertising team and spend hundreds of dollars on things that don\'t work',
            'The goal is dramatic acceleration that is achieved through human solutions, AI bidding, and budget algorithms',
            'Sponsored Products, Brands, Display coverage increase brand awareness and get most out of advertising. This all combined with custom software, expertise in listing optimization and inventory management opens the door to long term growth of Brand on Amazon platform',
            'Be prepared for exponential growth of your customer base'
        ],
        icon: <MarketplacePotentialIcon/>
    },
    {
        title: `<span>Accelerate </span>Total Sales <br> Growth`,
        options: [
            'Incremental growth of every AD type',
            'Getting and keeping Best Sellers',
            'Ranking new keywords with Amazon Advertising',
            'Data-driven product launches',
            'DSP campaigns management',
            'Deep Analytics'
        ],
        values: [
            'This is a perfect solution for Big Amazon Sellers that already have a huge customer base, but the growth is freezing or increasing not as fast as you wish',
            'It covers different ranges of activities, whether it’s new keywords ranking, bids optimization or hunting the Best Seller, testing new tags. It also covers all types of Seller Central Advertising and DSP as well as high utilization of new instruments like Sponsored Brands Video, Sponsored Display for rapid growth',
            'The AI bids and budgets management is a part of strategic growth',
            'This option covers everything, from product launches to reporting and advanced forecasting with only ONE thought in mind - PROFIT. The entire focus is on profit acceleration and there are multiple ways to achieve it',
            'If you are looking for a Rolls Royce on the Market of Amazon Advertising Agencies and Tech Providers you are in the right place',
        ],
        icon: <TotalSalesGrowthIcon/>
    },
    {
        title: `<span>Accelerate</span> Brand <br> Awareness`,
        options: [
            'Wide SP/SBV/SD campaigns',
            'Brand Defend campaigns strategy',
            'Niche monopolization',
            'Multichannel control and boosting',
            'Data driven campaigns boost',
            'Custom analysis and research'
        ],
        values: [
            'This is a perfect option for Amazon Sellers with a strong brand strategy. Main focus is on defending all brand products and finding the best opportunities to attract competitors',
            'SP / SD / SB - work in synergy within one direction. All products are included in one chain for getting the best results. Multi channel strategy for full control and optimization',
            'This option allows businesses to get full control and high brand awareness within a few months for next year',
            'All campaigns are developed based on the big data analysis and enable unique strategic options to work on the fast and efficient goal achievement',
            'Be ready to accelerated growth'
        ],
        icon: <BrandAwarenessIcon/>
    }
]

const IdentifyOption = () => {
    const [selectedOption, setSelectedOption] = useState(0),
        [openedOption, setOpenedOption] = useState(),
        [visibleContactForm, setVisibleContactForm] = useState(false)

    const accelerateVariations = ['profits', 'marketplace_potential', 'total_sales_growth', 'brand_awareness']

    const selectOptionHandler = (index) => {
        const optionList = document.querySelectorAll('.option-details > li')


        if (index > selectedOption) {
            optionList.forEach(item => {
                item.style.transform = 'translateX(-150px)'
            })

            optionList[index].style.transform = 'translateX(150px)'
        } else {
            optionList.forEach(item => {
                item.style.transform = 'translateX(150px)'
            })
            optionList[index].style.transform = 'translateX(-150px)'
        }

        setTimeout(() => {
            setSelectedOption(index)
        }, 100)
    }


    return (
        <div className="identify-option  landing-page">
            <Header/>

            <section className="pre-header">
                <div className="container">
                    <h1>
                        Identify <br/>
                        <span>your option</span>
                    </h1>
                </div>
            </section>

            <section className={'advertising-strategy'}>
                <div className="container">
                    <div className="col">
                        <h2>
                            Custom Amazon advertising strategy <span>to accelerate your performance</span>
                        </h2>

                        <p>
                            We believe that the sustainable and data-driven marketing approach based on the synergy of
                            machine and human decisions that drives superior performance on retail platforms lies in the
                            heart of Profit Whales company, focusing our strategy to be tied to the creation of
                            long-term value for all our stakeholders.
                        </p>

                        <Link to={'/get-audit'} className={'btn default desc'}>
                            <p><span>Get Your</span> Amazon Advertising <br/> Campaigns <span>Review</span></p>

                            <svg width="84" height="84" viewBox="0 0 84 84" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="42" cy="42" r="40" stroke="#83FED0" stroke-width="4"/>
                                <path d="M30.8379 35.0232L38.7449 43.3953L30.8379 51.7674" stroke="#83FED0"
                                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M45.7207 35.0232L53.6277 43.3953L45.7207 51.7674" stroke="#83FED0"
                                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Link>

                        <Link to={'/get-audit'} className={'btn default mob'}>
                            get an audit

                            <svg width="84" height="84" viewBox="0 0 84 84" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="42" cy="42" r="40" stroke="#83FED0" stroke-width="4"/>
                                <path d="M30.8379 35.0232L38.7449 43.3953L30.8379 51.7674" stroke="#83FED0"
                                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M45.7207 35.0232L53.6277 43.3953L45.7207 51.7674" stroke="#83FED0"
                                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <section className={'acceleration-options'}>
                <div className="container">
                    <h2>
                        Define <span>the perfect path</span> to accelerate your business
                    </h2>

                    <p>
                        This is a great start to accelerate your brand performance! We are offering the services that
                        achive your goals best. Through <br/>
                        the deep analysis of the niche and data, we would generate the most effective approach to
                        achieve your targets. Let's <br/>
                        identify your priorities and let the work begin. With our algorithms, big data, AI, unique
                        approach, and team of professionals, <br/>
                        you would reach your goals and become a Whale in Your Ocean
                    </p>

                    <div className="row">
                        <div className="col">
                            <h4>choose What do you want to accelerate?</h4>
                            <Radio.Group
                                onChange={({target: {value}}) => selectOptionHandler(value)}
                                value={selectedOption}
                            >
                                <ul className={'main-list'}>
                                    {list.map((item, index) => (
                                        <li
                                            className={index === selectedOption ? 'active' : ''}
                                            onClick={() => selectOptionHandler(index)}
                                        >
                                            <Radio value={index}>
                                                <h4 dangerouslySetInnerHTML={{__html: item.title}}></h4>
                                            </Radio>

                                            <h4 className={'title'} dangerouslySetInnerHTML={{__html: item.title}}/>

                                            <ul>
                                                {item.options.map(text => <li>{text}</li>)}
                                            </ul>

                                            <div className="buttons">
                                                <button className={'btn transparent'}
                                                        onClick={() => {
                                                            setSelectedOption(index)
                                                            setOpenedOption(index)
                                                        }}>
                                                    learn more
                                                </button>

                                                <button className={'btn default'} onClick={() => {
                                                    setSelectedOption(index)
                                                    setOpenedOption(index)
                                                    setVisibleContactForm(true)
                                                }}>
                                                    let’s get started

                                                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <mask id="mask09991" mask-type="alpha"
                                                              maskUnits="userSpaceOnUse" x="0"
                                                              y="0" width="17" height="12">
                                                            <rect width="16.8" height="12"
                                                                  transform="matrix(-1 0 0 1 16.7998 0)"
                                                                  fill="#C4C4C4"/>
                                                        </mask>
                                                        <g mask="url(#mask09991)">
                                                            <path
                                                                d="M5.69961 1.20001L1.19961 6.00001M1.19961 6.00001L5.69961 10.8M1.19961 6.00001L15.5996 6.00001"
                                                                stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Radio.Group>
                        </div>

                        <div className="col">
                            <h4>try it</h4>

                            <ul className={`option-details ${openedOption >= 0 ? 'visible' : ''}`}>
                                <button className={'btn close'} onClick={() => {
                                    setVisibleContactForm(false)
                                    setOpenedOption(undefined)
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                              width="20" height="20">
                                            <rect width="20" height="20" fill="#C4C4C4"/>
                                        </mask>
                                        <g mask="url(#mask0)">
                                            <path
                                                d="M1 1L9.96875 9.96875M9.96875 9.96875L18.9375 1M9.96875 9.96875L1 18.9375M9.96875 9.96875L18.9375 18.9375"
                                                stroke="white" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                        </g>
                                    </svg>
                                </button>

                                {list.map((item, index) => (
                                    <li className={(index === selectedOption && !visibleContactForm) ? 'active' : ''}>
                                        <i>
                                            {item.icon}
                                        </i>

                                        <h3 dangerouslySetInnerHTML={{__html: item.title}}/>

                                        <ul>
                                            {item.values.map(value => <li>{value}</li>)}
                                        </ul>

                                        <button className="btn green" onClick={() => {
                                            setVisibleContactForm(true)
                                        }}>
                                            let’s get started

                                            <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0999" mask-type="alpha" maskUnits="userSpaceOnUse" x="0"
                                                      y="0" width="17" height="12">
                                                    <rect width="16.8" height="12"
                                                          transform="matrix(-1 0 0 1 16.7998 0)" fill="#C4C4C4"/>
                                                </mask>
                                                <g mask="url(#mask0999)">
                                                    <path
                                                        d="M5.69961 1.20001L1.19961 6.00001M1.19961 6.00001L5.69961 10.8M1.19961 6.00001L15.5996 6.00001"
                                                        stroke="#6D6DF6" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"/>
                                                </g>
                                            </svg>
                                        </button>
                                    </li>
                                ))}

                                <li className={visibleContactForm ? 'active contact-li' : 'contact-li'}>
                                    <ContactForm
                                        accelerateValue={accelerateVariations[selectedOption]}
                                        onCancel={() => setVisibleContactForm(false)}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}


export default IdentifyOption