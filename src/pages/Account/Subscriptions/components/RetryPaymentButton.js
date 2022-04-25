import React, {Component} from "react"
import {injectStripe} from "react-stripe-elements"
import {notification} from "../../../../components/Notification"
import {Link} from "react-router-dom"

class RetryPaymentButton extends Component {
    state = {
        clickedBtn: false
    }

    handleConfirm = () => {
        this.setState({
            clickedBtn: true
        })

        const defaultCard = this.state.upcoming_invoice.payment.card_last_4

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
                this.props.onClose()
                this.setState({
                    clickedBtn: false
                })
            })
            .catch(e => {
                console.log(e)
                this.props.onClose()
                this.setState({
                    clickedBtn: false
                })
            })
    }


    render() {
        const {clickedBtn} = this.state,
            {planKey, state} = this.props


        if (state.upcoming_invoice.payment.card_last_4) {
            return (
                <button
                    disabled={clickedBtn}
                    className={`btn ${planKey === 'full' ? 'default' : 'blue'}`}
                    onClick={this.handleConfirm}
                >
                    Retry Payment
                </button>
            )
        } else {
            return (
                <Link
                    to={'/account/billing-information'}
                    className={`btn ${planKey === 'full' ? 'default' : 'blue'}`}
                    onClick={this.handleConfirm}
                >
                    Retry Payment
                </Link>
            )

        }
    }
}

export default injectStripe(RetryPaymentButton)