import React, {useEffect, useState} from "react"
import '../Profile/Profile.less'
import {SVG} from "../../../utils/icons"
import {Spin} from "antd"
import {userService} from "../../../services/user.services"
import {notification} from "../../../components/Notification"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

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
            <SectionIcon/>

            <div className="col">
                <h3>Password</h3>

                <p>You can change your password here.</p>

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


const SectionIcon = () => <i>
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="60" fill="#F3F3F3"/>
        <mask id="mask0_20928:65870" maskUnits="userSpaceOnUse" x="0" y="0"
              width="120" height="120">
            <circle cx="60" cy="60" r="60" fill="#C4C4C4"/>
        </mask>
        <g>
            <path
                d="M15 99.9654C18.0492 104.69 21.8254 108.901 26.1697 112.442H93.4803C97.8246 108.901 101.601 104.69 104.65 99.9654V25.8379H15V99.9654Z"
                fill="white"/>
            <path d="M15 25.8379V99.9654C16.3091 101.994 17.753 103.927 19.3178 105.754V25.8379H15Z"
                  fill="#E8E8E8"/>
            <path
                d="M95.4055 32.373H24.2444C23.646 32.373 23.1564 32.8626 23.1564 33.461V48.3408C23.1564 48.9391 23.646 49.4287 24.2444 49.4287H41.6589C42.6209 40.2544 50.4002 33.0796 59.8247 33.0796C69.2497 33.0796 77.029 40.2544 77.9908 49.4287H95.4051C96.0035 49.4287 96.4931 48.9391 96.4931 48.3408V33.461C96.4935 32.8626 96.0039 32.373 95.4055 32.373Z"
                fill="#F3F3F3"/>
            <path
                d="M59.825 41.3496C54.9681 41.3496 50.9105 44.8316 50.0129 49.4301H69.6374C68.7398 44.8316 64.6822 41.3496 59.825 41.3496Z"
                fill="#F3F3F3"/>
            <path
                d="M95.4055 56.459H24.2444C23.646 56.459 23.1564 56.9486 23.1564 57.547V61.5732C23.1564 62.1716 23.646 62.6612 24.2444 62.6612H34.7223C35.1751 62.2366 35.7816 61.9744 36.4498 61.9744H83.1999C83.8677 61.9744 84.4746 62.2366 84.9272 62.6612H95.4053C96.0037 62.6612 96.4933 62.1716 96.4933 61.5732V57.547C96.4935 56.9486 96.0039 56.459 95.4055 56.459Z"
                fill="#F3F3F3"/>
            <path
                d="M33.92 64.9453H24.2444C23.646 64.9453 23.1564 65.4349 23.1564 66.0333V70.0597C23.1564 70.6581 23.646 71.1477 24.2444 71.1477H33.92V64.9453Z"
                fill="#F3F3F3"/>
            <path
                d="M95.4057 64.9453H85.7299V71.1477H95.4057C96.0041 71.1477 96.4937 70.6581 96.4937 70.0597V66.0333C96.4937 65.4349 96.0041 64.9453 95.4057 64.9453Z"
                fill="#F3F3F3"/>
            <path
                d="M33.92 73.4316H24.2444C23.646 73.4316 23.1564 73.9212 23.1564 74.5196V78.5458C23.1564 79.1442 23.646 79.6338 24.2444 79.6338H33.92V73.4316Z"
                fill="#F3F3F3"/>
            <path
                d="M95.4057 73.4316H85.7299V79.6338H95.4057C96.0041 79.6338 96.4937 79.1442 96.4937 78.5458V74.5196C96.4937 73.9212 96.0041 73.4316 95.4057 73.4316Z"
                fill="#F3F3F3"/>
            <path
                d="M33.92 81.917H24.2444C23.646 81.917 23.1564 82.4066 23.1564 83.005V87.0312C23.1564 87.6296 23.646 88.1192 24.2444 88.1192H33.92V81.917Z"
                fill="#F3F3F3"/>
            <path
                d="M95.4057 81.917H85.7299V88.1192H95.4057C96.0041 88.1192 96.4937 87.6296 96.4937 87.0312V83.005C96.4937 82.4066 96.0041 81.917 95.4057 81.917Z"
                fill="#F3F3F3"/>
            <path
                d="M33.92 90.4033H24.2444C23.646 90.4033 23.1564 90.8929 23.1564 91.4913V95.5175C23.1564 96.1159 23.646 96.6055 24.2444 96.6055H33.92V90.4033Z"
                fill="#F3F3F3"/>
            <path
                d="M95.4057 90.4033H85.7299V96.6055H95.4057C96.0041 96.6055 96.4937 96.1159 96.4937 95.5175V91.4913C96.4937 90.8929 96.0041 90.4033 95.4057 90.4033Z"
                fill="#F3F3F3"/>
            <path
                d="M95.4055 98.8877H85.7297V99.4019C85.7297 100.797 84.5947 101.932 83.1999 101.932H36.4498C35.055 101.932 33.92 100.797 33.92 99.4019V98.8877H24.2444C23.646 98.8877 23.1564 99.3773 23.1564 99.9757V104.002C23.1564 104.6 23.646 105.09 24.2444 105.09H95.4053C96.0037 105.09 96.4933 104.6 96.4933 104.002V99.9757C96.4935 99.3773 96.0039 98.8877 95.4055 98.8877Z"
                fill="#F3F3F3"/>
            <path
                d="M27.4742 48.3408V33.461C27.4742 32.8626 27.9637 32.373 28.5621 32.373H24.2444C23.646 32.373 23.1564 32.8626 23.1564 33.461V48.3408C23.1564 48.9391 23.646 49.4287 24.2444 49.4287H28.5621C27.9637 49.4287 27.4742 48.9391 27.4742 48.3408Z"
                fill="#E8E8E8"/>
            <path
                d="M27.4742 61.5732V57.547C27.4742 56.9486 27.9637 56.459 28.5621 56.459H24.2444C23.646 56.459 23.1564 56.9486 23.1564 57.547V61.5732C23.1564 62.1716 23.646 62.6612 24.2444 62.6612H28.5621C27.9637 62.6612 27.4742 62.1716 27.4742 61.5732Z"
                fill="#E8E8E8"/>
            <path
                d="M27.4742 70.0597V66.0333C27.4742 65.4349 27.9637 64.9453 28.5621 64.9453H24.2444C23.646 64.9453 23.1564 65.4349 23.1564 66.0333V70.0597C23.1564 70.6581 23.646 71.1477 24.2444 71.1477H28.5621C27.9637 71.1477 27.4742 70.6581 27.4742 70.0597Z"
                fill="#E8E8E8"/>
            <path
                d="M27.4742 78.5458V74.5196C27.4742 73.9212 27.9637 73.4316 28.5621 73.4316H24.2444C23.646 73.4316 23.1564 73.9212 23.1564 74.5196V78.5458C23.1564 79.1442 23.646 79.6338 24.2444 79.6338H28.5621C27.9637 79.6338 27.4742 79.1442 27.4742 78.5458Z"
                fill="#E8E8E8"/>
            <path
                d="M27.4742 87.0312V83.005C27.4742 82.4066 27.9637 81.917 28.5621 81.917H24.2444C23.646 81.917 23.1564 82.4066 23.1564 83.005V87.0312C23.1564 87.6296 23.646 88.1192 24.2444 88.1192H28.5621C27.9637 88.1192 27.4742 87.6296 27.4742 87.0312Z"
                fill="#E8E8E8"/>
            <path
                d="M27.4742 95.5175V91.4913C27.4742 90.8929 27.9637 90.4033 28.5621 90.4033H24.2444C23.646 90.4033 23.1564 90.8929 23.1564 91.4913V95.5175C23.1564 96.1159 23.646 96.6055 24.2444 96.6055H28.5621C27.9637 96.6055 27.4742 96.1159 27.4742 95.5175Z"
                fill="#E8E8E8"/>
            <path
                d="M27.4742 104.002V99.9757C27.4742 99.3773 27.9637 98.8877 28.5621 98.8877H24.2444C23.646 98.8877 23.1564 99.3773 23.1564 99.9757V104.002C23.1564 104.6 23.646 105.09 24.2444 105.09H28.5621C27.9637 105.09 27.4742 104.6 27.4742 104.002Z"
                fill="#E8E8E8"/>
            <path
                d="M50.0441 61.9756V51.3484C50.0441 45.955 54.4319 41.5672 59.8251 41.5672C65.2184 41.5672 69.6063 45.955 69.6063 51.3484V61.9756H78.3102V51.3484C78.3102 41.1557 70.0178 32.8633 59.8251 32.8633C49.6324 32.8633 41.3402 41.1557 41.3402 51.3484V61.9756H50.0441Z"
                fill="#BABDC8"/>
            <path
                d="M45.658 61.9758V51.3486C45.658 41.8866 52.8056 34.0668 61.9841 32.9936C61.2751 32.9107 60.5555 32.8633 59.8251 32.8633C49.6324 32.8633 41.3402 41.1557 41.3402 51.3484V61.9756L45.658 61.9758Z"
                fill="#A9ADBB"/>
            <path
                d="M85.9472 99.4034C85.9472 100.914 84.7108 102.151 83.1998 102.151H36.4498C34.9388 102.151 33.7024 100.914 33.7024 99.4034V64.5052C33.7024 62.9942 34.9388 61.7578 36.4498 61.7578H83.1998C84.7108 61.7578 85.9472 62.9942 85.9472 64.5052V99.4034Z"
                fill="#DEDFE4"/>
            <path
                d="M38.0202 99.4034V64.5052C38.0202 62.9942 39.2566 61.7578 40.7676 61.7578H36.4498C34.9388 61.7578 33.7024 62.9942 33.7024 64.5052V99.4032C33.7024 100.914 34.9388 102.151 36.4498 102.151H40.7676C39.2566 102.151 38.0202 100.914 38.0202 99.4034Z"
                fill="#BABDC8"/>
            <path
                d="M65.0451 74.2092C65.0451 71.3263 62.7079 68.9893 59.8249 68.9893C56.9422 68.9893 54.605 71.3265 54.605 74.2092C54.605 76.522 56.1097 78.4821 58.1929 79.1676V87.6715C58.1929 88.5728 58.9234 89.3035 59.8249 89.3035C60.7264 89.3035 61.4569 88.5728 61.4569 87.6715V79.1676C63.5402 78.4824 65.0451 76.522 65.0451 74.2092Z"
                fill="#C9CBD4"/>
            <path
                d="M33.7024 94.8145V99.4025C33.7024 100.913 34.9388 102.15 36.4498 102.15H83.1998C84.7108 102.15 85.9472 100.913 85.9472 99.4025V94.8145H33.7024Z"
                fill="#C9CBD4"/>
        </g>
        <path
            d="M102.474 13H17.176C15.9792 13 15 13.9792 15 15.176V26.0558H104.65V15.176C104.65 13.9792 103.671 13 102.474 13Z"
            fill="#A9ADBB"/>
        <path
            d="M21.6047 21.7667C21.1392 21.7667 20.6855 21.5785 20.3568 21.2519C20.0299 20.9229 19.8419 20.4692 19.8419 20.004C19.8419 19.5407 20.0299 19.0872 20.3568 18.7582C20.6858 18.429 21.1394 18.2412 21.6047 18.2412C22.0677 18.2412 22.5238 18.4292 22.8504 18.7582C23.1796 19.0872 23.3676 19.5407 23.3676 20.004C23.3676 20.4692 23.1796 20.9229 22.8504 21.2519C22.5236 21.5785 22.0675 21.7667 21.6047 21.7667Z"
            fill="#DEDFE4"/>
        <path
            d="M27.3855 21.7667C26.9225 21.7667 26.4664 21.5785 26.1396 21.2495C25.8106 20.9229 25.6226 20.4692 25.6226 20.004C25.6226 19.5407 25.8106 19.0872 26.1396 18.7582C26.4688 18.429 26.9225 18.2412 27.3855 18.2412C27.851 18.2412 28.3044 18.4292 28.6337 18.7582C28.9603 19.0872 29.1483 19.5407 29.1483 20.004C29.1483 20.467 28.9603 20.9229 28.6337 21.2495C28.3044 21.5785 27.851 21.7667 27.3855 21.7667Z"
            fill="#DEDFE4"/>
        <path
            d="M33.1689 21.7667C32.7034 21.7667 32.2497 21.5785 31.9231 21.2519C31.5939 20.9229 31.4059 20.4692 31.4059 20.004C31.4059 19.5407 31.5939 19.0872 31.9231 18.7582C32.2497 18.429 32.7034 18.2412 33.1689 18.2412C33.6319 18.2412 34.088 18.4292 34.4146 18.7582C34.7438 19.0872 34.9318 19.5407 34.9318 20.004C34.9318 20.4692 34.7438 20.9229 34.4146 21.2519C34.0856 21.5785 33.6319 21.7667 33.1689 21.7667Z"
            fill="#DEDFE4"/>
    </svg>
</i>

export default AccessSettings