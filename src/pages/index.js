import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import FreeTrial from '../components/FreeTrial/FreeTrial';

const AuthorizedUser = props => {
    return (
        <div className="main-pages">
            <Sidebar />

            <div className="main-container">
                <FreeTrial />
                {props.children}
            </div>
        </div>
    );
};

export default AuthorizedUser;
