import React, {Component} from 'react';
import {Select} from 'antd';

import {CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe} from 'react-stripe-elements';

const {Option} = Select;

const CardNumberElementStyles = {
    base: {
        fontSize: '16px',
        letterSpacing: '5px'
    }
};

class StripeForm extends Component {

    submit = async (ev) => {
        // this.props.stripe
        //     .createPaymentMethod('card', {billing_details: {name: 'Jenny Rosen'}})
        //     .then(({paymentMethod}) => {
        //         console.log('Received Stripe PaymentMethod:', paymentMethod);
        //     });

        // let {token} = await this.props.stripe.createToken({name: "Name"});
        // let response = await fetch("/charge", {
        //     method: "POST",
        //     headers: {"Content-Type": "text/plain"},
        //     body: token.id
        // });
        //
        // if (response.ok) console.log("Purchase Complete!")
    };

    render() {

        return (
            <div className="stripe-form">
                <div className="form-title">Billing Information</div>

                <div className="card-container">
                    <div className="card-container__card">
                        <label className="label">Credit card</label>
                        <CardNumberElement
                            placeholder='**** **** **** ****'
                            style={CardNumberElementStyles}
                        />
                    </div>
                    <div className="card-container__expiry">
                        <label className="label">Expiry</label>
                        <CardExpiryElement/>
                    </div>
                    <div className="card-container__cvc">
                        <label className="label">CVC</label>
                        <CardCvcElement/>
                    </div>
                </div>

                <div className="address-container">
                    <div>
                        <label className="label">Street Address</label>
                        <input type="text"/>
                    </div>
                </div>

                <div className="country-container">
                    <div className="card-container__city">
                        <label className="label">City</label>
                        <input type="text"/>
                    </div>
                    <div className="card-container__zip">
                        <label className="label">Zip</label>
                        <input type="text"/>
                    </div>
                    <div className="card-container__country">
                        <label className="label">Country</label>
                        <Select>
                        </Select>
                    </div>
                    <div className="card-container__state">
                        <label className="label">State</label>
                        <input type="text"/>
                    </div>
                </div>

                {/*<button onClick={this.submit}>Purchase</button>*/}
            </div>
        );
    }
}

export default injectStripe(StripeForm);