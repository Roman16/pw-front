import React, {useState, useEffect} from "react"
import './ResetPassword.less'
import {userService} from "../../../services/user.services"
import {history} from "../../../utils/history"
import '../LoginPage/LoginPage.less'
import {notification} from "../../../components/Notification"
import PageDescription from "../LoginPage/PageDescription"
import Input from "../../../components/Input/Input"
import {Spin} from "antd"
import {Link} from "react-router-dom"

const ResetPassword = (props) => {
    const [userParams, setParams] = useState({}),
        [resetStatus, setResetStatus] = useState(null),
        [processing, setProcessing] = useState(false)

    const handleChange = (e) => {
        setParams({
            ...userParams,
            [e.target.name]: e.target.value
        })
    }

    const sendEmailHandler = async (e) => {
        e.preventDefault()
        setProcessing(true)

        try {
            await userService.sendEmailForResetPassword({email: userParams.email})
            setResetStatus('sent')
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const changePasswordHandler = async (e) => {
        e.preventDefault()
        setProcessing(true)

        if (userParams.password === userParams.confirmPassword) {
            try {
                const res = await userService.changeUserPassword({
                    token: props.match.params.token,
                    userId: props.match.params.userId,
                    newPassword: {
                        password: userParams.password,
                        password_confirmation: userParams.confirmPassword
                    }
                })

                notification.success({title: 'Success'})

                localStorage.setItem('token', res.access_token)

                setTimeout(() => {
                    history.push('/account/settings')
                }, 1)
            } catch (e) {
                console.log(e)
            }
        } else {
            notification.error({title: 'The password confirmation does not match'})
        }

        setProcessing(false)
    }

    useEffect(() => {
        if (props.match.params && props.match.params.userId && props.match.params.token) {
            userService.checkResetToken({
                token: props.match.params.token,
                userId: props.match.params.userId,
            })
                .then((res) => {
                    setResetStatus('changePass')
                })
                .catch(() => {
                    setResetStatus('sendEmail')
                })
        } else {
            setResetStatus('sendEmail')
        }
    }, [])


    return (
        <div className='auth-page reset-password-page'>
            <div className="container">
                <form action="">
                    <h2>Reset Password</h2>
                    <p>
                        Please enter your email address and <br/> we will email you a link to reset your <br/> password
                    </p>

                    <diw className="form-group">
                        <Input
                            type="email"
                            placeholder={'E-mail'}
                            // value={user.email}
                            // onChange={({target: {value}}) => onChange({email: value})}
                        />
                    </diw>
                    <button className="sds-btn default submit" disabled={processing}>
                        Get the link

                        {processing && <Spin size={'small'}/>}
                    </button>

                    <p className={'sign-in'}>Remembered password? <Link to={'/login'}>Sign in</Link></p>

                    <p className={'sign-up'}>Don’t have an account? <Link to={'/registration'}>Sign up</Link></p>
                </form>

                <PageDescription/>
            </div>

        </div>
    )
}

export default ResetPassword