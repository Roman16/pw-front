import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, Input, Switch, Icon} from 'antd';
import {userActions} from '../../../actions/user.actions';
import ItemIcon from '../../../components/ItemIcon/ItemIcon';

const domainName =
    (window.location.hostname === 'localhost') ? 'https://front1.profitwhales.com' : '';

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

    const handleChangeSwitch = e => {
        dispatch(
            userActions.updateUserInformation({
                ...userInformation,
                private_label_seller: e
            })
        );
    };

    const handleChangeInput = ({target: {name, value}}) => {
        changeUserInformation({
            ...userInformation,
            [name]: value
        });
    };

    const handleChangeImage = e => {
        let formData = new FormData();
        formData.append('avatar_file', e.target.files[0]);
        dispatch(userActions.changeUserAvatar(formData));
    };

    useEffect(() => {
        changeUserInformation(user);
    }, [user]);

    return (
        <div className="personal-box">
            <div className="avatar-box">
                {userInformation.avatar ? (
                    <Avatar src={domainName + userInformation.avatar} size={119}/>
                ) : (
                    <ItemIcon icon="account"/>
                )}

                <div className="change-photo-block">
                    <input
                        id="file-input"
                        type="file"
                        onChange={handleChangeImage}
                        accept="image/*"
                        placeholder=""
                    />

                    <label htmlFor="file-input">
                        <Icon type="camera"/>
                    </label>
                </div>
            </div>

            <div className="personal-information">
                <div className="description">
                    <h3>Your Personal Information</h3>
                    <p>Upload your photo and paste the relevant information</p>
                </div>

                <div className="active-only">
                    <span>Are you private label seller?</span>

                    <Switch
                        checkedChildren="YES"
                        unCheckedChildren="NO"
                        checked={user.private_label_seller}
                        onChange={handleChangeSwitch}
                    />
                </div>

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
