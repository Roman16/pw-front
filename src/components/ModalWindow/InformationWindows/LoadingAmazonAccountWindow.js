import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import ModalWindow from "../ModalWindow";
import whales from '../../../assets/img/whales-loading-window.svg';
import facebookIcon from '../../../assets/img/icons/facebook-icon-grey.svg';
import messengerIcon from '../../../assets/img/icons/messenger-icon-grey.svg';
import emailIcon from '../../../assets/img/icons/email-icon-grey.svg';
import {userActions} from "../../../actions/user.actions";

let intervalId = null;

const LoadingAmazonAccount = () => {
    const [visibleWindow, switchWindow] = useState(false);
    const dispatch = useDispatch();
    const {firstName, lastName, bootstrapInProgress} = useSelector(state => ({
        firstName: state.user.user ? state.user.user.name : '',
        lastName: state.user.user ? state.user.user.last_name : '',
        bootstrapInProgress: state.user.notifications.account_bootstrap.bootstrap_in_progress
    }));

    useEffect(() => {
        intervalId = setInterval(() => {
            if (bootstrapInProgress) {
                dispatch(userActions.getPersonalUserInfo());
            } else {
                clearInterval(intervalId)
            }
        }, 10000);

        return (() => {
            clearInterval(intervalId)
        })
    }, []);

    return (
        <ModalWindow
            className={'reports-changes-window amazon-loading-window'}
            visible={bootstrapInProgress}
            okText={'Check it now'}
        >
            <img src={whales} alt=""/>

            <h2>Welcome {firstName} {lastName}!</h2>

            <span>
                we’re currently syncing your Amazon account witch can take up to 24 hours. You’ll get an email when the sync is done so you can close the app and come back later
            </span>

            <div className='social-icons'>
                <img src={facebookIcon} alt=""/>
                <img src={messengerIcon} alt=""/>
                <img src={emailIcon} alt=""/>
            </div>
        </ModalWindow>
    )
};

export default LoadingAmazonAccount;