import React, {Component} from "react"
import Input from "../../../components/Input/Input"
import {SVG} from "../../../utils/icons"
import {Spin} from "antd"
import {Link} from "react-router-dom"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    injectStripe,
} from "react-stripe-elements"
import visaLogo from "../../../assets/img/account/visa-logo.svg"
import masterLogo from "../../../assets/img/account/master-card-logo.svg"
import americanExpressLogo from "../../../assets/img/account/american-express-logo.svg"
import discoverLogo from "../../../assets/img/account/discover-logo.svg"
import stripeLogo from "../../../assets/img/account/stripe-logo.svg"
import {notification} from "../../../components/Notification"
import {userService} from "../../../services/user.services"
import Cookies from "js-cookie"
import {userActions} from "../../../actions/user.actions"
import {seo} from "../../../utils/seo"
import {history} from "../../../utils/history"

class RegistrationForm extends Component {
    state = {
        openedPassword: [],
        autofocus: true,
        selectedCard: {},
        card_number: false,
        expiry: false,
        cvc: false,
        defaultCard: true,
        failedFields: [],
        processing: false,

        user: {
            name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    onChange = (value) => {
        this.setState({failedFields: this.state.failedFields.filter(i => i !== Object.keys(value)[0])})
        this.setState({
            user: {
                ...this.state.user,
                ...value
            }
        })
    }

    openPasswordHandler = (field) => {
        if (this.state.openedPassword.includes(field)) this.setState({openedPassword: [...this.state.openedPassword.filter(i => i !== field)]})
        else this.setState({openedPassword: [...this.state.openedPassword, field]})
    }


    stripeElementChange = (element, name) => {
        this.setState(prevState => ({failedFields: prevState.failedFields.filter(i => i !== name)}))

        if (!element.empty && element.complete) {
            this.setState({
                [name]: true,
                autofocus: true
            })
        }
    }


    submitHandler = async (e) => {
        e.preventDefault()


        const {user} = this.state


        if (Object.values(user).some(i => !i) || user.password.length < 6 || user.password !== user.confirmPassword) {
            if (!user.name) this.setState(prevState => ({failedFields: [...prevState.failedFields, 'name']}))
            if (!user.last_name) this.setState(prevState => ({failedFields: [...prevState.failedFields, 'last_name']}))
            if (!user.email) this.setState(prevState => ({failedFields: [...prevState.failedFields, 'email']}))
            if (user.password.length < 6) this.setState(prevState => ({failedFields: [...prevState.failedFields, 'password']}))
            if (user.password !== user.confirmPassword) this.setState(prevState => ({failedFields: [...prevState.failedFields, 'confirmPassword']}))
        } else {
            this.setState({processing: true})

            try {
                const urlParams = new URLSearchParams(this.props.location.search)

                const ref = urlParams.get('ref') || localStorage.getItem('refId') || undefined

                const {result} = await userService.regist({
                    ...user,
                    ...this.props.match.params.tag === 'from-agency' ? {is_agency_client: 1} : {},
                    ...this.props.agency_token ? {agency_token: this.props.agency_token} : {},
                    ...ref ? {referral_code: ref} : {},
                    ...Cookies.get('_ga') && {'ga_cid': Cookies.get('_ga')}
                })

                this.props.setUser(user)

                localStorage.setItem('token', result.access_token)
                localStorage.removeItem('refId')

                seo({title: 'Sponsoreds'})

                history.push('/home')
            } catch (e) {
                console.log(e)
            }
        }

        this.setState({processing: false})
    }

    render() {
        const {user, openedPassword, failedFields, processing} = this.state


        return (<form onSubmit={this.submitHandler}>
            <h2>Sign up</h2>
            <p>Getting started with Sponsoreds is easy <br/> and takes a few steps! </p>

            <diw className={`form-group ${failedFields.includes('name') ? 'error-field' : ''}`}>
                <Input
                    type="text"
                    placeholder={'First Name'}
                    value={user.name}
                    onChange={({target: {value}}) => this.onChange({name: value})}
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
                    onChange={({target: {value}}) => this.onChange({last_name: value})}
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
                    onChange={({target: {value}}) => this.onChange({email: value})}
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

            <diw className={`form-group password ${failedFields.includes('password') ? 'error-field' : ''}`}>
                <Input
                    type={openedPassword.includes('password') ? 'text' : 'password'}
                    placeholder={'Password'}
                    value={user.password}
                    onChange={({target: {value}}) => this.onChange({password: value})}
                />

                {failedFields.includes('password') ? <div className={'input-suffix'}><InformationTooltip
                        type={'custom'}
                        description={'The password must be at least 6 characters.'}
                    >
                        <SVG id={'failed-field'}/>
                    </InformationTooltip></div>
                    :
                    <div className={'input-suffix'} onClick={() => this.openPasswordHandler('password')}>
                        <SVG id={openedPassword.includes('password') ? 'eye-opened' : 'eye-closed'}/>
                    </div>}
            </diw>

            <diw className={`form-group password ${failedFields.includes('confirmPassword') ? 'error-field' : ''}`}>
                <Input
                    type={openedPassword.includes('confirmPassword') ? 'text' : 'password'}
                    placeholder={'Confirm Password'}
                    value={user.confirmPassword}
                    onChange={({target: {value}}) => this.onChange({confirmPassword: value})}
                />

                {failedFields.includes('confirmPassword') ? <div className={'input-suffix'}><InformationTooltip
                        type={'custom'}
                        description={'Passwords do not match. Please make sure they match'}
                    >
                        <SVG id={'failed-field'}/>
                    </InformationTooltip></div>
                    :
                    <div className={'input-suffix'} onClick={() => this.openPasswordHandler('confirmPassword')}>
                        <SVG id={openedPassword.includes('confirmPassword') ? 'eye-opened' : 'eye-closed'}/>
                    </div>}
            </diw>

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
}


export default injectStripe(RegistrationForm)

