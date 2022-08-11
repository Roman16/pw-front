import React, {useEffect, useState} from "react"
import './Profile.less'
import {useDispatch} from "react-redux"
import {Spin} from "antd"
import {userService} from "../../../services/user.services"
import {notification} from "../../../components/Notification"
import {SVG} from "../../../utils/icons"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import sectionIcon from '../../../assets/img/account/profile-icon.svg'
import RouteLoader from "../../../components/RouteLoader/RouteLoader"

const Profile = () => {
    const [userInformation, setUserInformation] = useState({
            name: '',
            last_name: '',
            email: ''
        }),
        [saveProcessing, setSaveProcessing] = useState(false),
        [fetchingProcessing, setFetchingProcessing] = useState(true),
        [errorFields, setErrorFields] = useState([])

    const getUserInformation = async () => {
        try {
            const res = await userService.getUserPersonalInformation()

            setUserInformation({...res})

        } catch (e) {
            console.log(e)
        }

        setFetchingProcessing(false)
    }

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
                await userService.updateInformation(userInformation)

                notification.success({title: 'Completed'})
            } catch (e) {
                console.log(e)
            }
        }

        setSaveProcessing(false)
    }

    useEffect(() => {
        getUserInformation()
    }, [])

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
                    disabled={saveProcessing}
                >
                    Save Changes

                    {saveProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>

        {fetchingProcessing && <RouteLoader/>}
    </section>)
}
export default Profile