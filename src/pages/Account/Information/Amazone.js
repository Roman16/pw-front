import React from 'react';
import { Input, Checkbox, Cascader } from 'antd';

import checked from '../../../assets/img/icons/checked.svg';
import amazon from '../../../assets/img/amazon.png';
import refresh from '../../../assets/img/icons/refresh.svg';
import check from '../../../assets/img/icons/check.svg';

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

const Amazone = () => {
  return (
    <div className="amazone-box">
      <div className="central-wrapper">
        <div className="central-title">
          <Checkbox />
          <div className="title-wrap">
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
        </div>
        <div className="btn-wrap">
          <button className="refresh-btn" type="button">
            <img src={refresh} alt="refresh" />
          </button>
          <button className="token-btn" type="button">
            Add token
          </button>
          <button className="check-btn" type="button">
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
            &#215; <span>Remove</span>
          </button>
        </div>
        <div className="login-wrap">
          <h3>
            Seller Central Log In
            <img src={checked} alt="checked" />
          </h3>
          <button className="mws-btn" type="button">
            &#215; <span>Remove</span>
          </button>
        </div>
        <p className="approved-text">Approved</p>
      </div>

      <div className="add-wrapper">
        <div className="add-amazone-wrap">
          <h2 className="add-amazone-title">NEW STOREFRONT - ADD MWS ACCESS</h2>

          <div className="choice-wrap">
            <div className="connect-group">
              <Cascader
                allowClear={false}
                defaultValue={['USACAMX']}
                options={options}
              />
              <button className="connect-btn" type="button">
                Connect Account
              </button>
            </div>
            <div className="line"></div>
            <div className="confirm-group">
              <div className="form-group">
                <span>Amazon Seller ID</span>
                <Input
                  className="form-control"
                  type="text"
                  name="name"
                  value=""
                  placeholder="This will look like A1BCDE23F4GHIJ"
                />
              </div>
              <div className="form-group">
                <span>MWS Auth Token</span>
                <Input
                  className="form-control"
                  type="text"
                  name="name"
                  value="asfafsa"
                  placeholder="This will look like amzn.mws. 01234567"
                />
              </div>
              <button className="confirm-btn" type="button" disabled>
                Confirm MWS
              </button>
            </div>
          </div>

          <p className="add-amazone-text">
            Click to autorize Amazon MWS Access and paste the results below
          </p>
        </div>

        <div className="login-amazone-wrap">
          <h2 className="login-amazone-title">ADD ADVERTISING ACCESS</h2>
          <div className="connect-amazone">
            <p className="connect-amazone-text">
              Click to autorize Amazon MWS Access and paste the results below:
            </p>
            <button
              className="login-amazone-btn"
              type="button"
              onClick={() => window.open('/login/amazon', '_self')}
            >
              <img className="login-amazone-img" src={amazon} alt="LWA-GOld" />
            </button>
            <button className="connect-another-btn" type="button">
              Need another Storefront?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amazone;
