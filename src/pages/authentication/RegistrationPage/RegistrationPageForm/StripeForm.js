import React, {useState, useEffect} from 'react';
import {Select} from 'antd';

import {CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';
import {userService} from '../../../../services/user.services';

import {states} from '../../../../utils/states';
import {allCountries} from '../../../../utils/countries';


const {Option} = Select;

const CardNumberElementStyles = {
    base: {
        fontSize: '16px',
        letterSpacing: '5px',
    }
};

const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';


const StripeForm = ({stripeElementChange, onChangeInput, onChangeCountry, onChangeState, cardNumber, expiry, cvc, autofocus, onBlurCardElement}) => {
    const [countriesList, setCountryList] = useState([]),
        [selectedCountry, selectCountry] = useState('');

    function handleSelectCountry(country) {
        selectCountry(country);
        onChangeCountry(country);
    }

    useEffect(() => {
        userService.getStripeAvailableCountries(stripeKey)
            .then(res => {
                setCountryList(res.data.data)
            });
    }, []);

    return (
        <div className="stripe-form">
            <div className="form-title">Billing Information (optional)</div>

            <div className="card-container">
                <div className="card-container__card">
                    <label className="label">Credit card</label>
                    <CardNumberElement
                        placeholder='**** **** **** ****'
                        style={CardNumberElementStyles}
                        onChange={(element) => stripeElementChange(element, 'card_number')}
                    />
                </div>
                <div className="card-container__expiry">
                    <label className="label">Expiry</label>
                    <CardExpiryElement
                        onChange={(element) => stripeElementChange(element, 'expiry')}
                        onBlur={onBlurCardElement}
                        style={CardNumberElementStyles}
                        ref={(instance) => {
                            (autofocus && cardNumber && instance && !expiry) && instance._element.focus()
                        }}
                    />
                </div>
                <div className="card-container__cvc">
                    <label className="label">CVC</label>
                    <CardCvcElement
                        onChange={(element) => stripeElementChange(element, 'cvc')}
                        onBlur={onBlurCardElement}
                        style={CardNumberElementStyles}
                        ref={(instance) => {
                            (autofocus && expiry && instance && !cvc) && instance._element.focus();
                        }}
                    />
                </div>
            </div>

            <div className="address-container">
                <div>
                    <label className="label">Street Address</label>
                    <input
                        type="text"
                        name='line1'
                        onChange={onChangeInput}
                    />
                </div>
            </div>

            <div className="country-container">
                <div className="card-container__city">
                    <label className="label">City</label>
                    <input
                        type="text"
                        name='city'
                        onChange={onChangeInput}
                    />
                </div>
                <div className="card-container__zip">
                    <label className="label">Zip</label>
                    <input
                        type="text"
                        name='postal_code'
                        onChange={onChangeInput}
                    />
                </div>
                <div className="card-container__country">
                    <label className="label">Country</label>
                    <Select onChange={handleSelectCountry}>
                        {countriesList.map(item => (
                            <Option key={item.id}>{allCountries[item.id]}</Option>
                        ))}
                    </Select>
                </div>
                {/*{selectedCountry === 'US' && <div className="card-container__state">*/}
                {/*    <label className="label">State</label>*/}
                {/*    <Select onChange={onChangeState}>*/}
                {/*        {states.map(item => (*/}
                {/*            <Option key={item.abbreviation}>{item.name}</Option>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</div>}*/}

                <div className="card-container__zip">
                    <label className="label">State</label>
                    <input
                        type="text"
                        name='state'
                        onChange={onChangeInput}
                    />
                </div>

            </div>
        </div>
    );
}

export default StripeForm;