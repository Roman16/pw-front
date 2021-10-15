import React, {useEffect, useState} from 'react'
import './RegistrationPage.less'
import '../LoginPage/LoginPage.less'

import PageDescription from "../LoginPage/PageDescription"
import RegistrationForm from "./RegistrationForm"

const RegistrationPage = (props) => {
    const [user, setUser] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agencyUser: false,
    })

    const changeUserHandler = (value) => setUser({...user, ...value})

    return (
        <div className="auth-page registration-page">
            <div className="container">
                <RegistrationForm
                    user={user}

                    onChange={changeUserHandler}
                />

                <PageDescription/>
            </div>

        </div>
    )
}

export default RegistrationPage
