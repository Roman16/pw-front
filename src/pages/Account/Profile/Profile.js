import React, {useEffect, useState} from "react"
import './Profile.less'
import {useDispatch, useSelector} from "react-redux"
import {Spin} from "antd"
import {userService} from "../../../services/user.services"
import {notification} from "../../../components/Notification"
import {userActions} from "../../../actions/user.actions"
import {SVG} from "../../../utils/icons"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import sectionIcon from '../../../assets/img/account/profile-icon.svg'

const Profile = () => {
    const
        // [userInformation, setUserInformation] = useState({}),
        [saveProcessing, setSaveProcessing] = useState(false),
        [errorFields, setErrorFields] = useState([])

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const changeInputHandler = ({target: {name, value}}) => {
        setErrorFields([...errorFields.filter(i => i !== name)])

        setUserInformation({
            ...userInformation,
            [name]: value
        })
    }

    const saveSettingsHandler = async () => {
        setSaveProcessing(true)

        if (!userInformation.name || !userInformation.last_name) {
            if (!userInformation.name) setErrorFields(prevState => [...prevState, 'name'])
            if (!userInformation.last_name) setErrorFields(prevState => [...prevState, 'last_name'])
        } else {
            try {
                const res = await userService.updateInformation(userInformation)
                dispatch(userActions.updateUser(res.user))

                notification.success({title: 'Completed'})
            } catch (e) {
                console.log(e)
            }
        }

        setSaveProcessing(false)
    }

    useEffect(() => {
        setUserInformation({...user})
    }, [user])

    return (<section className={'profile'}>
        <div className="container">
            <img src={sectionIcon} alt=""/>

            <div className="col">
                <div className="row">
                    <img src={sectionIcon} alt=""/>

                    <div className="section-description">
                        <h3>Personal Information</h3>

                        <p>You can change your personal information here.</p>
                    </div>
                </div>

                <div className={`form-group ${errorFields.includes('name') ? 'error-field' : ''}`}>
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder={'First Name'}
                        name={'name'}
                        value={userInformation.name}

                        onChange={changeInputHandler}
                    />
                    {errorFields.includes('name') &&
                    <div className={'input-suffix'}><InformationTooltip
                        type={'custom'}
                        description={'This field is required'}
                    >
                        <SVG id={'failed-field'}/>
                    </InformationTooltip></div>}
                </div>
                <div className={`form-group ${errorFields.includes('last_name') ? 'error-field' : ''}`}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder={'Last Name'}
                        name={'last_name'}
                        value={userInformation.last_name}

                        onChange={changeInputHandler}
                    />

                    {errorFields.includes('last_name') && <div className={'input-suffix'}><InformationTooltip
                        type={'custom'}
                        description={'This field is required'}
                    >
                        <SVG id={'failed-field'}/>
                    </InformationTooltip></div>}
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        disabled
                        placeholder={'Email Address'}
                        value={userInformation.email}
                    />
                </div>

                <button
                    className="btn default"
                    onClick={saveSettingsHandler}
                    disabled={saveProcessing || JSON.stringify(userInformation) === JSON.stringify(user)}
                >
                    Save Changes

                    {saveProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>
    </section>)
}
export default Profile