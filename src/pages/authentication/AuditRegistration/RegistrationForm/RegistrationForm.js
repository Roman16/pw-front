import React, {useEffect, useState} from "react"
import RegistrationProgress from "../RegistrationProgress/RegistrationProgress"
import {advertisingStrategyVariations} from '../../../LandingPages/components/ContactForm/ContactForm'
import {SVG} from "../../../../utils/icons"
import './RegistrationForm.less'
import {Checkbox, Input, Radio} from "antd"
import {Link} from "react-router-dom"
import {notification} from "../../../../components/Notification"
import {userService} from "../../../../services/user.services"
import moment from "moment"

export const defaultForm = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    active_marketplaces: undefined,
    avg_monthly_ad_sales: undefined,
    avg_monthly_ad_spend: undefined,
    is_has_brand_registry: true,
    main_goal: undefined,
    storefront_name: undefined,
    main_category: undefined,
    communication_channel: undefined,
    amazon_number_of_active_products: undefined,
}


export const weakDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export const monthlyAdSpendVariations = [
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
    {
        label: 'No ads',
        value: 'no_ads'
    },
]

export const monthlySalesVariations = [
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
        label: 'Over $1m',
        value: 'over_1m'
    },
]

export const marketplaceVariations = [
    {
        label: 'United States',
        value: 'ATVPDKIKX0DER',
        icon: 'us'
    },
    {
        label: 'Canada',
        value: 'A2EUQ1WTGCTBG2',
        icon: 'ca'
    },
    {
        label: 'United Kingdom',
        value: 'A1F83G8C2ARO7P',
        icon: 'uk'
    },
    {
        label: 'Europe',
        value: 'A13V1IB3VIYZZH',
        icon: 'eu'
    },
]

export const amountProductsVariations = [
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
        value: '50_100'
    },
    {
        label: '100-200',
        value: '100_200'
    },
    {
        label: '200+',
        value: 'over_200'
    },
]

