import React, {useEffect, useState} from "react"
import {Input, Popconfirm, Select} from "antd"
import {adminServices} from "../../../services/admin.services"
import {notification} from "../../../components/Notification"

const {Option} = Select

const ChangePassword = () => {
    const [params, setParams] = useState({
            password: '',
            password_confirmation: '',
        }),
        [selectedUser, setSelectedUser] = useState(null),
        [userList, setUserList] = useState([])

    const changeFieldHandler = ({target: {value, name}}) => {
        setParams({
            ...params,
            [name]: value
        })
    }

    const onChangeUser = (id) => {
        setSelectedUser(id)
    }

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers()
            setUserList(res.result)
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
                await adminServices.changeUserPassword(selectedUser, params)

                notification.success({title: 'Success!'})

                setParams({
                    email: '',
                    password: '',
                    password_confirmation: '',
                })
            }
        } catch (e) {

        }
    }


    useEffect(() => {
        getUserList()
    }, [])

    return (
        <section className={'user-products-section'}>
            <h2>Change user password</h2>

            <div className="fields">
                <form className={'form-group'}>
                    <Select
                        showSearch
                        style={{width: 250}}
                        placeholder="Select a user"
                        optionFilterProp="children"
                        onChange={onChangeUser}
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
                        <button className={'btn default'}>Change password</button>
                    </Popconfirm>

                </form>
            </div>
        </section>

    )
}

export default ChangePassword