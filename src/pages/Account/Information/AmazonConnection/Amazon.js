import React from 'react';
import {Input, Checkbox, Cascader} from 'antd';

import checked from '../../../../assets/img/icons/checked.svg';
import amazon from '../../../../assets/img/amazon.png';
import refresh from '../../../../assets/img/icons/refresh.svg';
import check from '../../../../assets/img/icons/check.svg';
import {useSelector} from "react-redux";

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

const Amazon = () => {
    const {ppcLink, mwsLink} = useSelector(state => ({
            ppcLink: state.user.account_links ? state.user.account_links.amazon_ppc.connect_link : '',
            mwsLink: state.user.account_links ? state.user.account_links.amazon_mws.connect_link : ''
        })),
        token = localStorage.getItem('token');

    const redirectLink = `${ppcLink}&state=${token}`;

    return (
        <div className="amazone-box">
            <div className="central-wrapper">
                <div className="central-title">
                    <Checkbox
                        disabled={true}
                    />

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
                        <img src={refresh} alt="refresh"/>
                    </button>
                    <button className="token-btn" type="button">
                        Add token
                    </button>
                    <button className="check-btn" type="button">
                        <img src={check} alt="check"/>
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
                        <img src={checked} alt="checked"/>
                    </h3>
                    <button className="mws-btn" type="button">
                        &#215; <span>Remove</span>
                    </button>
                </div>
                <div className="login-wrap">
                    <h3>
                        Seller Central Log In
                        <img src={checked} alt="checked"/>
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

                            <a href={mwsLink} target='_blank' className="connect-btn">
                                Connect Account
                            </a>
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

                            <button className="btn green-btn confirm-btn" type="button" disabled>
                                Confirm MWS
                            </button>
                        </div>
                    </div>

                    <span
                        className="add-amazone-link"
                    >
                        Click to authorize Amazon MWS Access and paste the results below
                    </span>
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

                        <a className='login-amazone-btn'
                           href={redirectLink}
                        >
                            <img className='login-amazone-img' src={amazon} alt="LWA-GOld"/>
                        </a>
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

export default Amazon;
