import React from "react";
import './WelcomePage.less';

import logo from '../../../../assets/img/ProfitWhales-logo-dark.svg';
import welcomeImage from '../../../../assets/img/welcome-image.svg';
import {history} from "../../../../utils/history";

const WelcomePage = () => {

    const goConnectPage = () => history.push('/connect-amazon-account')

    return(
        <div className="welcome-page">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>

            <div className="container">
                <img src={welcomeImage} alt=""/>

                <h2>Welcome Human!</h2>

                <p>Let’s get you started by connecting your Seller <br/> Central Account</p>

                <button className='btn default' onClick={goConnectPage}>
                    Connect Account
                </button>
            </div>
        </div>
    )
};

export default WelcomePage;