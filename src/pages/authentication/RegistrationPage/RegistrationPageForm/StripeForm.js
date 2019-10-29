import React, {Component} from 'react';
import {CardNumberElement, CardExpiryElement, CardCvcElement,  injectStripe} from 'react-stripe-elements';

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
                <div className='card-element'>
                    <div>
                        <label className="label">Credit card</label>
                        <CardNumberElement/>
                    </div>
                    <div>
                        <label className="label">Expiry</label>
                        <CardExpiryElement/>
                    </div>
                    <div>
                        <label className="label">CVC</label>
                        <CardCvcElement/>
                    </div>
                </div>
                <button onClick={this.submit}>Purchase</button>
            </div>
        );
    }
}

export default injectStripe(StripeForm);