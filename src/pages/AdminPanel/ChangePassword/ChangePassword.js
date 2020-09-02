import React, {useState} from "react"
import {Input, Popconfirm} from "antd"
import {adminServices} from "../../../services/admin.services"
import {notification} from "../../../components/Notification"

const ChangePassword = () => {
    const [params, setParams] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    })

    const changeFieldHandler = ({target: {value, name}}) => {
        setParams({
            ...params,
            [name]: value
        })
    }

    const confirm = async () => {
        try {
            if (params.password.length < 6) {
                notification.error({title: 'The password must be at least 6 characters!'})
            } else if(params.password !== params.password_confirmation) {
                notification.error({title: 'Your passwords don’t match!'})
            } else {
                await adminServices.changeUserPassword(params)

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

    return (
        <section className={'user-products-section'}>
            <h2>Change user password</h2>

            <div className="fields">
                <form className={'form-group'}>
                    <Input
                        type="text"
                        placeholder={'Email'}
                        name={'email'}
                        value={params.email}
                        onChange={changeFieldHandler}
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
                        <button className={'btn default'}>Change password</button>
                    </Popconfirm>

                </form>
            </div>
        </section>

    )
}

export default ChangePassword