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

        const defaultCard = this.props.paymentCards.find(card => card.default);
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
                <h2>There was an issue with your payment in the amount of</h2>

                {amount ? (<h2><b>$ {amount || 0}</b></h2>) : ''}

                <h2>Please update your payment method or try again.</h2>

                <div className='buttons-block'>
                    <button className="btn default" onClick={() => window.open('https://profit-whales.kayako.com/')}>
                        I need help
                    </button>

                    <button className="btn green-btn" onClick={this.handleConfirm} disabled={clickedBtn}>
                        {clickedBtn ? <Spin/> : 'Confirm'}
                    </button>
                </div>
            </div>
        )
    }
}

export default injectStripe(ConfirmPaymentWindow)