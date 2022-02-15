import React, {useState} from "react"
import Input from "../../../components/Input/Input"
import {SVG} from "../../../utils/icons"
import {Spin} from "antd"
import {Link} from "react-router-dom"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import CardForm from "./CardForm"
import {Elements, StripeProvider} from "react-stripe-elements"

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'


const RegistrationForm = ({user, processing, failedFields, onChange, onSubmit}) => {
    const [openedPassword, setOpenedPassword] = useState([])

    const openPasswordHandler = (field) => {
        if (openedPassword.includes(field)) setOpenedPassword([...openedPassword.filter(i => i !== field)])
        else setOpenedPassword([...openedPassword, field])
    }

    return (<form onSubmit={onSubmit}>
        <h2>Sign up</h2>
        <p>Getting started with Sponsoreds is easy <br/> and takes a few steps! </p>

        <diw className={`form-group ${failedFields.includes('name') ? 'error-field' : ''}`}>
            <Input
                type="text"
                placeholder={'First Name'}
                value={user.name}
                onChange={({target: {value}}) => onChange({name: value})}
            />

            {failedFields.includes('name') && <div className={'input-suffix'}>
                <InformationTooltip
                    type={'custom'}
                    description={'Required field'}
                >
                    <SVG id={'failed-field'}/>
                </InformationTooltip>
            </div>}
        </diw>

        <diw className={`form-group ${failedFields.includes('last_name') ? 'error-field' : ''}`}>
            <Input
                type="text"
                placeholder={'Last Name'}
                value={user.last_name}
                onChange={({target: {value}}) => onChange({last_name: value})}
            />

            {failedFields.includes('last_name') && <div className={'input-suffix'}>
                <InformationTooltip
                    type={'custom'}
                    description={'Required field'}
                >
                    <SVG id={'failed-field'}/>
                </InformationTooltip>
            </div>}
        </diw>

        <diw className={`form-group ${failedFields.includes('email') ? 'error-field' : ''}`}>
            <Input
                type="email"
                placeholder={'E-mail'}
                value={user.email}
                onChange={({target: {value}}) => onChange({email: value})}
            />

            {failedFields.includes('email') && <div className={'input-suffix'}>
                <InformationTooltip
                    type={'custom'}
                    description={'Required field'}
                >
                    <SVG id={'failed-field'}/>
                </InformationTooltip>
            </div>}
        </diw>

        <diw className="form-group password">
            <Input
                type={openedPassword.includes('password') ? 'text' : 'password'}
                placeholder={'Password'}
                value={user.password}
                onChange={({target: {value}}) => onChange({password: value})}
            />

            {failedFields.includes('password') ? <div className={'input-suffix'}><InformationTooltip
                    type={'custom'}
                    description={'The password must be at least 6 characters.'}
                >
                    <SVG id={'failed-field'}/>
                </InformationTooltip></div>
                :
                <div className={'input-suffix'} onClick={() => openPasswordHandler('password')}>
                    <SVG id={openedPassword.includes('password') ? 'eye-opened' : 'eye-closed'}/>
                </div>}
        </diw>

        <diw className="form-group password">
            <Input
                type={openedPassword.includes('confirmPassword') ? 'text' : 'password'}
                placeholder={'Confirm Password'}
                value={user.confirmPassword}
                onChange={({target: {value}}) => onChange({confirmPassword: value})}
            />

            {failedFields.includes('confirmPassword') ? <div className={'input-suffix'}><InformationTooltip
                    type={'custom'}
                    description={'Passwords do not match. Please make sure they match'}
                >
                    <SVG id={'failed-field'}/>
                </InformationTooltip></div>
                :
                <div className={'input-suffix'} onClick={() => openPasswordHandler('confirm-password')}>
                    <SVG id={openedPassword.includes('confirm-password') ? 'eye-opened' : 'eye-closed'}/>
                </div>}
        </diw>

        <StripeProvider apiKey={stripeKey}>
            <Elements>
                <CardForm/>
            </Elements>
        </StripeProvider>

        <button className="sds-btn default submit" disabled={processing}>
            Sign up

            {processing && <Spin size={'small'}/>}
        </button>

        <p className="terms">
            By signing in, you agree to our <br/>
            <a
                target="_blank"
                href={'https://sponsoreds.com/terms-of-service'}
            >
                Terms and Conditions
            </a>
            &
            <a
                target="_blank"
                href={'https://sponsoreds.com/privacy-policy'}
            >
                Privacy Policy
            </a>
        </p>

        <p className="sign-up">
            Already have an account? <Link to={'/login'}>Sign in</Link>
        </p>
    </form>)
}

export default RegistrationForm