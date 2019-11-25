import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import ProductList from "../components/ProductList/ProductList";

const AuthorizedUser = (props) => {
    // console.log(props.children.props.location.pathname === '/ppc/optimization');
    return (
        <div className="main-pages">
            <Sidebar/>

            {(props.children.props.location.pathname === '/ppc/optimization' ||
                props.children.props.location.pathname === '/ppc/report') &&
            <ProductList/>}

            <div className="main-container">{props.children}</div>
        </div>
    );
};

export default AuthorizedUser;
