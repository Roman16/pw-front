import React, {useState} from 'react'
import '../RegistrationPage/RegistrationPage.less'
import '../LoginPage/LoginPage.less'

import RegistrationForm from "../RegistrationPage/RegistrationForm"
import Cookies from "js-cookie"
import {userService} from "../../../services/user.services"
import {history} from "../../../utils/history"
import {useDispatch} from "react-redux"
import {userActions} from "../../../actions/user.actions"
import img from "../../../assets/img/page-login/description-img.svg"
import logo from "../../../assets/img/logo/sponsoreds-by-pw-logo.svg"
import logoMob from "../../../assets/img/logo/sponsoreds-by-pw-logo-mob.svg"
import {Elements, StripeProvider} from "react-stripe-elements"

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'

const AgencyRegistrationPage = (props) => {
    // const [user, setUser] = useState({
    //         name: '',
    //         last_name: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: '',
    //     }),
    //     [processing, setProcessing] = useState(false),
    //     [failedFields, setFailedFields] = useState([])
    //
    const dispatch = useDispatch()
    //
    //
    // const changeUserHandler = (value) => {
    //     setFailedFields(failedFields.filter(i => i !== Object.keys(value)[0]))
    //     setUser({...user, ...value})
    // }
    //
    // const registrationHandler = async (e) => {
    //     e.preventDefault()
    //
    //     if (Object.values(user).some(i => !i) || user.password.length < 6 || user.password !== user.confirmPassword) {
    //         if (!user.name) setFailedFields(prevState => [...prevState, 'name'])
    //         if (!user.last_name) setFailedFields(prevState => [...prevState, 'last_name'])
    //         if (!user.email) setFailedFields(prevState => [...prevState, 'email'])
    //         if (user.password.length < 6) setFailedFields(prevState => [...prevState, 'password'])
    //         if (user.password !== user.confirmPassword) setFailedFields(prevState => [...prevState, 'confirmPassword'])
    //     } else {
    //         try {
    //             setProcessing(true)
    //
    //             const res = await userService.regist({
    //                 ...user,
    //                 agency_token: props.match.params.token,
    //                 ...props.match.params.tag === 'from-agency' ? {is_agency_client: 1} : {},
    //                 ...Cookies.get('_ga') && {'ga_cid': Cookies.get('_ga')}
    //             })
    //
    //             dispatch(userActions.setInformation({user: {email: user.email}}))
    //
    //             localStorage.setItem('token', res.access_token)
    //
    //             // window.dataLayer.push({'event': 'Registration',})
    //
    //             history.push('/confirm-email')
    //         } catch (e) {
    //             console.log(e)
    //         }
    //
    //         setProcessing(false)
    //     }
    // }

    const setUser = (user) => {
        dispatch(userActions.setInformation({user: {email: user.email}}))
    }


    return (
        <div className="auth-page registration-page agency-registration">
            <div className="container">

                <StripeProvider apiKey={stripeKey}>
                    <Elements>
                        <RegistrationForm
                            {...props}
                            agency_token={props.match.params.token}
                            setUser={setUser}
                        />
                    </Elements>
                </StripeProvider>


                <div className="page-description">
                    <a href="https://sponsoreds.com" className={'logo'}>
                        <img src={logo} alt="" className={'desk'}/>
                        <img src={logoMob} alt="" className={'mob'}/>
                    </a>

                    <img src={img} alt="" className="description-img"/>

                    <p>An all-in-one ad management platform to <br/> scale your Amazon business.</p>

                    <div className="social">
                        <a
                            href="https://www.facebook.com/profitwhales"
                            target="_blank"
                            title="Facebook"
                        >
                            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z"
                                />
                            </svg>
                        </a>

                        <a
                            href="https://www.linkedin.com/company/profitwhales/"
                            target="_blank"
                            title="LinkedIn"
                        >
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.09414 15.4286H0.895472V5.1277H4.09414V15.4286ZM2.49309 3.72257C1.47025 3.72257 0.640625 2.87536 0.640625 1.8525C0.640625 1.36119 0.835794 0.889997 1.1832 0.542585C1.5306 0.195174 2.00178 0 2.49309 0C2.98439 0 3.45557 0.195174 3.80297 0.542585C4.15038 0.889997 4.34555 1.36119 4.34555 1.8525C4.34555 2.87536 3.51557 3.72257 2.49309 3.72257ZM16.0658 15.4286H12.874V10.4142C12.874 9.21912 12.8499 7.68656 11.2109 7.68656C9.54787 7.68656 9.29302 8.98493 9.29302 10.3281V15.4286H6.09779V5.1277H9.1656V6.53284H9.21037C9.63741 5.72351 10.6806 4.86941 12.2368 4.86941C15.4741 4.86941 16.0692 7.00121 16.0692 9.77015V15.4286H16.0658Z"
                                />
                            </svg>
                        </a>

                        <a
                            href="https://www.instagram.com/profit.whales/"
                            target="_blank"
                            title="Instagram"
                        >
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.07335 4.38503C6.51885 4.38503 4.45838 6.4455 4.45838 9C4.45838 11.5545 6.51885 13.615 9.07335 13.615C11.6279 13.615 13.6883 11.5545 13.6883 9C13.6883 6.4455 11.6279 4.38503 9.07335 4.38503ZM9.07335 12.0003C7.42257 12.0003 6.07302 10.6548 6.07302 9C6.07302 7.3452 7.41855 5.99967 9.07335 5.99967C10.7282 5.99967 12.0737 7.3452 12.0737 9C12.0737 10.6548 10.7241 12.0003 9.07335 12.0003ZM14.9535 4.19625C14.9535 4.79471 14.4715 5.27268 13.8771 5.27268C13.2786 5.27268 12.8007 4.79069 12.8007 4.19625C12.8007 3.60181 13.2827 3.11983 13.8771 3.11983C14.4715 3.11983 14.9535 3.60181 14.9535 4.19625ZM18.0101 5.28874C17.9418 3.84681 17.6125 2.56956 16.5561 1.51724C15.5038 0.464911 14.2265 0.135557 12.7846 0.0632601C11.2985 -0.0210867 6.84419 -0.0210867 5.35808 0.0632601C3.92017 0.131541 2.64292 0.460895 1.58657 1.51322C0.530231 2.56555 0.204893 3.8428 0.132596 5.28473C0.0482492 6.77084 0.0482492 11.2251 0.132596 12.7113C0.200877 14.1532 0.530231 15.4304 1.58657 16.4828C2.64292 17.5351 3.91615 17.8644 5.35808 17.9367C6.84419 18.0211 11.2985 18.0211 12.7846 17.9367C14.2265 17.8685 15.5038 17.5391 16.5561 16.4828C17.6084 15.4304 17.9378 14.1532 18.0101 12.7113C18.0944 11.2251 18.0944 6.77485 18.0101 5.28874ZM16.0902 14.3058C15.7769 15.093 15.1704 15.6995 14.3792 16.0168C13.1943 16.4868 10.3827 16.3783 9.07335 16.3783C7.76397 16.3783 4.94839 16.4828 3.76754 16.0168C2.9803 15.7036 2.37381 15.0971 2.05651 14.3058C1.58657 13.1209 1.69502 10.3094 1.69502 9C1.69502 7.69062 1.59059 4.87504 2.05651 3.69419C2.36979 2.90695 2.97629 2.30046 3.76754 1.98315C4.95241 1.51322 7.76397 1.62167 9.07335 1.62167C10.3827 1.62167 13.1983 1.51724 14.3792 1.98315C15.1664 2.29644 15.7729 2.90293 16.0902 3.69419C16.5601 4.87906 16.4517 7.69062 16.4517 9C16.4517 10.3094 16.5601 13.125 16.0902 14.3058Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AgencyRegistrationPage
