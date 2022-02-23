import React from "react"
import {injectStripe, PaymentRequestButtonElement} from "react-stripe-elements"

class PaymentRequestForm extends React.Component {
    constructor(props) {
        super(props);
//"tok_1KWHBNJzUVfwvcYwSc4UFOq6"
        // For full documentation of the available paymentRequest options, see:
        // https://stripe.com/docs/stripe.js#the-payment-request-object
        const paymentRequest = props.stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Demo total',
                amount: 100,
            },
        });

        paymentRequest.on('token', ({complete, token, ...data}) => {
            console.log('Received Stripe token: ', token);
            console.log('Received customer information: ', data);
            complete('success');
        });

        paymentRequest.on('paymentmethod', async (ev) => {
            // Confirm the PaymentIntent without handling potential next actions (yet).
            console.log(ev)

            // const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            //     clientSecret,
            //     {payment_method: ev.paymentMethod.id},
            //     {handleActions: false}
            // );

            // if (confirmError) {
            //     // Report to the browser that the payment failed, prompting it to
            //     // re-show the payment interface, or show an error message and close
            //     // the payment interface.
            //     ev.complete('fail');
            // } else {
            //     // Report to the browser that the confirmation was successful, prompting
            //     // it to close the browser payment method collection interface.
            //     ev.complete('success');
            //     // Check if the PaymentIntent requires any actions and if so let Stripe.js
            //     // handle the flow. If using an API version older than "2019-02-11"
            //     // instead check for: `paymentIntent.status === "requires_source_action"`.
            //     if (paymentIntent.status === "requires_action") {
            //         // Let Stripe.js handle the rest of the payment flow.
            //         const {error} = await stripe.confirmCardPayment(clientSecret);
            //         if (error) {
            //             // The payment failed -- ask your customer for a new payment method.
            //         } else {
            //             // The payment has succeeded.
            //         }
            //     } else {
            //         // The payment has succeeded.
            //     }
            // }
        });

        paymentRequest.canMakePayment().then((result) => {
            this.setState({canMakePayment: !!result});
        });

        this.state = {
            canMakePayment: false,
            paymentRequest,
        };
    }

    render() {
        return this.state.canMakePayment ? (
            <PaymentRequestButtonElement
                paymentRequest={this.state.paymentRequest}
                className="PaymentRequestButton"
                style={{
                    // For more details on how to style the Payment Request Button, see:
                    // https://stripe.com/docs/elements/payment-request-button#styling-the-element
                    paymentRequestButton: {
                        theme: 'light',
                        height: '64px',
                    },
                }}
            />
        ) : 'Payment buttons not available';
    }
}
export default injectStripe(PaymentRequestForm);