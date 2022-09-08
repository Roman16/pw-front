import React, {useState} from "react"
import {CardCvcElement, CardExpiryElement, CardNumberElement} from "react-stripe-elements"
import {SVG} from "../../../utils/icons"
import {Checkbox, Input} from "antd"

const NewCard = (props) => {
    const [autofocus, setAutofocus] = useState(true)

    const handleBlurCardElement = () => {
        setAutofocus(false)
    }

    const stripeElementChange = (element, name) => {
        props.stripeElementChange(element, name)

        if (!element.empty && element.complete) {
            setAutofocus(true)
        }
    }

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
        },
    }

    return (
        <div className={`new-card-container ${props.disabled ? 'disabled' : ''}`}>
            <div className="form-group">
                <label htmlFor="">First and Last Name</label>
                <Input
                    disabled={props.disabled}
                    placeholder={'First and Last Name'}
                    onChange={({target: {value}}) => props.onChangeUserName(value)}
                />
            </div>

            <div className="card-container card-container__card">
                <label className="label">Card Number</label>
                <CardNumberElement
                    required={!props.disabled}
                    disabled={props.disabled}
                    placeholder='**** **** **** ****'
                    style={CardElementStyles}
                    onChange={(element) => stripeElementChange(element, 'card_number')}
                />
            </div>

            <div className='row'>
                <div className="card-container card-container__expiry">
                    <label className="label">Expiry</label>
                    <CardExpiryElement
                        required={!props.disabled}
                        disabled={props.disabled}
                        style={CardElementStyles}
                        ref={(instance) => {
                            (autofocus && props.newCard.card_number && instance && !props.newCard.expiry) && instance._element.focus()
                        }}
                        onChange={(element) => stripeElementChange(element, 'expiry')}
                        onBlur={handleBlurCardElement}
                    />
                </div>

                <div className="card-container card-container__cvc">
                    <label className="label">CVC</label>
                    <CardCvcElement
                        required={!props.disabled}
                        disabled={props.disabled}
                        style={CardElementStyles}
                        ref={(instance) => {
                            (autofocus && props.newCard.expiry && instance && !props.newCard.cvc) && instance._element.focus()
                        }}
                        onChange={(element) => stripeElementChange(element, 'cvc')}
                        onBlur={handleBlurCardElement}
                    />
                </div>

                <div className="description">
                    <SVG id='lock'/>

                    <p>
                        This is secure 256-bit <br/> SSL encrypted payment.
                    </p>
                </div>
            </div>

            <Checkbox
                disabled={props.disabled}
                checked={props.dontSaveCard}
                onChange={({target: {checked}}) => props.switchSaveCard(checked)}
            >
                Don`t save this card for future payments
            </Checkbox>
        </div>
    )
}

export default NewCard