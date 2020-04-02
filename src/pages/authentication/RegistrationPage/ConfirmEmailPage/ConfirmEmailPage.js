import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from "react-redux";
import {history} from "../../../../utils/history";
import logo from "../../../../assets/img/ProfitWhales-logo-white.svg";
import {Link} from "react-router-dom";
import './ConfirmEmailPage.less';
import '../../LoginPage/LoginPage.less';
import {userService} from "../../../../services/user.services";
import {notification} from "../../../../components/Notification";
import {Spin} from "antd";

let intervalId = null;


const ConfirmEmailPage = (props) => {
    const [confirmStatus, setConfirmStatus] = useState(null),
        [disableResend, setDisableResend] = useState(false),
        [disabledTimer, setDisabledTimer] = useState(60);

    const {email} = useSelector(state => ({
        email: state.user.user.email
    }));

    const onResend = async () => {
        setDisableResend(true);

        try {
            const res = await userService.resendConfirmEmail();

            if (res.status === 'already') {
                notification.success({title: 'Email already confirmed'});

                setTimeout(() => {
                    history.push('/account-settings')
                }, 2000)
            }

            intervalId = setInterval(() => {
                setDisabledTimer((prevCount) => {
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
        if (props.match.params && props.match.params.token) {
            userService.confirmEmail({
                token: props.match.params.token
            })
                .then((res) => {
                    // setConfirmStatus('success');

                    localStorage.setItem('token', res.access_token);

                    setTimeout(() => {
                        history.push('/account-settings')
                    }, 1)
                })
                .catch(() => {
                    setConfirmStatus('error');
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
                        {/*--------------------------------------*/}
                        {/*--------------------------------------*/}
                        {/*--------------------------------------*/}

                        {confirmStatus === 'dont-confirm' && <Fragment>
                            <h4>
                                Check your email
                            </h4>

                            <p>
                                We’ve sent you an email to confirm your email address, simply tap the ‘Confirm’ button
                                in the email sent to <br/>
                                <a href={`mailto: ${email}`}>{email}</a>.
                            </p>

                            {/*{disableResend && <span>{disabledTimer}</span>}*/}

                            <button
                                className='btn default'
                                onClick={onResend}
                                disabled={disableResend}
                            >
                                resend
                            </button>
                        </Fragment>}
                        {/*--------------------------------------*/}
                        {/*--------------------------------------*/}
                        {/*--------------------------------------*/}

                        {confirmStatus === 'error' &&
                        <Fragment>
                            <h3>
                                Oops
                            </h3>

                            <p>
                                Something went wrong with your account confirmation, and please click resend and check
                                your email to confirm it.
                            </p>

                            <button
                                className='btn default'
                                onClick={onResend}
                                disabled={disableResend}
                            >
                                resend
                            </button>
                        </Fragment>}


                        {/*--------------------------------------*/}
                        {/*--------------------------------------*/}
                        {/*--------------------------------------*/}
                        {/*{confirmStatus === 'success' &&*/}
                        {/*<Fragment>*/}
                        {/*    <h3>*/}
                        {/*        Thank you for confirming email*/}
                        {/*    </h3>*/}

                        {/*    <button*/}
                        {/*        className='btn default'*/}
                        {/*        onClick={() => history.push('/account-settings')}*/}
                        {/*    >*/}
                        {/*        sign in*/}
                        {/*    </button>*/}
                        {/*</Fragment>}*/}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ConfirmEmailPage;