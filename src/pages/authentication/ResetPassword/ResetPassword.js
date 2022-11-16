import React, {useState, useEffect} from "react"
import './ResetPassword.less'
import {userService} from "../../../services/user.services"
import {history} from "../../../utils/history"
import '../LoginPage/LoginPage.less'
import PageDescription from "../LoginPage/PageDescription"
import Input from "../../../components/Input/Input"
import {Spin} from "antd"
import {Link} from "react-router-dom"
import {SVG} from "../../../utils/icons"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

const ResetPassword = (props) => {
    const [user, setUser] = useState({
            password: '',
            password_confirmation: ''
        }),
        [email, setEmail] = useState(''),
        [resetStatus, setResetStatus] = useState(null),
        [processing, setProcessing] = useState(false),
        [failedFields, setFailedFields] = useState([]),
        [openedPassword, setOpenedPassword] = useState([])


    const openPasswordHandler = (field) => {
        if (openedPassword.includes(field)) setOpenedPassword([...openedPassword.filter(i => i !== field)])
        else setOpenedPassword([...openedPassword, field])
    }

    const onChange = (value) => {
        setFailedFields(failedFields.filter(i => i !== Object.keys(value)[0]))
        setUser({...user, ...value})
    }

    const sendEmailHandler = async (e) => {
        e.preventDefault()

        if (!email) {
            setFailedFields(prevState => [...prevState, 'email'])
        } else {
            setProcessing(true)

            try {
                await userService.sendEmailForResetPassword({email: email})
                setResetStatus('sent')
            } catch (e) {
                console.log(e)
            }
        }

        setProcessing(false)
    }

    const changePasswordHandler = async (e) => {
        e.preventDefault()
        setProcessing(true)

        if (!user.password || user.password !== user.password_confirmation) {
            if (user.password.length < 6) setFailedFields(prevState => [...prevState, 'password'])
            if (user.password !== user.password_confirmation) setFailedFields(prevState => [...prevState, 'password_confirmation'])
        } else {
            try {
                const {result} = await userService.changeUserPassword({
                    token: props.match.params.token,
                    userId: props.match.params.userId,
                    newPassword: user
                })

                localStorage.setItem('token', result.access_token)

                setTimeout(() => {
                    history.push('/home')
                }, 1)
            } catch (e) {
                console.log(e)
            }
        }

        setProcessing(false)
    }

    useEffect(() => {
        if (props.match.params && props.match.params.userId && props.match.params.token) {
            userService.checkResetToken({
                token: props.match.params.token,
                userId: props.match.params.userId,
            })
                .then(() => {
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
                <form>
                    {resetStatus === 'sendEmail' &&
                    <>
                        <h2>Reset Password</h2>
                        <p>
                            Please enter your email address and <br/> we will email you a link to reset
                            your <br/> password
                        </p>

                        <diw className={`form-group ${failedFields.includes('email') ? 'error-field' : ''}`}>
                            <Input
                                type="email"
                                placeholder={'E-mail'}
                                value={email}
                                onChange={({target: {value}}) => {
                                    setFailedFields([...failedFields.filter(i => i !== 'email')])
                                    setEmail(value)
                                }}
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

                        <button type={'button'} className="sds-btn default submit" disabled={processing}
                                onClick={sendEmailHandler}>
                            Get the link
                            {processing && <Spin size={'small'}/>}
                        </button>

                        <p className={'sign-in'}>Remembered password? <Link to={'/login'}>Sign in</Link></p>

                        <p className={'sign-up'}>Don’t have an account? <Link to={'/registration'}>Sign up</Link></p>
                    </>}

                    {resetStatus === 'sent' && <div className={'sent'}>
                        <h2>Reset Password</h2>
                        <h4>The email has been sent to you.</h4>

                        <p>
                            Check your email box and follow the instructions to reset the password.
                        </p>
                    </div>}

                    {resetStatus === 'changePass' && <>
                        <h2>Create new password</h2>

                        <p>
                            Please create new password
                        </p>

                        <diw className={`form-group ${failedFields.includes('password') ? 'error-field' : ''}`}>
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

                        <diw className={`form-group ${failedFields.includes('password_confirmation') ? 'error-field' : ''}`}>
                            <Input
                                type={openedPassword.includes('password_confirmation') ? 'text' : 'password'}
                                placeholder={'Confirm Password'}
                                value={user.password_confirmation}
                                onChange={({target: {value}}) => onChange({password_confirmation: value})}
                            />

                            {failedFields.includes('password_confirmation') ?
                                <div className={'input-suffix'}><InformationTooltip
                                    type={'custom'}
                                    description={'Passwords do not match. Please make sure they match'}
                                >
                                    <SVG id={'failed-field'}/>
                                </InformationTooltip></div>
                                :
                                <div className={'input-suffix'} onClick={() => openPasswordHandler('confirm-password')}>
                                    <SVG
                                        id={openedPassword.includes('confirm-password') ? 'eye-opened' : 'eye-closed'}/>
                                </div>}
                        </diw>

                        <button type={'button'} className="sds-btn default submit confirm" disabled={processing}
                                onClick={changePasswordHandler}>
                            Confirm

                            {processing && <Spin size={'small'}/>}
                        </button>
                    </>}
                </form>

                <PageDescription/>
            </div>

        </div>
    )
}

export default ResetPassword