import React, {useState} from "react"
import './ContactUs.less'
import Header from "../components/Header/Header"
import PreFooter from "./PreFooter"
import Footer from "../components/Footer/Footer"

import spnLogo from '../../../assets/img/logo/amazon-spn-logo-dark.png'
import preHeaderImage from '../../../assets/img/landing-contact-us/personalized-demo.png'
import avatar from '../../../assets/img/landing-contact-us/ihor-avatar.png'
import {Checkbox, Input, Radio, Select} from "antd"
import CustomSelect from "../../../components/Select/Select"
import {SVG} from "../../../utils/icons"
import {advertisingStrategyVariations} from '../components/ContactForm/ContactForm'
import {Link} from "react-router-dom"
import {notification} from "../../../components/Notification"
import {userService} from "../../../services/user.services"

const Option = Select.Option

const defaultForm = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    active_marketplaces: undefined,
    avg_monthly_ad_sales: undefined,
    avg_monthly_ad_spend: undefined,
    is_has_brand_registry: 'yes',
    main_goal: undefined,
    storefront_name: undefined,
    main_category: undefined,
    communication_channel: undefined
}


const BookDemo = () => {
    const [formStep, setFormStep] = useState(0),
        [contactFormParams, setContactFormParams] = useState({...defaultForm}),
        [agreeWithTerms, setAgreeWithTerms] = useState(false)

    const changeContactFormHandler = (name, value) => {
        setContactFormParams({
            ...contactFormParams,
            [name]: value
        })
    }

    const submitFormHandler = async (e) => {
        e.preventDefault()

        if (Object.values(contactFormParams).some(item => item == undefined) || !agreeWithTerms) {
            notification.error({title: 'All fields is required!'})
        } else {
            try {
                await userService.sendContactForm({
                    ...contactFormParams,
                    // active_marketplaces: contactFormParams.active_marketplaces.join(',')
                })

                setFormStep(3)
                setAgreeWithTerms(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="landing-contact-us book-demo  landing-page">
            <Header/>

            <section className={'pre-header'}>
                <div className="container">
                    <div className="col">
                        <h2>
                            Book Your <br/>
                            <span>Personalized Demo</span>
                        </h2>

                        <p>
                            Tell us what you want to achieve with Profit Whales and we’ll show you how. Book a free live
                            demo below to get your introduction to Profit Whales.
                            <br/>
                            <br/>
                            Can’t wait to talk? <a href="https://youtu.be/Xm9uKq9-7b0" target={'_blank'}>Watch Vitalii’s
                            pre-recorded product demo.</a>
                        </p>

                        <a href={'https://youtu.be/Xm9uKq9-7b0'} target={'_blank'} className="btn default">
                            see profit whals in action
                        </a>

                        <img src={spnLogo} alt=""/>
                    </div>

                    <div className="image">
                        <img src={preHeaderImage} alt=""/>
                    </div>
                </div>
            </section>

            <section className={'contact-form-section'}>
                <div className="container">
                    <div className="col">
                        <h2>
                            <span>In 30 Minutes</span> You Will…
                        </h2>

                        <p>
                            <b>Learn How Your Amazon Business Can Use Profit Whales</b><br/>
                            No memorized scripts. No generic sales pitches. Your demo is yours. We’ll share actionable
                            advice on how you can use Profit Whales with your Amazon Brand.
                        </p>

                        <p>
                            <b> See Our Products in Action</b><br/>
                            We can keep writing about how amazing our products and features are, but it’s nothing
                            compared to seeing them in action. Let us show you how you can use Profit Whales to
                            structure, optimize your Amazon PPC Campaigns, so you can turn Ad Spend into Ad Investment
                            and Accelerate your Amazon Business Growth with our top features.
                        </p>

                        <p>
                            <b>Get Insights From Amazon Experts</b><br/>
                            At Profit Whales, we understand the needs of our clients very clearly. Whatever the goals
                            are, we will create a custom advertising strategy aligned with the overall brand strategy to
                            achieve the highest profitability with maximum efficiency.
                        </p>
                    </div>

                    <div className="contact-form-block">
                        {formStep === 0 &&
                        <>
                            <h3>
                                Talk With Our <br/> <span> Experts</span>
                            </h3>

                            <form action="">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="">First Name</label>
                                        <Input
                                            placeholder={'First Name'}
                                            value={contactFormParams.first_name}
                                            onChange={({target: {value}}) => changeContactFormHandler('first_name', value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Last Name</label>
                                        <Input
                                            placeholder={'Last Name'}
                                            value={contactFormParams.last_name}
                                            onChange={({target: {value}}) => changeContactFormHandler('last_name', value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">E-mail</label>
                                    <Input
                                        placeholder={'E-mail'}
                                        value={contactFormParams.email}
                                        onChange={({target: {value}}) => changeContactFormHandler('email', value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Do you have brand registry?</label>

                                    <Radio.Group
                                        defaultValue={'yes'}
                                        value={contactFormParams.is_has_brand_registry}
                                        onChange={(e) => changeContactFormHandler('is_has_brand_registry', e.target.value)}
                                    >
                                        <Radio value={'yes'}>
                                            Yes
                                        </Radio>

                                        <Radio value={'no'}>
                                            No
                                        </Radio>
                                    </Radio.Group>
                                </div>

                                <div className="actions">
                                    <button type={'button'} className={'btn green'} onClick={() => setFormStep(1)}>
                                        next
                                    </button>
                                </div>
                            </form>
                        </>}

                        {formStep === 1 &&
                        <>
                            <h3>
                                Talk With Our <br/> <span> Experts</span>
                            </h3>

                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="">Average Monthly Sales</label>

                                    <CustomSelect
                                        placeholder={'Select by'}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        value={contactFormParams.avg_monthly_ad_sales}
                                        onChange={(value) => changeContactFormHandler('avg_monthly_ad_sales', value)}
                                    >
                                        <Option value={'below_50k'}>below $50,000</Option>
                                        <Option value={'50_200k'}>$50k - $200k</Option>
                                        <Option value={'200_500k'}>$200k - $500k</Option>
                                        <Option value={'500_1000k'}>$500k - $1m</Option>
                                        <Option value={'over_1m'}>over $1m</Option>
                                    </CustomSelect>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Average Monthly Ad Spend</label>
                                    <CustomSelect
                                        placeholder={'Select by'}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        value={contactFormParams.avg_monthly_ad_spend}
                                        onChange={(value) => changeContactFormHandler('avg_monthly_ad_spend', value)}
                                    >
                                        <Option value={'below_10k'}>below 10k</Option>
                                        <Option value={'10_30k'}>10-30k</Option>
                                        <Option value={'30_60k'}>30-60k</Option>
                                        <Option value={'60_100k'}>60-100k</Option>
                                        <Option value={'over_100k'}>over $100k</Option>
                                        <Option value={'no_ads'}>no ads</Option>
                                    </CustomSelect>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="">What is your main goal?</label>

                                    <CustomSelect
                                        placeholder={'Select by'}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        value={contactFormParams.main_goal}
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


                                <div className="actions">
                                    <button type={'button'} className={'btn default'} onClick={() => setFormStep(0)}>
                                        back
                                    </button>

                                    <button type={'button'} className={'btn green'} onClick={() => setFormStep(2)}>
                                        next
                                    </button>
                                </div>
                            </form>
                        </>}

                        {formStep === 2 &&
                        <>
                            <h3>
                                Talk With Our <br/> <span> Experts</span>
                            </h3>

                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="">Enter your Storefront Name</label>
                                    <Input
                                        type="text"
                                        placeholder={'Enter your Storefront Name'}
                                        value={contactFormParams.storefront_name}
                                        onChange={({target: {value}}) => changeContactFormHandler('storefront_name', value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Enter your main category</label>
                                    <Input
                                        type="text"
                                        placeholder={'Enter your main category'}
                                        value={contactFormParams.main_category}
                                        onChange={({target: {value}}) => changeContactFormHandler('main_category', value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">The best communication channel to reach you:</label>
                                    <Input
                                        type="text"
                                        placeholder={'The best communication channel to reach you:'}
                                        value={contactFormParams.communication_channel}
                                        onChange={({target: {value}}) => changeContactFormHandler('communication_channel', value)}
                                    />
                                </div>

                                <Checkbox
                                    // onChange={({target: {checked}}) => setAgreeWithTerms(checked)}
                                >
                                    Yes, I agree to Profit Whales <Link to={'/terms-and-conditions'} target={'_blank'}>Terms
                                    and
                                    Conditions</Link> & <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                                </Checkbox>

                                <div className="actions">
                                    <button type={'button'} className={'btn default'} onClick={() => setFormStep(1)}>
                                        back
                                    </button>

                                    <button type={'button'} className={'btn green'} onClick={submitFormHandler}>
                                        next
                                    </button>
                                </div>
                            </form>
                        </>}

                        {formStep === 3 && <>
                            <button className={'back-to-form'} onClick={() => setFormStep(0)}>
                                <SVG id={'right-row'}/>
                            </button>

                            <i className={'logo'}>
                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M69.9977 3.52196L64.3673 63.0086C64.3175 63.6172 64.1291 64.2052 63.8173 64.7255C63.5054 65.2457 63.0788 65.6836 62.5718 66.0039C62.0648 66.3242 61.4915 66.518 60.8981 66.5697C60.3048 66.6213 59.7079 66.5294 59.1555 66.3013L40.5677 58.9279L30.144 68.9464C29.4587 69.6216 28.5454 69.999 27.5951 69.9997C27.097 70.0059 26.6027 69.9106 26.1409 69.7191C25.6791 69.5277 25.259 69.2441 24.9051 68.8847C24.5511 68.5254 24.2703 68.0974 24.079 67.6258C23.8877 67.1542 23.7898 66.6483 23.7908 66.1375V59.0527L48.8991 26.875C49.0914 26.6295 49.212 26.3332 49.2471 26.0204C49.2823 25.7076 49.2304 25.3909 49.0975 25.107C48.9647 24.8232 48.7563 24.5836 48.4963 24.416C48.2364 24.2483 47.9355 24.1595 47.6285 24.1597C47.2437 24.1637 46.8733 24.3106 46.5861 24.5732L17.6355 49.8223L2.38026 43.7675C1.71748 43.5051 1.14184 43.0535 0.721401 42.4661C0.300959 41.8788 0.0532911 41.1803 0.00767719 40.4532C-0.0379367 39.7261 0.120411 39.0008 0.464 38.3631C0.807588 37.7254 1.32205 37.2019 1.94657 36.8545L65.3412 0.416543C65.8402 0.12628 66.4075 -0.0172758 66.9809 0.00165776C67.5542 0.0205913 68.1114 0.201282 68.5911 0.523863C69.0708 0.846444 69.4545 1.29842 69.6999 1.83011C69.9454 2.3618 70.0432 2.9526 69.9825 3.53757L69.9977 3.52196Z"
                                        fill="white"/>
                                </svg>
                            </i>

                            <h3 className={'user-name'}>
                                <span> Name Surname, </span> let’s get your project underway!
                            </h3>

                            <p>
                                Expect a reply between 8am CST - 6:30pm CST Monday through Friday
                            </p>

                            <h4>
                                Check out our cases:
                            </h4>

                            <div className="actions cases-links">
                                <a
                                    href={'https://blog.profitwhales.com/studies/why-amazon-ppc-matters/'}
                                    target={'_blank'}
                                    className={'btn green'}
                                >
                                    CASE 1
                                </a>

                                <a
                                    href={'https://blog.profitwhales.com/studies/nutritional-supplements/'}
                                    target={'_blank'}
                                    className={'btn white'}
                                >
                                    case 2
                                </a>
                            </div>
                        </>}


                        <div className={`progress-bar s-${formStep}`}/>
                    </div>
                </div>
            </section>

            <section className={'ihor-tag'}>
                <div className="container">
                    <i>
                        <svg width="81" height="74" viewBox="0 0 81 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M80.6192 34.7936H62.5435V31.1445C62.5435 23.5069 68.7384 17.2271 76.4609 17.2271V0C59.3187 0 45.3164 14.0023 45.3164 31.1445V74H80.6192V34.7936Z"
                                fill="#83FED0"/>
                            <path
                                d="M35.3028 74V34.7936H17.2271V31.1445C17.2271 23.5069 23.422 17.2271 31.1445 17.2271V0C14.0023 0 0 14.0023 0 31.1445V74H35.3028Z"
                                fill="#83FED0"/>
                        </svg>
                    </i>

                    <h4>
                        At Profit Whales, we understand the needs of our clients very <br/>
                        clearly. Whatever the goals are, we will create a custom <br/>
                        advertising strategy aligned with the overall brand strategy to <br/>
                        achieve the highest profitability with maximum efficiency.
                    </h4>

                    <img src={avatar} alt=""/>

                    <label>
                        <b> Ihor Dubovetskyi,</b> <br/>
                        Co-founder & Chief Executive <br/>
                        Officer, Profit Whales
                    </label>

                </div>
            </section>

            <PreFooter/>

            <Footer/>
        </div>
    )
}

export default BookDemo