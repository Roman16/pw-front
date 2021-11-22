import React, {useState} from "react"
import {Elements, StripeProvider} from "react-stripe-elements"
import StripeForm from "./StripeForm"

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'

const CardInformation = ({card, isNewCard, updateProcessing,deleteProcessing, onAddCard, onUpdateCard, onDelete}) => {
    return (<section>
        <StripeProvider apiKey={stripeKey}>
            <Elements>
                <StripeForm
                    card={card}
                    isNewCard={isNewCard}
                    updateProcessing={updateProcessing}
                    deleteProcessing={deleteProcessing}

                    onAddCard={onAddCard}
                    onUpdateCard={onUpdateCard}
                    onDelete={onDelete}
                />
            </Elements>
        </StripeProvider>
    </section>)
}


export default CardInformation