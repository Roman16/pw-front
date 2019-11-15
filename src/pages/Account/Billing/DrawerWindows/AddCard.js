import React, {useState, Component} from "react";
import {CardNumberElement, CardExpiryElement, CardCvcElement, StripeProvider, Elements} from 'react-stripe-elements';
import {injectStripe} from "react-stripe-elements";

const CardNumberElementStyles = {
    base: {
        fontSize: '16px',
        letterSpacing: '5px',
    }
};

const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';


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
                <div className="card-container__expiry">
                    <label className="label">Expiry</label>
                    <CardExpiryElement
                        onChange={(element) => stripeElementChange(element, 'expiry')}
                    />
                </div>
                <div className="card-container__cvc">
                    <label className="label">CVC</label>
                    <CardCvcElement
                        onChange={(element) => stripeElementChange(element, 'cvc')}
                    />
                </div>
            </div>


            <div className='button-block'>
                <button className='btn cancel' type='button' onClick={onClose}>Cancel</button>
                <button className='btn green-btn'>Save</button>
            </div>
        </form>
    )
};


const AddCard = ({onSubmit}) => {

    const [cardValues, changeCard] = useState({});

    function stripeElementChange(element, name) {
        if (!element.empty && element.complete) {
            changeCard({
                ...cardValues,
                [name]: true
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit()
    }

    return (
        <div className='drawer-window add-card-window'>
            <h3>Add card</h3>

            <h4>Credit Card Information</h4>

            <StripeForm
                stripeElementChange={stripeElementChange}
                handleSubmit={handleSubmit}
                // onClose={onClose}
            />
        </div>
    )
};

export default injectStripe(AddCard);