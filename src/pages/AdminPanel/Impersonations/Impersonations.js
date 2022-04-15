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
let fullUsersList = []

const Impersonations = (props) => {
    const [userList, setUserList] = useState([]),
        [selectedUserId, setSelectedUserId] = useState(undefined),
        [selectedUserEmail, setSelectedUserEmail] = useState(null)


    const dispatch = useDispatch()

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers(false)

            setUserList(res.result.slice(0, 10))
            fullUsersList = res.result
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
        dispatch(userActions.getImpersonationUserInformation())
    }

    const updateLocaleStorage = () => {
        if (localStorage.getItem('productsSearchParams')) {
            localStorage.setItem('productsSearchParams', JSON.stringify({
                ...JSON.parse(localStorage.getItem('productsSearchParams')),
                page: 1,
            }))
        }

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

            updateLocaleStorage()

            updateUserInformation()
        } catch (e) {
            console.log(e)
        }
    }

    const logOutHandler = async () => {
        try {
            await localStorage.setItem('token', localStorage.getItem('adminToken'))

            const res = await userService.getUserInfo()
            localStorage.removeItem('adminToken')

            dispatch(userActions.setInformation(res.result))

            updateLocaleStorage()

            notification.success({title: 'Success!'})
        } catch (e) {

        }
    }

    const searchHandler = (text) => {
        setSelectedUserId(undefined)

        if (text.length > 2) {
            setUserList(fullUsersList.filter(user => {
                return `${user.name} ${user.last_name}`.toLowerCase().indexOf(text.toLowerCase()) >= 0 || user.email.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }))
        } else {
            setUserList(fullUsersList.slice(0, 10))
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
                        optionFilterProp={false}
                        onSearch={searchHandler}
                        filterOption={false}
                        onChange={e => onChange('id', e)}
                        value={selectedUserId}
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
