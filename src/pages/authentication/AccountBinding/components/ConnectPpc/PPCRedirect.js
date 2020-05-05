import React from "react";
import logo from '../../../../../assets/img/ProfitWhales-logo-dark.svg';
import loader from '../../../../../assets/img/loader.svg';
import './ConnectPpc.less';

const PPCRedirect = () => {

    return(
        <div className="ppc-redirect-page">
            <div className="image">
                <img src={logo} alt=""/>
                <img src={loader} alt=""/>
            </div>

        </div>
    )
};

export default PPCRedirect;