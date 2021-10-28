import React, {useEffect, useState} from 'react'
import './RegistrationPage.less'
import '../LoginPage/LoginPage.less'

import PageDescription from "../LoginPage/PageDescription"
import RegistrationForm from "./RegistrationForm"
import Cookies from "js-cookie"
import {userService} from "../../../services/user.services"
import {history} from "../../../utils/history"
import {useDispatch} from "react-redux"
import {userActions} from "../../../actions/user.actions"
import {seo} from "../../../utils/seo"

const RegistrationPage = (props) => {
    const [user, setUser] = useState({
            name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }),
        [processing, setProcessing] = useState(false),
        [failedFields, setFailedFields] = useState([])

    const dispatch = useDispatch()


    const changeUserHandler = (value) => {
        setFailedFields(failedFields.filter(i => i !== Object.keys(value)[0]))
        setUser({...user, ...value})
    }

    const registrationHandler = async (e) => {
        e.preventDefault()

        if (Object.values(user).some(i => !i) || user.password.length < 6 || user.password !== user.confirmPassword) {
            if (!user.name) setFailedFields(prevState => [...prevState, 'name'])
            if (!user.last_name) setFailedFields(prevState => [...prevState, 'last_name'])
            if (!user.email) setFailedFields(prevState => [...prevState, 'email'])
            if (user.password.length < 6) setFailedFields(prevState => [...prevState, 'password'])
            if (user.password !== user.confirmPassword) setFailedFields(prevState => [...prevState, 'confirmPassword'])
        } else {
            try {
                setProcessing(true)

                const urlParams = new URLSearchParams(props.location.search)
                const ref = urlParams.get('ref')
                const coupon = urlParams.get('coupon')

                const res = await userService.regist({
                    ...user,
                    ...props.match.params.tag === 'from-agency' ? {is_agency_client: 1} : {},
                    ...ref ? {referral_code: ref} : {},
                    ...coupon ? {coupon: coupon} : {},
                    ...Cookies.get('_ga') && {'ga_cid': Cookies.get('_ga')}
                })

                dispatch(userActions.setInformation({user: {email: user.email}}))

                localStorage.setItem('token', res.access_token)

                // window.dataLayer.push({'event': 'Registration',})

                history.push('/confirm-email')
            } catch (e) {
                console.log(e)
            }

            setProcessing(false)
        }
    }

    useEffect(() => {
        seo({title: 'Registration Sponsoreds'})

    }, [])

    return (
        <div className="auth-page registration-page">
            <div className="container">
                <RegistrationForm
                    user={user}
                    failedFields={failedFields}
                    processing={processing}

                    onChange={changeUserHandler}
                    onSubmit={registrationHandler}
                />

                <PageDescription/>
            </div>

        </div>
    )
}

export default RegistrationPage
