import React, {useState} from "react";
import contactFormImage from "../../../../assets/img/landing-automation/contact-form-image.png";
import sendProcessingImage from "../../../../assets/img/landing-automation/send-processing.svg";
import thankImage from "../../../../assets/img/landing-automation/thank-image.png";
import {Checkbox, Input, Radio, Select} from "antd";
import TreeSelect from "../../../../components/TreeSelect/TreeSelect";
import CustomSelect from "../../../../components/Select/Select";
import {SVG} from "../../../../utils/icons";
import {Link} from "react-router-dom";
import {notification} from "../../../../components/Notification";
import {userService} from "../../../../services/user.services";
import './ContactForm.less';

const Option = Select.Option;


const defaultForm = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    active_marketplaces: undefined,
    avg_monthly_ad_sales: undefined,
    avg_monthly_ad_spend: undefined,
    is_has_brand_registry: false,
    main_goal: undefined,
    storefront_name: undefined,
    main_category: undefined,
};

const advertisingStrategyVariations = [
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
];


const ContactForm = () => {
    const [contactFormParams, setContactFormParams] = useState({...defaultForm}),
        [agreeWithTerms, setAgreeWithTerms] = useState(false),
        [formState, setFormState] = useState(false);


    const changeContactFormHandler = (name, value) => {
        setContactFormParams({
            ...contactFormParams,
            [name]: value
        })
    };

    const submitFormHandler = async (e) => {
        e.preventDefault();

        if (Object.values(contactFormParams).some(item => item == undefined) || !agreeWithTerms) {
            notification.error({title: 'All fields is required!'})
        } else {
            try {
                await userService.sendContactForm({
                    ...contactFormParams,
                    // active_marketplaces: contactFormParams.active_marketplaces.join(',')
                });

                setFormState(true);
                setAgreeWithTerms(false);
            } catch (e) {
                console.log(e);
            }
        }
    };


    const backToForm = () => {
        setContactFormParams(defaultForm);
        setFormState(false);
    };

    return (
        <>
            <section className={'contact-form desc'} id={'form'}>
                <div className="container">
                    <div className="form-image">
                        <img src={contactFormImage} alt=""/>

                        <img src={sendProcessingImage} alt="" className={`processing screen ${formState && 'active'}`}/>
                    </div>

                    <div className={`screen thank-block ${formState && 'active'}`}>
                        <div className="user-name">
                            Hey {contactFormParams.first_name}!
                        </div>
                        <img src={thankImage} alt=""/>

                        <button className={'btn'} onClick={backToForm}>
                            back to form
                        </button>
                    </div>

                    <form className={`screen ${!formState && 'active'}`} onSubmit={submitFormHandler}>
                        <h3>Talk With Our Experts</h3>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <Input
                                    type="text"
                                    placeholder={'First Name'}
                                    value={contactFormParams.first_name}
                                    onChange={({target: {value}}) => changeContactFormHandler('first_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <Input
                                    type="text"
                                    placeholder={'Last Name'}
                                    value={contactFormParams.last_name}
                                    onChange={({target: {value}}) => changeContactFormHandler('last_name', value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">E-mail</label>
                                <Input
                                    type="email"
                                    placeholder={'E-mail'}
                                    value={contactFormParams.email}
                                    onChange={({target: {value}}) => changeContactFormHandler('email', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Select your active amazon marketplaces</label>

                                <TreeSelect
                                    treeData={[{title: 'USA', key: 'ATVPDKIKX0DER', value: 'ATVPDKIKX0DER'},
                                        {title: 'CA', key: 'A2EUQ1WTGCTBG2', value: 'A2EUQ1WTGCTBG2'},
                                        {title: 'UK', key: 'A1F83G8C2ARO7P', value: 'A1F83G8C2ARO7P'},
                                        {title: 'DE', key: 'A1PA6795UKMFR9', value: 'A1PA6795UKMFR9'},
                                        {title: 'FR', key: 'A13V1IB3VIYZZH', value: 'A13V1IB3VIYZZH'},]}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    value={contactFormParams.active_marketplaces}
                                    treeCheckable={true}
                                    showSearch={false}
                                    placeholder={'Select by'}
                                    onChange={(value) => changeContactFormHandler('active_marketplaces', value)}
                                />
                            </div>

                        </div>


                        <div className="row">
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
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Do you have brand registry?</label>

                                <Radio.Group defaultValue={'yes'}
                                             value={contactFormParams.is_has_brand_registry}
                                             onChange={(e) => changeContactFormHandler('is_has_brand_registry', e.target.value)}>
                                    <Radio value={true}>
                                        Yes
                                    </Radio>

                                    <Radio value={false}>
                                        No
                                    </Radio>
                                </Radio.Group>
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
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="">Enter your Brand name</label>
                                <Input
                                    type="text"
                                    placeholder={'Enter your Brand name'}
                                    value={contactFormParams.storefront_name}
                                    onChange={({target: {value}}) => changeContactFormHandler('storefront_name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Enter your main Brand category</label>
                                <Input
                                    type="text"
                                    placeholder={'Enter your main Brand category'}
                                    value={contactFormParams.main_category}
                                    onChange={({target: {value}}) => changeContactFormHandler('main_category', value)}
                                />
                            </div>
                        </div>

                        <Checkbox onChange={({target: {checked}}) => setAgreeWithTerms(checked)}>
                            Yes, I agree to Profit Whales <Link to={'/terms-and-conditions'} target={'_blank'}>Terms
                            and
                            Conditions</Link> & <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                        </Checkbox>

                        <button className={'btn'}>
                            Request Demo
                        </button>
                    </form>

                </div>
            </section>


            <section className={'contact-form mob'} id={'form'}>
                <div className="container">
                    <h3>Talk With Our Experts</h3>

                    <img src={contactFormImage} alt=""/>

                    <form action="" onSubmit={submitFormHandler}>

                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <Input
                                type="text"
                                placeholder={'First Name'}
                                value={contactFormParams.first_name}
                                onChange={({target: {value}}) => changeContactFormHandler('first_name', value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <Input
                                type="text"
                                placeholder={'Last Name'}
                                value={contactFormParams.last_name}
                                onChange={({target: {value}}) => changeContactFormHandler('last_name', value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <Input
                                type="email"
                                placeholder={'E-mail'}
                                value={contactFormParams.email}
                                onChange={({target: {value}}) => changeContactFormHandler('email', value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Select your active amazon marketplaces</label>

                            <select
                                placeholder={'Select by'}
                                value={contactFormParams.active_marketplaces}
                                onChange={({target: {value}}) => changeContactFormHandler('active_marketplaces', value)}
                                multiple
                            >
                                <option value={'ATVPDKIKX0DER'}>USA</option>
                                <option value={'A2EUQ1WTGCTBG2'}>CA</option>
                                <option value={'A1F83G8C2ARO7P'}>UK</option>
                                <option value={'A1PA6795UKMFR9'}>DE</option>
                                <option value={'A13V1IB3VIYZZH'}>FR</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Average Monthly Sales</label>

                            <select
                                placeholder={'Select by'}
                                value={contactFormParams.avg_monthly_ad_sales}
                                onChange={({target: {value}}) => changeContactFormHandler('avg_monthly_ad_sales', value)}
                            >
                                <option value={'below_50k'}>below $50,000</option>
                                <option value={'50_200k'}>$50k - $200k</option>
                                <option value={'200_500k'}>$200k - $500k</option>
                                <option value={'500_1000k'}>$500k - $1m</option>
                                <option value={'over_1m'}>over $1m</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Average Monthly Ad Spend</label>
                            <select
                                placeholder={'Select by'}
                                value={contactFormParams.avg_monthly_ad_spend}
                                onChange={({target: {value}}) => changeContactFormHandler('avg_monthly_ad_spend', value)}
                            >
                                <option value={'below_10k'}>below 10k</option>
                                <option value={'10_30k'}>10-30k</option>
                                <option value={'30_60k'}>30-60k</option>
                                <option value={'60_100k'}>60-100k</option>
                                <option value={'over_100k'}>over $100k</option>
                                <option value={'no_ads'}>no ads</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Do you have brand registry?</label>

                            <Radio.Group defaultValue={'yes'}
                                         value={contactFormParams.is_has_brand_registry}
                                         onChange={(e) => changeContactFormHandler('is_has_brand_registry', e.target.value)}>
                                <Radio value={true}>
                                    Yes
                                </Radio>

                                <Radio value={false}>
                                    No
                                </Radio>
                            </Radio.Group>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">What is your main goal?</label>

                            <select
                                placeholder={'Select by'}
                                value={contactFormParams.main_goal}
                                onChange={({target: {value}}) => changeContactFormHandler('main_goal', value)}
                            >
                                <option value={''}>Select by</option>
                                {advertisingStrategyVariations.map(item => (
                                    <option value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Enter your Brand name</label>
                            <Input
                                type="text"
                                placeholder={'Enter your Brand name'}
                                value={contactFormParams.storefront_name}
                                onChange={({target: {value}}) => changeContactFormHandler('storefront_name', value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Enter your main Brand category</label>
                            <Input
                                type="text"
                                placeholder={'Enter your main Brand category'}
                                value={contactFormParams.main_category}
                                onChange={({target: {value}}) => changeContactFormHandler('main_category', value)}
                            />
                        </div>

                        <Checkbox onChange={({target: {checked}}) => setAgreeWithTerms(checked)}>
                            Yes, I agree to Profit Whales <Link to={'/terms-and-conditions'} target={'_blank'}>Terms and
                            Conditions</Link> & <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                        </Checkbox>

                        <button className={'btn'}>
                            Request Demo
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
};

export default ContactForm;