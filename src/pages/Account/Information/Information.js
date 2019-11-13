import React from "react";
import { useSelector } from "react-redux";
import { Input, Switch } from "antd";

import Navigation from "../Navigation/Navigation";
import ItemIcon from "../../../components/ItemIcon/ItemIcon";
import lock from "../../../assets/img/lock.svg";
import { ReactComponent as OpenedEye } from "../../../assets/img/opened-eye.svg";
import { ReactComponent as ClosedEye } from "../../../assets/img/closed-eye.svg";
import check from "../../../assets/img/icons/check.svg";
import remove from "../../../assets/img/icons/remove.svg";
import refresh from "../../../assets/img/icons/refresh.svg";
import "./Information.less";

const Information = () => {
  const { user } = useSelector(state => ({
    user: state.user
  }));

  return (
    <div className="user-cabinet">
      <Navigation />
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
            <label htmlFor="">Are you privat lable seller?</label>
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
          <div className="actions">
            <button className="actions-btn">
              <img src={check} alt="check" />
            </button>
            <button className="actions-btn">
              <img src={remove} alt="remove" />
            </button>
            <button className="actions-btn">
              <img src={refresh} alt="refresh" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
