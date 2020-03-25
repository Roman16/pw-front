import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Input} from 'antd';
import {userActions} from '../../../actions/user.actions';
import defaultAvatar from '../../../assets/img/default-account-avatar.svg';

const Personal = () => {
    const dispatch = useDispatch();
    const [userInformation, changeUserInformation] = useState({});
    const {user} = useSelector(state => ({
        user: state.user.user
    }));

    const handleSaveUserInformation = e => {
        e.preventDefault();
        dispatch(userActions.updateUserInformation(userInformation));
    };

    // const handleChangeSwitch = e => {
    //     dispatch(
    //         userActions.updateUserInformation({
    //             ...userInformation,
    //             private_label_seller: e
    //         })
    //     );
    // };

    const handleChangeInput = ({target: {name, value}}) => {
        changeUserInformation({
            ...userInformation,
            [name]: value
        });
    };

    useEffect(() => {
        changeUserInformation(user);
    }, [user]);

    return (
        <div className="personal-box">
            <div className="avatar-box">
                <img src={defaultAvatar} alt=""/>
            </div>

            <div className="personal-information">
                <div className="description">
                    <h3>General Information</h3>
                    <p>Change your avatar and keep your personal information up-to-date</p>
                </div>

                {/*<div className="active-only">*/}
                {/*    <span>Are you private label seller?</span>*/}

                {/*    <Switch*/}
                {/*        checkedChildren="YES"*/}
                {/*        unCheckedChildren="NO"*/}
                {/*        checked={user.private_label_seller === 1}*/}
                {/*        onChange={handleChangeSwitch}*/}
                {/*    />*/}
                {/*</div>*/}

                <form onSubmit={handleSaveUserInformation} className="form-person-info">
                    <div className="form-group">
                        <label>First Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="name"
                            value={userInformation.name}
                            placeholder="Type first name"
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="last_name"
                            value={userInformation.last_name}
                            placeholder="Type last name"
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <Input
                            className="form-control"
                            type="email"
                            name="email"
                            value={userInformation.email}
                            placeholder="Type email address"
                            onChange={handleChangeInput}
                            disabled
                        />
                    </div>

                    <button
                        className="btn-save"
                        disabled={JSON.stringify(userInformation) === JSON.stringify(user)}
                    >
                        save changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Personal;
