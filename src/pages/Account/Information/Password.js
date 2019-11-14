import React, {useState} from 'react';
import {Input} from 'antd';

import lock from '../../../assets/img/lock.svg';
import OpenedEye from '../../../assets/img/opened-eye.svg';
import ClosedEye from '../../../assets/img/closed-eye.svg';

const CustomInputSuffix = ({type, name, onChangeType}) => {
    return (
        <span onClick={() => onChangeType(name, type)}>
        <img src={type === 'text' ? OpenedEye : ClosedEye} alt=""/>
      </span>
    )
};

const Password = () => {
    const [inputsType, changeInputsType] = useState({
            current_password: 'password',
            new_password: 'text',
            confirm_password: 'text',
        }),
        [inputsValue, changeInputsValue] = useState({
            current_password: '',
            new_password: '',
            confirm_password: '',
        });

    const changePasswordInputType = (name, type) => {
        changeInputsType({
            ...inputsType,
            [name]: type === 'text' ? 'password' : 'text'
        })
    };

    const handleChangeInput = ({target: {name, value}}) => {
        changeInputsValue({
            ...inputsValue,
            [name]: value
        })
    };

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
                            <Input
                                className="form-control"
                                type={inputsType.current_password}
                                name="current_password"
                                placeholder="Type old password"
                                onChange={handleChangeInput}
                                suffix={
                                    <CustomInputSuffix
                                        name={'current_password'}
                                        onChangeType={changePasswordInputType}
                                        type={inputsType.current_password}/>
                                }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>New Password</label>

                        <div className="input-wrap">
                            <Input
                                className="form-control"
                                type={inputsType.new_password}
                                name="new_password"
                                placeholder="Type new password"
                                onChange={handleChangeInput}
                                suffix={
                                    <CustomInputSuffix
                                        name={'new_password'}
                                        onChangeType={changePasswordInputType}
                                        type={inputsType.new_password}
                                    />}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Repeat New Password</label>
                        <div className="input-wrap">
                            <Input
                                className="form-control"
                                type={inputsType.confirm_password}
                                name="confirm_password"
                                placeholder="Type new password"
                                onChange={handleChangeInput}
                                suffix={
                                    <CustomInputSuffix
                                        name={'confirm_password'}
                                        onChangeType={changePasswordInputType}
                                        type={inputsType.confirm_password}
                                    />}
                            />

                        </div>
                    </div>

                    <button
                        className="btn-change"
                        type="button"
                        disabled={inputsValue.current_password ? (inputsValue.new_password ? inputsValue.new_password !== inputsValue.confirm_password : true) : true}>
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Password;
