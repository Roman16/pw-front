import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import ModalWindow from "../ModalWindow";
import whales from '../../../assets/img/whales-loading-window.svg';
import facebookIcon from '../../../assets/img/icons/facebook-icon-grey.svg';
import messengerIcon from '../../../assets/img/icons/messenger-icon-grey.svg';
import emailIcon from '../../../assets/img/icons/email-icon-grey.svg';
import {userActions} from "../../../actions/user.actions";
import {productsActions} from "../../../actions/products.actions";

let intervalId = null;

const LoadingAmazonAccount = () => {
    const [visibleWindow, switchWindow] = useState(false);
    const dispatch = useDispatch();
    const {firstName, lastName, bootstrapInProgress, productList} = useSelector(state => ({
        productList: state.products.productList,
        firstName: state.user.user ? state.user.user.name : '',
        lastName: state.user.user ? state.user.user.last_name : '',
        bootstrapInProgress: state.user.notifications.account_bootstrap ? state.user.notifications.account_bootstrap.bootstrap_in_progress : true
    }));

    useEffect(() => {
        intervalId = setInterval(() => {
            if (bootstrapInProgress) {
                dispatch(userActions.getPersonalUserInfo());
            } else {
                if (!productList && productList.length <= 0) {
                    dispatch(productsActions.fetchProducts({
                        size: 10,
                        page: 1,
                        searchStr: '',
                        onlyOptimization: false,
                        selectedAll: false,
                        onlyHasNew: false
                    }));
                }

                clearInterval(intervalId)
            }
        }, 10000);

        return (() => {
            clearInterval(intervalId)
        })
    }, []);

    return (
        <ModalWindow
            className={'amazon-loading-window'}
            visible={bootstrapInProgress}
            okText={'Check it now'}
        >
            <img src={whales} alt=""/>

            <h2>Welcome {firstName} {lastName}!</h2>

            <span>
                we’re currently syncing your Amazon account witch can take up to 24 hours. You’ll get an email when the sync is done so you can close the app and come back later
            </span>

            <div className='social-icons'>
                <a href="https://www.facebook.com/profitwhales/" target='_blank'><img src={facebookIcon} alt=""/></a>
                <a href="mailto: support@profitwhales.agency"><img src={emailIcon} alt=""/></a>
            </div>
        </ModalWindow>
    )
};

export default LoadingAmazonAccount;
