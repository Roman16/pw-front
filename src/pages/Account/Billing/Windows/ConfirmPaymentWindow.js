import React, {Component} from "react";
import {injectStripe} from "react-stripe-elements";
import {Spin} from "antd";
import {notification} from "../../../../components/Notification";

class ConfirmPaymentWindow extends Component {
    state = {
        clickedBtn: false
    };

    handleConfirm = () => {
        this.setState({
            clickedBtn: true
        });

        const defaultCard = this.props.paymentCards ? this.props.paymentCards.find(card => card.default) : null;

        if(defaultCard && this.props.paymentCards.length > 0) {
            this.props.stripe.confirmCardPayment(
                this.props.userSecretKey,
                {
                    payment_method: defaultCard.id
                }
            )
                .then((res) => {
                    if (res.error) {
                        notification.error({title: res.error.message})
                    } else {
                        this.props.onUpdateInformation()
                    }
                    this.props.onClose();
                    this.setState({
                        clickedBtn: false
                    });
                })
                .catch(e => {
                    console.log(e);
                    this.props.onClose();
                    this.setState({
                        clickedBtn: false
                    });
                })
        } else {
            this.props.onClose();
            notification.error({title: 'Add card first'});
            this.props.onOpenAddCardWindow('updateCard');
        }
    };


    render() {
        const {clickedBtn} = this.state;

        return (
            <div>
                <h2>We had a problem processing your payment.
                    Please press «Confirm» so we can turn on your subscription.</h2>

                <div className='buttons-block'>
                    {clickedBtn ?
                        <Spin/> :
                        <button className="btn default" onClick={this.handleConfirm} disabled={clickedBtn}>
                            Confirm
                        </button>
                    }
                </div>
            </div>
        )
    }
}

export default injectStripe(ConfirmPaymentWindow)