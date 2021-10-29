import React, {useState} from "react"
import Input from "../../../components/Input/Input"
import {Link} from "react-router-dom"
import {Checkbox, Spin} from "antd"
import {SVG} from "../../../utils/icons"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

const LoginForm = ({user, processing, onChange, onSubmit, failedFields}) => {
    const [passwordType, setPasswordType] = useState(true)

    return (<form onSubmit={onSubmit}>
            <h2>Sign in</h2>
            <p>Welcome back, Please login <br/>to your account</p>

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
                        description={user.email.length === 0 ? 'The letter must contain at least 1 character.' : 'Invalid email address'}
                    >
                        <SVG id={'failed-field'}/>
                    </InformationTooltip>
                </div>}
            </diw>

            <diw className={`form-group password ${failedFields.includes('password') ? 'error-field' : ''}`}>
                <Input
                    type={passwordType ? 'password' : 'text'}
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
                    <div className={'input-suffix'} onClick={() => setPasswordType(prevState => !prevState)}>
                        <SVG id={passwordType ? 'eye-closed' : 'eye-opened'}/>
                    </div>}
            </diw>

            <div className="row">
                <Checkbox
                    onChange={({target: {checked}}) => onChange({remember_me: checked})}
                >
                    Remember me
                </Checkbox>

                <Link
                    className="login-form-forgot forget"
                    to="/reset-password"
                >
                    Forgot password?
                </Link>
            </div>

            <button className="sds-btn default submit" disabled={processing}>
                Sign In

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
                Don’t have an account? <Link to={'/registration'}>Sign up</Link>
            </p>
        </form>
    )
}

export default LoginForm