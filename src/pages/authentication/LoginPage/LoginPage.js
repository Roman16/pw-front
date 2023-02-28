import React, {useEffect, useState} from 'react'
import './LoginPage.less'
import {history} from "../../../utils/history"
import {useDispatch} from "react-redux"
import {userActions} from "../../../actions/user.actions"
import LoginForm from "./LoginForm"
import PageDescription from "./PageDescription"
import {userService} from "../../../services/user.services"
import Cookies from "js-cookie"
import {seo} from "../../../utils/seo"

const LoginPage = (props) => {
    const [user, setUser] = useState({
            email: '',
            password: '',
            remember_me: false
        }),
        [loginProcessing, setLoginProcessing] = useState(false),
        [failedFields, setFailedFields] = useState([])

    const dispatch = useDispatch()

    const urlParams = new URLSearchParams(props.location.search)


    const changeUserHandler = (value) => {
        setFailedFields(failedFields.filter(i => i !== Object.keys(value)[0]))
        setUser({...user, ...value})
    }

    const loginHandler = async (e) => {
        e.preventDefault()

        // const fieldEmailValid = /^([a-zA-Z0-9_\.-\.+])@([a-zA-Z0-9_\.-\.+])\.([a-zA-Z\.]{2,6})$/.test(user.email)
        const fieldEmailValid = true

        if (user.password.length < 6 || user.email.length === 0 || !fieldEmailValid) {
            if (user.password.length < 6) setFailedFields(prevState => [...prevState, 'password'])
            if (user.email.length === 0 || !fieldEmailValid) setFailedFields(prevState => [...prevState, 'email'])
        } else {
            try {
                setLoginProcessing(true)

                const {result} = await userService.login({
                    ...user,
                    ...props.location.search && {redirectLink: new URLSearchParams(props.location.search).get('redirect')},
                    ...Cookies.get('_ga') && {'ga_cid': Cookies.get('_ga')}
                })

                localStorage.setItem('token', result.access_token)

                // const importStatus = await userService.checkImportStatus()
                // dispatch(userActions.setInformation({importStatus: importStatus.result}))

                if (props.location.search) {
                    history.push(new URLSearchParams(props.location.search).get('redirect'))
                } else {
                    history.push('/home')
                }

                seo({title: 'Sponsoreds'})

            } catch (e) {
                console.log(e)
            }
        }

        setLoginProcessing(false)
    }

    useEffect(() => {
        seo({title: 'Login Sponsoreds'})

        if (props.match.params.status === 'logout') {
            localStorage.removeItem('importStatus')
            localStorage.removeItem('token')
            localStorage.removeItem('adminToken')
            localStorage.removeItem('userId')

            dispatch(userActions.setActiveRegion(undefined))

            userService.logOut()

            dispatch(userActions.logOut())

            history.push('/login')
        }

        if (urlParams.get('ref')) localStorage.setItem('refId', urlParams.get('ref'))


        if (localStorage.getItem('token')) {
            seo({title: 'Sponsoreds'})
            history.push('/home')
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
