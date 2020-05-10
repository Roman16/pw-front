import React, {useEffect} from "react";
import './ThankPage.less';
import image from '../../../../assets/img/success-connect-full.svg'
import Header from "../../../LandingPages/components/Header/Header";

const ThankPage = () => {

    useEffect(() => {
        localStorage.removeItem('userFromAgency');
    }, [])

    return (
        <div className={'thank-connect-page'}>
            <Header/>

            <img src={image} alt="" className={'image'}/>
            <h2>
                You have successfully connected your Amazon <br/> Account with Profit Whales
            </h2>
            <p>
                *Please contact support if you want to access the software
            </p>
        </div>
    )
};

export default ThankPage;