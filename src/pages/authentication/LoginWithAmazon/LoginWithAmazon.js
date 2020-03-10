import React, {useEffect, Fragment} from "react";
import {useDispatch} from 'react-redux';
import {userActions} from '../../../actions/user.actions';
import logo from '../../../assets/img/logo_black.svg';
import Header from '../../LandingPages/components/Header/Header';
import './LoginWithAmazon.less';

const LoginWithAmazon = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code'),
            scope = urlParams.get('scope'),
            state = urlParams.get('state');


        dispatch(userActions.loginWithAmazon({
            code,
            scope,
            state
        }));
    }, []);

    return (
        <Fragment>
            <Header/>

            <div className="bar">
                <img src={logo} alt=""/>
                <br/>
                <p>Loading ...</p>
            </div>
        </Fragment>
    )
};

export default LoginWithAmazon