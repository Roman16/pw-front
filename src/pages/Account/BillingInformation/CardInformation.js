import React, {useState} from "react"
import {Elements, StripeProvider} from "react-stripe-elements"
import StripeForm from "./StripeForm"
import PaymentRequestForm from './PayRequestButton'

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'

const CardInformation = ({card, cardList, isNewCard, updateProcessing, deleteProcessing, requiredForSubscribe = false, onAddCard, onUpdateCard, onDelete}) => {
    return (<section>
        <StripeProvider apiKey={stripeKey}>
            <Elements>
                <StripeForm
                    card={card}
                    cardList={cardList}
                    isNewCard={isNewCard}
                    updateProcessing={updateProcessing}
                    deleteProcessing={deleteProcessing}
                    requiredForSubscribe={requiredForSubscribe}

                    onAddCard={onAddCard}
                    onUpdateCard={onUpdateCard}
                    onDelete={onDelete}
                />

                {/*<PaymentRequestForm/>*/}
            </Elements>
        </StripeProvider>
    </section>)
}


export default CardInformation