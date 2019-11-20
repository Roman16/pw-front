import React, {Component} from 'react';
import {Select, notification} from 'antd';

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


class StripeForm extends Component {
    state = {
        countriesList: [],
    };


    submit = async (e) => {
        e.preventDefault();
    };


    componentDidMount() {
        userService.getStripeAvailableCountries(stripeKey)
            .then(res => {
                this.setState({countriesList: res.data.data})
            });
    }

    render() {
        const {countriesList, address_country} = this.state,
            {stripeElementChange, onChangeInput, onChangeCountry, onChangeState} = this.props;

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
                        />
                    </div>
                    <div className="card-container__cvc">
                        <label className="label">CVC</label>
                        <CardCvcElement
                            onChange={(element) => stripeElementChange(element, 'cvc')}
                        />
                    </div>
                </div>

                <div className="address-container">
                    <div>
                        <label className="label">Street Address</label>
                        <input
                            type="text"
                            name='address_line1'
                            onChange={onChangeInput}
                        />
                    </div>
                </div>

                <div className="country-container">
                    <div className="card-container__city">
                        <label className="label">City</label>
                        <input
                            type="text"
                            name='address_city'
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="card-container__zip">
                        <label className="label">Zip</label>
                        <input
                            type="text"
                            name='address_zip'
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="card-container__country">
                        <label className="label">Country</label>
                        <Select onChange={onChangeCountry}>
                            {countriesList.map(item => (
                                <Option key={item.id}>{allCountries[item.id]}</Option>
                            ))}
                        </Select>
                    </div>
                    {address_country === 'US' && <div className="card-container__state">
                        <label className="label">State</label>
                        <Select onChange={onChangeState}>
                            {states.map(item => (
                                <Option key={item.abbreviation}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default StripeForm;