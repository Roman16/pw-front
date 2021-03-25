import React, {useState} from "react"
import Steps from "./Steps"
import {Input, Radio} from "antd"
import {SVG} from "../../../utils/icons"
import {Link} from "react-router-dom"


const countDots4 = () => <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M11.1969 18.2678C12.1732 17.2915 12.1732 15.7085 11.1969 14.7322C10.2205 13.7559 8.63763 13.7559 7.66132 14.7322C6.68501 15.7085 6.68501 17.2915 7.66132 18.2678C8.63763 19.2441 10.2205 19.2441 11.1969 18.2678Z"
        fill="#6D6DF6"/>
    <path
        d="M18.2681 25.3388C19.2445 24.3625 19.2445 22.7796 18.2681 21.8033C17.2918 20.827 15.7089 20.827 14.7326 21.8033C13.7563 22.7796 13.7563 24.3625 14.7326 25.3388C15.7089 26.3151 17.2918 26.3151 18.2681 25.3388Z"
        fill="#6D6DF6"/>
    <path
        d="M18.2681 11.1967C19.2445 10.2204 19.2445 8.6375 18.2681 7.66119C17.2918 6.68488 15.7089 6.68488 14.7326 7.66119C13.7563 8.6375 13.7563 10.2204 14.7326 11.1967C15.7089 12.173 17.2918 12.173 18.2681 11.1967Z"
        fill="#6D6DF6"/>
    <path
        d="M25.3394 18.2678C26.3157 17.2915 26.3157 15.7085 25.3394 14.7322C24.3631 13.7559 22.7802 13.7559 21.8039 14.7322C20.8276 15.7085 20.8276 17.2915 21.8039 18.2678C22.7802 19.2441 24.3631 19.2441 25.3394 18.2678Z"
        fill="#6D6DF6"/>
