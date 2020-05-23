import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {injectStripe, CardNumberElement, CardExpiryElement, CardCvcElement} from "react-stripe-elements";


const CardNumberElementStyles = {
    base: {
        fontSize: '14px',
        letterSpacing: '-0.4375px',
        color: '#7C8A95'
    }
};

const Card = (props) => {
    const {disabled} = props;

    const {userFirstName, userLastName} = useSelector(state => ({
        userFirstName: state.user.user.name,
        userLastName: state.user.user.last_name,
    }));

    const [userName, setUserName] = useState(`${userFirstName} ${userLastName}`),
        [cardParams, setCardParams] = useState({
            card_number: false,
            expiry: false,
            cvc: false
        }),
        [autofocus, setAutofocus] = useState(true);

    function stripeElementChangesHandler(element, name) {
        if (!element.empty && element.complete) {
            setCardParams({
                ...cardParams,
                [name]: true,
            });
        } else {
            setCardParams({
                ...cardParams,
                [name]: false,
            });
        }

        setAutofocus(true);
    }

    function blurCardElementHandler() {
        setAutofocus(false);
    }


    useEffect(() => {
        if (cardParams.card_number && cardParams.expiry && cardParams.cvc) {
            const billing_details = {};
            billing_details.name = userName;

            props.stripe.createPaymentMethod('card', {billing_details})
                .then(res => {
                    console.log(res.paymentMethod.id);
                })
        }
    }, [cardParams]);


    return (
        <div className="card-fields">
            <div className="front-side-card">


                <div className="input-field user-name-field">
                    <label htmlFor="">First and Last Name</label>
                    <input
                        disabled={disabled}
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>

                <div className="row">
                    <div className="input-field">
                        <label htmlFor="">Card Number</label>

                        <CardNumberElement
                            disabled={disabled}
                            placeholder='**** **** **** ****'
                            style={CardNumberElementStyles}
                            onChange={(element) => stripeElementChangesHandler(element, 'card_number')}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="">Expiration</label>

                        <CardExpiryElement
                            disabled={disabled}
                            style={CardNumberElementStyles}
                            ref={(instance) => {
                                (autofocus && cardParams.card_number && instance && !cardParams.expiry) && instance._element.focus()
                            }}
                            onChange={(element) => stripeElementChangesHandler(element, 'expiry')}
                            onBlur={blurCardElementHandler}
                        />
                    </div>
                </div>
            </div>


            <div className="back-side-card">
                <div className='black-line'/>

                <div className="input-field">
                    <label htmlFor="">CVC</label>

                    <CardCvcElement
                        disabled={disabled}
                        style={CardNumberElementStyles}
                        placeholder={'* * *'}
                        ref={(instance) => {
                            (autofocus && cardParams.expiry && instance && !cardParams.cvc) && instance._element.focus();
                        }}
                        onChange={(element) => stripeElementChangesHandler(element, 'cvc')}
                        onBlur={blurCardElementHandler}
                    />
                </div>

            </div>
        </div>

    )
};

export default injectStripe(Card);