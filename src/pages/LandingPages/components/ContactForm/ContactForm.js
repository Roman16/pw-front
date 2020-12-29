import React, {useState} from "react"
import {Checkbox, Input, Radio} from "antd"
import {SVG} from "../../../../utils/icons"
import {Link} from "react-router-dom"
import {notification} from "../../../../components/Notification"
import {userService} from "../../../../services/user.services"
import './ContactForm.less'
import {
    amountProductsVariations, defaultForm,
    marketplaceVariations,
    monthlyAdSpendVariations,
    monthlySalesVariations, weakDays
} from "../../../authentication/AuditRegistration/RegistrationForm/RegistrationForm"

import avatar1 from '../../../../assets/img/landing-contact-us/support-avatar-1.png'
import avatar2 from '../../../../assets/img/landing-contact-us/support-avatar-2.png'
import avatar3 from '../../../../assets/img/landing-contact-us/support-avatar-3.png'
import moment from "moment"

export const advertisingStrategyVariations = [
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


const ContactForm = () => {
    const [formParams, setFormParams] = useState({...defaultForm}),
        [agreeWithTerms, setAgreeWithTerms] = useState(false),
        [currentStep, setCurrentStep] = useState(0)


    const changeFormHandler = (name, value) => {
        setFormParams({
            ...formParams,
            [name]: value
        })
    }

    const onNextStep = () => {
        if (currentStep === 0 && !formParams.main_goal) {
            notification.error({title: 'Select your advertising goals'})
        } else if (currentStep === 1 && !formParams.avg_monthly_ad_spend) {
            notification.error({title: 'Select your average monthly ad spend'})
        } else if (currentStep === 2 && !formParams.avg_monthly_ad_sales) {
            notification.error({title: 'Select your average monthly sales'})
        } else if (currentStep === 3 && !formParams.active_marketplaces) {
            notification.error({title: 'Select your marketplace'})
        } else if (currentStep === 4 && !formParams.amazon_number_of_active_products) {
            notification.error({title: 'Select your products count'})
        } else if (currentStep === 5 && (!formParams.first_name || !formParams.last_name || !formParams.email)) {
            notification.error({title: 'All fields is required'})
        } else {
            setCurrentStep(prevState => prevState + 1)
        }
    }

    const sendFormHandler = async () => {
        if (!agreeWithTerms) {
            notification.error({title: 'Please accept Terms and Conditions to continue'})
        } else {
            try {
                await userService.sendContactForm({
                    ...formParams,
                    active_marketplaces: [formParams.active_marketplaces]
                })
                setCurrentStep(prevState => prevState + 1)
            } catch (e) {
                console.log(e)
            }
        }
    }


    return (
        <>
            <section className={'contact-form desc'} id={'form'}>
                <div className="container">
                    {currentStep !== 7 && <>
                        <h2>
                            Get Your <span> Amazon Advertising Campaigns <br/> Review</span> Today
                        </h2>

                        <p className={'form-description'}>
                            This is not an automated, computer-generated audit. <br/>
                            We recognize and embrace the value of artificial intelligence, but we find <br/> that actual
                            human
                            involvement is required to best identify potential concerns and opportunities.
                        </p>

                        <div className="team-avatars">
                            <img src={avatar1} alt=""/>
                            <img src={avatar2} alt=""/>
                            <img src={avatar3} alt=""/>
                        </div>
                    </>}


                    <div className={'form'}>
                        {currentStep === 0 && <>
                            <h2>What are your advertising goals?</h2>

                            <ul className={'button-list goals'}>
                                {advertisingStrategyVariations.map(item => (
                                    <li
                                        className={formParams.main_goal === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('main_goal', item.value)}
                                    >
                                        <i>
                                            <SVG id={item.icon}/>
                                        </i>

                                        <div>{item.label}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className="actions">
                                <button className="btn default" onClick={onNextStep}>
                                    GET A FREE AUDIT
                                </button>
                            </div>
                        </>}

                        {currentStep === 1 && <>
                            <h2>What is your Average Monthly Ad Spend?</h2>

                            <ul className={'button-list spend'}>
                                {monthlyAdSpendVariations.map((item, index) => (
                                    <li
                                        className={formParams.avg_monthly_ad_spend === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
                                    >
                                        <div className="steps">
                                            {index < 5 && Array(index + 1).fill(0).map((item, i) => <div
                                                style={{maxWidth: `${8 + i * 3}px`, height: `${8 + i * 3}px`}}
                                                className="index"/>)}
                                        </div>

                                        {item.label}
                                    </li>
                                ))}
                            </ul>

                            <div className="actions">
                                <button className="btn transparent"
                                        onClick={() => setCurrentStep(prevState => prevState - 1)}>
                                    Back
                                </button>

                                <button className="btn default" onClick={onNextStep}>
                                    Next
                                </button>
                            </div>
                        </>}

                        {currentStep === 2 && <>
                            <h2>What are your Average Monthly Sales?</h2>

                            <ul className={'button-list sales'}>
                                {monthlySalesVariations.map((item, index) => (
                                    <li
                                        className={formParams.avg_monthly_ad_sales === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('avg_monthly_ad_sales', item.value)}
                                    >
                                        <div className="steps">
                                            {index < 5 && Array(index + 1).fill(0).map((item, i) => <div
                                                style={{maxWidth: `${8 + i * 3}px`, height: `${8 + i * 3}px`}}
                                                className="index"/>)}
                                        </div>

                                        {item.label}
                                    </li>
                                ))}
                            </ul>

                            <div className="actions">
                                <button className="btn transparent"
                                        onClick={() => setCurrentStep(prevState => prevState - 1)}>
                                    Back
                                </button>

                                <button className="btn default" onClick={onNextStep}>
                                    Next
                                </button>
                            </div>
                        </>}

                        {currentStep === 3 && <>
                            <h2>What is your Marketplace?</h2>

                            <ul className={'button-list marketplace-list'}>
                                {marketplaceVariations.map(item => (
                                    <li
                                        className={formParams.active_marketplaces === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('active_marketplaces', item.value)}
                                    >
                                        <i>
                                            <SVG id={`${item.icon}-icon`}/>
                                        </i>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>

                            <div className="actions">
                                <button className="btn transparent"
                                        onClick={() => setCurrentStep(prevState => prevState - 1)}>
                                    Back
                                </button>

                                <button className="btn default" onClick={onNextStep}>
                                    Next
                                </button>
                            </div>
                        </>}

                        {currentStep === 4 && <>
                            <h2>What amount of products do you have?</h2>

                            <ul className={'button-list products'}>
                                {amountProductsVariations.map((item, index) => (
                                    <li
                                        className={formParams.amazon_number_of_active_products === item.value ? 'active' : ''}
                                        onClick={() => changeFormHandler('amazon_number_of_active_products', item.value)}
                                    >
                                        <div className="steps">
                                            {Array(index + 1).fill(0).map((item, i) => <div
                                                style={{maxWidth: `${8 + i * 3}px`, height: `${8 + i * 3}px`}}
                                                className="index"/>)}
                                        </div>

                                        {item.label}
                                    </li>
                                ))}
                            </ul>

                            <div className="actions">
                                <button className="btn transparent"
                                        onClick={() => setCurrentStep(prevState => prevState - 1)}>
                                    Back
                                </button>

                                <button className="btn default" onClick={onNextStep}>
                                    Next
                                </button>
                            </div>
                        </>}

                        {currentStep === 5 && <>
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <Input
                                    placeholder={'First Name'}
                                    value={formParams.first_name}
                                    onChange={({target: {value}}) => changeFormHandler('first_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <Input
                                    placeholder={'Last Name'}
                                    value={formParams.last_name}
                                    onChange={({target: {value}}) => changeFormHandler('last_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">E-mail</label>
                                <Input
                                    placeholder={'E-mail'}
                                    value={formParams.email}
                                    onChange={({target: {value}}) => changeFormHandler('email', value)}
                                />
                            </div>

                            <div className="form-group radio">
                                <label htmlFor="">Do you have brand registry?</label>

                                <Radio.Group
                                    defaultValue={true}
                                    value={formParams.is_has_brand_registry}
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

                            <div className="actions">
                                <button className="btn transparent"
                                        onClick={() => setCurrentStep(prevState => prevState - 1)}>
                                    Back
                                </button>

                                <button className="btn default" onClick={onNextStep}>
                                    Next
                                </button>
                            </div>
                        </>}
                        {currentStep === 6 && <>
                            <div className="form-group">
                                <label htmlFor="">Enter your Storefront Name</label>
                                <Input
                                    placeholder={'Enter your Storefront Name'}
                                    value={formParams.storefront_name}
                                    onChange={({target: {value}}) => changeFormHandler('storefront_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Enter your main category</label>
                                <Input
                                    placeholder={'Enter your main category'}
                                    value={formParams.main_category}
                                    onChange={({target: {value}}) => changeFormHandler('main_category', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">The best communication channel to reach you:</label>
                                <Input
                                    placeholder={'The best communication channel to reach you:'}
                                    value={formParams.communication_channel}
                                    onChange={({target: {value}}) => changeFormHandler('communication_channel', value)}
                                />
                            </div>

                            <div className="form-group checkbox">
                                <Checkbox onChange={({target: {checked}}) => setAgreeWithTerms(checked)}>
                                    Yes, I agree to Profit Whales
                                    <Link to={'/terms-and-conditions'} target={'_blank'}>Terms and Conditions</Link>
                                    &
                                    <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                                </Checkbox>
                            </div>

                            <div className="actions">
                                <button className="btn transparent"
                                        onClick={() => setCurrentStep(prevState => prevState - 1)}>
                                    Back
                                </button>

                                <button className="btn default" onClick={sendFormHandler}>
                                    Confirm
                                </button>
                            </div>
                        </>}

                        {currentStep === 7 && <>
                            <i className={'send-icon'}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M47.9984 2.41506L44.1376 43.2059C44.1035 43.6232 43.9743 44.0264 43.7604 44.3832C43.5466 44.7399 43.254 45.0402 42.9064 45.2598C42.5587 45.4795 42.1656 45.6124 41.7587 45.6478C41.3519 45.6832 40.9425 45.6202 40.5638 45.4638L27.8179 40.4077L20.6701 47.2775C20.2003 47.7405 19.574 47.9993 18.9223 47.9998C18.5808 48.0041 18.2419 47.9387 17.9252 47.8074C17.6085 47.6762 17.3205 47.4817 17.0778 47.2352C16.835 46.9888 16.6425 46.6954 16.5113 46.372C16.3802 46.0486 16.313 45.7017 16.3137 45.3514V40.4933L33.5308 18.4286C33.6627 18.2602 33.7454 18.0571 33.7695 17.8426C33.7935 17.628 33.758 17.4109 33.6669 17.2163C33.5758 17.0216 33.4329 16.8573 33.2546 16.7424C33.0764 16.6274 32.8701 16.5665 32.6595 16.5667C32.3957 16.5694 32.1417 16.6701 31.9448 16.8502L12.0929 34.1639L1.63218 30.012C1.1777 29.832 0.782978 29.5224 0.494675 29.1196C0.206372 28.7169 0.0365425 28.2379 0.00526436 27.7394C-0.0260137 27.2408 0.0825674 26.7434 0.318171 26.3061C0.553775 25.8688 0.906549 25.5099 1.33479 25.2716L44.8054 0.28563C45.1476 0.0865923 45.5366 -0.0118462 45.9297 0.00113675C46.3229 0.0141197 46.7049 0.138022 47.0339 0.35922C47.3628 0.580418 47.6259 0.890347 47.7943 1.25493C47.9626 1.61952 48.0296 2.02464 47.988 2.42576L47.9984 2.41506Z"
                                        fill="#6D6DF6"/>
                                </svg>
                            </i>

                            <h2>
                                <span>{formParams.first_name} {formParams.last_name}</span>, let’s get your <br/>
                                project underway!

                            </h2>

                            <p className={'response-time'}>
                                Expect a reply between {`${moment().format('hh')}:00 ${moment().format('A')}`} CST
                                - {`${moment().add(1, 'hours').format('hh')}:00 ${moment().add(1, 'hours').format('A')}`} CST
                                on {weakDays[moment().add(1, 'days').day()]}
                            </p>


                            <div className="cases">
                                <h3>Check out our cases:</h3>

                                <div className="links">
                                    <a
                                        target={'_blank'}
                                        href={'https://blog.profitwhales.com/studies/why-amazon-ppc-matters/'}
                                        className={'btn default'}
                                    >
                                        CASE 1
                                    </a>

                                    <a
                                        target={'_blank'}
                                        href={'https://blog.profitwhales.com/studies/lighting-equipment/'}
                                        className={'btn white'}
                                    >
                                        CASE 2
                                    </a>
                                </div>
                            </div>
                        </>}
                    </div>

                    <div className={`progress-bar step-${currentStep}`}>
                        <div className="bar" style={{width: `${currentStep * 16.67}%`}}/>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ContactForm
