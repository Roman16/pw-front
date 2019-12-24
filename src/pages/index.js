import React, {Fragment} from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import ProductList from "../components/ProductList/ProductList";
import ReportsChangesCountWindow from "../components/ModalWindow/InformationWindows/ReportsChangesCountWindow";
import {userActions} from "../actions/user.actions";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import LoadingAmazonAccount from "../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";

let timerId = null;

function throttle(func, delay) {
    let timeout = null;

    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                func.call(this, ...args);
                clearTimeout(timeout)
            }, delay)
        }
    }
}

const AuthorizedUser = (props) => {
    const dispatch = useDispatch();
    const pathname = props.children.props.location.pathname;
    const {lastStatusAction} = useSelector(state => ({
        lastStatusAction: state.user.lastUserStatusAction
    }));

    function getUserStatus() {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            dispatch(userActions.getPersonalUserInfo());
        }, 1000);
    }

    document.addEventListener("visibilitychange", () => {
        if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
            getUserStatus()
        }
    });

    document.addEventListener('mousemove', throttle(() => {
            if (moment(new Date()).diff(lastStatusAction, "hours") > 6) {
                getUserStatus()
            }
        }, 1000 * 60)
    );

    return (
        <Fragment>
            <div className="main-pages">
                <Sidebar/>

                {(pathname === '/ppc/optimization' ||
                    pathname === '/ppc/report' ||
                    pathname === '/ppc/scanner'
                ) &&
                <ProductList
                    pathname={props.children.props.location.pathname}
                />}

                <div className="main-container">{props.children}</div>
            </div>

            <ReportsChangesCountWindow/>

            {/*<LoadingAmazonAccount/>*/}
        </Fragment>
    );
};

export default AuthorizedUser;
