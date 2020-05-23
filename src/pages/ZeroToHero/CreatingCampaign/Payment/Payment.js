import React, {useEffect, useState} from "react";
import './Payment.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock} from "@fortawesome/free-solid-svg-icons";
import visaLogo from '../../../../assets/img/visa-logo.svg';
import masterLogo from '../../../../assets/img/mastercard.svg';
import discoverLogo from '../../../../assets/img/discover.svg';
import americanExpressLogo from '../../../../assets/img/american-express.svg';
import Card from "./Card";
import {Elements, StripeProvider} from "react-stripe-elements";
import {userService} from "../../../../services/user.services";
import CustomSelect from "../../../../components/Select/Select";
import {Select, Radio} from "antd";

const Option = Select.Option;

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

const Payment = () => {
    const [cardsList, setCardList] = useState([]),
        [selectedPaymentMethod, setPaymentMethod] = useState('select');

    useEffect(() => {
        userService.fetchBillingInformation()
            .then(res => {
                setCardList(res);
            })
    }, []);

    return (
        <section className='payment-section'>
            <div className="header-block">
                <div className='lock-icon'>
                    <FontAwesomeIcon icon={faLock}/>
                </div>

                <div className="col">
                    <h3>Secure credit card payment</h3>
                    <span>This is secure 256-bit SSL encrypted payment.</span>
                </div>

                <div className="payments-logo">
                    <img src={visaLogo} alt=""/>
                    <img src={masterLogo} alt=""/>
                    <img src={discoverLogo} alt=""/>
                    <img src={americanExpressLogo} alt=""/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Radio.Group value={selectedPaymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                        <Radio value={'select'}>Select card</Radio>
                        <div className="input-field">
                            <CustomSelect value={cardsList[0] && cardsList[0].id}>
                                {cardsList.map(card => (
                                    <Option key={card.id} value={card.id}>{`**** **** **** ${card.last4}`}</Option>
                                ))}
                            </CustomSelect>
                        </div>

                        <Radio value={'new'}>or add new</Radio>

                        <StripeProvider apiKey={stripeKey}>
                            <Elements>
                                <Card disabled={selectedPaymentMethod === 'select'}/>
                            </Elements>
                        </StripeProvider>
                    </Radio.Group>
                </div>

                <div className="payment-description col">
                    <ul>
                        <li>tempor incididunt fugiat veniam mollit ullamco fugiat consectetur sunt incididunt</li>
                        <li>consequat occaecat aliqua dolore labore ad ad reprehenderit aute magna</li>
                        <li>et anim culpa do occaecat ea mollit proident excepteur officia</li>
                        <li>laboris ullamco adipisicing pariatur minim est excepteur duis cillum nulla</li>
                        <li>cupidatat esse ea eiusmod commodo nisi officia eiusmod duis elit</li>
                    </ul>

                    <div className="action">
                        <div className="budget">
                            Recommended Daily Budget:

                            <span className='value'>$ 500</span>
                        </div>

                        <button className='btn default'>Pay</button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Payment;