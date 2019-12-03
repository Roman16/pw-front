import React, {Component} from "react";
import {injectStripe} from "react-stripe-elements";
import {Spin} from "antd";
import {userService} from "../../../../services/user.services";

class ConfirmPaymentWindow extends Component {
    state = {
        amount: 0,
        clickedBtn: false
    };

    handleConfirm = () => {
        this.setState({
            clickedBtn: true
        });

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
        const {amount, clickedBtn} = this.state;

        return (
            <div>
                <h1>You have an unpaid payment</h1>

                {amount ? (<h2>$ {amount}</h2>) : ''}

                <button className="btn green-btn" onClick={this.handleConfirm} disabled={clickedBtn}>
                   {clickedBtn ? <Spin /> : 'Confirm'}
                </button>
            </div>
        )
    }
}

export default injectStripe(ConfirmPaymentWindow)