import React, {Component} from "react";
import {CardCvcElement, CardExpiryElement, CardNumberElement, injectStripe} from "react-stripe-elements";
import {SVG} from "../../../utils/icons";
import {Input} from "antd";

class NewCard extends Component {
    state = {
        autofocus: true
    };

    handleBlurCardElement = () => {
        this.setState({
            autofocus: false
        })
    };

    stripeElementChange = (element, name) => {
        this.props.stripeElementChange(element, name);

        if (!element.empty && element.complete) {
            this.setState({
                autofocus: true
            });
        }
    };


    render() {
        const {newCard, disabled} = this.props,
            {autofocus} = this.state;

        const CardElementStyles = {
            base: {
                fontSize: window.devicePixelRatio === 2 ? '10px' : '14px',
                color: '#656A84',
                fontWeight: '400',
                '::placeholder': {
                    color: '#C9CBD4',
                },

                ':disabled': {
                    cursor: 'not-allowed'
                }
            }
        };

        return (
            <div className={`new-card-container ${disabled ? 'disabled' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">First and Last Name</label>
                    <Input
                        disabled={disabled}
                        placeholder={'First and Last Name'}
                    />
                </div>

                <div className="card-container card-container__card">
                    <label className="label">Card Number</label>
                    <CardNumberElement
                        disabled={disabled}
                        placeholder='**** **** **** ****'
                        style={CardElementStyles}
                        onChange={(element) => this.stripeElementChange(element, 'card_number')}
                    />
                </div>

                <div className='row'>
                    <div className="card-container card-container__expiry">
                        <label className="label">Expiry</label>
                        <CardExpiryElement
                            disabled={disabled}
                            style={CardElementStyles}
                            ref={(instance) => {
                                (autofocus && newCard.card_number && instance && !newCard.expiry) && instance._element.focus()
                            }}
                            onChange={(element) => this.stripeElementChange(element, 'expiry')}
                            onBlur={this.handleBlurCardElement}
                        />
                    </div>

                    <div className="card-container card-container__cvc">
                        <label className="label">CVC</label>
                        <CardCvcElement
                            disabled={disabled}
                            style={CardElementStyles}
                            ref={(instance) => {
                                (autofocus && newCard.expiry && instance && !newCard.cvc) && instance._element.focus();
                            }}
                            onChange={(element) => this.stripeElementChange(element, 'cvc')}
                            onBlur={this.handleBlurCardElement}
                        />
                    </div>

                    <div className="description">
                        <SVG id='lock'/>

                        <p>
                            This is secure 256-bit <br/> SSL encrypted payment.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default injectStripe(NewCard);