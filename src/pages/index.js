import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
const AuthorizedUser = props => {
    return (
        <div className="main-pages">
            <Sidebar />

            {props.children}
        </div>
    );
};

export default AuthorizedUser;
