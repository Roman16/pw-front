import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Switch } from 'antd';

import ItemIcon from '../../../components/ItemIcon/ItemIcon';

const Personal = () => {
  const [userInformation, changeUserInformation] = useState({});
  const { user } = useSelector(state => ({
    user: state.user.user
  }));

  const handleSaveUserInformation = e => {
    e.preventDefault();

    console.log('save');
  };

  const handleChangeInput = ({ target: { name, value } }) => {
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
        {userInformation.avatar ? (
          <img className="avatar" src={userInformation.avatar} alt="avatar" />
        ) : (
          <ItemIcon icon="account" />
        )}
      </div>
      <div className="personal-information">
        <div className="description">
          <h3>Your Personal Information</h3>
          <p>Upload your photo and paste the relevant information</p>
        </div>

        <div className="active-only">
          <span htmlFor="">Are you private lable seller?</span>
          <Switch checkedChildren="YES" unCheckedChildren="NO" />
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
              required
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
