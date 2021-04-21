import React, {useState} from "react"
import Header from "../GetAudit/Header"
import SuccessSend from "../GetAudit/SuccessSend"
import Footer from "../GetAudit/Footer"
import './GetAudit.less'
import {Input} from "antd"
import {Radio} from "../../../components/RadioButton/RadioButton"
import {
    advertisingStrategyVariations,
    amountProductsVariations,
    marketplaceVariations,
    monthlyAdSpendVariations,
    monthlySalesVariations
} from '../GetAudit/AuditForm'
import {SVG} from "../../../utils/icons"
import {Link} from "react-router-dom"
import {defaultForm} from "../GetAudit/GetAudit"

const GetAudit = () => {
    const [formData, setFormData] = useState({...defaultForm})


    const changeFormHandler = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    return (<div className={'get-audit-page get-audit-new-page landing-page'}>
        <Header/>

        <div className="container">
            <h2>
                <span>Get Your</span> Amazon Advertising Campaigns <span>Review</span>
            </h2>

            <p>
                This is not an automated, computer-generated audit. We recognize and embrace the value of artificial
                intelligence, but we find that actual human involvement is required to best identify potential concerns
                and opportunities. In synergy, we reach success.
            </p>

            <section className={'step step-0'}>
                <h3>
                    Contact Information
                </h3>

                <div className="row">
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
                            required={true}
                            placeholder={'Last Name'}
                            value={formData.last_name}
                            onChange={({target: {value}}) => changeFormHandler('last_name', value)}
                        />
                    </div>
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
            </section>

            <section className={'step step-1'}>
                <h3>
                    Brand Information
                </h3>


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

                    <div className={'radio-group'}>
                        <Radio
                            checked={formData.is_has_brand_registry === true}
                            onChange={() => changeFormHandler('is_has_brand_registry', true)}
                            label={'Yes'}
                        />

                        <Radio
                            checked={formData.is_has_brand_registry === false}
                            onChange={() => changeFormHandler('is_has_brand_registry', false)}
                            label={'No'}
                        />
                    </div>
                </div>

                <div className="form-group radio">
                    <label htmlFor="">Are you considering to sell your FBA business?</label>

                    <div className={'radio-group'}>
                        <Radio
                            checked={formData.considering_to_sell === true}
                            onChange={() => changeFormHandler('considering_to_sell', true)}
                            label={'Yes'}
                        />

                        <Radio
                            checked={formData.considering_to_sell === false}
                            onChange={() => changeFormHandler('considering_to_sell', false)}
                            label={'No'}
                        />
                    </div>
                </div>
            </section>

            <section className={'step step-2'}>
                <h3>
                    What is your Average monthly Ad Spend?
                </h3>

                <ul>
                    {monthlyAdSpendVariations.map(item => (
                        <li
                            className={formData.avg_monthly_ad_spend === item.value ? 'active' : ''}
                            onClick={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
                        >
                            <label>{item.label}</label>
                            <Radio
                                checked={formData.avg_monthly_ad_spend === item.value}
                                onChange={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className={'step step-3'}>
                <h3>
                    What is your Average monthly Sales?
                </h3>

                <ul>
                    {monthlySalesVariations.map(item => (
                        <li
                            className={formData.avg_monthly_ad_sales === item.value ? 'active' : ''}
                            onClick={() => changeFormHandler('avg_monthly_ad_sales', item.value)}
                        >
                            <label>{item.label}</label>
                            <Radio
                                checked={formData.avg_monthly_ad_sales === item.value}
                                onChange={() => changeFormHandler('avg_monthly_ad_sales', item.value)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className={'step step-4'}>
                <h3>
                    What is your Marketplace?
                </h3>

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

                            <Radio
                                checked={formData.active_marketplaces === item.value}
                                onChange={() => changeFormHandler('active_marketplaces', item.value)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className={'step step-5'}>
                <h3>
                    What amount of products do you have?
                </h3>

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
                            <Radio
                                checked={formData.amazon_number_of_active_products === item.value}
                                onChange={() => changeFormHandler('amazon_number_of_active_products', item.value)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className={'step step-6'}>
                <h3>
                    What is your Advertising Goal?
                </h3>

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
                                    value={formData.main_goal_other}
                                    onChange={({target: {value}}) => changeFormHandler('main_goal_other', value)}
                                />
                            </label> <label className={'mob'}>
                                Other:</label> <Input
                                disabled={formData.main_goal !== 'other'}
                                placeholder={'Your option'}
                                className={'mob'}
                                value={formData.main_goal_other}
                                onChange={({target: {value}}) => changeFormHandler('main_goal_other', value)}
                            /></> : <label>{item.label}</label>}

                            <Radio
                                checked={formData.main_goal === item.value}
                                onChange={() => changeFormHandler('main_goal', item.value)}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <button>
                get an audit
            </button>

            <p className="terms">
                By proceeding you agree to our
                <Link to={'/terms-and-conditions'} target={'_blank'}> Terms and Conditions </Link>
                &
                <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
            </p>
        </div>

        <Footer/>

    </div>)
}

export default GetAudit