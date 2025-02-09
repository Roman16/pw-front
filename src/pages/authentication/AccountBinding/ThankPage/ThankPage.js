import React, {useEffect} from "react";
import './ThankPage.less';
import image from '../../../../assets/img/success-connect-full.svg'

const ThankPage = () => {

    useEffect(() => {
        localStorage.removeItem('userFromAgency');
    }, [])

    return (
        <div className={'thank-connect-page'}>
            <img src={image} alt="" className={'image'}/>
            <h2>
                You have successfully connected your Amazon <br/> Account with Sponsoreds
            </h2>
            <p>
                *Please contact support if you want to access the software
            </p>
        </div>
    )
};

export default ThankPage;