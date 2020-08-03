import React, {useState} from 'react';

import {CardNumberElement, CardExpiryElement, CardCvcElement} from 'react-stripe-elements';
import {SVG} from "../../../../utils/icons";


const CardElementStyles = window.devicePixelRatio === 2 ? {
    base: {
        color: '#000',
        fontWeight: 300,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '15px',
        '::placeholder': {
            color: '#C9CBD4',
            fontSize: '15px',
            fontWeight: 300,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        },
    },
} : {
    base: {
        color: '#000',
        fontWeight: 300,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '20px',
        '::placeholder': {
            color: '#C9CBD4',
            fontSize: '20px',
            fontWeight: 300,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        },
    },
};


const StripeForm = ({stripeElementChange, cardNumber, expiry, cvc}) => {
    const [autofocus, setAutofocus] = useState(true);

    const handleBlurCardElement = () => {
        setAutofocus(false)
    };

    const stripeElementChangeHandler = (element, name) => {
        stripeElementChange(element, name);

        if (!element.empty && element.complete) {
            setAutofocus(true);
        }
    };


    return (
        <div className="stripe-form">
            <div className="form-title">Billing Information</div>

            <div className="card-container">
                <div className="card-container__card">
                    <CardNumberElement
                        placeholder='Card number'
                        style={CardElementStyles}
                        onChange={(element) => stripeElementChangeHandler(element, 'card_number')}
                    />
                </div>

                <div className="row">
                    <div className="card-container__expiry">
                        <CardExpiryElement
                            placeholder='Expires'
                            onChange={(element) => stripeElementChangeHandler(element, 'expiry')}
                            style={CardElementStyles}
                            ref={(instance) => {
                                (autofocus && cardNumber && instance && !expiry) && instance._element.focus()
                            }}
                            onBlur={handleBlurCardElement}
                        />
                    </div>

                    <div className="card-container__cvc">
                        <CardCvcElement
                            placeholder='CVC'
                            onChange={(element) => stripeElementChangeHandler(element, 'cvc')}
                            style={CardElementStyles}
                            ref={(instance) => {
                                (autofocus && expiry && instance && !cvc) && instance._element.focus();
                            }}
                            onBlur={handleBlurCardElement}
                        />
                    </div>
                </div>
            </div>

            <p>
                <SVG id={'lock'}/>

                this is a secure 128-bit ssl encrypted payment
            </p>

            <div className="pay-logo">
                <SVG id={'visa-logo'}/>
                <SVG id={'mastercard'}/>
                <SVG id={'discover'}/>
                <SVG id={'american-express'}/>

                <SVG id={'by-stripe'}/>
            </div>
        </div>
    );
}

export default StripeForm;