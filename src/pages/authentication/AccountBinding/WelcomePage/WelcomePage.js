import React from "react";
import './WelcomePage.less';

import welcomeImage from '../../../../assets/img/welcome-image.svg';
import {history} from "../../../../utils/history";
import {useSelector} from "react-redux";

const WelcomePage = () => {

    const goConnectPage = () => history.push('/connect-amazon-account')

    const {userName} = useSelector(state => ({
        userName: state.user.user.name
    }))

    return(
        <div className="welcome-page">
            <div className="container">
                <img src={welcomeImage} alt=""/>

                <h2>Welcome {userName}!</h2>

                <p>Let’s get you started by connecting your Seller <br/> Central Account</p>

                <button className='btn default' onClick={goConnectPage}>
                    Connect Account
                </button>
            </div>
        </div>
    )
};

export default WelcomePage;