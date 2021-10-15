import React, {useState} from "react"
import Input from "../../../components/Input/Input"
import {SVG} from "../../../utils/icons"
import {Checkbox, Spin} from "antd"
import {Link} from "react-router-dom"

const RegistrationForm = ({user,processing, onChange}) => {
    const [passwordType, setPasswordType] = useState(false)

    return (<form action="">

        <h2>Sign up</h2>
        <p>Getting started with Sponsoreds is easy <br/> and takes a few steps! </p>

        <diw className="form-group">
            <Input
                type="text"
                placeholder={'First Name'}
                value={user.name}
                onChange={({target: {value}}) => onChange({name: value})}
            />
        </diw>
        <diw className="form-group">
            <Input
                type="text"
                placeholder={'Last Name'}
                value={user.last_name}
                onChange={({target: {value}}) => onChange({last_name: value})}
            />
        </diw>
        <diw className="form-group">
            <Input
                type="email"
                placeholder={'E-mail'}
                value={user.email}
                onChange={({target: {value}}) => onChange({email: value})}
            />
        </diw>

        <diw className="form-group password">
            <Input
                type={passwordType ? 'password' : 'text'}
                placeholder={'Password'}
                value={user.password}
                onChange={({target: {value}}) => onChange({password: value})}
            />

            <div className={'input-suffix'} onClick={() => setPasswordType(prevState => !prevState)}>
                <SVG id={passwordType ? 'eye-closed' : 'eye-opened'}/>
            </div>
        </diw>

        <diw className="form-group password">
            <Input
                type={passwordType ? 'password' : 'text'}
                placeholder={'Password'}
                value={user.confirmPassword}
                onChange={({target: {value}}) => onChange({confirmPassword: value})}
            />

            <div className={'input-suffix'} onClick={() => setPasswordType(prevState => !prevState)}>
                <SVG id={passwordType ? 'eye-closed' : 'eye-opened'}/>
            </div>
        </diw>

        <button className="sds-btn default submit" disabled={processing}>
            Sign up

            {processing && <Spin size={'small'}/>}
        </button>

        <p className="terms">
            By signing in, you agree to our <br/>
            <Link
                target="_blank"
                to={'/terms-and-conditions'}
            >
                Terms and Conditions
            </Link>
            &
            <Link
                target="_blank"
                to={'/policy'}
            >
                Privacy Policy
            </Link>
        </p>

        <p className="sign-up">
            Already have an account? <Link to={'/login'}>Sign in</Link>
        </p>
    </form>)
}

export default RegistrationForm