import React, {useEffect, useState} from 'react'
import './LoginPage.less'
import {history} from "../../../utils/history"
import {useDispatch} from "react-redux"
import {userActions} from "../../../actions/user.actions"
import LoginForm from "./LoginForm"
import PageDescription from "./PageDescription"
import {userService} from "../../../services/user.services"
import Cookies from "js-cookie"

const LoginPage = (props) => {
    const [user, setUser] = useState({
            email: '',
            password: '',
            remember_me: false
        }),
        [loginProcessing, setLoginProcessing] = useState(false),
        [failedFields, setFailedFields] = useState([])

    const dispatch = useDispatch()

    const changeUserHandler = (value) => {
        setFailedFields(failedFields.filter(i => i !== Object.keys(value)[0]))
        setUser({...user, ...value})
    }

    const loginHandler = async (e) => {
        e.preventDefault()

        const fieldEmailValid = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/.test(user.email)

        if (user.password.length < 6 || user.email.length === 0 || !fieldEmailValid) {
            if (user.password.length < 6) setFailedFields(prevState => [...prevState, 'password'])
            if (user.email.length === 0 || !fieldEmailValid) setFailedFields(prevState => [...prevState, 'email'])
        } else {
            try {
                setLoginProcessing(true)

                const res = await userService.login({
                    ...user,
                    ...props.location.search && {redirectLink: new URLSearchParams(props.location.search).get('redirect')},
                    ...Cookies.get('_ga') && {'ga_cid': Cookies.get('_ga')}
                })

                localStorage.setItem('token', res.access_token)

                const userFullInformation = await userService.getUserInfo()

                const mwsConnected = userFullInformation.account_links[0].amazon_mws.is_connected,
                    ppcConnected = userFullInformation.account_links[0].amazon_ppc.is_connected

                if (!mwsConnected && !ppcConnected) {
                    history.push('/connect-amazon-account')
                } else if (!mwsConnected && ppcConnected) {
                    history.push('/connect-mws-account')
                } else if (!ppcConnected && mwsConnected) {
                    history.push('/connect-ppc-account')
                } else {
                    if (userFullInformation.user.is_agency_client) history.push('/ppc/optimization')
                    else history.push('/account/settings')
                }

                dispatch(userActions.setInformation(userFullInformation))
            } catch (e) {
                console.log(e)
            }
        }

        setLoginProcessing(false)
    }

    useEffect(() => {
        if (props.match.params.status === 'logout') {
            localStorage.removeItem('token')
            localStorage.removeItem('adminToken')
            localStorage.removeItem('userId')
            dispatch(userActions.logOut())

            history.push('/login')
        }

        if (localStorage.getItem('token')) {
            history.push('/ppc/optimization')
        }
    }, [])

    return (
        <div className="auth-page login-page">
            <div className="container">
                <LoginForm
                    user={user}
                    processing={loginProcessing}
                    failedFields={failedFields}

                    onChange={changeUserHandler}
                    onSubmit={loginHandler}
                />

                <PageDescription/>
            </div>
        </div>
    )
}


export default LoginPage