</svg>
const countDots5 = () => <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M9.27282 17.8181C10.0259 17.8181 10.6365 17.2076 10.6365 16.4545C10.6365 15.7013 10.0259 15.0908 9.27282 15.0908C8.5197 15.0908 7.90918 15.7013 7.90918 16.4545C7.90918 17.2076 8.5197 17.8181 9.27282 17.8181Z"
        fill="#6D6DF6"/>
    <path
        d="M11.0902 23.2726C11.8433 23.2726 12.4538 22.4586 12.4538 21.4544C12.4538 20.4503 11.8433 19.6362 11.0902 19.6362C10.3371 19.6362 9.72656 20.4503 9.72656 21.4544C9.72656 22.4586 10.3371 23.2726 11.0902 23.2726Z"
        fill="#6D6DF6"/>
    <path
        d="M17.0008 25.091C18.005 25.091 18.819 24.4805 18.819 23.7274C18.819 22.9743 18.005 22.3638 17.0008 22.3638C15.9966 22.3638 15.1826 22.9743 15.1826 23.7274C15.1826 24.4805 15.9966 25.091 17.0008 25.091Z"
        fill="#6D6DF6"/>
    <path
        d="M22.9095 23.2726C23.6627 23.2726 24.2732 22.4586 24.2732 21.4544C24.2732 20.4503 23.6627 19.6362 22.9095 19.6362C22.1564 19.6362 21.5459 20.4503 21.5459 21.4544C21.5459 22.4586 22.1564 23.2726 22.9095 23.2726Z"
        fill="#6D6DF6"/>
    <path
        d="M17.0657 17.9479C18.1058 17.9479 18.9489 17.1048 18.9489 16.0648C18.9489 15.0247 18.1058 14.1816 17.0657 14.1816C16.0257 14.1816 15.1826 15.0247 15.1826 16.0648C15.1826 17.1048 16.0257 17.9479 17.0657 17.9479Z"
        fill="#6D6DF6"/>
    <path
        d="M24.7269 17.8181C25.48 17.8181 26.0906 17.2076 26.0906 16.4545C26.0906 15.7013 25.48 15.0908 24.7269 15.0908C23.9738 15.0908 23.3633 15.7013 23.3633 16.4545C23.3633 17.2076 23.9738 17.8181 24.7269 17.8181Z"
        fill="#6D6DF6"/>
    <path
        d="M11.6097 12.4933C12.6497 12.4933 13.4928 11.6502 13.4928 10.6102C13.4928 9.57015 12.6497 8.72705 11.6097 8.72705C10.5697 8.72705 9.72656 9.57015 9.72656 10.6102C9.72656 11.6502 10.5697 12.4933 11.6097 12.4933Z"
        fill="#6D6DF6"/>
    <path
        d="M17.0657 9.76623C18.1058 9.76623 18.9489 8.92313 18.9489 7.88312C18.9489 6.8431 18.1058 6 17.0657 6C16.0257 6 15.1826 6.8431 15.1826 7.88312C15.1826 8.92313 16.0257 9.76623 17.0657 9.76623Z"
        fill="#6D6DF6"/>
    <path
        d="M22.5198 12.4933C23.5599 12.4933 24.403 11.6502 24.403 10.6102C24.403 9.57015 23.5599 8.72705 22.5198 8.72705C21.4798 8.72705 20.6367 9.57015 20.6367 10.6102C20.6367 11.6502 21.4798 12.4933 22.5198 12.4933Z"
        fill="#6D6DF6"/>
    <path
        d="M17 6C15.7806 6 14.7778 7.00282 14.7778 8.22222C14.7778 9.44163 15.7806 10.4444 17 10.4444C18.2194 10.4444 19.2222 9.44163 19.2222 8.22222C19.2222 7.00282 18.2194 6 17 6ZM17 7.33333C17.4988 7.33333 17.8889 7.72341 17.8889 8.22222C17.8889 8.72104 17.4988 9.11111 17 9.11111C16.5012 9.11111 16.1111 8.72104 16.1111 8.22222C16.1111 7.72341 16.5012 7.33333 17 7.33333ZM11.4444 8.22222C10.225 8.22222 9.22222 9.22504 9.22222 10.4444C9.22222 11.6638 10.225 12.6667 11.4444 12.6667C12.6638 12.6667 13.6667 11.6638 13.6667 10.4444C13.6667 9.22504 12.6638 8.22222 11.4444 8.22222ZM22.5556 8.22222C21.3362 8.22222 20.3333 9.22504 20.3333 10.4444C20.3333 11.6638 21.3362 12.6667 22.5556 12.6667C23.775 12.6667 24.7778 11.6638 24.7778 10.4444C24.7778 9.22504 23.775 8.22222 22.5556 8.22222ZM11.4444 9.55556C11.9433 9.55556 12.3333 9.94563 12.3333 10.4444C12.3333 10.9433 11.9433 11.3333 11.4444 11.3333C10.9456 11.3333 10.5556 10.9433 10.5556 10.4444C10.5556 9.94563 10.9456 9.55556 11.4444 9.55556ZM22.5556 9.55556C23.0544 9.55556 23.4444 9.94563 23.4444 10.4444C23.4444 10.9433 23.0544 11.3333 22.5556 11.3333C22.0567 11.3333 21.6667 10.9433 21.6667 10.4444C21.6667 9.94563 22.0567 9.55556 22.5556 9.55556ZM9.22222 13.7778C8.00282 13.7778 7 14.7806 7 16C7 17.2194 8.00282 18.2222 9.22222 18.2222C10.4416 18.2222 11.4444 17.2194 11.4444 16C11.4444 14.7806 10.4416 13.7778 9.22222 13.7778ZM17 13.7778C15.7806 13.7778 14.7778 14.7806 14.7778 16C14.7778 17.2194 15.7806 18.2222 17 18.2222C18.2194 18.2222 19.2222 17.2194 19.2222 16C19.2222 14.7806 18.2194 13.7778 17 13.7778ZM24.7778 13.7778C23.5584 13.7778 22.5556 14.7806 22.5556 16C22.5556 17.2194 23.5584 18.2222 24.7778 18.2222C25.9972 18.2222 27 17.2194 27 16C27 14.7806 25.9972 13.7778 24.7778 13.7778ZM9.22222 15.1111C9.72104 15.1111 10.1111 15.5012 10.1111 16C10.1111 16.4988 9.72104 16.8889 9.22222 16.8889C8.72341 16.8889 8.33333 16.4988 8.33333 16C8.33333 15.5012 8.72341 15.1111 9.22222 15.1111ZM17 15.1111C17.4988 15.1111 17.8889 15.5012 17.8889 16C17.8889 16.4988 17.4988 16.8889 17 16.8889C16.5012 16.8889 16.1111 16.4988 16.1111 16C16.1111 15.5012 16.5012 15.1111 17 15.1111ZM24.7778 15.1111C25.2766 15.1111 25.6667 15.5012 25.6667 16C25.6667 16.4988 25.2766 16.8889 24.7778 16.8889C24.279 16.8889 23.8889 16.4988 23.8889 16C23.8889 15.5012 24.279 15.1111 24.7778 15.1111ZM11.4444 19.3333C10.225 19.3333 9.22222 20.3362 9.22222 21.5556C9.22222 22.775 10.225 23.7778 11.4444 23.7778C12.6638 23.7778 13.6667 22.775 13.6667 21.5556C13.6667 20.3362 12.6638 19.3333 11.4444 19.3333ZM22.5556 19.3333C21.3362 19.3333 20.3333 20.3362 20.3333 21.5556C20.3333 22.775 21.3362 23.7778 22.5556 23.7778C23.775 23.7778 24.7778 22.775 24.7778 21.5556C24.7778 20.3362 23.775 19.3333 22.5556 19.3333ZM11.4444 20.6667C11.9433 20.6667 12.3333 21.0567 12.3333 21.5556C12.3333 22.0544 11.9433 22.4444 11.4444 22.4444C10.9456 22.4444 10.5556 22.0544 10.5556 21.5556C10.5556 21.0567 10.9456 20.6667 11.4444 20.6667ZM22.5556 20.6667C23.0544 20.6667 23.4444 21.0567 23.4444 21.5556C23.4444 22.0544 23.0544 22.4444 22.5556 22.4444C22.0567 22.4444 21.6667 22.0544 21.6667 21.5556C21.6667 21.0567 22.0567 20.6667 22.5556 20.6667ZM17 21.5556C15.7806 21.5556 14.7778 22.5584 14.7778 23.7778C14.7778 24.9972 15.7806 26 17 26C18.2194 26 19.2222 24.9972 19.2222 23.7778C19.2222 22.5584 18.2194 21.5556 17 21.5556ZM17 22.8889C17.4988 22.8889 17.8889 23.279 17.8889 23.7778C17.8889 24.2766 17.4988 24.6667 17 24.6667C16.5012 24.6667 16.1111 24.2766 16.1111 23.7778C16.1111 23.279 16.5012 22.8889 17 22.8889Z"
        fill="#6D6DF6"/>
