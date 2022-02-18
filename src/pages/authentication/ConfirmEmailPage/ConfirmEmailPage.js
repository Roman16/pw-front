import React, {useEffect, useState} from 'react'
import {history} from "../../../utils/history"
import './ConfirmEmailPage.less'
import '../LoginPage/LoginPage.less'
import {userService} from "../../../services/user.services"
import {notification} from "../../../components/Notification"
import {Spin} from "antd"
import PageDescription from "../LoginPage/PageDescription"

let intervalId = null


const ConfirmEmailPage = (props) => {
    const [confirmStatus, setConfirmStatus] = useState(null),
        [disabledTimer, setDisabledTimer] = useState(localStorage.getItem('confirmEmailTimer') ? +localStorage.getItem('confirmEmailTimer') : 0)

    const onResend = async (e) => {
        e.preventDefault()
        setDisabledTimer(59)
        startTimer(true)

        try {
            const res = await userService.resendConfirmEmail()

            if (res.status === 'already') {
                notification.success({title: 'Email already confirmed'})

                setTimeout(() => {
                    history.push('/welcome')
                }, 2000)
            } else {
                setConfirmStatus('dont-confirm')
            }
        } catch (e) {
            console.log(e)
            setDisabledTimer(0)
            clearInterval(intervalId)
        }
    }

    const startTimer = (force) => {
        if (disabledTimer !== 0 || force) {
            intervalId = setInterval(() => {
                setDisabledTimer((prevCount) => {
                    return prevCount - 1
                })
            }, 1000)
        }
    }

    const goToLogin = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }

    useEffect(() => {
        if (disabledTimer === 0) {
            clearInterval(intervalId)
        }

        localStorage.setItem('confirmEmailTimer', disabledTimer)
    }, [disabledTimer])

    useEffect(() => {
        if (props.match.params && props.match.params.token) {
            userService.confirmEmail({
                token: props.match.params.token
            })
                .then((res) => {
                    localStorage.setItem('token', res.access_token)

                    setTimeout(() => {
                        history.push('/welcome')
                    }, 1)
                })
                .catch(() => {
                    setConfirmStatus('error')
                })
        } else {
            setConfirmStatus('dont-confirm')
        }

        startTimer()

        return (() => {
            clearInterval(intervalId)

            localStorage.removeItem('confirmEmailTimer')
        })
    }, [])

    return (
        <div className="auth-page confirm-page">
            <div className="container">
                <form onSubmit={onResend}>
                    {!confirmStatus && <div className="form-loader"><Spin size={'large'}/></div>}

                    {confirmStatus === 'dont-confirm' && <>
                        <h2>Account Confirmation</h2>

                        <h4>Account Confirmation</h4>

                        <p>
                            We’ve sent you an email to confirm your email address, simply tap the ‘Confirm’ button in
                            the email sent to.
                        </p>

                        <button
                            className='sds-btn default submit'
                            disabled={disabledTimer !== 0}
                        >
                            Resend
                        </button>

                        <p className={`timer ${disabledTimer === 0 ? 'hide' : ''}`}>
                            Retry after: 00:<span>{disabledTimer < 10 ? `0${disabledTimer}` : disabledTimer}</span>
                        </p>
                    </>}

                    {confirmStatus === 'error' && <>
                        <h2>Account Confirmation</h2>
                        <h4>Oops</h4>

                        <p>
                            Something went wrong with your account confirmation, please click ‘Resend’ and check your
                            email to confirm it.
                        </p>

                        <button
                            className='sds-btn default submit'
                            disabled={disabledTimer !== 0}
                        >
                            Resend
                        </button>

                        <p className={`timer ${disabledTimer === 0 ? 'hide' : ''}`}>
                            Retry after: 00:<span>{disabledTimer < 10 ? `0${disabledTimer}` : disabledTimer}</span>
                        </p>
                    </>}

                    <p className={'sign-up'}>
                        Already have an account?
                        <span onClick={goToLogin} className={'sign-in-link'}>Sign in</span>
                    </p>
                </form>
                <PageDescription/>
            </div>
        </div>
    )
}

export default ConfirmEmailPage