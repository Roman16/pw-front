import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Switch, Checkbox, Cascader } from 'antd';

import Navigation from '../Navigation/Navigation';
import ItemIcon from '../../../components/ItemIcon/ItemIcon';
import lock from '../../../assets/img/lock.svg';
import { ReactComponent as OpenedEye } from '../../../assets/img/opened-eye.svg';
import { ReactComponent as ClosedEye } from '../../../assets/img/closed-eye.svg';
import whales from '../../../assets/img/whales.svg';
import plus from '../../../assets/img/icons/plus-white.svg';
import checked from '../../../assets/img/icons/checked.svg';
import amazon from '../../../assets/img/amazon.png';
import check from '../../../assets/img/icons/check.svg';
import remove from '../../../assets/img/icons/remove.svg';
import refresh from '../../../assets/img/icons/refresh.svg';
import './Information.less';

const options = [
  {
    value: 'USACAMX',
    label: 'North America (USA, CA, MX)'
  },
  {
    value: 'UKDEFRESITINTR',
    label: 'Europe (UK, DE, FR, ES, IT, IN, TR)'
  }
];

const Information = () => {
  const { user } = useSelector(state => ({
    user: state.user
  }));

  return (
    <div className="user-cabinet">
      <Navigation />
      {/* ====================================== */}
      <div className="personal-box">
        <div className="avatar-box">
          {user.user.avatar ? (
            <img className="avatar" src={user.user.avatar} alt="avatar" />
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
            <span htmlFor="">Are you privat lable seller?</span>
            <Switch checkedChildren="YES" unCheckedChildren="NO" />
          </div>
          <div className="form-person-info">
            <div className="form-group">
              <label>First Name</label>
              <Input
                className="form-control"
                type="text"
                name="name"
                value="Ihor"
                placeholder="Type first name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <Input
                className="form-control"
                type="text"
                name="surname"
                value="Ihor"
                placeholder="Type last name"
              />
            </div>
            <div className="form-group">
              <label>Email Adress</label>
              <Input
                className="form-control"
                type="email"
                name="email"
                value="profitwhales.soft@gmail.com"
                placeholder="Type email adress"
              />
            </div>
            <button className="btn-save" type="button" disabled>
              save changes
            </button>
          </div>
        </div>
      </div>
      {/* ====================================== */}
      <div className="passwords-box">
        <img className="lock" src={lock} alt="lock" />
        <div className="change-password">
          <h3>Passwords</h3>
          <div className="input-password">
            <div className="form-group">
              <label>Old Password</label>
              <div className="input-wrap">
                <Input
                  className="form-control"
                  type="password"
                  name="current_password"
                  placeholder="Type old password"
                />
                <ClosedEye className="eye" />
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrap">
                <Input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Type new password"
                />
                <OpenedEye className="eye" />
              </div>
            </div>
            <div className="form-group">
              <label>Repeat New Password</label>
              <div className="input-wrap">
                <Input
                  className="form-control"
                  type="password"
                  name="password_confirmation"
                  placeholder="Type new password"
                />
                <OpenedEye className="eye" />
              </div>
            </div>
            <button className="btn-change" type="button" disabled="">
              Change
            </button>
          </div>
        </div>
      </div>
      {/* ====================================== */}
      <div className="seller-box">
        <img src={whales} alt="whales" />
        <div className="seller-wrap">
          <h2 className="seller-title">Seller Central Connections</h2>
          <p className="seller-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <button className="seller-btn" type="button">
          <img src={plus} alt="plus" />
          Add New Account
        </button>
      </div>
      {/* ====================================== */}
      <div className="amazone-box">
        <div className="central-wrapper">
          <div className="central-title">
            <Checkbox />
            <h2>
              Amazon Seller Central Connection - SELLER ID: A344WPJGDI66R5
            </h2>
            <a
              className="central-link"
              href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Show me what to do
            </a>
          </div>
          <div className="btn-wrap">
            <button className="central-btn" type="button">
              <img src={refresh} alt="refresh" />
            </button>
            <button className="central-btn" type="button">
              Add token
            </button>
            <button className="central-btn" type="button">
              <img src={check} alt="check" />
            </button>
          </div>
        </div>

        <div className="approved-wrapper">
          <div className="title-wrap">
            <h3>DbvtskGoods</h3>
            <p>A344WPJGDI66R5 - North America (US, CA, MX)</p>
          </div>
          <div className="mws-wrap">
            <h3>
              MWS Authorization
              <img src={checked} alt="checked" />
            </h3>
            <button className="mws-btn" type="button">
              &#215; Remove
            </button>
          </div>
          <div className="login-wrap">
            <h3>
              Seller Central Log In
              <img src={checked} alt="checked" />
            </h3>
            <button className="mws-btn" type="button">
              &#215; Remove
            </button>
          </div>
          <p className="approved-text">Approved</p>
        </div>

        <div className="add-wrapper">
          <div className="add-amazone-wrap">
            <h2 className="add-amazone-title">
              NEW STOREFRONT - ADD MWS ACCESS
            </h2>

            <div className="choice-wrap">
              <Cascader defaultValue={['USACAMX']} options={options} />
              <button className="connect-btn" type="button">
                Connect Acoount
              </button>
              <div className="form-group">
                <label>Amazon Seller ID</label>
                <Input
                  className="form-control"
                  type="text"
                  name="name"
                  value=""
                  placeholder="This will look like A1BCDE23F4GHIJ"
                />
              </div>
              <div className="form-group">
                <label>MWS Auth Token</label>
                <Input
                  className="form-control"
                  type="text"
                  name="name"
                  value=""
                  placeholder="This will look like amzn.mws. 01234567"
                />
              </div>
              <button className="confirm-btn" type="button">
                Confirm MWS
              </button>
            </div>

            <a
              className="add-amazone-link"
              href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to autorize Amazon MWS Access and paste the results below
            </a>
          </div>

          <div className="login-amazone-wrap">
            <h2 className="login-amazone-title">ADD ADVERTISING ACCESS</h2>
            <div className="connect-amazone">
              <a
                className="connect-amazone-link"
                href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click to autorize Amazon MWS Access and paste the results below:
              </a>
              <button
                type="button"
                onClick={() => window.open('/login/amazon', '_self')}
              >
                <img src={amazon} alt="LWA-GOld" />
              </button>
              <a
                className="connect-another-link"
                href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need another Storefront?
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ====================================== */}
      <div className="connectors-box">
        <div className="connectors-title">
          <h2>ProfitWhales Connectors</h2>
          <div className="sub">
            Certain Helium 10 tools require acess to third party services (such
            as Amazon Seller Central, Amazon Advertising or Facebook Marketing
            account). You can use the section below to grant or revoke access.
          </div>
        </div>
        <div className="connectors-main">
          <div className="product-title">
            <div className="title">
              Amazon MWS (Seller Central) - North America (US/CA/MX/BR)
            </div>
            <a
              className="show-link"
              href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Show me what to do
            </a>
          </div>
          <button className="btn-token" type="button">
            Add token
          </button>
        </div>
      </div>
      {/* ====================================== */}
      <div className="soon-box">
        <div className="soon-main">
          <div className="product-title">
            <div className="title">
              Amazon MWS (Seller Central) - Europe (UK/DE/FR/ES/IT/IN/TR)
            </div>
            <a
              className="show-link"
              href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Show me what to do
            </a>
          </div>
          <button className="btn-soon">Soon...</button>
        </div>
      </div>
      {/* ====================================== */}
      <div className="info-box">
        <div className="info-main">
          <div className="product-title">
            <div className="title">Amazon Advertising (PPC) </div>
            <a
              className="show-link"
              href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Info
            </a>
          </div>
          <div className="actions-wrap">
            <button className="actions-btn" type="button">
              <img src={check} alt="check" />
            </button>
            <button className="actions-btn" type="button">
              <img src={remove} alt="remove" />
            </button>
            <button className="actions-btn" type="button">
              <img src={refresh} alt="refresh" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