const RegistrationForm = ({setStep}) => {
    const [currentStep, setCurrentStep] = useState(0),
        [formParams, setFormParams] = useState({...defaultForm}),
        [agreeWithTerms, setAgreeWithTerms] = useState(false)

    const changeFormHandler = (name, value) => {
        setFormParams(prevState => ({
            ...prevState,
            [name]: value
        }))
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

    useEffect(() => {
        setStep(currentStep)
    }, [currentStep])

    return (
        <>
            <RegistrationProgress
                currentStep={currentStep}
            />

            <div className={'registration-form'}>
                {currentStep === 0 && <>
                    <h2>What are your advertising <br/> goals?</h2>

                    <ul className={'button-list'}>
                        {advertisingStrategyVariations.map(item => (
                            <li
                                className={formParams.main_goal === item.value ? 'active' : ''}
                                onClick={() => changeFormHandler('main_goal', item.value)}
                            >
                                <i>
                                    <SVG id={item.icon}/>
                                </i>

                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <div className="actions">
                        <button className="btn default" onClick={onNextStep}>
                            Get a Free Audit
                        </button>
                    </div>
                </>}

                {currentStep === 1 && <>
                    <h2>What is your Average <br/> Monthly Ad Spend?</h2>

                    <ul className={'button-list spend'}>
                        {monthlyAdSpendVariations.map(item => (
                            <li
                                className={formParams.avg_monthly_ad_spend === item.value ? 'active' : ''}
                                onClick={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <div className="actions">
                        <button className="btn transparent" onClick={() => setCurrentStep(prevState => prevState - 1)}>
                            Back
                        </button>

                        <button className="btn default" onClick={onNextStep}>
                            Next
                        </button>
                    </div>
                </>}

                {currentStep === 2 && <>
                    <h2>What are your Average <br/> Monthly Sales?</h2>

                    <ul className={'button-list sales'}>
                        {monthlySalesVariations.map(item => (
                            <li
                                className={formParams.avg_monthly_ad_sales === item.value ? 'active' : ''}
                                onClick={() => changeFormHandler('avg_monthly_ad_sales', item.value)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <div className="actions">
                        <button className="btn transparent" onClick={() => setCurrentStep(prevState => prevState - 1)}>
                            Back
                        </button>

                        <button className="btn default" onClick={onNextStep}>
                            Next
                        </button>
                    </div>
                </>}

                {currentStep === 3 && <>
                    <h2>What is your <br/> Marketplace?</h2>

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
                        <button className="btn transparent" onClick={() => setCurrentStep(prevState => prevState - 1)}>
                            Back
                        </button>

                        <button className="btn default" onClick={onNextStep}>
                            Next
                        </button>
                    </div>
                </>}

                {currentStep === 4 && <>
                    <h2>What amount of products <br/> do you have?</h2>

                    <ul className={'button-list products'}>
                        {amountProductsVariations.map(item => (
                            <li
                                className={formParams.amazon_number_of_active_products === item.value ? 'active' : ''}
                                onClick={() => changeFormHandler('amazon_number_of_active_products', item.value)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <div className="actions">
                        <button className="btn transparent" onClick={() => setCurrentStep(prevState => prevState - 1)}>
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
                        <button className="btn transparent" onClick={() => setCurrentStep(prevState => prevState - 1)}>
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
                        <button className="btn transparent" onClick={() => setCurrentStep(prevState => prevState - 1)}>
                            Back
                        </button>

                        <button className="btn default" onClick={sendFormHandler}>
                            Confirm
                        </button>
                    </div>
                </>}

                {currentStep === 7 && <>
                    <i className={'send-icon'}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M47.9984 2.41506L44.1376 43.2059C44.1035 43.6232 43.9743 44.0264 43.7604 44.3832C43.5466 44.7399 43.254 45.0402 42.9064 45.2598C42.5587 45.4795 42.1656 45.6124 41.7587 45.6478C41.3519 45.6832 40.9425 45.6202 40.5638 45.4638L27.8179 40.4077L20.6701 47.2775C20.2003 47.7405 19.574 47.9993 18.9223 47.9998C18.5808 48.0041 18.2419 47.9387 17.9252 47.8074C17.6085 47.6762 17.3205 47.4817 17.0778 47.2352C16.835 46.9888 16.6425 46.6954 16.5113 46.372C16.3802 46.0486 16.313 45.7017 16.3137 45.3514V40.4933L33.5308 18.4286C33.6627 18.2602 33.7454 18.0571 33.7695 17.8426C33.7935 17.628 33.758 17.4109 33.6669 17.2163C33.5758 17.0216 33.4329 16.8573 33.2546 16.7424C33.0764 16.6274 32.8701 16.5665 32.6595 16.5667C32.3957 16.5694 32.1417 16.6701 31.9448 16.8502L12.0929 34.1639L1.63218 30.012C1.1777 29.832 0.782978 29.5224 0.494675 29.1196C0.206372 28.7169 0.0365425 28.2379 0.00526436 27.7394C-0.0260137 27.2408 0.0825674 26.7434 0.318171 26.3061C0.553775 25.8688 0.906549 25.5099 1.33479 25.2716L44.8054 0.28563C45.1476 0.0865923 45.5366 -0.0118462 45.9297 0.00113675C46.3229 0.0141197 46.7049 0.138022 47.0339 0.35922C47.3628 0.580418 47.6259 0.890347 47.7943 1.25493C47.9626 1.61952 48.0296 2.02464 47.988 2.42576L47.9984 2.41506Z"
                                fill="#6D6DF6"/>
                        </svg>
                    </i>

                    <h2>
                        <span>{formParams.first_name} {formParams.last_name},</span><br/>
                        you'll get your Audit in <br/> 5 business days!
                    </h2>

                    <p className={'response-time'}>
                        Expect a reply between {`${moment().format('hh')}:00 ${moment().format('A')}`} CST
                        - <br/>{`${moment().add(1, 'hours').format('hh')}:00 ${moment().add(1, 'hours').format('A')}`} CST
                        on {weakDays[moment().add(1, 'days').day()]}
                    </p>


                    <div className="actions">
                        <Link to={'/'} className="btn default">
                            Back to site
                        </Link>
                    </div>
                </>}
            </div>
        </>
    )
}

export default RegistrationForm
