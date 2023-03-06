import React, {useEffect} from 'react'
import './RegistrationPage.less'
import '../LoginPage/LoginPage.less'

import PageDescription from "../LoginPage/PageDescription"
import RegistrationForm from "./RegistrationForm"
import {useDispatch} from "react-redux"
import {userActions} from "../../../actions/user.actions"
import {seo} from "../../../utils/seo"
import {Elements, StripeProvider} from "react-stripe-elements"

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'

const RegistrationPage = (props) => {
    const dispatch = useDispatch()

    const urlParams = new URLSearchParams(props.location.search)

    const setUser = (user) => {
        dispatch(userActions.setInformation({user: {email: user.email}}))
    }

    useEffect(() => {
        window.tap('create', tapfiliateKey, {integration: "javascript"})
        window.tap('detect')

        seo({title: 'Registration Sponsoreds'})

        if (urlParams.get('ref')) localStorage.setItem('refId', urlParams.get('ref'))
    }, [])

    return (
        <div className="auth-page registration-page">
            <div className="container">
                <StripeProvider apiKey={stripeKey}>
                    <Elements>
                        <RegistrationForm
                            setUser={setUser}
                            {...props}
                        />
                    </Elements>
                </StripeProvider>

                <PageDescription
                    location={'registration'}
                />
            </div>

        </div>
    )
}

export default RegistrationPage
