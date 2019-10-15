import React from "react";

import Sidebar from '../components/Sidebar/Sidebar';

const AuthorizedUser = (props) => {

    return (
        <div className='main-pages'>
            <Sidebar/>

            <div className="content">
                {props.children}
            </div>
        </div>
    )
};

export default AuthorizedUser;