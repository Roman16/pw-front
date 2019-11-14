import React from 'react';
import {Input} from 'antd';

import lock from '../../../assets/img/lock.svg';
import {ReactComponent as OpenedEye} from '../../../assets/img/opened-eye.svg';
import {ReactComponent as ClosedEye} from '../../../assets/img/closed-eye.svg';

const Password = () => {
    return (
        <div className="passwords-box">
            <div className='icon-block'>
                <img className="lock" src={lock} alt="lock"/>
            </div>

            <div className="change-password">
                <h3>Passwords</h3>
                <div className="input-password">
                    <div className="form-group">
                        <label>Old Password</label>

                        <div className="input-wrap">
                            <Input.Password
                                className="form-control"
                                type="password"
                                name="current_password"
                                placeholder="Type old password"
                                suffix={<ClosedEye className="eye"/>}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>New Password</label>

                        <div className="input-wrap">
                            <Input.Password
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Type new password"
                                // suffix={<OpenedEye className="eye"/>}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Repeat New Password</label>
                        <div className="input-wrap">
                            <Input.Password
                                className="form-control"
                                type="password"
                                name="password_confirmation"
                                placeholder="Type new password"
                                // suffix={<OpenedEye className="eye"/>}
                            />

                        </div>
                    </div>

                    <button className="btn-change" type="button" disabled="">
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Password;
