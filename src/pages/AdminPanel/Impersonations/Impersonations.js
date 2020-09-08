import React, {useEffect, useState} from "react"
import {adminServices} from "../../../services/admin.services"
import {Select} from 'antd'
import {history} from "../../../utils/history"
import {notification} from "../../../components/Notification"
import {userActions} from "../../../actions/user.actions"
import {useDispatch} from "react-redux"

const {Option} = Select

const Impersonations = () => {
    const [userList, setUserList] = useState([]),
        [selectedUser, setSelectedUser] = useState(null)

    const dispatch = useDispatch()

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers(false)
            setUserList(res.result)
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (value) => {
        setSelectedUser(value)
    }

    const updateUserInformation = () => {
        dispatch(userActions.getUserInfo())
    }

    const impersonateHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await adminServices.impersonateUser(selectedUser)

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

    const logOutHandler = () => {
        localStorage.setItem('token', localStorage.getItem('adminToken'))
        localStorage.removeItem('adminToken')

        updateUserInformation()

        notification.success({title: 'Success!'})
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
                        style={{width: 350}}
                        placeholder="Select a user"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) => {
                            return `${userList.find(user => user.id === option.props.value).name} ${userList.find(user => user.id === option.props.value).last_name}`.toLowerCase().indexOf(input.toLowerCase()) >= 0 || userList.find(user => user.id === option.props.value).email.toLowerCase().indexOf(input.toLowerCase()) >= 0
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