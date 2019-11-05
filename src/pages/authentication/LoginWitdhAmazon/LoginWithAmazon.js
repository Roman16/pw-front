import React from "react";
import './LoginWithAmazon.less';
import logo from '../../../assets/img/logo_black.svg';

const LoginWithAmazon = () => {
    console.log('run')

    return (
        <div className="bar">
            <img src={logo} alt=""/>
            <br/>
            <p>Loading ...</p>
        </div>
    )
};

export default LoginWithAmazon