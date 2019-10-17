import React from "react";
import {Redirect} from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';

const AuthorizedUser = (props) => {
    const authorized = localStorage.getItem('token');

    if (authorized) {
        return (
            <div className='main-pages'>
                <Sidebar/>

                <div className="content">
                    {props.children}
                </div>
            </div>
        );
    } else {
        return (
            <Redirect to='login'/>
        )
    }
};

export default AuthorizedUser;