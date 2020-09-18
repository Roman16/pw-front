import React, {useEffect, useState} from "react"
import {adminServices} from "../../../services/admin.services"
import {Input, Select} from 'antd'
import {history} from "../../../utils/history"
import {notification} from "../../../components/Notification"
import {userActions} from "../../../actions/user.actions"
import {useDispatch} from "react-redux"
import queryString from "query-string"
import {userService} from "../../../services/user.services"

const {Option} = Select

const Impersonations = (props) => {
    const [userList, setUserList] = useState([]),
        [selectedUserId, setSelectedUserId] = useState(null),
        [selectedUserEmail, setSelectedUserEmail] = useState(null)

    const dispatch = useDispatch()

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers(false)
            setUserList(res.result)
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (type, value) => {
        if (type === 'id') {
            setSelectedUserId(value)
        } else {
            setSelectedUserEmail(value)
        }
    }

    const updateUserInformation = () => {
        dispatch(userActions.getUserInfo())
    }

    const impersonateHandler = async (e) => {
        e.preventDefault()

        try {
            let res

            if (selectedUserEmail) {
                res = await adminServices.impersonateUser(selectedUserEmail, 'email')
            } else {
                res = await adminServices.impersonateUser(selectedUserId, 'id')
            }

            if (localStorage.getItem('adminToken')) {
                localStorage.setItem('token', res.access_token)
            } else {
                localStorage.setItem('adminToken', localStorage.getItem('token'))

                localStorage.setItem('token', res.access_token)
            }

            updateUserInformation()

            history.push('/ppc/dashboard')
        } catch (e) {
            console.log(e)
        }
    }

    const logOutHandler = async () => {
        try {
            await localStorage.setItem('token', localStorage.getItem('adminToken'))

            const res = await userService.getUserInfo()
            dispatch(userActions.setInformation(res))

            localStorage.removeItem('adminToken')
            notification.success({title: 'Success!'})
        } catch (e) {

        }
    }

    useEffect(() => {
        getUserList()
    }, [])

    return (
        <section className={'impersonation-section'}>
            <h2>User Impersonations</h2>

            <div className="fields">
                <form className={'form-group'}>
                    <Select
                        showSearch
                        style={{width: 350, marginRight: '20px'}}
                        placeholder="Select a user"
                        optionFilterProp="children"
                        onChange={e => onChange('id', e)}
                        filterOption={(input, option) => {
                            if (input.length > 2) {
                                return `${userList.find(user => user.id === option.props.value).name} ${userList.find(user => user.id === option.props.value).last_name}`.toLowerCase().indexOf(input.toLowerCase()) >= 0 || userList.find(user => user.id === option.props.value).email.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            } else {
                                return true
                            }
                        }}
                    >
                        {userList.map(user => (
                            <Option value={user.id}>
                                <b>{`${user.name} ${user.last_name}`}</b>
                                <br/>
                                {user.email}
                            </Option>
                        ))}
                    </Select>

                    <span className={'or'}>
                        or
                    </span>

                    <Input
                        style={{width: 350}}
                        type={'email'}
                        placeholder="Enter E-mail"
                        onChange={(e) => onChange('email', e.target.value)}

                    />

                    <button type={'button'} className={'btn default'} onClick={impersonateHandler}>Impersonate</button>

                    {localStorage.getItem('adminToken') &&
                    <button type={'button'} className={'btn default'} onClick={logOutHandler}>
                        Back to admin user
                    </button>}
                </form>
            </div>
        </section>
    )
}

export default Impersonations