import React, {Component} from "react";
import {injectStripe} from "react-stripe-elements";
import {userService} from "../../../../services/user.services";

class ConfirmPaymentWindow extends Component {
    state = {
        amount: 0
    };

    handleConfirm = () => {
        const defaultCard = this.props.paymentCards.find(card => card.default)
        this.props.stripe.confirmCardPayment(
            this.props.userSecretKey,
            {
                payment_method: defaultCard.id
            }
        ).then(res => {
            console.log(res);
            // userService.confirmPayment({
            //     payment_intent_id: res.paymentIntent.id
            // });
            this.props.onClose();
        });

    };

    componentDidMount() {
        this.props.stripe.retrievePaymentIntent(
            this.props.userSecretKey
        ).then(res => {
            this.setState({
                amount: res.paymentIntent.amount
            });
        });
    }

    render() {
        const {amount} = this.state;

        return (
            <div>
                <h1>You have an unpaid payment</h1>

                {amount ? (<h2>$ {amount}</h2>) : ''}

                <button className="btn green-btn" onClick={this.handleConfirm}>Confirm</button>
            </div>
        )
    }
}

export default injectStripe(ConfirmPaymentWindow)