</svg>

const countDots6 = () => <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M6.64285 7.2857C7.55017 7.2857 8.2857 6.55017 8.2857 5.64285C8.2857 4.73553 7.55017 4 6.64285 4C5.73553 4 5 4.73553 5 5.64285C5 6.55017 5.73553 7.2857 6.64285 7.2857Z"
        fill="#6D6DF6"/>
    <path
        d="M6.64285 13.8572C7.55017 13.8572 8.2857 13.1217 8.2857 12.2144C8.2857 11.3071 7.55017 10.5715 6.64285 10.5715C5.73553 10.5715 5 11.3071 5 12.2144C5 13.1217 5.73553 13.8572 6.64285 13.8572Z"
        fill="#6D6DF6"/>
    <path
        d="M13.2161 7.2857C14.1234 7.2857 14.8589 6.55017 14.8589 5.64285C14.8589 4.73553 14.1234 4 13.2161 4C12.3088 4 11.5732 4.73553 11.5732 5.64285C11.5732 6.55017 12.3088 7.2857 13.2161 7.2857Z"
        fill="#6D6DF6"/>
    <path
        d="M13.2161 13.8572C14.1234 13.8572 14.8589 13.1217 14.8589 12.2144C14.8589 11.3071 14.1234 10.5715 13.2161 10.5715C12.3088 10.5715 11.5732 11.3071 11.5732 12.2144C11.5732 13.1217 12.3088 13.8572 13.2161 13.8572Z"
        fill="#6D6DF6"/>
    <path
        d="M6.64285 20.4285C7.55017 20.4285 8.2857 19.693 8.2857 18.7857C8.2857 17.8784 7.55017 17.1428 6.64285 17.1428C5.73553 17.1428 5 17.8784 5 18.7857C5 19.693 5.73553 20.4285 6.64285 20.4285Z"
        fill="#6D6DF6"/>
    <path
        d="M6.64285 26.9998C7.55017 26.9998 8.2857 26.2643 8.2857 25.357C8.2857 24.4496 7.55017 23.7141 6.64285 23.7141C5.73553 23.7141 5 24.4496 5 25.357C5 26.2643 5.73553 26.9998 6.64285 26.9998Z"
        fill="#6D6DF6"/>
    <path
        d="M13.2161 20.4285C14.1234 20.4285 14.8589 19.693 14.8589 18.7857C14.8589 17.8784 14.1234 17.1428 13.2161 17.1428C12.3088 17.1428 11.5732 17.8784 11.5732 18.7857C11.5732 19.693 12.3088 20.4285 13.2161 20.4285Z"
        fill="#6D6DF6"/>
    <path
        d="M13.2161 26.9998C14.1234 26.9998 14.8589 26.2643 14.8589 25.357C14.8589 24.4496 14.1234 23.7141 13.2161 23.7141C12.3088 23.7141 11.5732 24.4496 11.5732 25.357C11.5732 26.2643 12.3088 26.9998 13.2161 26.9998Z"
        fill="#6D6DF6"/>
    <path
        d="M19.7825 7.2857C20.6898 7.2857 21.4254 6.55017 21.4254 5.64285C21.4254 4.73553 20.6898 4 19.7825 4C18.8752 4 18.1396 4.73553 18.1396 5.64285C18.1396 6.55017 18.8752 7.2857 19.7825 7.2857Z"
        fill="#6D6DF6"/>
    <path
        d="M19.7835 13.8572C20.6908 13.8572 21.4263 13.1217 21.4263 12.2144C21.4263 11.3071 20.6908 10.5715 19.7835 10.5715C18.8762 10.5715 18.1406 11.3071 18.1406 12.2144C18.1406 13.1217 18.8762 13.8572 19.7835 13.8572Z"
        fill="#6D6DF6"/>
    <path
        d="M26.3567 7.2857C27.264 7.2857 27.9996 6.55017 27.9996 5.64285C27.9996 4.73553 27.264 4 26.3567 4C25.4494 4 24.7139 4.73553 24.7139 5.64285C24.7139 6.55017 25.4494 7.2857 26.3567 7.2857Z"
        fill="#6D6DF6"/>
    <path
        d="M26.3567 13.8572C27.264 13.8572 27.9996 13.1217 27.9996 12.2144C27.9996 11.3071 27.264 10.5715 26.3567 10.5715C25.4494 10.5715 24.7139 11.3071 24.7139 12.2144C24.7139 13.1217 25.4494 13.8572 26.3567 13.8572Z"
        fill="#6D6DF6"/>
    <path
        d="M19.7825 20.4285C20.6898 20.4285 21.4254 19.693 21.4254 18.7857C21.4254 17.8784 20.6898 17.1428 19.7825 17.1428C18.8752 17.1428 18.1396 17.8784 18.1396 18.7857C18.1396 19.693 18.8752 20.4285 19.7825 20.4285Z"
        fill="#6D6DF6"/>
    <path
        d="M19.7835 27.0001C20.6908 27.0001 21.4263 26.2645 21.4263 25.3572C21.4263 24.4499 20.6908 23.7144 19.7835 23.7144C18.8762 23.7144 18.1406 24.4499 18.1406 25.3572C18.1406 26.2645 18.8762 27.0001 19.7835 27.0001Z"
        fill="#6D6DF6"/>
    <path
        d="M26.3567 20.4285C27.264 20.4285 27.9996 19.693 27.9996 18.7857C27.9996 17.8784 27.264 17.1428 26.3567 17.1428C25.4494 17.1428 24.7139 17.8784 24.7139 18.7857C24.7139 19.693 25.4494 20.4285 26.3567 20.4285Z"
        fill="#6D6DF6"/>
    <path
        d="M26.3567 27.0001C27.264 27.0001 27.9996 26.2645 27.9996 25.3572C27.9996 24.4499 27.264 23.7144 26.3567 23.7144C25.4494 23.7144 24.7139 24.4499 24.7139 25.3572C24.7139 26.2645 25.4494 27.0001 26.3567 27.0001Z"
        fill="#6D6DF6"/>
