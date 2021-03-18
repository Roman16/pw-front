import React, {useState} from "react"
import Steps from "./Steps"
import {Input, Radio} from "antd"


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

const AuditForm = ({active}) => {
    const [activeStep, setActiveStep] = useState(0)

    const goNextStepHandler = (e) => {
        e.preventDefault()

        setActiveStep(prevState => prevState + 1)
    }

    const NavigationButtons = () => {
        return (
            <div className="navigation">
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

                <button className="btn default">
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
                            <Input placeholder={'First Name'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <Input placeholder={'Last Name'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <Input placeholder={'E-mail'}/>
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
                            <Input placeholder={'Store Front Name'}/>
                        </div>

                        <div className="form-group radio">
                            <label htmlFor="">Do you have brand registry?</label>

                            <Radio.Group
                                defaultValue={true}
                                // value={formParams.is_has_brand_registry}
                                // onChange={({target: {value}}) => changeFormHandler('is_has_brand_registry', value)}
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
                            defaultValue={true}
                            // value={formParams.is_has_brand_registry}
                            // onChange={({target: {value}}) => changeFormHandler('is_has_brand_registry', value)}
                        >
                            <ul>
                                {monthlyAdSpendVariations.map(item => (
                                    <li
                                        // className={formParams.avg_monthly_ad_spend === item.value ? 'active' : ''}
                                        // onClick={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
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
                            // value={formParams.is_has_brand_registry}
                            // onChange={({target: {value}}) => changeFormHandler('is_has_brand_registry', value)}
                        >
                            <ul>
                                {monthlySalesVariations.map(item => (
                                    <li
                                        // className={formParams.avg_monthly_ad_spend === item.value ? 'active' : ''}
                                        // onClick={() => changeFormHandler('avg_monthly_ad_spend', item.value)}
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
                </div>
                <div className={`step step-5 ${activeStep === 5 ? 'active' : ''}`}>
                    <h3>
                        What amount of products do you have?
                    </h3>
                </div>
                <div className={`step step-6 ${activeStep === 6 ? 'active' : ''}`}>
                    <h3>
                        What is your Advertising Goal?
                    </h3>
                </div>
            </div>

        </section>
    )
}


export default AuditForm