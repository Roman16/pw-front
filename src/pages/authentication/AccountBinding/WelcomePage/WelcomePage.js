import React from "react";
import './WelcomePage.less';

import logo from '../../../../assets/img/ProfitWhales-logo-dark.svg';

const WelcomePage = () => {

    return(
        <div className="welcome-page">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>

            <div className="container">
                <img src="" alt=""/>

                <h2>Welcome Human!</h2>
                <p>Let’s get you started by connecting your Seller <br/> Central Account</p>

                <button className='btn default'>
                    Connect Account
                </button>
            </div>
        </div>
    )
};

export default WelcomePage;