</svg>

const monthlyAdSpendVariations = [
    {
        label: 'below $10k',
        value: 'below_10k'
    },
    {
        label: '$10k-30k',
        value: '10_30k'
    },
    {
        label: '$30k-60k',
        value: '30_60k'
    },
    {
        label: '$60k-100k',
        value: '60_100k'
    },
    {
        label: 'Over $100k',
        value: 'over_100k'
    },
]

const monthlySalesVariations = [
    {
        label: 'below $50k',
        value: 'below_50k'
    },
    {
        label: '$50k-200k',
        value: '50_200k'
    },
    {
        label: '$200k-500k',
        value: '200_500k'
    },
    {
        label: '$500k-1m',
        value: '500_1000k'
    },
    {
        label: '$1m-5m',
        value: '1000_5000k'
    },
    {
        label: 'Over $5m',
        value: 'over_5m'
    },
]

const marketplaceVariations = [
    {
        label: 'US',
        value: 'ATVPDKIKX0DER',
        icon: 'us'
    },
    {
        label: 'Ca',
        value: 'A2EUQ1WTGCTBG2',
        icon: 'ca'
    },
    {
        label: 'EU',
        value: 'A1PA6795UKMFR9',
        icon: 'eu'
    },
    {
        label: 'AU',
        value: 'A39IBJ37TRP1C6',
        icon: 'au'
    },
    {
        label: 'UK',
        value: 'A1F83G8C2ARO7P',
        icon: 'uk'
    },
    {
        label: 'UAE',
        value: 'A13V1IB3VIYZZ',
        icon: 'uae'
    },
    {
        label: 'Other',
        value: 'other',
        icon: 'other'
    },
]

