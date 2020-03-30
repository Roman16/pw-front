import React, {useEffect, useState, Fragment} from 'react';
import {history} from "../../../../utils/history";
import logo from "../../../../assets/img/ProfitWhales-logo-white.svg";
import {Link} from "react-router-dom";
import './ConfirmEmailPage.less';
import {userService} from "../../../../services/user.services";
import {notification} from "../../../../components/Notification";
import {Spin} from "antd";

let intervalId = null;


const ConfirmEmailPage = (props) => {
    const [confirmStatus, setConfirmStatus] = useState(null),
        [disableResend, setDisableResend] = useState(false),
        [disabledTimer, setDisabledTimer] = useState(60);


    const onResend = async () => {
        setDisableResend(true);

        try {
            await userService.resendConfirmEmail();

            intervalId = setInterval(() => {
                setDisabledTimer((prevCount) => {
                    console.log(prevCount);
                    return prevCount - 1
                })
            }, 1000);
        } catch (e) {
            setDisableResend(false);
            setDisabledTimer(60);
        }
    };


    useEffect(() => {
        if (disabledTimer === 0) {
            clearInterval(intervalId);

            setDisableResend(false);
            setDisabledTimer(60);
        }
    }, [disabledTimer]);

    useEffect(() => {
        if (props.location.search && props.location.search.indexOf('?verify_token=') !== -1) {
            notification.error({title: props.location.search.split('?verify_token=')[1]});

            userService.confirmEmail()
                .then(() => {
                    setConfirmStatus('success')
                })
                .catch(() => {
                    setConfirmStatus('dont-confirm');
                })
        } else {
            setConfirmStatus('dont-confirm');
        }
    }, []);

    return (
        <div className="auth-page">
            <div className="confirm-page">
                <div className="logo-auth" onClick={() => history.push('/')}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className="container">
                    <div className="title-block">
                        <h3>Account confirmation</h3>
                    </div>

                    <div className="confirm-status">
                        {!confirmStatus && <Spin size={'large'}/>}

                        {confirmStatus === 'dont-confirm' && <Fragment>
                            <h4>
                                We sent the email with a confirmation link.
                                <br/>
                                If you didn't receive the email, click resend.
                            </h4>

                            {disableResend && <span>{disabledTimer}</span>}

                            <button
                                className='btn default'
                                onClick={onResend}
                                disabled={disableResend}
                            >
                                resend
                            </button>
                        </Fragment>}


                        {confirmStatus === 'success' &&
                        <h4>
                            Thank you for confirming email
                        </h4>}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ConfirmEmailPage;