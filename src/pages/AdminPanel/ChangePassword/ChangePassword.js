import React, {useEffect, useState} from "react"
import {Input, Popconfirm, Select} from "antd"
import {adminServices} from "../../../services/admin.services"
import {notification} from "../../../components/Notification"

const {Option} = Select
let fullUsersList = []

const ChangePassword = () => {
    const [params, setParams] = useState({
            password: '',
            password_confirmation: '',
        }),
        [selectedUserId, setSelectedUserId] = useState(undefined),
        [selectedUserEmail, setSelectedUserEmail] = useState(undefined),
        [userList, setUserList] = useState([])

    const changeFieldHandler = ({target: {value, name}}) => {
        setParams({
            ...params,
            [name]: value
        })
    }

    const onChangeUser = (type, value) => {
        if (type === 'id') {
            setSelectedUserId(value)
        } else {
            setSelectedUserEmail(value)
        }
    }

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers()

            setUserList(res.result.slice(0, 10))
            fullUsersList = res.result
        } catch (e) {
            console.log(e)
        }
    }


    const confirm = async () => {
        try {
            if (params.password.length < 6) {
                notification.error({title: 'The password must be at least 6 characters!'})
            } else if (params.password !== params.password_confirmation) {
                notification.error({title: 'Your passwords don’t match!'})
            } else {
                if (selectedUserEmail) {
                    await adminServices.changeUserPassword('email', selectedUserEmail, params)
                } else {
                    await adminServices.changeUserPassword('id', selectedUserId, params)
                }

                notification.success({title: 'Success!'})

                setParams({
                    password: '',
                    password_confirmation: '',
                })
                setSelectedUserId(undefined)
                setSelectedUserEmail(undefined)
            }
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
        <section className={'user-products-section change-password'}>
            <h2>Change user password</h2>

            <div className="fields">
                <form className={'form-group'}>
                    <Select
                        showSearch
                        style={{width: 250}}
                        placeholder="Select a user"
                        optionFilterProp={false}
                        onSearch={searchHandler}
                        filterOption={false}
                        onChange={e => onChangeUser('id', e)}
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

                    <span className="or">or</span>

                    <Input
                        type="email"
                        placeholder={`Enter E-mail`}
                        value={selectedUserEmail}
                        onChange={e => onChangeUser('email', e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder={`New password`}
                        name={'password'}
                        value={params.password}
                        onChange={changeFieldHandler}
                    />

                    <Input
                        type="password"
                        placeholder={`Confirm password`}
                        name={'password_confirmation'}
                        value={params.password_confirmation}
                        onChange={changeFieldHandler}
                    />

                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className={'btn default'} style={{width: 'max-content'}}>Change password</button>
                    </Popconfirm>

                </form>
            </div>
        </section>

    )
}

export default ChangePassword