const amountProductsVariations = [
    {
        label: '1-5',
        value: '1_5'
    },
    {
        label: '6-20',
        value: '6-20'
    },
    {
        label: '20-50',
        value: '20_50'
    },
    {
        label: '50-100',
        value: '50_100',
        icon: countDots4
    },
    {
        label: '100-200',
        value: '100_200',
        icon: countDots5
    },
    {
        label: '200+',
        value: 'over_200',
        icon: countDots6
    },
]

export const advertisingStrategyVariations = [
    {
        label: 'ACoS Targeting',
        value: 'acos_targeting',
    },
    {
        label: 'PPC Profit Growth',
        value: 'ppc_profit_growth',
    },
    {
        label: 'Product Launch',
        value: 'product_launch',
    },
    {
        label: 'Low Inventory HPLS',
        value: 'low_inventory_hpls',
    },
    {
        label: 'Overall Profit Growth',
        value: 'overall_profit_growth',
    },
    {
        label: 'Get Best Seller Tag',
        value: 'get_best_seller_tag',
    },
    {
        label: 'Defend Best Seller Tag',
        value: 'defend_best_seller_tag',
    },
    {
        label: 'New Keywords Ranking',
        value: 'new_keywords_ranking',
    },
    {
        label: 'other',
        value: 'other',
    },
]


