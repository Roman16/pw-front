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
          <h2>Amazon Seller Central Connection - SELLER ID: A344WPJGDI66R5</h2>
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
          <h2 className="add-amazone-title">NEW STOREFRONT - ADD MWS ACCESS</h2>

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
  );
};

export default Amazone;
