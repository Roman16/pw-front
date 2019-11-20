import React, {useState, Component} from "react";
import {CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';

import {injectStripe} from "react-stripe-elements";
import lockIcon from '../../../../assets/img/icons/lock.svg';
import visaLogo from '../../../../assets/img/visa-logo.svg';
import mastercardLogo from '../../../../assets/img/mastercard.svg';
import discoverLogo from '../../../../assets/img/discover.svg';
import americanExpressLogo from '../../../../assets/img/american-express.svg';
import stripeLogo from '../../../../assets/img/stripe-logo.svg';

import {userService} from "../../../../services/user.services";

const CardNumberElementStyles = {
    base: {
        fontSize: '13px',
        letterSpacing: '-0.4375px',
        lineHeight: '20px'
    }
};


const StripeForm = (props) => {
    const {stripeElementChange, handleSubmit, onClose} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="card-container">
                <div className="card-container__card">
                    <label className="label">Credit card</label>
                    <CardNumberElement
                        placeholder='**** **** **** ****'
                        style={CardNumberElementStyles}
                        onChange={(element) => stripeElementChange(element, 'card_number')}
                    />
                </div>

                <div className='row'>
                    <div className="card-container__expiry">
                        <label className="label">Expiry</label>
                        <CardExpiryElement
                            style={CardNumberElementStyles}
                            onChange={(element) => stripeElementChange(element, 'expiry')}
                        />
                    </div>
                    <div className="card-container__cvc">
                        <label className="label">CVC</label>
                        <CardCvcElement
                            style={CardNumberElementStyles}
                            onChange={(element) => stripeElementChange(element, 'cvc')}
                        />
                    </div>

                    <img src={lockIcon} alt=""/>

                    <p>
                        this is a secure 128-bit ssl encrypted <br/> payment
                    </p>
                </div>
            </div>

            <div className='logo-block'>
                <img src={visaLogo} alt=""/>
                <img src={mastercardLogo} alt=""/>
                <img src={discoverLogo} alt=""/>
                <img src={americanExpressLogo} alt=""/>
                <img src={stripeLogo} alt=""/>
            </div>


            <div className='button-block'>
                <button className='btn cancel' type='button' onClick={onClose}>Cancel</button>
                <button className='btn green-btn'>Add</button>
            </div>
        </form>
    )
};


class AddCard extends Component {
    state = {};

    stripeElementChange = (element, name) => {
        if (!element.empty && element.complete) {
            this.setState({
                [name]: true
            });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await this.props.stripe.createToken();

            let cardParams = new URLSearchParams();
            cardParams.append('email', 'test233@gmail.com');
            cardParams.append('source', res.token.id);

            await userService.createStripeCustomer(cardParams);

            this.props.onSubmit(res.token.id)
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {onClose} = this.props;

        return (
            <div className='drawer-window add-card-window'>
                <button className="close-btn" type="button" onClick={onClose}>
                    &#215;
                </button>

                <h3>Add card</h3>

                <h4>Credit Card Information!</h4>

                <StripeForm
                    stripeElementChange={this.stripeElementChange}
                    handleSubmit={this.handleSubmit}
                    onClose={onClose}
                />
            </div>
        )
    }
}

export default injectStripe(AddCard);