const AuditForm = ({active, formData, onUpdate, onSubmit}) => {
    const [activeStep, setActiveStep] = useState(0)

    const goNextStepHandler = (e) => {
        e.preventDefault()

        if (activeStep === 6) onSubmit()
        else setActiveStep(prevState => prevState + 1)
    }

    const changeFormHandler = (key, value) => {
        onUpdate({
            ...formData,
            [key]: value
        })
    }

    const NavigationButtons = () => {
        return (
            <div className="navigation">
                {activeStep > 0 &&
                <button type={'button'} className="btn transparent" onClick={() => setActiveStep(activeStep - 1)}>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                              height="12">
                            <rect width="16.8" height="12" transform="matrix(-1 0 0 1 16.7998 0)" fill="#C4C4C4"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path
                                d="M5.69961 1.19995L1.19961 5.99995M1.19961 5.99995L5.69961 10.8M1.19961 5.99995L15.5996 5.99995"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>

                    back
                </button>
                }
                <button className="btn default">
                    {activeStep === 6 ? 'Get an audit' : <>
                        next
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                                  height="12">
                                <rect width="16.8" height="12" fill="#C4C4C4"/>
                            </mask>
                            <g mask="url(#mask0)">
                                <path
                                    d="M11.1002 1.19995L15.6002 5.99995M15.6002 5.99995L11.1002 10.8M15.6002 5.99995L1.20019 5.99995"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </>}
                </button>
            </div>
        )
    }

    return (
        <section className={`form-section ${active ? 'active' : ''}`}>
            <Steps
                activeStep={activeStep}
                goToStep={(step) => setActiveStep(step)}
            />

            <div className="form-box">
                <div className={`step step-0 ${activeStep === 0 ? 'active' : ''}`}>
                    <h3>
                        Contact Information
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <Input
                                required={true}
                                placeholder={'First Name'}
                                value={formData.first_name}
                                onChange={({target: {value}}) => changeFormHandler('first_name', value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <Input
                                placeholder={'Last Name'}
                                value={formData.last_name}
                                onChange={({target: {value}}) => changeFormHandler('last_name', value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <Input
                                required={true}
                                placeholder={'E-mail'}
                                value={formData.email}
                                onChange={({target: {value}}) => changeFormHandler('email', value)}
                            />
                        </div>

                        <NavigationButtons/>
                    </form>
                </div>

                <div className={`step step-1 ${activeStep === 1 ? 'active' : ''}`}>
                    <h3>
                        Brand Information
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <div className="form-group">
                            <label htmlFor="">Store Front Name</label>
                            <Input
                                required={true}
                                placeholder={'Store Front Name'}
                                value={formData.storefront_name}
                                onChange={({target: {value}}) => changeFormHandler('storefront_name', value)}
                            />
                        </div>

                        <div className="form-group radio">
                            <label htmlFor="">Do you have brand registry?</label>

                            <Radio.Group
                                value={formData.is_has_brand_registry}
                                onChange={({target: {value}}) => changeFormHandler('is_has_brand_registry', value)}
                            >
                                <Radio value={true}>
                                    Yes
                                </Radio>

                                <Radio value={false}>
                                    No
                                </Radio>
                            </Radio.Group>
                        </div>

                        <NavigationButtons/>
                    </form>
                </div>

                <div className={`step step-2 ${activeStep === 2 ? 'active' : ''}`}>
                    <h3>
                        What is your Average monthly Ad Spend?
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <Radio.Group
                            value={formData.avg_monthly_ad_spend}
                            onChange={({target: {value}}) => changeFormHandler('avg_monthly_ad_spend', value)}
                        >
                            <ul>
                                {monthlyAdSpendVariations.map(item => (
                                    <li
                                        className={formData.avg_monthly_ad_spend === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
                                    >
                                        <label>{item.label}</label>
                                        <Radio value={item.value}/>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <NavigationButtons/>
                    </form>

                </div>

                <div className={`step step-3 ${activeStep === 3 ? 'active' : ''}`}>
                    <h3>
                        What is your Average monthly Sales?
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <Radio.Group
                            defaultValue={true}
                            value={formData.avg_monthly_ad_sales}
                            onChange={({target: {value}}) => changeFormHandler('avg_monthly_ad_sales', value)}
                        >
                            <ul>
                                {monthlySalesVariations.map(item => (
                                    <li
                                        className={formData.avg_monthly_ad_sales === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('avg_monthly_ad_sales', item.value)}
                                    >
                                        <label>{item.label}</label>
                                        <Radio value={item.value}/>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <NavigationButtons/>
                    </form>
                </div>
                <div className={`step step-4 ${activeStep === 4 ? 'active' : ''}`}>
                    <h3>
                        What is your Marketplace?
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <Radio.Group
                            defaultValue={true}
                            value={formData.active_marketplaces}
                            onChange={({target: {value}}) => changeFormHandler('active_marketplaces', value)}
                        >
                            <ul>
                                {marketplaceVariations.map(item => (
                                    <li
                                        className={formData.active_marketplaces === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('active_marketplaces', item.value)}
                                    >
                                        <i>
                                            {item.icon === 'other' ? <div className={'dots'}/> :
                                                <SVG id={`${item.icon}-icon`}/>}
                                        </i>

                                        <label>{item.label}</label>
                                        <Radio value={item.value}/>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <NavigationButtons/>
                    </form>
                </div>
                <div className={`step step-5 ${activeStep === 5 ? 'active' : ''}`}>
                    <h3>
                        What amount of products do you have?
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <Radio.Group
                            defaultValue={true}
                            value={formData.amazon_number_of_active_products}
                            onChange={({target: {value}}) => changeFormHandler('amazon_number_of_active_products', value)}
                        >
                            <ul>
                                {amountProductsVariations.map((item, index) => (
                                    <li
                                        className={formData.amazon_number_of_active_products === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('amazon_number_of_active_products', item.value)}
                                    >
                                        <i>
                                            {item.icon ? item.icon() : Array(index + 1).fill(0).map(() => <div/>)}
                                        </i>
                                        <label>{item.label}</label>
                                        <Radio value={item.value}/>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <NavigationButtons/>
                    </form>
                </div>

                <div className={`step step-6 ${activeStep === 6 ? 'active' : ''}`}>
                    <h3>
                        What is your Advertising Goal?
                    </h3>

                    <form onSubmit={goNextStepHandler}>
                        <Radio.Group
                            defaultValue={true}
                            value={formData.main_goal}
                            onChange={({target: {value}}) => changeFormHandler('main_goal', value)}
                        >
                            <ul>
                                {advertisingStrategyVariations.map((item, index) => (
                                    <li
                                        className={formData.main_goal === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('main_goal', item.value)}
                                    >
                                        {item.value === 'other' ? <><label className={'desc'}>
                                            Other:
                                            <Input
                                                disabled={formData.main_goal !== 'other'}
                                                placeholder={'Your option'}
                                            />
                                        </label> <label className={'mob'}>
                                            Other:</label> <Input
                                            disabled={formData.main_goal !== 'other'}
                                            placeholder={'Your option'}
                                            className={'mob'}
                                        /></> : <label>{item.label}</label>}

                                        <Radio value={item.value}/>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <NavigationButtons/>

                        <p className="terms">
                            By proceeding you agree to our
                            <Link to={'/terms-and-conditions'} target={'_blank'}> Terms and Conditions </Link>
                            &
                            <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                        </p>
                    </form>


                </div>
            </div>

        </section>
    )
}


export default AuditForm