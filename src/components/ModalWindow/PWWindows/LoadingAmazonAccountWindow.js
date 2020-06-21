import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import ModalWindow from "../ModalWindow";
import whales from '../../../assets/img/whales-loading-window.svg';
import {userActions} from "../../../actions/user.actions";
import {productsActions} from "../../../actions/products.actions";
import {SVG} from "../../../utils/icons";

let intervalId = null;

const LoadingAmazonAccount = ({visible, lastName, firstName, productList}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        intervalId = setInterval(() => {
            if (visible) {
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
    }, [visible]);

    return (
        <ModalWindow
            className={'amazon-loading-window'}
            visible={visible}
            okText={'Check it now'}
            container={true}
        >
            <img src={whales} alt=""/>

            <h2>Welcome {firstName} {lastName}!</h2>

            <span>
               We’re currently syncing your Amazon account, which can take up to 24 hours. You’ll get an email when the sync is done so you can close the app and come back later
            </span>

            <div className='social-icons'>
                <a href="https://www.facebook.com/profitwhales/" target='_blank'><SVG id='facebook-icon-grey'/></a>
                <a href="mailto: support@profitwhales.agency"><SVG id='email-icon-grey'/></a>
            </div>
        </ModalWindow>
    )
};

export default LoadingAmazonAccount;
