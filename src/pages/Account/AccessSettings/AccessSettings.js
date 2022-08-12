import React, {useState} from "react"
import '../Profile/Profile.less'
import {SVG} from "../../../utils/icons"
import {Spin} from "antd"
import {userService} from "../../../services/user.services"
import {notification} from "../../../components/Notification"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import sectionIcon from '../../../assets/img/account/access-settings-icon.svg'

const AccessSettings = () => {
    const [saveProcessing, setSaveProcessing] = useState(false),
        [userPassword, setUserPassword] = useState({
            current_password: '',
            new_password: '',
            password_confirmation: '',
        }),
        [errorFields, setErrorFields] = useState([])

    const saveSettingsHandler = async () => {
        setSaveProcessing(true)

        if (!userPassword.current_password || userPassword.new_password.length < 6 || userPassword.new_password !== userPassword.password_confirmation) {
            if (!userPassword.current_password) setErrorFields(prevState => [...prevState, 'current_password'])
            if (userPassword.new_password.length < 6) setErrorFields(prevState => [...prevState, 'new_password'])
            if (userPassword.new_password !== userPassword.password_confirmation) setErrorFields(prevState => [...prevState, 'password_confirmation'])
        } else {
            try {
                await userService.changePassword(userPassword)

                setUserPassword({
                    current_password: '',
                    new_password: '',
                    password_confirmation: ''
                })

                notification.success({title: 'Completed'})
            } catch (e) {
                console.log(e)
            }
        }

        setSaveProcessing(false)
    }


    const changeInputHandler = ({target: {name, value}}) => {
        setErrorFields([...errorFields.filter(i => i !== name)])

        setUserPassword({
            ...userPassword,
            [name]: value
        })
    }

    return (<section className={'profile access-settings'}>
        <div className="container">
            <img src={sectionIcon} alt=""/>

            <div className="col">
                <div className="row">
                    <img src={sectionIcon} alt=""/>

                    <div className="section-description">
                        <h3>Password</h3>

                        <p>You can change your password here.</p>
                    </div>
                </div>

                <PasswordInput
                    label={'Old Password'}
                    name={'current_password'}
                    errorFields={errorFields}
                    value={userPassword.current_password}
                    onChange={changeInputHandler}
                />
                <PasswordInput
                    label={'New Password'}
                    name={'new_password'}
                    errorFields={errorFields}
                    value={userPassword.new_password}
                    onChange={changeInputHandler}
                />
                <PasswordInput
                    label={'Confirm New Password'}
                    name={'password_confirmation'}
                    errorFields={errorFields}
                    value={userPassword.password_confirmation}
                    onChange={changeInputHandler}
                />

                <button
                    className="btn default"
                    onClick={saveSettingsHandler}
                    disabled={saveProcessing}
                >
                    Save Changes

                    {saveProcessing && <Spin size={'small'}/>}
                </button>

            </div>
        </div>
    </section>)
}

const PasswordInput = ({label, value, name, errorFields, onChange}) => {
    const [openedPassword, setOpenedPassword] = useState(false)

    const isErrorField = errorFields.includes(name)

    return (<div className={`form-group ${isErrorField ? 'error-field' : ''}`}>
        <label>{label}</label>
        <input
            type={openedPassword ? 'text' : 'password'}
            placeholder={label}
            value={value}
            name={name}
            onChange={onChange}
        />

        {isErrorField ? <div className={'input-suffix'}><InformationTooltip
                type={'custom'}
                description={name === 'current_password' ? 'This field is required' : name === 'new_password' ? 'Minimum 6 characters' : 'Password confirmation doesn\'t match password'}
            >
                <SVG id={'failed-field'}/>
            </InformationTooltip></div>
            : <div className={`input-suffix ${openedPassword ? 'opened' : ''}`}
                   onClick={() => setOpenedPassword(prevState => !prevState)}>
                <SVG id={openedPassword ? 'eye-opened' : 'eye-closed'}/>
            </div>}
    </div>)
}

export default AccessSettings