import React from "react";
import successImage from '../../../../../assets/img/success-connect.svg';
import './SuccessPage.less';
import {history} from "../../../../../utils/history";

const SuccessPage = () => {

    return (
        <section className='success-section'>
            <img src={successImage} alt=""/>
            <h3>You have successfully connected your Amazon Account with Profit Whales Software</h3>
            <div className="actions">
                <button className='btn default' onClick={() => history.push('/ppc/optimization')}>Next</button>
            </div>
        </section>
    )
};

export default SuccessPage;