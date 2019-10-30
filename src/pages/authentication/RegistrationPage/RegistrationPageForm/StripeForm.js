import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe} from 'react-stripe-elements';

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

                <Row>
                    <Col xs={24} sm={24} md={16}>
                        <div className="input-container">
                            <CardNumberElement/>
                            <label className="label">Credit card</label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <div className="input-container">
                            <CardExpiryElement/>

                            <label className="label">Expiry</label>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <div className="input-container">
                            <CardCvcElement/>

                            <label className="label">CVC</label>
                        </div>
                    </Col>
                </Row>

                <button onClick={this.submit}>Purchase</button>

            </div>
        );
    }
}

export default injectStripe(StripeForm);